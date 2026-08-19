import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer, textReveal } from '@/lib/animations';
import { useReducedMotion, useInView } from '@/lib/utils';
import { useLenisContext } from '@/lib/LenisProvider';

interface HeroProps {
  introDone: boolean;
}

const HERO_IMAGE = '/manus-storage/hero-cinematic_a943511b.jpg';
const HERO_VIDEO = '/manus-storage/hero-reel_5f187be8.mp4';

export function Hero({ introDone }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { threshold: 0.15 });
  const shouldShowVideo = introDone && !prefersReducedMotion && !videoFailed;
  const { scrollTo } = useLenisContext();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && shouldShowVideo) video.play().catch(() => setVideoFailed(true));
    else video.pause();
  }, [inView, shouldShowVideo]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative h-[100svh] w-full overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0">
        {shouldShowVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-75"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            onError={() => setVideoFailed(true)}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/35 to-[#050505]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/35" />
        <div className="absolute inset-0 cinematic-vignette" />
        <div className="grain-overlay" aria-hidden="true" />
      </div>

      <div className="absolute inset-0 z-[1] opacity-50" aria-hidden="true">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={introDone ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-6 right-6 top-1/2 h-px origin-left bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent md:left-10 md:right-10"
        />
        <motion.div
          initial={{ y: '-10%', opacity: 0 }}
          animate={introDone ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[12%] top-[18%] h-[38vw] w-[38vw] max-h-[540px] max-w-[540px] rounded-full border border-[#D4AF37]/25"
        />
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={introDone ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[19%] top-[28%] h-[24vw] w-[24vw] max-h-[350px] max-w-[350px] rounded-full border border-[#D4AF37]/15"
        />
      </div>

      <motion.div
        variants={staggerContainer({ stagger: 0.12 })}
        initial="hidden"
        animate={introDone ? 'visible' : 'hidden'}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-24 md:px-10 md:pb-28"
      >
        <motion.div variants={fadeUp()} className="mb-6 flex items-center gap-3 md:mb-8">
          <span className="h-px w-9 bg-[#D4AF37]" />
          <span className="font-body text-xs uppercase tracking-[0.28em] text-white/65 md:text-sm">Creative Production Studio</span>
        </motion.div>

        <div className="relative max-w-5xl border-l border-[#D4AF37]/55 pl-5 md:pl-8">
          <span className="absolute -left-px top-0 h-14 w-px bg-[#D4AF37]" aria-hidden="true" />
          <h1 id="hero-heading" className="font-display text-hero font-medium leading-[0.9] tracking-[-0.055em] text-white">
          <span className="block overflow-hidden"><motion.span variants={textReveal()} className="block">Every Experience</motion.span></span>
          <span className="block overflow-hidden"><motion.span variants={textReveal()} className="block">Deserves</motion.span></span>
          <span className="block overflow-hidden"><motion.span variants={textReveal()} className="block text-[#D4AF37]">A Story.</motion.span></span>
          </h1>
          <span className="mt-5 block font-body text-[9px] uppercase tracking-[0.24em] text-white/35">Aperture study / 001 — 00:08</span>
        </div>

        <div className="mt-8 flex max-w-2xl flex-col gap-7 md:mt-10 md:flex-row md:items-end md:gap-14">
          <motion.p variants={fadeUp()} className="font-body text-base leading-7 text-white/60 md:text-lg">
            <span className="text-white">Business First.</span><br />Story Always.
          </motion.p>
          <motion.p variants={fadeUp()} className="max-w-xs font-body text-xs leading-6 text-white/45 md:text-sm">
            We make brand worlds, films, and experiences built to move people — and the business behind them.
          </motion.p>
        </div>

        <motion.div variants={fadeUp()} className="mt-10 flex flex-col gap-4 sm:flex-row md:mt-12">
          <Button onClick={() => scrollTo('#portfolio')} className="border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] shadow-[0_0_32px_rgba(212,175,55,0.08)] hover:bg-[#D4AF37] hover:text-[#050505]">
            <ArrowRight className="mr-2 h-4 w-4" /> View Our Work
          </Button>
          <Button onClick={() => scrollTo('#contact')} variant="outline" className="border-white/35 bg-black/10 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]">
            Start a conversation
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-6 z-10 hidden items-center gap-3 md:flex md:left-10">
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25"
        >
          <Play className="ml-0.5 h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
        </motion.span>
        <span className="font-body text-[10px] uppercase tracking-[0.22em] text-white/50">A moving picture for moving brands</span>
      </div>

      {introDone && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 0.8 }} className="absolute bottom-8 right-6 z-10 flex flex-col items-center gap-2 md:right-10">
          <span className="font-body text-[10px] uppercase tracking-[0.24em] text-white/55">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity }} className="h-10 w-px bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </motion.div>
      )}
    </section>
  );
}

void Play;
