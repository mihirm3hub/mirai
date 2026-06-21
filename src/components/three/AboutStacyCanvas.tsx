"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// const MODEL_PATH = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb";
const MODEL_PATH = "/models/test.glb";

// These controls are the main tuning surface for how reactive the rig feels.
// Increase dead zones to ignore small cursor changes near center.
// Lower influence values or raise damping values to calm the motion further.
const POINTER_TUNING = {
  neck: {
    degreeLimit: 50,
    horizontalInfluence: 0.42,
    verticalInfluence: 0.28,
    deadZoneX: 3.5,
    deadZoneY: 2.5,
    damping: 0.12,
  },
  waist: {
    degreeLimit: 30,
    horizontalInfluence: 0.2,
    verticalInfluence: 0.12,
    deadZoneX: 2.5,
    deadZoneY: 2,
    damping: 0.1,
  },
} as const;

type AnimationRig = {
  mixer: THREE.AnimationMixer | null;
  idle: THREE.AnimationAction | null;
  possibleAnims: THREE.AnimationAction[];
  neck: THREE.Bone | null;
  waist: THREE.Bone | null;
  neckBaseRotation: THREE.Euler | null;
  waistBaseRotation: THREE.Euler | null;
  currentlyAnimating: boolean;
};

function getMouseDegrees(x: number, y: number, width: number, height: number, degreeLimit: number) {
  let dx = 0;
  let dy = 0;

  if (x <= width / 2) {
    const xdiff = width / 2 - x;
    const xPercentage = (xdiff / (width / 2)) * 100;
    dx = ((degreeLimit * xPercentage) / 100) * -1;
  }

  if (x >= width / 2) {
    const xdiff = x - width / 2;
    const xPercentage = (xdiff / (width / 2)) * 100;
    dx = (degreeLimit * xPercentage) / 100;
  }

  if (y <= height / 2) {
    const ydiff = height / 2 - y;
    const yPercentage = (ydiff / (height / 2)) * 100;
    dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
  }

  if (y >= height / 2) {
    const ydiff = y - height / 2;
    const yPercentage = (ydiff / (height / 2)) * 100;
    dy = (degreeLimit * yPercentage) / 100;
  }

  return { x: dx, y: dy };
}

function moveJoint(
  mouse: { x: number; y: number },
  joint: THREE.Bone,
  baseRotation: THREE.Euler,
  width: number,
  height: number,
  options: {
    degreeLimit: number;
    horizontalInfluence: number;
    verticalInfluence: number;
    deadZoneX: number;
    deadZoneY: number;
    damping: number;
  },
) {
  const degrees = getMouseDegrees(mouse.x, mouse.y, width, height, options.degreeLimit);

  // Dead zones keep the rig from reacting to tiny pointer changes around center.
  const horizontalDegrees = Math.abs(degrees.x) < options.deadZoneX ? 0 : degrees.x;
  const verticalDegrees = Math.abs(degrees.y) < options.deadZoneY ? 0 : degrees.y;

  const targetY = baseRotation.y + THREE.MathUtils.degToRad(horizontalDegrees * options.horizontalInfluence);
  const targetX = baseRotation.x + THREE.MathUtils.degToRad(verticalDegrees * options.verticalInfluence);

  // Damping moves the joint toward the target gradually instead of snapping each frame.
  joint.rotation.y = THREE.MathUtils.lerp(joint.rotation.y, targetY, options.damping);
  joint.rotation.x = THREE.MathUtils.lerp(joint.rotation.x, targetX, options.damping);
  joint.rotation.z = baseRotation.z;
}

