import { Link, useParams } from "react-router-dom";
import UnityPlayer from "../components/UnityPlayer";
import WebGLLab from "../components/WebGLLab";
import { projects } from "../data/site";

export default function Play() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project || !project.playable) {
    return (
      <div className="play-page">
        <header className="play-bar">
          <Link to="/">← Back</Link>
        </header>
        <p className="player-empty">That project is not playable here.</p>
      </div>
    );
  }

  return (
    <div className="play-page">
      <header className="play-bar">
        <Link to="/">← {project.title}</Link>
        {project.href && (
          <a href={project.href} target="_blank" rel="noreferrer">
            {project.hrefLabel ?? "External"}
          </a>
        )}
      </header>
      {project.webgl === "three" ? <WebGLLab /> : <UnityPlayer slug={project.slug} />}
    </div>
  );
}
