import { Link } from "react-router-dom";
import ItchEmbed from "../components/ItchEmbed";
import { projects } from "../data/site";

export default function Play() {
  const project = projects.find((p) => p.slug === "uberloop");

  if (!project?.embedUrl) {
    return (
      <div className="play-page">
        <header className="play-bar">
          <Link to="/">← Back</Link>
        </header>
        <p className="player-empty">Nothing to play yet.</p>
      </div>
    );
  }

  return (
    <div className="play-page">
      <header className="play-bar">
        <Link to="/">← {project.title}</Link>
        <span className="play-bar-links">
          {project.href && (
            <a href={project.href} target="_blank" rel="noreferrer">
              {project.hrefLabel ?? "Steam"}
            </a>
          )}
          {project.itch && (
            <a href={project.itch} target="_blank" rel="noreferrer">
              itch.io
            </a>
          )}
        </span>
      </header>
      <ItchEmbed src={project.embedUrl} title={project.title} steam={project.href} />
    </div>
  );
}
