"use client";

import { useEffect, useRef } from "react";

const ARROW_COUNT = 4;
const ANGLE_THRESHOLD = 6;
const EASING = 0.16;

function normalizeAngle(angle: number) {
  let normalized = angle;

  while (normalized > 180) {
    normalized -= 360;
  }

  while (normalized < -180) {
    normalized += 360;
  }

  return normalized;
}

export default function HeroPointerArrows() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) {
      return;
    }

    let animationFrame = 0;
    const currentAngles = Array.from({ length: ARROW_COUNT }, () => 0);
    const targetAngles = Array.from({ length: ARROW_COUNT }, () => 0);

    const setTargetAngles = (clientX: number, clientY: number) => {
      for (const arrow of arrowRefs.current) {
        if (!arrow) {
          continue;
        }

        const index = Number(arrow.dataset.arrowIndex ?? 0);
        const rect = arrow.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height * 0.2;
        const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
        const nextAngle = angle + 90;
        const delta = normalizeAngle(nextAngle - targetAngles[index]);

        if (Math.abs(delta) < ANGLE_THRESHOLD) {
          continue;
        }

        targetAngles[index] = nextAngle;
      }
    };

    const animate = () => {
      let needsNextFrame = false;

      for (const arrow of arrowRefs.current) {
        if (!arrow) {
          continue;
        }

        const index = Number(arrow.dataset.arrowIndex ?? 0);
        const delta = normalizeAngle(targetAngles[index] - currentAngles[index]);

        if (Math.abs(delta) < 0.2) {
          currentAngles[index] = targetAngles[index];
        } else {
          currentAngles[index] += delta * EASING;
          needsNextFrame = true;
        }

        arrow.style.setProperty("--arrow-rotation", `${currentAngles[index]}deg`);
      }

      if (needsNextFrame) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        animationFrame = 0;
      }
    };

    const startAnimation = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      setTargetAngles(event.clientX, event.clientY);
      startAnimation();
    };

    const handlePointerLeave = () => {
      targetAngles.fill(0);
      startAnimation();
    };

    const zoneRect = zone.getBoundingClientRect();
    setTargetAngles(zoneRect.left + zoneRect.width / 2, zoneRect.top);
    startAnimation();

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handlePointerLeave);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={zoneRef} className="hero-pointer-arrows" aria-hidden>
      {Array.from({ length: ARROW_COUNT }, (_, index) => (
        <div
          key={index}
          ref={(node) => {
            arrowRefs.current[index] = node;
          }}
          data-arrow-index={index}
          className="hero-pointer-arrow"
        >
          <span className="hero-pointer-arrow-arm hero-pointer-arrow-arm-left" />
          <span className="hero-pointer-arrow-stem" />
          <span className="hero-pointer-arrow-arm hero-pointer-arrow-arm-right" />
        </div>
      ))}
    </div>
  );
}
