import { gsap } from "gsap";
import { DURATIONS, EASINGS } from "./config";
import { prefersReducedMotion } from "./utils";

/**
 * Animate modal/dialog entrance
 */
export const animateModalOpen = (modal: HTMLElement, overlay?: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(modal, { opacity: 1, scale: 1 });
    if (overlay) gsap.set(overlay, { opacity: 1 });
    return gsap.timeline();
  }

  const timeline = gsap.timeline();

  // Overlay fade in
  if (overlay) {
    gsap.set(overlay, { opacity: 0 });
    timeline.to(overlay, {
      opacity: 1,
      duration: DURATIONS.quick,
    });
  }

  // Modal scale in
  gsap.set(modal, { opacity: 0, scale: 0.95 });
  timeline.to(
    modal,
    {
      opacity: 1,
      scale: 1,
      duration: DURATIONS.medium,
      ease: EASINGS.smooth,
    },
    overlay ? "-=0.1" : 0
  );

  return timeline;
};

/**
 * Animate modal/dialog exit
 */
export const animateModalClose = (modal: HTMLElement, overlay?: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(modal, { opacity: 0, scale: 0.95 });
    if (overlay) gsap.set(overlay, { opacity: 0 });
    return gsap.timeline();
  }

  const timeline = gsap.timeline();

  // Modal scale out
  timeline.to(modal, {
    opacity: 0,
    scale: 0.95,
    duration: DURATIONS.quick,
    ease: EASINGS.smooth,
  });

  // Overlay fade out
  if (overlay) {
    timeline.to(
      overlay,
      {
        opacity: 0,
        duration: DURATIONS.quick,
      },
      "-=0.1"
    );
  }

  return timeline;
};

/**
 * Animate dialog content stagger
 */
export const animateDialogContent = (contentElements: HTMLElement[]) => {
  if (prefersReducedMotion()) {
    gsap.set(contentElements, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  gsap.set(contentElements, { opacity: 0, y: 10 });

  return gsap.to(contentElements, {
    opacity: 1,
    y: 0,
    duration: DURATIONS.quick,
    stagger: 0.05,
    ease: EASINGS.smooth,
  });
};