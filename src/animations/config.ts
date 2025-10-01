/**
 * Animation configuration constants
 * Defines standard durations, easings, and stagger values for consistent animations
 */

export const DURATIONS = {
  instant: 0.15,
  quick: 0.25,
  medium: 0.35,
  slow: 0.5,
  xslow: 0.75,
} as const;

export const EASINGS = {
  smooth: "power2.out",
  snappy: "power2.inOut",
  bounce: "back.out(1.4)",
  elastic: "elastic.out(1, 0.5)",
  expo: "expo.out",
  circ: "circ.inOut",
} as const;

export const STAGGER = {
  tight: 0.05,
  normal: 0.1,
  relaxed: 0.15,
} as const;

export const DISTANCES = {
  small: 10,
  medium: 20,
  large: 30,
} as const;

export type Duration = typeof DURATIONS[keyof typeof DURATIONS];
export type Easing = typeof EASINGS[keyof typeof EASINGS];
export type StaggerValue = typeof STAGGER[keyof typeof STAGGER];
export type Distance = typeof DISTANCES[keyof typeof DISTANCES];