"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import SpatialArtifact from "@/components/three/SpatialArtifact";

export default function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 6]} intensity={0.6} />
      <directionalLight position={[-4, -2, -6]} intensity={0.35} />
      <SpatialArtifact detail={isMobile ? 1 : 2} />
    </Canvas>
  );
}
