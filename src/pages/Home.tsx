import Footer from "../components/Footer";
import ItchEmbed from "../components/ItchEmbed";
import Nav from "../components/Nav";
import { asset, experience, projects, site } from "../data/site";

const jobTone = ["tone-magma", "tone-plasma", "tone-gold"] as const;

export default function Home() {
  const featured = projects.find((p) => p.featured) ?? projects[0];

  return (
    <div className="shell">
      <section className="hero-stage">
        <img
          className="hero-photo"
          src={asset("art/gameplay.png")}
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
              <li>Toronto</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="featured-band" id="work">
        <div className="featured-copy">
          <p className="kicker">Coming soon</p>
          <h2>UberLoop</h2>
          <img
            className="featured-shot"
            src={asset("art/levelup.gif")}
            alt="UberLoop gameplay"
          />
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
            {featured.itch && (
              <a className="btn ghost" href={featured.itch} target="_blank" rel="noreferrer">
                itch.io
              </a>
            )}
            <a className="btn ghost" href="#play">
              Play here
            </a>
          </div>
        </div>
      </section>

      {featured.embedUrl && (
        <section className="play-band" id="play">
          <header className="section-head">
            <h2>{featured.title}</h2>
          </header>
          <ItchEmbed src={featured.embedUrl} title={featured.title} steam={featured.href} />
        </section>
      )}

      <section className="exp">
        <header className="section-head invert">
          <h2>Experience</h2>
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
