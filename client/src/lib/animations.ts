/**
 * Shared motion constants for IMAGINE Studio.
 * Both Framer Motion and GSAP read from here for consistent cinematic feel.
 */

export const EASE = {
  cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)' as any, // Custom cubic-bezier for premium feel
  gsapOut: 'power4.out',
  gsapInOut: 'power2.inOut',
  gsapIn: 'power3.in',
};

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.1,
};

export const STAGGER = {
  tight: 0.06,
  base: 0.12,
};

/**
 * Reusable Framer Motion variants for IMAGINE Studio
 */

export const fadeIn = ({ duration = DURATION.base, delay = 0 } = {}) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] as any },
  },
});

export const fadeUp = ({
  duration = DURATION.base,
  delay = 0,
  distance = 24,
} = {}) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] as any },
  },
});

export const staggerContainer = ({
  stagger = STAGGER.base,
  delayChildren = 0,
} = {}) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const textReveal = ({
  duration = DURATION.slow,
  delay = 0,
} = {}) => ({
  hidden: { y: '115%' },
  visible: {
    y: '0%',
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] as any },
  },
});

export const pageTransition = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: [0.16, 1, 0.3, 1] as any },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: DURATION.fast, ease: [0.16, 1, 0.3, 1] as any },
  },
};
