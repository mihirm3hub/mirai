"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { motionAllowed, registerGsap, safeDuration } from "@/lib/animation";

function VerticalIndex({ value }: { value: string }) {
  return (
    <span className="contact-panel-index" aria-label={value}>
      {value.split("").map((char, index) => (
        <span key={`${value}-${index}`} className="contact-panel-index-digit">
          {char}
        </span>
      ))}
    </span>
  );
}

export default function ContactGridSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsap();

    if (!motionAllowed()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.to(".contact-line.h", {
        opacity: 0.94,
        scaleX: 1,
        duration: safeDuration(4),
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.to(".contact-line.v", {
        opacity: 0.94,
        scaleY: 1,
        duration: safeDuration(4),
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(".contact-panel-body", {
        autoAlpha: 0,
        y: 72,
        duration: safeDuration(1.15),
        ease: "power2.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="contact" className="contact-grid-section">
      <div className="contact-grid-lines" aria-hidden>
        <div className="contact-line h contact-h1" />
        <div className="contact-line h contact-h2" />
        <div className="contact-line h contact-h3" />

        <div className="contact-line v contact-v1" />
        <div className="contact-line v contact-v4" />
      </div>

      <div className="contact-grid-heading">
        <p className="contact-grid-eyebrow">Contact</p>
        <h2 className="contact-grid-title">Let&apos;s build the next interface.</h2>
      </div>

      <div className="contact-grid-shell">
        <div className="contact-grid-card-lines" aria-hidden>
          <div className="contact-line v contact-v2" />
          <div className="contact-line h contact-v3" />
        </div>

        <div className="contact-grid-panels">
          <article className="contact-panel">
            <div className="contact-panel-body">
              <VerticalIndex value="01" />
              <h3>Start a project</h3>
              <p>
                Spatial interfaces, computer vision systems, embodied AI, and advanced product
                prototypes for teams building ambitious interaction layers.
              </p>
              <MagneticButton href="mailto:hello@mirai.studio" label="hello@mirai.studio" className="px-6 py-4" />
            </div>
          </article>

          <article className="contact-panel">
            <div className="contact-panel-body">
              <VerticalIndex value="02" />
              <h3>Collaboration</h3>
              <p>
                Available for research partnerships, innovation programs, product design sprints,
                and technical direction across real-time spatial systems.
              </p>
              <div className="contact-panel-meta">
                <span>XR Systems</span>
                <span>Computer Vision</span>
                <span>AI Agents</span>
                <span>Physical AI</span>
              </div>
            </div>
          </article>

          <article className="contact-panel">
            <div className="contact-panel-body">
              <span className="contact-panel-index">03</span>
              <h3>Channels</h3>
              <p>
                Reach out for product explorations, concept decks, or direct technical engagement.
              </p>
              <div className="contact-panel-links">
                <a
                  className="contact-channel-link"
                  href="https://github.com"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 2C6.477 2 2 6.596 2 12.266c0 4.536 2.865 8.382 6.839 9.74.5.096.682-.223.682-.495 0-.244-.009-.89-.014-1.747-2.782.617-3.369-1.392-3.369-1.392-.454-1.187-1.11-1.503-1.11-1.503-.908-.637.069-.624.069-.624 1.004.073 1.532 1.058 1.532 1.058.892 1.57 2.341 1.116 2.91.853.091-.667.349-1.117.635-1.374-2.22-.261-4.555-1.14-4.555-5.073 0-1.12.389-2.036 1.029-2.754-.103-.262-.446-1.317.098-2.746 0 0 .84-.277 2.75 1.052A9.32 9.32 0 0 1 12 6.84c.85.004 1.705.118 2.504.346 1.909-1.33 2.748-1.052 2.748-1.052.546 1.43.202 2.484.1 2.746.64.718 1.027 1.634 1.027 2.754 0 3.943-2.339 4.809-4.566 5.065.359.319.679.949.679 1.913 0 1.381-.012 2.494-.012 2.834 0 .275.18.596.688.494C19.138 20.645 22 16.8 22 12.266 22 6.596 17.523 2 12 2Z"
                    />
                  </svg>
                </a>
                <a
                  className="contact-channel-link"
                  href="https://linkedin.com"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.56 9.72h2.77V18H5.56V9.72Zm4.34 0h2.66v1.13h.04c.37-.7 1.28-1.44 2.64-1.44 2.82 0 3.34 1.9 3.34 4.37V18h-2.77v-3.74c0-.89-.02-2.04-1.22-2.04-1.22 0-1.41.98-1.41 1.98V18H9.9V9.72Z"
                    />
                  </svg>
                </a>
                <a className="contact-channel-link" href="mailto:hello@mirai.studio" aria-label="Email">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Zm1.75-.25a.25.25 0 0 0-.25.25v.3l7.5 5.12 7.5-5.12v-.3a.25.25 0 0 0-.25-.25H4.75Zm14.75 2.36-6.93 4.73a1 1 0 0 1-1.14 0L4.5 8.86v8.39c0 .138.112.25.25.25h14.5a.25.25 0 0 0 .25-.25V8.86Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
