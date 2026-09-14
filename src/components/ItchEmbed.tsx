import { useState } from "react";
import { asset } from "../data/site";

type Props = {
  src: string;
  title: string;
  steam?: string;
  poster?: string;
};

export default function ItchEmbed({
  src,
  title,
  steam,
  poster = asset("art/gameplay.png"),
}: Props) {
  const [active, setActive] = useState(false);

  return (
    <div className="embed">
      {active ? (
        <div className="embed-frame">
          <div className="embed-toolbar">
            <button type="button" className="embed-stop" onClick={() => setActive(false)}>
              Stop
            </button>
          </div>
          <iframe
            title={title}
            src={src}
            allow="autoplay; fullscreen; gamepad; keyboard-map; xr-spatial-tracking"
            allowFullScreen
          />
        </div>
      ) : (
        <button type="button" className="embed-gate" onClick={() => setActive(true)}>
          <img src={poster} alt="" />
          <span className="embed-gate-ui">
            <span className="embed-play">Play {title}</span>
          </span>
        </button>
      )}
      {steam && (
        <div className="embed-cta">
          <a className="btn" href={steam} target="_blank" rel="noreferrer">
            Wishlist on Steam
          </a>
        </div>
      )}
    </div>
  );
}
