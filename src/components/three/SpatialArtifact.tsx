"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SpatialArtifactProps = {
  detail?: number;
};

export default function SpatialArtifact({ detail = 2 }: SpatialArtifactProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.2, detail), [detail]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2 + pointer.y * 0.4;
      meshRef.current.rotation.y = t * 0.25 + pointer.x * 0.4;
      meshRef.current.position.y = Math.sin(t * 0.6) * 0.12;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = t * 0.18 - pointer.y * 0.2;
      glowRef.current.rotation.y = t * 0.2 - pointer.x * 0.2;
      glowRef.current.position.y = Math.sin(t * 0.55) * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#0b0b0b"
          wireframe
          metalness={0.2}
          roughness={0.4}
          emissive="#56D7FF"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh ref={glowRef} geometry={geometry} scale={1.06}>
        <meshStandardMaterial
          color="#111111"
          transparent
          opacity={0.35}
          emissive="#D6FF3F"
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}
