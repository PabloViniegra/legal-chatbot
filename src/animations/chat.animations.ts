import { gsap } from "gsap";
import { DURATIONS, EASINGS, STAGGER } from "./config";
import { prefersReducedMotion } from "./utils";

/**
 * Animate chat header on mount
 */
export const animateChatHeader = (header: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(header, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  gsap.set(header, { opacity: 0, y: -20 });

  return gsap.to(header, {
    opacity: 1,
    y: 0,
    duration: DURATIONS.medium,
    ease: EASINGS.smooth,
  });
};

/**
 * Animate welcome screen elements
 */
export const animateWelcomeScreen = (container: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(container.children, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  const logo = container.querySelector("[data-welcome-logo]");
  const title = container.querySelector("[data-welcome-title]");
  const description = container.querySelector("[data-welcome-description]");
  const suggestions = container.querySelector("[data-welcome-suggestions]");

  const timeline = gsap.timeline();

  // Logo fade in with scale
  if (logo) {
    gsap.set(logo, { opacity: 0, scale: 0.8 });
    timeline.to(logo, {
      opacity: 1,
      scale: 1,
      duration: DURATIONS.slow,
      ease: EASINGS.bounce,
    });
  }

  // Title fade in
  if (title) {
    gsap.set(title, { opacity: 0, y: 20 });
    timeline.to(
      title,
      {
        opacity: 1,
        y: 0,
        duration: DURATIONS.medium,
        ease: EASINGS.smooth,
      },
      "-=0.2"
    );
  }

  // Description fade in
  if (description) {
    gsap.set(description, { opacity: 0, y: 15 });
    timeline.to(
      description,
      {
        opacity: 1,
        y: 0,
        duration: DURATIONS.medium,
        ease: EASINGS.smooth,
      },
      "-=0.1"
    );
  }

  // Suggestions container fade in
  if (suggestions) {
    gsap.set(suggestions, { opacity: 0 });
    timeline.to(
      suggestions,
      {
        opacity: 1,
        duration: DURATIONS.medium,
      },
      "-=0.1"
    );
  }

  return timeline;
};

/**
 * Animate suggestion pills
 */
export const animateSuggestionPills = (pills: HTMLElement[]) => {
  if (prefersReducedMotion()) {
    gsap.set(pills, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  gsap.set(pills, { opacity: 0, y: 15 });

  return gsap.to(pills, {
    opacity: 1,
    y: 0,
    duration: DURATIONS.quick,
    stagger: STAGGER.normal,
    ease: EASINGS.smooth,
  });
};

/**
 * Animate chat input area on mount
 */
export const animateChatInput = (inputContainer: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(inputContainer, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  gsap.set(inputContainer, { opacity: 0, y: 20 });

  return gsap.to(inputContainer, {
    opacity: 1,
    y: 0,
    duration: DURATIONS.medium,
    ease: EASINGS.smooth,
    delay: 0.2,
  });
};

/**
 * Animate send button press
 */
export const animateSendButton = (button: HTMLElement) => {
  if (prefersReducedMotion()) {
    return gsap.timeline();
  }

  const timeline = gsap.timeline();

  timeline.to(button, {
    scale: 0.95,
    duration: 0.1,
  });

  timeline.to(button, {
    scale: 1.05,
    duration: 0.15,
    ease: EASINGS.elastic,
  });

  timeline.to(button, {
    scale: 1,
    duration: DURATIONS.quick,
    ease: EASINGS.bounce,
  });

  return timeline;
};