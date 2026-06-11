"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveTravelCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  actionText?: string;
  href: string;
  onActionClick?: () => void;
  className?: string;
  indexLabel?: string;
  description?: string;
  stack?: string[];
}

export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    {
      title,
      subtitle,
      imageUrl,
      href,
      onActionClick,
      className,
      indexLabel,
      description,
      stack,
    },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cardRef = React.useRef<HTMLDivElement | null>(null);
    const frameRef = React.useRef<number | null>(null);
    const boundsRef = React.useRef<DOMRect | null>(null);

    const springConfig = { damping: 18, stiffness: 260, mass: 0.65 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const updateBounds = React.useCallback(() => {
      if (cardRef.current) {
        boundsRef.current = cardRef.current.getBoundingClientRect();
      }
    }, []);

    React.useEffect(() => {
      updateBounds();

      const handleResize = () => updateBounds();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    }, [updateBounds]);

    const handleMouseEnter = () => {
      updateBounds();
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = boundsRef.current;
      if (!rect) {
        return;
      }

      const nextX = (e.clientX - rect.left) / rect.width - 0.5;
      const nextY = (e.clientY - rect.top) / rect.height - 0.5;

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        mouseX.set(nextX);
        mouseY.set(nextY);
        frameRef.current = null;
      });
    };

    const handleMouseLeave = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.01 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformPerspective: 1400,
          willChange: "transform",
        }}
        className={cn(
          "relative h-full min-h-[21.5rem] w-full transform-gpu rounded-[15px] bg-[#1f1f1d] shadow-[0_20px_45px_rgba(0,0,0,0.38)]",
          className
        )}
      >
        <div
          style={{
            transform: "translateZ(70px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-[10px] overflow-hidden rounded-[15px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.018))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_30px_rgba(0,0,0,0.28)]"
        >
          {/* <img
            src={imageUrl}
            alt={`${title}, ${subtitle}`}
            className="absolute inset-0 h-full w-full rounded-[15px] object-cover"
          /> */}
          {/* <div className="absolute inset-0 h-full w-full rounded-[15px] bg-gradient-to-b from-black/20 via-transparent to-black/75" /> */}
          <div className="absolute inset-0 h-full w-full rounded-[15px] bg-gradient-to-b from-white/8 via-transparent to-black/55" />
          <div
            style={{ transform: "translateZ(20px)" }}
            className="absolute inset-x-[12%] top-0 h-20 rounded-full bg-white/10 blur-2xl"
          />

          <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] p-[10px] text-white">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0 max-w-[78%] space-y-2">
                {indexLabel ? (
                  <motion.span
                    style={{ transform: "translateZ(78px)" }}
                    className="featured-project-index text-[0.68rem] text-white/70"
                  >
                    {indexLabel}
                  </motion.span>
                ) : null}
                <div>
                  <motion.h2
                    style={{ transform: "translateZ(92px)" }}
                    className="line-clamp-2 text-[clamp(1.6rem,2vw,2.35rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
                  >
                    {title}
                  </motion.h2>
                  <motion.p
                    style={{ transform: "translateZ(64px)" }}
                    className="mt-2 text-[0.7rem] font-light uppercase tracking-[0.18em] text-white/78"
                  >
                    {subtitle}
                  </motion.p>
                </div>
              </div>

              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: "2.5deg" }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Learn more about ${title}`}
                style={{ transform: "translateZ(104px)" }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12 backdrop-blur-sm ring-1 ring-inset ring-white/28 transition-colors hover:bg-white/20"
              >
                <ArrowUpRight className="h-5 w-5 text-white" />
              </motion.a>
            </div>

            <div className="mt-auto flex min-h-0 flex-col gap-4 overflow-hidden pt-8">
              {description ? (
                <motion.p
                  style={{ transform: "translateZ(58px)" }}
                  className="line-clamp-4 max-w-[19ch] text-[0.92rem] leading-8 text-white/78"
                >
                  {description}
                </motion.p>
              ) : null}

              {stack?.length ? (
                <motion.div
                  style={{ transform: "translateZ(46px)" }}
                  className="grid grid-cols-2 gap-[10px]"
                >
                  {stack.map((item) => (
                    <span
                      key={item}
                      className="flex h-[2.2rem] items-center justify-center border border-white/18 bg-white/8 px-3 py-2 text-center text-[0.72rem] font-medium uppercase tracking-[0.14em] text-white/82 backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

InteractiveTravelCard.displayName = "InteractiveTravelCard";
