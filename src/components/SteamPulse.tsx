import { useEffect, useState } from "react";
import { asset } from "../data/site";

type SteamStatus = {
  updatedAt: number;
  title?: string;
  version?: string;
  href?: string;
};

const FRESH_MS = 36 * 60 * 60 * 1000;
const TICK_MS = 30_000;
const REFRESH_MS = 5 * 60 * 1000;

function formatAgo(unix: number, now = Date.now()) {
  const seconds = Math.max(0, Math.floor(now / 1000 - unix));
  if (seconds < 45) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 14) return `${days}d ago`;
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function SteamPulse() {
  const [status, setStatus] = useState<SteamStatus | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const res = await fetch(asset("steam-status.json"), { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as SteamStatus;
        if (alive && data.updatedAt) setStatus(data);
      } catch {
        // Hide the chip if Steam status is unavailable.
      }
    };

    load();
    const refresh = window.setInterval(load, REFRESH_MS);
    const tick = window.setInterval(() => setNow(Date.now()), TICK_MS);
    return () => {
      alive = false;
      window.clearInterval(refresh);
      window.clearInterval(tick);
    };
  }, []);

  if (!status) return null;

  const ago = formatAgo(status.updatedAt, now);
  const fresh = now - status.updatedAt * 1000 < FRESH_MS;
  const version = status.version ? ` ${status.version}` : "";
  const label = status.title || "UberLoop Steam update";

  return (
    <div className="steam-pulse-wrap">
      <a
        className="steam-pulse"
        href={status.href || "https://store.steampowered.com/app/4797000/UberLoop/"}
        target="_blank"
        rel="noreferrer"
        aria-label={`${label}, updated ${ago}`}
      >
        <span className={`steam-pulse-dot${fresh ? " is-fresh" : ""}`} />
        <span className="steam-pulse-meta">
          <span className="steam-pulse-label">Steam build{version}</span>
          <span className="steam-pulse-ago">Updated {ago}</span>
        </span>
      </a>
    </div>
  );
}
