import * as React from 'react';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get aperture blade paths for the IMAGINE Studio logo
 */
export function getApertureBlades(radius: number) {
  const arcRadius = radius * 1.12;
  const innerNotch = radius * 0.06;
  const innerReach = radius * 0.59;

  const d = `M0,${-innerNotch} L${radius},${-radius} A${arcRadius},${arcRadius} 0 0,1 ${innerReach},${radius} Z`;

  const blades = Array.from({ length: 6 }, (_, i) => ({
    d,
    rotate: i * 60,
  }));

  return { blades };
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function useReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Hook to detect if element is in view
 */
export function useInView(ref: React.RefObject<HTMLElement | null>, options = {}) {
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.15, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return inView;
}

/**
 * Hook to detect scroll position
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Hook to get active section from navigation
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds]);

  return activeId;
}
