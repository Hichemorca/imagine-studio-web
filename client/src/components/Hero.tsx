import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer, textReveal, DURATION } from '@/lib/animations';
import { useReducedMotion, useInView } from '@/lib/utils';
import { useLenisContext } from '@/lib/LenisProvider';

interface HeroProps {
  introDone: boolean;
}

export function Hero({ introDone }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { threshold: 0.15 });
  const shouldShowVideo = introDone && !prefersReducedMotion && !videoFailed;
  const { scrollTo } = useLenisContext();

  // Pause video when off-screen to save battery
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView, shouldShowVideo]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative h-[100svh] w-full overflow-hidden bg-[#050505]"
    >
      {/* Background reel */}
      <div className="absolute inset-0">
        {shouldShowVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-70"
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
          >
            <source src="/hero-reel.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(120%_100%_at_50%_0%,#1a1a1a_0%,#050505_65%)]" />
        )}

        {/* Legibility + cinematic depth */}
        <div className="absolute inset-0 bg-[#050505]/45" />
        <div className="absolute inset-0 cinematic-vignette" />
        <div className="grain-overlay" aria-hidden="true" />
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer({ stagger: 0.12 })}
        initial="hidden"
        animate={introDone ? 'visible' : 'hidden'}
        className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-24 md:pb-28"
      >
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp()}
          className="mb-6 md:mb-8"
        >
          <span className="text-xs md:text-sm uppercase tracking-widest text-[#9F9F9F]">
            Creative Production Studio
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="font-display font-medium text-hero leading-[0.98] tracking-tight text-white"
        >
          <span className="block overflow-hidden">
            <motion.span
              variants={textReveal()}
              className="block"
            >
              Every Experience
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={textReveal()}
              className="block"
            >
              Deserves
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={textReveal()}
              className="block text-[#D4AF37]"
            >
              A Story.
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp()}
          className="mt-8 md:mt-10 font-body text-base md:text-lg text-[#9F9F9F] max-w-md"
        >
          <span>Business First.</span>
          <br />
          <span>Story Always.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp()}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={() => scrollTo('#portfolio')}
            className="bg-[#D4AF37] text-[#050505] hover:bg-[#E5C158] font-medium"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            View Our Work
          </Button>
          <Button
            onClick={() => scrollTo('#contact')}
            variant="outline"
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            Book Discovery Call
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {introDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="absolute bottom-8 right-6 md:right-10 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-[#9F9F9F]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="w-[1px] h-6 bg-gradient-to-b from-[#D4AF37] to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
