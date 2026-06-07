"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import AnimatedLine from "@/components/ui/AnimatedLine";
import MagneticButton from "@/components/ui/MagneticButton";
import TechnicalLabel from "@/components/ui/TechnicalLabel";
import LayoutGrid from "@/components/layout/LayoutGrid";
import Navbar from "@/components/layout/Navbar";
import HeroCanvas from "@/components/three/HeroCanvas";
import { motionAllowed, registerGsap, safeDuration } from "@/lib/animation";

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    if (!motionAllowed()) {
      if (introRef.current) {
        introRef.current.style.display = "none";
      }
      return undefined;
    }

    const ctx = gsap.context(() => {
      const intro = gsap.timeline();
      intro
        .from(".intro-line", {
          scaleX: 0,
          duration: safeDuration(0.9),
          ease: "power2.out",
          stagger: 0.12
        })
        .from(
          ".intro-text",
          {
            autoAlpha: 0,
            y: 20,
            duration: safeDuration(0.6),
            ease: "power2.out"
          },
          "-=0.4"
        )
        .to(introRef.current, {
          autoAlpha: 0,
          duration: safeDuration(0.8),
          delay: 0.2
        });

      gsap.from(".hero-line", {
        scaleX: 0,
        duration: safeDuration(1.2),
        ease: "power2.out",
        delay: 0.8
      });

      gsap.from(".hero-title span", {
        yPercent: 120,
        duration: safeDuration(1),
        ease: "power3.out",
        stagger: 0.08,
        delay: 1
      });

      gsap.from(".hero-copy p", {
        autoAlpha: 0,
        y: 24,
        duration: safeDuration(0.8),
        ease: "power2.out",
        delay: 1.3
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative min-h-screen overflow-hidden bg-ink">
      <div ref={introRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
        <div className="flex w-[70%] flex-col gap-6">
          <AnimatedLine className="intro-line" />
          <AnimatedLine className="intro-line" />
          <AnimatedLine className="intro-line" />
        </div>
        <p className="intro-text mt-10 font-mono text-xs uppercase tracking-[0.5em] text-white/70">
          MIRAI / SPATIAL INTELLIGENCE STUDIO
        </p>
      </div>

      <LayoutGrid className="opacity-40" />
      <div className="section-noise absolute inset-0" />

      <Navbar />

      <div className="absolute inset-0 -z-0">
        <HeroCanvas />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-[min(1200px,92vw)] flex-col justify-center gap-12 py-24">
        <div className="flex flex-col gap-6">
          <div className="text-mask hero-title text-[clamp(3.4rem,9vw,10rem)] font-medium leading-[0.85] tracking-[-0.08em]">
            <span className="block">BUILDING</span>
            <span className="block">SPATIAL</span>
            <span className="block">INTELLIGENCE</span>
          </div>
          <p className="max-w-xl text-lg text-white/70">
            XR, computer vision, AI agents, and physical AI systems for the next interface layer.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <MagneticButton href="#work" label="Explore Work" className="px-6 py-4" />
          <MagneticButton href="#contact" label="Contact" variant="ghost" className="px-6 py-4" />
        </div>

        <AnimatedLine className="hero-line w-full" />
      </div>

      <div className="absolute right-[10%] top-[28%] hidden flex-col gap-4 md:flex">
        <TechnicalLabel label="GRID / 120" />
        <TechnicalLabel label="LIGHTING / EMISSIVE" />
        <TechnicalLabel label="SYSTEM / ONLINE" />
      </div>

      <div className="absolute bottom-10 left-8 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-white/60">
        <span className="h-px w-10 bg-white/30" />
        Technical Launch Sequence
      </div>
    </section>
  );
}
