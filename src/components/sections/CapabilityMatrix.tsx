"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SectionFrame from "@/components/layout/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import CapabilityGrid from "@/components/sections/CapabilityGrid";
import CapabilityCell from "@/components/sections/CapabilityCell";
import { capabilities } from "@/data/capabilities";
import { motionAllowed, registerGsap, safeDuration } from "@/lib/animation";

export default function CapabilityMatrix() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    if (!motionAllowed()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".capability-cell", {
        autoAlpha: 0,
        y: 20,
        duration: safeDuration(0.7),
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".capability-grid",
          start: "top 75%"
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame id="capabilities" className="px-6 py-24 md:px-12">
      <div ref={rootRef} className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
        <SectionHeading eyebrow="Capabilities" title="A matrix of spatial, vision, and intelligence systems." />
        <div className="capability-grid">
          <CapabilityGrid>
            {capabilities.map((capability) => (
              <div key={capability.id} className="capability-cell">
                <CapabilityCell capability={capability} />
              </div>
            ))}
          </CapabilityGrid>
        </div>
      </div>
    </SectionFrame>
  );
}
