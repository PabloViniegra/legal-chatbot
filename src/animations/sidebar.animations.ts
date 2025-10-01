import { gsap } from "gsap";
import { DURATIONS, EASINGS, STAGGER } from "./config";
import { staggerAnimation, prefersReducedMotion } from "./utils";

/**
 * Animate sidebar toggle (open/close)
 */
export const animateSidebarToggle = (
  sidebar: HTMLElement,
  isOpen: boolean,
  isMobile: boolean
) => {
  const duration = prefersReducedMotion() ? 0.01 : DURATIONS.medium;

  if (isMobile) {
    return gsap.to(sidebar, {
      x: isOpen ? 0 : "-100%",
      duration,
      ease: EASINGS.circ,
    });
  } else {
    return gsap.to(sidebar, {
      width: isOpen ? "320px" : "0px",
      duration,
      ease: EASINGS.circ,
    });
  }
};

/**
 * Animate conversation list items on initial load
 */
export const animateConversationList = (items: HTMLElement[]) => {
  if (prefersReducedMotion()) {
    gsap.set(items, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  gsap.set(items, { opacity: 0, y: 15 });

  return staggerAnimation(
    items,
    {
      opacity: 1,
      y: 0,
      duration: DURATIONS.quick,
      ease: EASINGS.smooth,
    },
    STAGGER.tight
  );
};

/**
 * Animate new conversation being added
 */
export const animateNewConversation = (item: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(item, { height: "auto", opacity: 1 });
    return gsap.timeline();
  }

  gsap.set(item, { height: 0, opacity: 0 });

  const timeline = gsap.timeline();

  timeline.to(item, {
    height: "auto",
    duration: DURATIONS.medium,
    ease: EASINGS.smooth,
  });

  timeline.to(
    item,
    {
      opacity: 1,
      duration: DURATIONS.quick,
    },
    "<0.1"
  );

  // Highlight flash
  timeline.to(item, {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    duration: DURATIONS.instant,
  });

  timeline.to(item, {
    backgroundColor: "transparent",
    duration: DURATIONS.slow,
  });

  return timeline;
};

/**
 * Animate conversation deletion
 */
export const animateDeleteConversation = (item: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(item, { opacity: 0, height: 0 });
    return gsap.timeline();
  }

  const timeline = gsap.timeline();

  timeline.to(item, {
    opacity: 0,
    scale: 0.8,
    duration: DURATIONS.quick,
    ease: EASINGS.smooth,
  });

  timeline.to(
    item,
    {
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: DURATIONS.medium,
      ease: EASINGS.smooth,
    },
    "<0.1"
  );

  return timeline;
};

/**
 * Animate conversation item hover (delete button appear)
 */
export const animateDeleteButtonAppear = (button: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(button, { opacity: 1 });
    return gsap.timeline();
  }

  return gsap.to(button, {
    opacity: 1,
    duration: DURATIONS.quick,
    ease: EASINGS.smooth,
  });
};

/**
 * Animate conversation item hover leave (delete button disappear)
 */
export const animateDeleteButtonDisappear = (button: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(button, { opacity: 0 });
    return gsap.timeline();
  }

  return gsap.to(button, {
    opacity: 0,
    duration: DURATIONS.quick,
    ease: EASINGS.smooth,
  });
};