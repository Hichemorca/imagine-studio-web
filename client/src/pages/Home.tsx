import { useEffect, useState, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Play,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { Loader } from '@/components/Loader';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { LenisProvider, useLenisContext } from '@/lib/LenisProvider';
import { cn } from '@/lib/utils';
import { ApertureMark } from '@/components/ApertureMark';

const STORAGE = '/manus-storage/';
const PROJECT_VIDEO = `${STORAGE}hero-reel_5f187be8.mp4`;

const projects = [
  {
    number: '01',
    title: 'Time, Reframed',
    category: 'Brand Film · Luxury',
    year: '2025',
    image: `${STORAGE}portfolio-1_b319db7e.jpg`,
    video: PROJECT_VIDEO,
    color: '#D4AF37',
  },
  {
    number: '02',
    title: 'Golden Hour',
    category: 'Campaign · Fashion',
    year: '2024',
    image: `${STORAGE}portfolio-2_29db68a7.jpg`,
    video: PROJECT_VIDEO,
    color: '#F2C879',
  },
  {
    number: '03',
    title: 'Beyond the Frame',
    category: 'Experience · Digital',
    year: '2024',
    image: `${STORAGE}portfolio-3_c33e19e7.jpg`,
    video: PROJECT_VIDEO,
    color: '#9C8B5B',
  },
];

const processSteps = [
  ['01', 'Listen', 'We start with the real business problem, not the deliverable.'],
  ['02', 'Shape', 'We find the sharpest human truth inside the brief.'],
  ['03', 'Make', 'We craft the film, world, and details that make it felt.'],
  ['04', 'Move', 'We release work designed to travel, perform, and stay.'],
];

function AudioDirector() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-30 md:bottom-8 md:left-8">
      <audio
        ref={audioRef}
        src={`${STORAGE}studio-ambient_37db43f1.mp3`}
        loop
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        className="group flex items-center gap-3 border border-white/15 bg-black/55 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
        aria-label={playing ? 'Pause ambient soundtrack' : 'Play ambient soundtrack'}
      >
        {playing ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        <span>{playing ? 'Sound on' : 'Sound off'}</span>
        <span className={cn('h-1.5 w-1.5 rounded-full bg-[#D4AF37]', playing && 'animate-pulse')} />
      </button>
    </div>
  );
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return (
    <div className="grid gap-6 border-t border-white/10 pt-6 md:grid-cols-[0.8fr_1.5fr_1fr] md:gap-10">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 items-center justify-center border border-[#D4AF37]/45">
          <ApertureMark size={18} radius={4.6} color="#D4AF37" strokeWidth={0.8} />
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.28em] text-[#D4AF37]">{eyebrow}</span>
      </div>
      <h2 className="max-w-3xl font-display text-4xl leading-[0.95] tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">{title}</h2>
      <p className="max-w-sm self-end font-body text-sm leading-7 text-white/55">{copy}</p>
    </div>
  );
}

function HomeContent() {
  const [introDone, setIntroDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [lightboxVideoFailed, setLightboxVideoFailed] = useState(false);
  const { scrollTo } = useLenisContext();

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    const previousOverflow = document.body.style.overflow;
    setLightboxVideoFailed(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Loader onComplete={() => setIntroDone(true)} />
      <Navbar visible={introDone} />
      <AudioDirector />

      <main id="top">
        <Hero introDone={introDone} />

        {/* Selected Work */}
        <section id="portfolio" className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader
              eyebrow="Selected Work / 01"
              title={<>Stories that make people feel.</>}
              copy="A few frames from a much larger reel. We build cultural memory for brands with something to say."
            />

            <div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
                  className={cn(
                    'group relative cursor-pointer overflow-hidden bg-white/5 border border-white/10',
                    i === 0 && 'md:col-span-2 lg:col-span-2'
                  )}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-black/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between">
                    <div>
                      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                        {project.category}
                      </span>
                      <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
                        {project.title}
                      </h3>
                    </div>
                    <span className="font-body text-xs text-white/50">{project.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setSelectedProject(projects[0])}
                className="group flex items-center gap-3 border border-white/20 bg-transparent px-8 py-4 font-body text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Open the full reel</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </button>
            </div>
          </div>
        </section>

        {/* The Studio */}
        <section id="about" className="border-t border-white/10 bg-[#080808] px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader
              eyebrow="The Studio / 02"
              title={<>Business first. Story always.</>}
              copy="IMAGINE is an independent creative production studio for brands ready to move with intention."
            />

            <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-14 items-center">
              <div>
                <p className="font-display text-2xl leading-snug text-white md:text-3xl lg:text-4xl">
                  We turn clear thinking into <span className="text-[#D4AF37]">cinema</span> — work that looks beautiful, works hard, and leaves a trace.
                </p>
                <p className="mt-4 font-body text-base leading-7 text-white/55">
                  From the first question to the final grade, every decision has a job. Strategy gives the story a spine. Craft gives it a pulse.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border border-white/10 p-6 md:p-7 bg-black/40">
                {[
                  ['01', 'Strategy-led'],
                  ['02', 'Culture-aware'],
                  ['03', 'Detail-obsessed'],
                  ['04', 'Built to move'],
                ].map(([num, label]) => (
                  <div key={num} className="border-b border-white/10 pb-4">
                    <span className="font-body text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">{num}</span>
                    <h4 className="mt-2 font-display text-lg font-medium text-white">{label}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section id="process" className="border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader
              eyebrow="How We Work / 03"
              title={<>Make it matter.<br />Then make it move.</>}
              copy="A focused process keeps the work brave, useful, and unmistakably yours."
            />

            <div className="mt-10 grid gap-7 md:mt-16 md:grid-cols-4">
              {processSteps.map(([num, title, description]) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: Number(num) * 0.1 }}
                  className="group relative border-t border-white/20 pt-6"
                >
                  <span className="font-body text-xs uppercase tracking-[0.25em] text-[#D4AF37]">{num}</span>
                  <h3 className="mt-3 font-display text-2xl font-medium text-white">{title}</h3>
                  <p className="mt-3 max-w-[190px] font-body text-sm leading-6 text-white/45">{description}</p>
                  <ArrowDownRight className="mt-8 h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-[#D4AF37]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-[#D4AF37] via-[#E6C45B] to-[#B58B22] px-6 py-20 text-[#050505] md:px-10 md:py-28">
          <div className="pointer-events-none absolute -right-[4%] top-[10%] font-display text-[17vw] font-semibold uppercase leading-none tracking-[-0.09em] text-black/[0.06]">IMAGINE</div>
          <div className="pointer-events-none absolute right-[8%] top-[12%] hidden md:block">
            <ApertureMark size={140} radius={34} color="#050505" strokeWidth={0.8} className="opacity-20" />
          </div>
          <div className="absolute bottom-[-35%] left-[-5%] h-[520px] w-[520px] rounded-full border border-black/15" />
          <div className="absolute bottom-[-18%] left-[5%] h-[300px] w-[300px] rounded-full border border-black/20" />
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid gap-8 md:grid-cols-[1.4fr_0.8fr] md:items-end">
              <div>
                <span className="font-body text-[10px] uppercase tracking-[0.28em] text-black/60">Start a conversation / 04</span>
                <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[0.9] tracking-[-0.05em] md:text-8xl">Have a story worth telling?</h2>
              </div>
              <div className="md:pb-2">
                <p className="max-w-sm font-body text-sm leading-7 text-black/65">Tell us what you are building, shifting, or daring to imagine. We will bring the right questions.</p>
                <motion.a
                  whileTap={{ scale: 0.97 }}
                  href="mailto:hello@imagine.studio"
                  className="mt-8 inline-flex items-center gap-3 border-b border-black/50 pb-2 font-body text-xs uppercase tracking-[0.22em] transition-colors hover:border-black hover:text-black/60"
                >
                  hello@imagine.studio <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
            <div className="mt-14 flex flex-col gap-5 border-t border-black/20 pt-6 font-body text-[10px] uppercase tracking-[0.2em] text-black/55 md:flex-row md:items-center md:justify-between">
              <span>IMAGINE Studio © 2025</span>
              <span>Made for the stories ahead</span>
              <button type="button" onClick={() => scrollTo('#top')} className="flex items-center gap-2 transition-colors hover:text-black">
                <Play className="h-3 w-3 rotate-[-90deg]" /> Back to top
              </button>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="portfolio-lightbox"
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-title"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setSelectedProject(null);
              }}
            >
              <motion.div
                className="relative flex max-h-[92svh] w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-[#0b0b0b] shadow-2xl md:flex-row"
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 18 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="relative min-h-[42vh] flex-1 bg-black md:min-h-0">
                  {!lightboxVideoFailed ? (
                    <video
                      className="h-full min-h-[42vh] w-full object-cover md:min-h-[560px]"
                      src={selectedProject.video}
                      poster={selectedProject.image}
                      controls
                      autoPlay
                      muted
                      playsInline
                      preload="metadata"
                      onError={() => setLightboxVideoFailed(true)}
                    />
                  ) : (
                    <div className="relative h-full min-h-[42vh] md:min-h-[560px]">
                      <img src={selectedProject.image} alt={selectedProject.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-6 pb-6 pt-20 font-body text-xs uppercase tracking-[0.18em] text-white/75">Preview unavailable — showing project still</div>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>

                <div className="flex w-full flex-col justify-between border-t border-white/10 bg-[#0b0b0b] p-6 md:w-[290px] md:border-l md:border-t-0 md:p-8">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">{selectedProject.number} / Selected work</span>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                        aria-label="Close project video"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <h2 id="lightbox-title" className="mt-12 font-display text-3xl leading-none tracking-[-0.04em] text-white">{selectedProject.title}</h2>
                    <p className="mt-4 font-body text-xs uppercase tracking-[0.2em] text-white/50">{selectedProject.category}</p>
                  </div>
                  <div className="mt-12 border-t border-white/10 pt-5 font-body text-xs leading-6 text-white/45">
                    <div className="flex items-center justify-between">
                      <span>Year</span>
                      <span className="text-white/75">{selectedProject.year}</span>
                    </div>
                    <p className="mt-5">Use the player controls for full-screen viewing. Press Escape or click outside the frame to close.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <LenisProvider>
      <HomeContent />
    </LenisProvider>
  );
}
