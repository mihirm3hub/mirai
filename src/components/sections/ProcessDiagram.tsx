"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { processSteps } from "@/lib/constants";
import { motionAllowed, registerGsap, safeDuration } from "@/lib/animation";

export default function ProcessDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    if (!motionAllowed()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-line",
        { strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: safeDuration(1.2),
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-diagram",
            start: "top 75%"
          }
        }
      );

      gsap.from(".process-node", {
        autoAlpha: 0,
        y: 16,
        duration: safeDuration(0.6),
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".process-diagram",
          start: "top 75%"
        }
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="process-diagram grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <svg
        ref={svgRef}
        viewBox="0 0 600 120"
        className="h-28 w-full"
        fill="none"
        role="presentation"
      >
        <path
          className="process-line"
          d="M10 60 H590"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          strokeDasharray="600"
          strokeDashoffset="600"
        />
        {processSteps.map((step, index) => (
          <g key={step.label} transform={`translate(${30 + index * 140} 60)`}>
            <circle r="6" fill="#D6FF3F" />
            <circle r="18" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="transparent" />
          </g>
        ))}
      </svg>
      <div className="grid gap-6">
        {processSteps.map((step) => (
          <div key={step.label} className="process-node border-b border-hairline pb-4">
            <p className="font-mono text-xs text-white/40">{step.meta}</p>
            <p className="text-lg text-white">{step.label}</p>
            <p className="text-sm text-white/60">
              System checkpoints, validation loops, and deployment orchestration.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
