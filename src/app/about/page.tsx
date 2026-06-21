import Image from "next/image";
import AboutStacyCanvas from "@/components/three/AboutStacyCanvas";
import { developerProfile } from "@/data/profile";

export default function AboutPage() {
  return (
    <main className="detail-page-root">
      <div className="detail-page-frame">
        <header className="detail-page-hero about-page-hero">
          <div className="detail-page-nav">
            <a href="/" className="detail-page-logo" aria-label="Back to home">
              <Image src="/images/mirai-h.png" alt="Mirai" width={180} height={48} priority />
            </a>
            <div className="detail-page-links">
              <a href="/" className="hero-hover-underline">Home</a>
              <a href="/projects" className="hero-hover-underline">Projects</a>
              <a href="/#contact" className="hero-hover-underline">Contact</a>
            </div>
          </div>

          <div className="about-hero-layout">
            <div className="detail-page-hero-copy">
              <p className="detail-page-eyebrow">About</p>
              <h1 className="detail-page-title">{developerProfile.title}</h1>
              <p className="detail-page-summary">
                {developerProfile.intro} {developerProfile.summary}
              </p>
            </div>

            <div className="about-hero-visual" aria-hidden="true">
              <AboutStacyCanvas />
            </div>
          </div>
        </header>

        <section className="about-grid">
          <article className="about-card about-card-wide">
            <p className="project-card-label">Profile</p>
            <h2 className="about-name">{developerProfile.name}</h2>
            <p className="project-card-copy">{developerProfile.summary}</p>
            <div className="about-pills">
              {developerProfile.expertise.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>

          <article className="about-card">
            <p className="project-card-label">Location</p>
            <p className="about-card-copy">{developerProfile.location}</p>
            <p className="project-card-label project-card-label-spaced">Contact</p>
            <div className="about-links">
              <a href={`mailto:${developerProfile.contact.email}`}>{developerProfile.contact.email}</a>
              <a href={developerProfile.contact.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={developerProfile.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </article>

          <article className="about-card">
            <p className="project-card-label">Highlights</p>
            <ul className="project-list">
              {developerProfile.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section id="cv" className="cv-section">
          <div className="cv-section-header">
            <div>
              <p className="detail-page-eyebrow">CV</p>
              <h2 className="cv-section-title">View or download the current CV.</h2>
            </div>
            <div className="cv-actions">
              <a href="/Mihir-Mainkar-CV.txt" target="_blank" rel="noreferrer" className="cv-action-link">
                View CV
              </a>
              <a href="/Mihir-Mainkar-CV.txt" download className="cv-action-link cv-action-link-primary">
                Download CV
              </a>
            </div>
          </div>

          <div className="cv-grid">
            {developerProfile.cvSections.map((section) => (
              <article key={section.title} className="about-card">
                <p className="project-card-label">{section.title}</p>
                <ul className="project-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
