import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';

interface LenisContextType {
  scrollTo: (target: string | number, options?: any) => void;
}

const LenisContext = createContext<LenisContextType | null>(null);

export function LenisProvider({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const lenisRef = useRef<any>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Dynamically import Lenis to avoid SSR issues
    const loadLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        } as any);

        lenisRef.current = lenis;

        let lastTime = Date.now();
        const onAnimationFrame = (time: number) => {
          if (lenisRef.current) {
            lenisRef.current.raf(time - lastTime);
          }
          lastTime = time;
          animationFrameIdRef.current = requestAnimationFrame(onAnimationFrame);
        };

        animationFrameIdRef.current = requestAnimationFrame(onAnimationFrame);
      } catch (err) {
        console.error('Failed to load Lenis:', err);
      }
    };

    loadLenis();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [enabled]);

  const scrollTo = (target: string | number, options?: any) => {
    if (!lenisRef.current) return;

    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        lenisRef.current.scrollTo(element, { ...options, duration: 1.2 });
      }
    } else {
      lenisRef.current.scrollTo(target, { ...options, duration: 1.2 });
    }
  };

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenisContext() {
  const context = useContext(LenisContext);
  if (!context) {
    return { scrollTo: () => {} };
  }
  return context;
}
