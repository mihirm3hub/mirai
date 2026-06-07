"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SectionFrame from "@/components/layout/SectionFrame";
import MagneticButton from "@/components/ui/MagneticButton";
import { motionAllowed, registerGsap, safeDuration } from "@/lib/animation";

export default function ContactSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    if (!motionAllowed()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".cta-line", {
        scaleX: 0,
        duration: safeDuration(0.9),
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".cta-frame",
          start: "top 80%"
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionFrame id="contact" className="bg-inkDeep px-6 py-24 md:px-12">
      <div ref={rootRef} className="mx-auto flex w-[min(1200px,92vw)] flex-col items-center gap-10 text-center">
        <h2 className="text-4xl font-medium tracking-tight text-white sm:text-6xl">LET&apos;S BUILD THE NEXT INTERFACE</h2>
        <div className="cta-frame relative w-full max-w-3xl border border-hairline bg-ink px-6 py-10">
          <span className="cta-line absolute left-0 top-0 h-px w-full origin-left bg-white/30" />
          <span className="cta-line absolute bottom-0 left-0 h-px w-full origin-left bg-white/30" />
          <span className="absolute left-0 top-0 h-full w-px bg-white/20" />
          <span className="absolute right-0 top-0 h-full w-px bg-white/20" />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="mailto:hello@mirai.studio" label="Start a Project" className="px-6 py-4" />
            <MagneticButton href="https://github.com" label="View GitHub" variant="ghost" className="px-6 py-4" />
            <MagneticButton href="https://linkedin.com" label="LinkedIn" variant="ghost" className="px-6 py-4" />
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
