import Image from "next/image";
import BackgroundParticles from "@/components/BackgroundParticles";
import ContactGridSection from "@/components/sections/ContactGridSection";
import FeaturedProjectsGridSection from "@/components/sections/FeaturedProjectsGridSection";
import MotionButton from "@/components/ui/motion-button";
import HeroPointerArrows from "@/components/HeroPointerArrows";
import HeroAsciiMedusa from "@/components/three/HeroAsciiMedusa";

export default function HomePage() {
  return (
    <main className="hero-root">
      <BackgroundParticles />
      <div className="hero-grid">
        <div className="hero-logo">
          <Image
            src="/images/mirai-h.png"
            alt="Mirai"
            width={180}
            height={48}
            priority
          />
        </div>

        <div className="hero-label hero-label-about">
          <span>ABOUT</span>
        </div>
        <div className="hero-about-copy">
          MIRAI builds spatial systems across XR, computer vision, and embodied AI,
          turning sensing, interaction, and intelligence into usable products.
        </div>
        <div className="hero-top-links">
          <span className="hero-label-toplink hero-hover-underline">WORK</span>
          <span className="hero-label-toplink hero-hover-underline">CONTACT</span>
        </div>
        <div className="hero-marquee" aria-label="Bringing Vision to Reality">
          <div className="hero-marquee-track">
            <span>* Bringing Vision to Reality </span>
            <span>* Bringing Vision to Reality </span>
            <span>* Bringing Vision to Reality </span>
            <span>* Bringing Vision to Reality </span>
          </div>
        </div>
        <div className="hero-connect-slot">
          <MotionButton label="Get Started" classes="w-full max-w-[14rem]" />
        </div>
        <div className="hero-label hero-label-cv">
          <span>CV</span>
        </div>
        <div className="hero-label hero-label-xr">
          <span>XR</span>
        </div>
        <div className="hero-label hero-label-explore">
          <svg
            className="hero-explore-ring"
            viewBox="0 0 200 200"
            aria-label="Explore"
            role="img"
          >
            <defs>
              <path
                id="hero-explore-circle"
                d="M 100, 100 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
              />
            </defs>
            <text>
              <textPath
                href="#hero-explore-circle"
                startOffset="0%"
                textLength="390"
                lengthAdjust="spacingAndGlyphs"
              >
                EXPLORE * EXPLORE * EXPLORE * EXPLORE * EXPLORE * EXPLORE *
              </textPath>
            </text>
          </svg>
        </div>

        <div className="hero-ascii-shell">
          <HeroAsciiMedusa />
        </div>
        <HeroPointerArrows />

        <div className="hero-grid-lines" aria-hidden>
          <div className="hero-line h h1" />
          <div className="hero-line h h2" />
          <div className="hero-line h h3" />
          <div className="hero-line h h4" />
          <div className="hero-line h h5" />
          <div className="hero-line h h5b" />
          <div className="hero-line h h6" />
          <div className="hero-line h h7" />
          <div className="hero-line h h8" />

          <div className="hero-line v v1" />
          <div className="hero-line v v2" />
          <div className="hero-line v v3" />
          <div className="hero-line v v4" />
          <div className="hero-line v v5" />
        </div>
      </div>
      <div className="section-divider" aria-hidden />
      <div className="section-spacer" aria-hidden />
      <FeaturedProjectsGridSection />
      <div className="section-divider" aria-hidden />
      <div className="section-spacer" aria-hidden />
      <ContactGridSection />
    </main>
  );
}
