import { gsap } from "gsap";
import { DURATIONS, EASINGS } from "./config";
import { prefersReducedMotion } from "./utils";

type TweenTarget = gsap.TweenTarget;

/**
 * Animate spinner rotation
 */
export const animateSpinner = (spinner: TweenTarget) => {
  if (prefersReducedMotion()) {
    gsap.set(spinner, { opacity: 1 });
    return gsap.timeline();
  }

  return gsap.to(spinner, {
    rotation: 360,
    duration: 1,
    ease: "linear",
    repeat: -1,
  });
};

/**
 * Animate loader dots sequence
 */
export const animateLoaderDots = (dots: TweenTarget[]) => {
  if (prefersReducedMotion()) {
    gsap.set(dots, { opacity: 1, scale: 1 });
    return gsap.timeline();
  }

  const timeline = gsap.timeline({ repeat: -1 });

  timeline.to(dots, {
    scale: 1.2,
    opacity: 0.5,
    duration: DURATIONS.quick,
    stagger: 0.15,
    ease: EASINGS.smooth,
    yoyo: true,
    repeat: 1,
  });

  return timeline;
};

/**
 * Animate skeleton shimmer effect
 */
export const animateSkeletonShimmer = (skeleton: TweenTarget) => {
  if (prefersReducedMotion()) {
    gsap.set(skeleton, { opacity: 0.2 });
    return gsap.timeline();
  }

  return gsap.to(skeleton, {
    opacity: 0.5,
    duration: DURATIONS.slow,
    ease: EASINGS.smooth,
    repeat: -1,
    yoyo: true,
  });
};

/**
 * Animate pulse effect for loading states
 */
export const animatePulse = (element: TweenTarget) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, scale: 1 });
    return gsap.timeline();
  }

  return gsap.to(element, {
    scale: 1.05,
    opacity: 0.7,
    duration: DURATIONS.medium,
    ease: EASINGS.smooth,
    repeat: -1,
    yoyo: true,
  });
};

/**
 * Animate progress bar fill
 */
export const animateProgressBar = (bar: TweenTarget, progress: number) => {
  if (prefersReducedMotion()) {
    gsap.set(bar, { scaleX: progress });
    return gsap.timeline();
  }

  return gsap.to(bar, {
    scaleX: progress,
    duration: DURATIONS.medium,
    ease: EASINGS.smooth,
  });
};

/**
 * Animate loading entrance
 */
export const animateLoadingEntrance = (container: TweenTarget) => {
  if (prefersReducedMotion()) {
    gsap.set(container, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  gsap.set(container, { opacity: 0, y: 10 });

  return gsap.to(container, {
    opacity: 1,
    y: 0,
    duration: DURATIONS.quick,
    ease: EASINGS.smooth,
  });
};

/**
 * Animate loading exit
 */
export const animateLoadingExit = (container: TweenTarget) => {
  if (prefersReducedMotion()) {
    gsap.set(container, { opacity: 0 });
    return gsap.timeline();
  }

  return gsap.to(container, {
    opacity: 0,
    y: -10,
    duration: DURATIONS.quick,
    ease: EASINGS.smooth,
  });
};