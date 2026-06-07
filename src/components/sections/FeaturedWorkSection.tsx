"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SectionFrame from "@/components/layout/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import FeaturedProjectChamber from "@/components/sections/FeaturedProjectChamber";
import { featuredProjects } from "@/data/projects";
import { motionAllowed, registerGsap, safeDuration } from "@/lib/animation";

export default function FeaturedWorkSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    if (!motionAllowed()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".chamber", {
        autoAlpha: 0,
        y: 40,
        duration: safeDuration(0.8),
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".chamber-track",
          start: "top 70%"
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame id="work" className="bg-ink px-6 py-24 md:px-12">
      <div ref={rootRef} className="mx-auto flex w-[min(1300px,92vw)] flex-col gap-12">
        <SectionHeading eyebrow="Featured Work" title="Cinematic chambers for spatial systems." />
        <div className="chamber-track flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6">
          {featuredProjects.map((project) => (
            <div key={project.id} className="snap-center">
              <FeaturedProjectChamber project={project} />
            </div>
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">
          Drag horizontally to explore the chamber sequence.
        </p>
      </div>
    </SectionFrame>
  );
}
