import { useEffect, useRef, useState } from "react";

type Manifest = {
  loaderUrl: string;
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl?: string;
  companyName?: string;
  productName?: string;
  productVersion?: string;
};

type UnityInstance = { Quit: () => Promise<void> };

function join(base: string, path: string) {
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export default function UnityPlayer({ slug }: { slug: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<UnityInstance | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const base = `/webgl/${slug}`;
    let cancelled = false;

    async function load() {
      const manifestRes = await fetch(`${base}/manifest.json`, { cache: "no-cache" });
      if (!manifestRes.ok) {
        if (!cancelled) setMissing(true);
        return;
      }
      const manifest = (await manifestRes.json()) as Manifest;
      const loaderUrl = join(base, manifest.loaderUrl);

      await new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[data-unity-loader="${slug}"]`);
        if (existing) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = loaderUrl;
        script.async = true;
        script.dataset.unityLoader = slug;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Unity loader failed to load."));
        document.body.appendChild(script);
      });

      if (cancelled || !canvasRef.current || !window.createUnityInstance) {
        if (!cancelled && !window.createUnityInstance) {
          setError("Unity loader did not initialize.");
        }
        return;
      }

      const instance = await window.createUnityInstance(
        canvasRef.current,
        {
          dataUrl: join(base, manifest.dataUrl),
          frameworkUrl: join(base, manifest.frameworkUrl),
          codeUrl: join(base, manifest.codeUrl),
          streamingAssetsUrl: manifest.streamingAssetsUrl
            ? join(base, manifest.streamingAssetsUrl)
            : `${base}/StreamingAssets`,
          companyName: manifest.companyName ?? "Mike Morra",
          productName: manifest.productName ?? slug,
          productVersion: manifest.productVersion ?? "0.1.0",
        },
        (p) => {
          if (!cancelled) setProgress(p);
        },
      );

      if (cancelled) {
        await instance.Quit();
        return;
      }
      instanceRef.current = instance;
      setReady(true);
    }

    load().catch((err: unknown) => {
      if (!cancelled) {
        setError(err instanceof Error ? err.message : "Could not start the WebGL build.");
      }
    });

    return () => {
      cancelled = true;
      const inst = instanceRef.current;
      instanceRef.current = null;
      if (inst) {
        inst.Quit().catch(() => undefined);
      }
    };
  }, [slug]);

  if (missing) {
    return (
      <div className="player-empty">
        <p>No Unity WebGL build is uploaded for this project yet.</p>
        <p className="muted">
          Export from Unity to <code>public/webgl/{slug}/</code> and add a{" "}
          <code>manifest.json</code>. See the README.
        </p>
      </div>
    );
  }

  return (
    <div className="player">
      <canvas ref={canvasRef} id={`unity-${slug}`} className="player-canvas" tabIndex={0} />
      {!ready && !error && (
        <div className="player-overlay">
          <span>Loading {Math.round(progress * 100)}%</span>
          <div className="player-bar">
            <i style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        </div>
      )}
      {error && <div className="player-overlay error">{error}</div>}
    </div>
  );
}
