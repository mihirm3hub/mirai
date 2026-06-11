"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

function mergeSceneGeometry(root: THREE.Object3D) {
  const geometries: THREE.BufferGeometry[] = [];

  root.updateMatrixWorld(true);

  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh) || !child.geometry) {
      return;
    }

    const geometry = child.geometry.clone();
    geometry.applyMatrix4(child.matrixWorld);
    geometries.push(geometry.index ? geometry.toNonIndexed() : geometry);
  });

  if (!geometries.length) {
    return null;
  }

  return mergeGeometries(geometries, false);
}

export default function HeroAsciiMedusa() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.15, 6);

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const effect = new AsciiEffect(renderer, " .:-+*=%@#$#@%=*+-:. ", {
      invert: true,
      resolution: 0.30,
    });
    effect.domElement.className = "hero-ascii-output";
    effect.domElement.setAttribute("aria-hidden", "true");
    effect.domElement.style.color = "#f5f5f5";
    effect.domElement.style.backgroundColor = "#141413";

    mount.appendChild(effect.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    const keyLight = new THREE.PointLight(0xffffff, 1.75, 0, 0);
    const rimLight = new THREE.PointLight(0xffffff, 0.45, 0, 0);

    keyLight.position.set(4, 3, 7);
    rimLight.position.set(-5, -2, -4);

    scene.add(ambientLight, keyLight, rimLight);

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      side: THREE.DoubleSide,
      roughness: 0.88,
      metalness: 0.04,
    });

    let animationFrame = 0;
    let mesh: THREE.Mesh | null = null;
    const pointer = { x: 0, y: 0 };

    const render = () => {
      effect.render(scene, camera);
    };

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      effect.setSize(width, height);
      render();
    };

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsed = clock.getElapsedTime();

      if (mesh) {
        mesh.rotation.y = pointer.x * 0.6;
        mesh.rotation.x = Math.sin(elapsed * 0.42) * 0.08;
        mesh.position.y = Math.sin(elapsed * 0.55) * 0.08;
      }

      // keyLight.position.x = Math.cos(elapsed * 0.35) * 5.6;
      // keyLight.position.z = 5 + Math.sin(elapsed * 0.35) * 2.8;
      // keyLight.position.y = 2.8 + Math.sin(elapsed * 0.2) * 0.45;

      render();
      animationFrame = window.requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const relativeX = event.clientX / Math.max(window.innerWidth, 1);
      const relativeY = event.clientY / Math.max(window.innerHeight, 1);

      pointer.x = THREE.MathUtils.clamp(relativeX * 2 - 1, -1, 1);
      pointer.y = THREE.MathUtils.clamp(relativeY * 2 - 1, -1, 1);
    };

    const handlePointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    const loader = new GLTFLoader();
    loader.load(
      "/models/medusa.glb",
      (gltf) => {
        const geometry = mergeSceneGeometry(gltf.scene);
        if (!geometry) {
          return;
        }

        geometry.computeVertexNormals();
        geometry.center();
        geometry.computeBoundingSphere();

        mesh = new THREE.Mesh(geometry, material);

        const radius = geometry.boundingSphere?.radius ?? 1;
        const scale = 4 / Math.max(radius * 2, 1);
        mesh.scale.setScalar(scale);
        mesh.position.y = -0.18;
        mesh.position.x = 0.12;
        scene.add(mesh);

        resize();
        tick();
      },
      undefined,
      (error) => {
        console.error("Failed to load /models/medusa.glb", error);
      },
    );

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    resize();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver.disconnect();

      if (mesh) {
        mesh.geometry.dispose();
      }

      material.dispose();
      renderer.dispose();
      mount.removeChild(effect.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-ascii-view" />;
}
