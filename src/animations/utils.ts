import { gsap } from "gsap";
import { DURATIONS, EASINGS } from "./config";

type TweenTarget = gsap.TweenTarget;
type TweenVars = gsap.TweenVars;

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Conditional animation - respects reduced motion preference
 */
export const animate = (
  target: TweenTarget,
  vars: TweenVars,
  reducedMotionVars?: TweenVars
) => {
  if (prefersReducedMotion() && reducedMotionVars) {
    return gsap.to(target, { ...reducedMotionVars, duration: 0.01 });
  }
  return gsap.to(target, vars);
};

/**
 * Create stagger animation timeline
 */
export const staggerAnimation = (
  targets: TweenTarget,
  vars: TweenVars,
  staggerAmount: number = 0.1
) => {
  return gsap.to(targets, {
    ...vars,
    stagger: staggerAmount,
  });
};

/**
 * Fade in animation
 */
export const fadeIn = (
  target: TweenTarget,
  duration: number = DURATIONS.medium,
  delay: number = 0
) => {
  return animate(
    target,
    { opacity: 1, duration, delay, ease: EASINGS.smooth },
    { opacity: 1, duration: 0.01 }
  );
};

/**
 * Slide and fade animation
 */
export const slideAndFade = (
  target: TweenTarget,
  direction: "up" | "down" | "left" | "right",
  distance: number = 20,
  duration: number = DURATIONS.medium,
  delay: number = 0
) => {
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const value = direction === "up" || direction === "left" ? -distance : distance;

  return animate(
    target,
    {
      [axis]: 0,
      opacity: 1,
      duration,
      delay,
      ease: EASINGS.smooth,
    },
    { opacity: 1, [axis]: 0, duration: 0.01 }
  );
};

/**
 * Scale animation
 */
export const scaleIn = (
  target: TweenTarget,
  from: number = 0.95,
  duration: number = DURATIONS.medium,
  ease: string = EASINGS.bounce
) => {
  return animate(
    target,
    { scale: 1, opacity: 1, duration, ease },
    { scale: 1, opacity: 1, duration: 0.01 }
  );
};