import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div>
        <strong>{site.name}</strong>
        <span>
          {site.role} · {site.location}
        </span>
      </div>
      <div className="footer-links">
        <a href={site.mailHref} target="_blank" rel="noreferrer">
          {site.email}
        </a>
        <a href={site.phoneHref}>{site.phone}</a>
      </div>
    </footer>
  );
}
