"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left bg-mirai transition-transform duration-300"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
