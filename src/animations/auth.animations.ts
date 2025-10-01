import { gsap } from "gsap";
import { DURATIONS, EASINGS } from "./config";
import { prefersReducedMotion } from "./utils";

/**
 * Animate auth page entrance sequence
 */
export const animateAuthPage = (container: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(container.children, { opacity: 1, y: 0, scale: 1 });
    return gsap.timeline();
  }

  const logo = container.querySelector("[data-auth-logo]");
  const title = container.querySelector("[data-auth-title]");
  const subtitle = container.querySelector("[data-auth-subtitle]");
  const form = container.querySelector("[data-auth-form]");

  const timeline = gsap.timeline();

  // Logo entrance
  if (logo) {
    gsap.set(logo, { opacity: 0, scale: 0.8 });
    timeline.to(logo, {
      opacity: 1,
      scale: 1,
      duration: DURATIONS.slow,
      ease: EASINGS.bounce,
    });
  }

  // Title entrance
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

  // Subtitle entrance
  if (subtitle) {
    gsap.set(subtitle, { opacity: 0 });
    timeline.to(
      subtitle,
      {
        opacity: 1,
        duration: DURATIONS.medium,
      },
      "-=0.1"
    );
  }

  // Form entrance
  if (form) {
    gsap.set(form, { opacity: 0, y: 30 });
    timeline.to(
      form,
      {
        opacity: 1,
        y: 0,
        duration: DURATIONS.medium,
        ease: EASINGS.smooth,
      },
      "-=0.1"
    );
  }

  return timeline;
};