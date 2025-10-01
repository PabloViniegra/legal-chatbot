import { gsap } from "gsap";
import { DURATIONS, EASINGS } from "./config";
import { animate, prefersReducedMotion } from "./utils";

/**
 * Animate message bubble entry
 * @param element - The message bubble element
 * @param isUser - Whether this is a user message (right side) or assistant (left side)
 */
export const animateMessageEntry = (
  element: HTMLElement,
  isUser: boolean
) => {
  const direction = isUser ? 20 : -20;

  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, x: 0, scale: 1 });
    return gsap.timeline();
  }

  gsap.set(element, {
    opacity: 0,
    x: direction,
    scale: 0.95,
  });

  const timeline = gsap.timeline();

  timeline.to(element, {
    opacity: 1,
    x: 0,
    duration: DURATIONS.medium,
    ease: EASINGS.smooth,
  });

  timeline.to(
    element,
    {
      scale: 1,
      duration: DURATIONS.quick,
      ease: EASINGS.bounce,
    },
    "<0.1"
  );

  return timeline;
};

/**
 * Animate copy button appearance on hover
 */
export const animateCopyButton = (button: HTMLElement) => {
  return animate(button, {
    opacity: 1,
    duration: DURATIONS.quick,
    ease: EASINGS.smooth,
  });
};

/**
 * Animate copy success feedback
 */
export const animateCopySuccess = (icon: HTMLElement) => {
  if (prefersReducedMotion()) {
    return gsap.timeline();
  }

  const timeline = gsap.timeline();

  // Scale up with elastic bounce
  timeline.to(icon, {
    scale: 1.2,
    duration: DURATIONS.instant,
    ease: EASINGS.elastic,
  });

  // Scale back to normal
  timeline.to(icon, {
    scale: 1,
    duration: DURATIONS.quick,
    ease: EASINGS.bounce,
  });

  return timeline;
};