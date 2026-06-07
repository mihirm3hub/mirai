import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export const registerGsap = () => {
  if (typeof window === "undefined" || registered) {
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
};

export const motionAllowed = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const safeDuration = (value: number) => (motionAllowed() ? value : 0.01);
