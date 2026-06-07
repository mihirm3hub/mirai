"use client";

import dynamic from "next/dynamic";

const SpatialHeroScene = dynamic(() => import("@/scenes/SpatialHeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-canvas" aria-hidden="true">
        <SpatialHeroScene />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">MIRAI Studio</p>
        <h1>Spatial Intelligence Systems</h1>
        <p>XR, computer vision, simulation and AI systems presented through a cinematic, performance-first portfolio experience.</p>
      </div>
    </section>
  );
}
