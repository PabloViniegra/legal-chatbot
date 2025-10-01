import { gsap } from "gsap";
import { DURATIONS, EASINGS } from "./config";
import { prefersReducedMotion } from "./utils";

/**
 * Animate navbar/header on page mount
 */
export const animateNavbar = (header: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(header, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  gsap.set(header, { opacity: 0, y: -100 });

  const timeline = gsap.timeline();

  timeline.to(header, {
    opacity: 1,
    y: 0,
    duration: DURATIONS.medium,
    ease: EASINGS.smooth,
  });

  return timeline;
};

/**
 * Animate logo icon on mount
 */
export const animateLogo = (logo: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(logo, { opacity: 1, scale: 1, rotation: 0 });
    return gsap.timeline();
  }

  gsap.set(logo, { opacity: 0, scale: 0.9, rotation: -10 });

  const timeline = gsap.timeline();

  timeline.to(logo, {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: DURATIONS.slow,
    ease: EASINGS.bounce,
  });

  return timeline;
};

/**
 * Animate title text
 */
export const animateTitle = (title: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(title, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  gsap.set(title, { opacity: 0, y: 10 });

  return gsap.to(title, {
    opacity: 1,
    y: 0,
    duration: DURATIONS.medium,
    ease: EASINGS.smooth,
  });
};

/**
 * Animate theme switcher icon rotation
 */
export const animateThemeSwitcher = (icon: HTMLElement) => {
  if (prefersReducedMotion()) {
    return gsap.timeline();
  }

  return gsap.to(icon, {
    rotation: 180,
    duration: DURATIONS.medium,
    ease: EASINGS.smooth,
  });
};