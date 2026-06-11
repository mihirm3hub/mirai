"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { featuredProjects } from "@/data/projects";
import { InteractiveTravelCard } from "@/components/ui/3d-card";
import { motionAllowed, registerGsap, safeDuration } from "@/lib/animation";

const projects = featuredProjects.slice(0, 3);
const projectMedia: Record<string, { imageUrl: string; href: string }> = {
  "01": {
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2069&auto=format&fit=crop",
    href: "https://en.wikipedia.org/wiki/Augmented_reality",
  },
  "02": {
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop",
    href: "https://en.wikipedia.org/wiki/Point_cloud",
  },
  "03": {
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    href: "https://en.wikipedia.org/wiki/Intelligent_agent",
  },
};

export default function FeaturedProjectsGridSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsap();

    if (!motionAllowed()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.to(".featured-line.h", {
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

      gsap.to(".featured-line.v", {
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

      gsap.from(".featured-project-card-body", {
        autoAlpha: 0,
        y: 80,
        duration: safeDuration(1.15),
        ease: "power2.out",
        stagger: 0.2,
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
    <section ref={rootRef} id="work" className="featured-projects-section">
      <div className="featured-projects-lines" aria-hidden>
        <div className="featured-line h featured-h1" />
        <div className="featured-line h featured-h2" />
        <div className="featured-line h featured-h3" />

        <div className="featured-line v featured-v1" />
        <div className="featured-line v featured-v4" />
      </div>

      <div className="featured-projects-heading">
        <p className="featured-projects-eyebrow">Featured Projects</p>
        <h2 className="featured-projects-title">
          Spatial products built across WebAR, 3D vision, and multi-agent systems.
        </h2>
      </div>

      <div className="featured-projects-grid-shell">
        <div className="featured-projects-card-lines" aria-hidden>
          <div className="featured-line v featured-v2" />
          <div className="featured-line v featured-v3" />
        </div>

        <div className="featured-projects-grid">
          {projects.map((project) => {
            const media = projectMedia[project.id];

            return (
              <article
                key={project.id}
                className={`featured-project-card featured-project-card-${project.accent}`}
              >
                <div className="featured-project-card-body featured-project-card-shell">
                  <div className="featured-project-card-perspective">
                    <InteractiveTravelCard
                      title={project.title}
                      subtitle={project.accent === "mirai" ? "Spatial System" : "Vision System"}
                      imageUrl={media.imageUrl}
                      href={media.href}
                      onActionClick={() => {}}
                      indexLabel={project.id}
                      description={project.description}
                      stack={project.stack}
                      className="featured-project-tilt-card"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
