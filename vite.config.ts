import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function unityWebgl(): Plugin {
  const headers = {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
  };

  const applyCompression = (url: string, setHeader: (name: string, value: string) => void) => {
    if (url.endsWith(".br")) {
      setHeader("Content-Encoding", "br");
      if (url.includes(".wasm")) setHeader("Content-Type", "application/wasm");
      else if (url.includes(".js") || url.includes("framework")) {
        setHeader("Content-Type", "application/javascript");
      }
    } else if (url.endsWith(".gz")) {
      setHeader("Content-Encoding", "gzip");
      if (url.includes(".wasm")) setHeader("Content-Type", "application/wasm");
      else if (url.includes(".js") || url.includes("framework")) {
        setHeader("Content-Type", "application/javascript");
      }
    } else if (url.endsWith(".wasm")) {
      setHeader("Content-Type", "application/wasm");
    }
  };

  return {
    name: "unity-webgl",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split("?")[0] ?? "";
        if (path.startsWith("/webgl") || path.startsWith("/play")) {
          Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
        }
        applyCompression(path, (n, v) => res.setHeader(n, v));
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split("?")[0] ?? "";
        if (path.startsWith("/webgl") || path.startsWith("/play")) {
          Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
        }
        applyCompression(path, (n, v) => res.setHeader(n, v));
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), unityWebgl()],
});
