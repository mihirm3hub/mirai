"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function CoreObject() {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.18;
    mesh.current.rotation.y += delta * 0.26;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh ref={mesh} scale={2.2}>
        <icosahedronGeometry args={[1.4, 24]} />
        <MeshDistortMaterial color="#d4ff3f" emissive="#57d6ff" emissiveIntensity={0.15} roughness={0.18} metalness={0.55} distort={0.38} speed={1.2} />
      </mesh>
    </Float>
  );
}

export default function SpatialHeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.75]}>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 4, 4]} intensity={1.8} />
      <pointLight position={[-4, -2, 3]} color="#57d6ff" intensity={2.2} />
      <CoreObject />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
    </Canvas>
  );
}
