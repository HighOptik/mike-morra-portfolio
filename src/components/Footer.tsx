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
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={`tel:${site.phone.replace(/-/g, "")}`}>{site.phone}</a>
      </div>
    </footer>
  );
}
