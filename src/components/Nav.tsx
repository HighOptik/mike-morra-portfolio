import { Link, useLocation, useNavigate } from "react-router-dom";
import type { MouseEvent } from "react";
import { asset, site } from "../data/site";

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== "/") return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goSection = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: `#${id}` });
      return;
    }
    scrollToId(id);
  };

  return (
    <header className="nav">
      <Link to="/" className="nav-mark" onClick={goHome}>
        <img src={asset("art/mark.png")} alt="" width={40} height={40} />
        {site.name}
      </Link>
      <nav>
        <a href="#work" onClick={goSection("work")}>
          Work
        </a>
        <a href="#play" onClick={goSection("play")}>
          Play
        </a>
        <a href="#contact" onClick={goSection("contact")}>
          Contact
        </a>
      </nav>
    </header>
  );
}