export default function AboutStacyCanvas() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;

    if (!stage || !canvas) {
      return;
    }

    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();
    const raycaster = new THREE.Raycaster();
    const mouseNdc = new THREE.Vector2();
    const pointer = { x: stage.clientWidth / 2, y: stage.clientHeight / 2 };
    const rig: AnimationRig = {
      mixer: null,
      idle: null,
      possibleAnims: [],
      neck: null,
      waist: null,
      neckBaseRotation: null,
      waistBaseRotation: null,
      currentlyAnimating: false,
    };

    const scene = new THREE.Scene();
    scene.background = null;
    // scene.fog = new THREE.Fog(0xf1f1f1, 60, 100);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, -3, 30);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4df, 2.2);
    keyLight.position.set(4, 6, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd8e7ff, 1.2);
    fillLight.position.set(-5, 2, 7);
    scene.add(fillLight);

    // const floor = new THREE.Mesh(
    //   new THREE.PlaneGeometry(5000, 5000, 1, 1),
    //   new THREE.MeshPhongMaterial({ color: 0xeeeeee, shininess: 0 }),
    // );
    // floor.rotation.x = -0.5 * Math.PI;
    // floor.receiveShadow = true;
    // floor.position.y = -11;
    // scene.add(floor);

    // const sphere = new THREE.Mesh(
    //   new THREE.SphereGeometry(8, 32, 32),
    //   new THREE.MeshBasicMaterial({ color: 0x9bffaf }),
    // );
    // sphere.position.set(-0.25, -2.5, -15);
    // scene.add(sphere);

    let model: THREE.Group | null = null;

    const loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        if (disposed) {
          return;
        }

        model = gltf.scene;
        const fileAnimations = gltf.animations;

        model.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.SkinnedMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }

          if (object instanceof THREE.Bone && object.name === "mixamorigNeck") {
            rig.neck = object;
            rig.neckBaseRotation = object.rotation.clone();
          }

          if (object instanceof THREE.Bone && object.name === "mixamorigSpine") {
            rig.waist = object;
            rig.waistBaseRotation = object.rotation.clone();
          }
        });

        model.scale.set(17, 17, 17);
        model.position.y = -11;
        scene.add(model);

        rig.mixer = new THREE.AnimationMixer(model);

        const clips = fileAnimations.filter((clip) => clip.name !== "idle");
        rig.possibleAnims = clips.map((clip) => {
          const nextClip = clip.clone();
          nextClip.tracks.splice(3, 3);
          nextClip.tracks.splice(9, 3);
          return rig.mixer!.clipAction(nextClip);
        });

        const idleClip = THREE.AnimationClip.findByName(fileAnimations, "idle")?.clone();
        if (idleClip) {
          idleClip.tracks.splice(3, 3);
          idleClip.tracks.splice(9, 3);
          rig.idle = rig.mixer.clipAction(idleClip);
          rig.idle.play();
        }
      },
      undefined,
      (error) => {
        console.error(error);
      },
    );

    const resizeRenderer = () => {
      const width = Math.max(stage.clientWidth, 1);
      const height = Math.max(stage.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const playModifierAnimation = (
      from: THREE.AnimationAction,
      fromSpeed: number,
      to: THREE.AnimationAction,
      toSpeed: number,
    ) => {
      to.setLoop(THREE.LoopOnce, 1);
      to.reset();
      to.play();
      from.crossFadeTo(to, fromSpeed, true);

      window.setTimeout(() => {
        from.enabled = true;
        to.crossFadeTo(from, toSpeed, true);
        rig.currentlyAnimating = false;
      }, to.getClip().duration * 1000 - (toSpeed + fromSpeed) * 1000);
    };

    const playOnClick = () => {
      if (!rig.idle || rig.possibleAnims.length === 0) {
        rig.currentlyAnimating = false;
        return;
      }

      const animIndex = Math.floor(Math.random() * rig.possibleAnims.length);
      playModifierAnimation(rig.idle, 0.25, rig.possibleAnims[animIndex], 0.25);
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = THREE.MathUtils.clamp(clientX - rect.left, 0, rect.width);
      pointer.y = THREE.MathUtils.clamp(clientY - rect.top, 0, rect.height);
      mouseNdc.x = (pointer.x / rect.width) * 2 - 1;
      mouseNdc.y = -(pointer.y / rect.height) * 2 + 1;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      const width = Math.max(stage.clientWidth, 1);
      const height = Math.max(stage.clientHeight, 1);
      pointer.x = width / 2;
      pointer.y = height / 2;
      mouseNdc.x = 0;
      mouseNdc.y = 0;
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!model || rig.currentlyAnimating) {
        return;
      }

      updatePointer(event.clientX, event.clientY);
      raycaster.setFromCamera(mouseNdc, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);
      const hit = intersects[0]?.object;

      if (hit?.name === "stacy") {
        rig.currentlyAnimating = true;
        playOnClick();
      }
    };

    const render = () => {
      if (disposed) {
        return;
      }

      rig.mixer?.update(clock.getDelta());

      if (rig.neck && rig.neckBaseRotation) {
        moveJoint(
          pointer,
          rig.neck,
          rig.neckBaseRotation,
          stage.clientWidth,
          stage.clientHeight,
          POINTER_TUNING.neck,
        );
      }

      if (rig.waist && rig.waistBaseRotation) {
        moveJoint(
          pointer,
          rig.waist,
          rig.waistBaseRotation,
          stage.clientWidth,
          stage.clientHeight,
          POINTER_TUNING.waist,
        );
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resizeRenderer();
    handlePointerLeave();
    render();

    window.addEventListener("resize", resizeRenderer);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("pointerup", handlePointerUp);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeRenderer);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointerup", handlePointerUp);

      rig.mixer?.stopAllAction();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();

          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={stageRef} className="about-model-stage">
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
