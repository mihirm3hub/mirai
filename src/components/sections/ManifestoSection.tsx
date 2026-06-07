"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import AnimatedLine from "@/components/ui/AnimatedLine";
import SectionFrame from "@/components/layout/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import { motionAllowed, registerGsap, safeDuration } from "@/lib/animation";

const blocks = [
  {
    title: "Systems Focus",
    body: "MIRAI creates interactive systems where vision, intelligence, and spatial interfaces converge."
  },
  {
    title: "Sensorial UX",
    body: "We design multi-sensory spatial experiences that feel cinematic, precise, and engineered."
  },
  {
    title: "Prototype to Deployment",
    body: "From experimental R&D to production, our pipeline keeps fidelity and performance aligned."
  }
];

export default function ManifestoSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    if (!motionAllowed()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".manifesto-line", {
        scaleX: 0,
        duration: safeDuration(0.8),
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".manifesto-grid",
          start: "top 80%"
        }
      });

      gsap.from(".manifesto-block", {
        y: 30,
        autoAlpha: 0,
        duration: safeDuration(0.8),
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".manifesto-grid",
          start: "top 75%"
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame id="studio" className="bg-inkDeep px-6 py-24 md:px-12">
      <div ref={rootRef} className="mx-auto grid w-[min(1200px,92vw)] gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="Manifesto" title="Spatial narratives for the next interface layer." />
          <p className="text-lg text-white/65">
            MIRAI engineers interfaces that blend perception, intelligence, and immersive architecture into unified experiences.
          </p>
        </div>
        <div className="manifesto-grid flex flex-col gap-8">
          {blocks.map((block) => (
            <div key={block.title} className="manifesto-block rounded-none border border-hairline bg-surface/40 p-6">
              <div className="flex items-center justify-between gap-6">
                <h3 className="text-lg font-medium text-white">{block.title}</h3>
                <AnimatedLine className="manifesto-line w-20" />
              </div>
              <p className="mt-4 text-sm text-white/65">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
