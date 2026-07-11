import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ApertureMark } from './ApertureMark';
import { EASE } from '@/lib/animations';
import { useReducedMotion } from '@/lib/utils';

interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bladesRef = useRef<(SVGPathElement | null)[]>([]);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [isDone, setIsDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Guard: ensure all required elements exist
    if (!containerRef.current || !wordmarkRef.current || !taglineRef.current) {
      return;
    }

    const finish = () => {
      setIsDone(true);
      onComplete?.();
    };

    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap
          .timeline({ onComplete: finish })
          .to(wordmarkRef.current, { opacity: 1, duration: 0.4 })
          .to(containerRef.current, { opacity: 0, duration: 0.4, delay: 0.6 });
        return;
      }

      // Snapshot blade targets and filter nulls
      const blades = bladesRef.current.slice().filter((el): el is SVGPathElement => !!el);

      // Guard: if no blades, skip animation
      if (blades.length === 0) {
        finish();
        return;
      }

      // Measure each blade for stroke drawing animation
      const lengths = blades.map((el) => el?.getTotalLength?.() ?? 0);
      blades.forEach((el, i) => {
        if (!el) return;
        el.style.strokeDasharray = `${lengths[i]}`;
        el.style.strokeDashoffset = `${lengths[i]}`;
      });
      gsap.set(blades, { opacity: 1 });

      gsap
        .timeline({ delay: 0.2, onComplete: finish })
        .to(blades, {
          strokeDashoffset: 0,
          duration: 1,
          ease: EASE.gsapInOut,
          stagger: 0.06,
        }, 0)
        .to(wordmarkRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.9)
        .to(taglineRef.current, { opacity: 1, duration: 0.6 }, 1.2)
        // The iris opens — blades rotate outward and scale past the frame
        .to(blades, {
          rotate: (i: number) => (i % 2 === 0 ? 65 : -65),
          scale: 2.4,
          opacity: 0,
          duration: 0.9,
          ease: EASE.gsapIn,
          stagger: 0.03,
          transformOrigin: '0px 0px',
        }, 2.1)
        .to([wordmarkRef.current, taglineRef.current], {
          opacity: 0,
          y: -12,
          duration: 0.5,
        }, 2.2)
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power1.out',
        }, 2.6);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      role="presentation"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
    >
      <ApertureMark
        size={120}
        radius={34}
        color="#D4AF37"
        strokeWidth={1.25}
        bladeRefs={bladesRef}
        className="mb-8"
      />

      <h1
        ref={wordmarkRef}
        className="font-display text-2xl md:text-3xl tracking-widest uppercase opacity-0 translate-y-3 text-white"
      >
        Imagine
      </h1>
      <p
        ref={taglineRef}
        className="mt-3 font-body text-xs uppercase tracking-widest text-[#9F9F9F] opacity-0"
      >
        Business First. Story Always.
      </p>
    </div>
  );
}
