import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { scrollToId } from "./Nav";
import { asset, type Project } from "../data/site";

type Props = {
  project: Project;
};

export default function FeaturedCarousel({ project }: Props) {
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);
  const slides = 2;

  const go = (next: number) => {
    setIndex(Math.max(0, Math.min(slides - 1, next)));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    dragging.current = true;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = e.clientX - startX.current;
    if (dx < -50) go(index + 1);
    if (dx > 50) go(index - 1);
  };

  return (
    <div className="featured-carousel">
      <div
        className="featured-viewport"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="featured-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          <div className="featured-slide">
            <img
              className="featured-shot"
              src={asset("art/levelup.gif")}
              alt="UberLoop gameplay"
              draggable={false}
            />
            <p>{project.blurb}</p>
            <div className="tags">
              {project.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <SlideActions project={project} />
          </div>
          <div className="featured-slide">
            <div className="featured-about">
              {project.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <ul>
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <SlideActions project={project} />
          </div>
        </div>
      </div>
      <div className="featured-controls">
        <button
          type="button"
          className="featured-arrow"
          aria-label="Previous"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          ‹
        </button>
        <div className="featured-dots">
          {Array.from({ length: slides }, (_, i) => (
            <button
              key={i}
              type="button"
              className={i === index ? "is-on" : undefined}
              aria-label={i === 0 ? "Overview" : "About the game"}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="featured-arrow"
          aria-label="Next"
          disabled={index === slides - 1}
          onClick={() => go(index + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}

function SlideActions({ project }: { project: Project }) {
  return (
    <div className="actions">
      {project.href && (
        <a className="btn" href={project.href} target="_blank" rel="noreferrer">
          {project.hrefLabel ?? "Open"}
        </a>
      )}
      {project.itch && (
        <a className="btn ghost" href={project.itch} target="_blank" rel="noreferrer">
          itch.io
        </a>
      )}
      <a
        className="btn ghost"
        href="#play"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("play");
        }}
      >
        Play here
      </a>
    </div>
  );
}
