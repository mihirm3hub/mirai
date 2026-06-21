import Image from "next/image";
import BackgroundParticles from "@/components/BackgroundParticles";
import { featuredProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="detail-page-root">
      <BackgroundParticles />

      <div className="detail-page-frame">
        <header className="detail-page-hero">
          <div className="detail-page-nav">
            <a href="/" className="detail-page-logo" aria-label="Back to home">
              <Image src="/images/mirai-h.png" alt="Mirai" width={180} height={48} priority />
            </a>
            <div className="detail-page-links">
              <a href="/" className="hero-hover-underline">Home</a>
              <a href="/about" className="hero-hover-underline">About</a>
              <a href="/#contact" className="hero-hover-underline">Contact</a>
            </div>
          </div>

          <div className="detail-page-hero-copy">
            <p className="detail-page-eyebrow">Projects</p>
            <h1 className="detail-page-title">
              Detailed systems work across spatial computing, vision, and applied AI.
            </h1>
            <p className="detail-page-summary">
              Each project below expands the featured portfolio cards into product framing,
              technical stack, process, and system design decisions.
            </p>
          </div>
        </header>

        <div className="detail-projects-stack">
          {featuredProjects.map((project) => (
            <section
              key={project.slug}
              id={`project-${project.slug}`}
              className={`project-detail-section project-detail-section-${project.accent}`}
            >
              <div className="project-detail-header">
                <div>
                  <p className="project-detail-kicker">{project.eyebrow}</p>
                  <h2 className="project-detail-name">{project.title}</h2>
                </div>
                <div className="project-detail-meta">
                  <span className="project-detail-index">{project.id}</span>
                  <span>{project.year}</span>
                  <span>{project.role}</span>
                </div>
              </div>

              <div className="project-detail-grid">
                <article className="project-detail-card project-detail-card-wide">
                  <p className="project-card-label">Overview</p>
                  <p className="project-card-copy">{project.summary}</p>
                  <p className="project-card-note">{project.challenge}</p>
                </article>

                <article className="project-detail-card">
                  <p className="project-card-label">Tech Stack</p>
                  <div className="project-stack-grid">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>

                <article className="project-detail-card">
                  <p className="project-card-label">Deliverables</p>
                  <ul className="project-list">
                    {project.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="project-detail-card">
                  <p className="project-card-label">Process</p>
                  <ul className="project-list">
                    {project.process.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="project-detail-card project-detail-card-tall">
                  <p className="project-card-label">System Design</p>
                  <ul className="project-list">
                    {project.systemDesign.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="project-detail-card project-detail-card-visual">
                  <p className="project-card-label">Build Signal</p>
                  <div className="project-visual-panel">
                    <span className="project-visual-index">{project.id}</span>
                    <span className="project-visual-title">{project.title}</span>
                    <span className="project-visual-accent">
                      {project.accent === "mirai" ? "Spatial Product System" : "Vision Research System"}
                    </span>
                  </div>
                </article>

                <article className="project-detail-card project-detail-card-wide">
                  <p className="project-card-label">Outcomes</p>
                  <ul className="project-list project-list-columns">
                    {project.outcomes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
