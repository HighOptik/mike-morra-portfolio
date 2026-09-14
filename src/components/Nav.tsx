import { Link } from "react-router-dom";
import { site } from "../data/site";

export default function Nav() {
  return (
    <header className="nav">
      <Link to="/" className="nav-mark">
        <img src="/art/mark.png" alt="" width={40} height={40} />
        {site.name}
      </Link>
      <nav>
        <a href="#work">Work</a>
        <a href="#play">Play</a>
        <a href={`mailto:${site.email}`}>Contact</a>
      </nav>
    </header>
  );
}
