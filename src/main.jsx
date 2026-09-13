import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, BriefcaseBusiness, Code2, Mail, MoveUpRight } from "lucide-react";
import "./styles.css";

const projects = [
  {
    number: "01",
    type: "Web platform",
    title: "The quiet power of a clear dashboard.",
    description: "A focused workspace that turns complex operational data into confident next actions.",
    tags: ["React", "Data design"],
    accent: "coral",
  },
  {
    number: "02",
    type: "Product system",
    title: "Making room for better decisions.",
    description: "A modular component language built to keep teams moving quickly without losing the human touch.",
    tags: ["Systems", "Prototyping"],
    accent: "lime",
  },
  {
    number: "03",
    type: "Experiment",
    title: "Small interactions, memorable moments.",
    description: "A playful study in motion, rhythm, and the details that make a digital product feel alive.",
    tags: ["Motion", "Creative code"],
    accent: "blue",
  },
];

function App() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Aniruddhan home">A<span>.</span></a>
        <div className="nav-links">
          <a href="#work">Selected work</a>
          <a href="#about">About</a>
          <a className="nav-contact" href="mailto:hello@aniruddhan.dev">Let's talk <ArrowUpRight size={15} /></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Developer · Designer · Curious human</p>
          <h1>Building digital things with <em>clarity</em> and care.</h1>
          <p className="hero-intro">I&apos;m Aniruddhan, a product-minded developer who likes turning fuzzy ideas into useful, considered experiences.</p>
          <a className="text-link" href="#work">See selected work <MoveUpRight size={17} /></a>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="sun">A<span>.</span></div>
          <span className="mark-label mark-label-top">Ideas → impact</span>
          <span className="mark-label mark-label-bottom">Since 2024</span>
        </div>
      </section>

      <section className="signal-band">
        <div className="shell signal-content">
          <span>Currently available for select collaborations</span>
          <span className="signal-line" />
          <span className="signal-location">Based in India · Working worldwide</span>
        </div>
      </section>

      <section className="work shell" id="work">
        <div className="section-heading">
          <p className="eyebrow">A few things I&apos;ve made</p>
          <h2>Selected work<span>.</span></h2>
          <p className="section-note">Different shapes, same obsession: make it understandable.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project project-${project.accent}`} key={project.number}>
              <div className="project-number">{project.number}</div>
              <div className="project-body">
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <a className="project-arrow" href={`mailto:hello@aniruddhan.dev?subject=${encodeURIComponent(project.title)}`} aria-label={`Ask about ${project.title}`}><ArrowUpRight size={22} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="about shell" id="about">
        <div className="about-aside"><p className="eyebrow">A little context</p><span className="about-symbol">✳</span></div>
        <div className="about-copy">
          <h2>Good work is a team sport.</h2>
          <p>I care about the space between an ambitious idea and the moment it becomes real. My role is to bring structure to that space: ask better questions, sweat the details, and build things people enjoy using.</p>
          <p>When I&apos;m away from a screen, I&apos;m probably collecting references, learning something new, or looking for a long walk.</p>
          <a className="text-link" href="mailto:hello@aniruddhan.dev">Start a conversation <MoveUpRight size={17} /></a>
        </div>
      </section>

      <footer className="footer shell">
        <div><span className="footer-label">Have a good one</span><strong>© 2024 Aniruddhan</strong></div>
        <div className="socials"><a href="mailto:hello@aniruddhan.dev" aria-label="Email Aniruddhan"><Mail size={18} /></a><a href="https://github.com/Aniruddhan15" aria-label="Aniruddhan code on GitHub"><Code2 size={18} /></a><a href="https://www.linkedin.com" aria-label="Aniruddhan on LinkedIn"><BriefcaseBusiness size={18} /></a></div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
