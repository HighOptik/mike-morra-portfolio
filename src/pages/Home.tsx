import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { experience, projects, site } from "../data/site";

const jobTone = ["tone-magma", "tone-plasma", "tone-gold"] as const;

export default function Home() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.slug !== featured.slug);

  return (
    <div className="shell">
      <section className="hero-stage">
        <img
          className="hero-photo"
          src="/art/gameplay.png"
          alt="UberLoop gameplay: a knight in a horde"
        />
        <div className="hero-shade" />
        <div className="hero-ui">
          <Nav />
          <div className="hero-copy">
            <p className="kicker">
              {site.role}
              <span> / {site.location}</span>
            </p>
            <h1>
              Mike
              <br />
              Morra
            </h1>
            <p className="lede">{site.summary}</p>
            <ul className="pills">
              <li>5+ years Unity / C#</li>
              <li>Gameplay systems</li>
              <li>WebGL hosted here</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="featured-band" id="work">
        <div className="featured-copy">
          <p className="kicker">Independent · {featured.year}</p>
          <img className="wordmark" src="/art/wordmark.png" alt="UberLoop" />
          <p>{featured.blurb}</p>
          <div className="tags">
            {featured.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="actions">
            {featured.href && (
              <a className="btn" href={featured.href} target="_blank" rel="noreferrer">
                {featured.hrefLabel ?? "Open"}
              </a>
            )}
            {featured.playable && (
              <Link className="btn ghost" to={`/play/${featured.slug}`}>
                Play in browser
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="play-band" id="play">
        <header className="section-head">
          <p className="kicker">Live on this site</p>
          <h2>Hosted WebGL</h2>
          <p>Unity exports drop into a folder. The playground below is running in the browser now.</p>
        </header>
        <ul className="cards">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link className="card play-card" to={`/play/${p.slug}`}>
                <p className="kicker">
                  {p.year} · {p.role}
                </p>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <em>Launch the arena</em>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="exp">
        <header className="section-head invert">
          <p className="kicker">Studios</p>
          <h2>Selected experience</h2>
        </header>
        <ol>
          {experience.map((job, i) => (
            <li key={job.studio} className={`job ${jobTone[i]}`}>
              <div className="job-index">0{i + 1}</div>
              <div>
                <h3>{job.studio}</h3>
                <p className="exp-title">{job.title}</p>
                <ul>
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
              <span className="job-dates">{job.dates}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="page-pad">
        <Footer />
      </div>
    </div>
  );
}
