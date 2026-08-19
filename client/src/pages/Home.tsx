import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Loader } from '@/components/Loader';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { LenisProvider, useLenisContext } from '@/lib/LenisProvider';
import { cn } from '@/lib/utils';
import { ApertureMark } from '@/components/ApertureMark';

const STORAGE = '/manus-storage/';

const projects = [
  {
    number: '01',
    title: 'Time, Reframed',
    category: 'Brand Film · Luxury',
    year: '2025',
    image: `${STORAGE}portfolio-1_b319db7e.jpg`,
    color: '#D4AF37',
  },
  {
    number: '02',
    title: 'Golden Hour',
    category: 'Campaign · Fashion',
    year: '2024',
    image: `${STORAGE}portfolio-2_29db68a7.jpg`,
    color: '#F2C879',
  },
  {
    number: '03',
    title: 'Beyond the Frame',
    category: 'Experience · Digital',
    year: '2024',
    image: `${STORAGE}portfolio-3_c33e19e7.jpg`,
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
    <div className="grid gap-8 border-t border-white/10 pt-6 md:grid-cols-[0.8fr_1.5fr_1fr] md:gap-14">
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

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const { scrollTo } = useLenisContext();

  return (
    <LenisProvider enabled={introDone}>
      <div className="relative overflow-hidden bg-[#050505] text-white">
        <Loader onComplete={() => setIntroDone(true)} />
        <Navbar visible={introDone} />
        <AudioDirector />
        <Hero introDone={introDone} />

        <main>
          <section id="portfolio" className="relative bg-[#050505] px-6 py-28 md:px-10 md:py-40">
            <div className="mx-auto max-w-[1400px]">
              <SectionHeader
                eyebrow="Selected work / 01"
                title={<>Stories that make <em className="font-display not-italic text-[#D4AF37]">people feel.</em></>}
                copy="A few frames from a much larger reel. We build cultural memory for brands with something to say."
              />

              <div className="mt-20 grid gap-7 md:grid-cols-12 md:gap-5">
                {projects.map((project, index) => (
                  <motion.article
                    key={project.title}
                    initial={{ opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={cn('group relative', index === 0 ? 'md:col-span-7' : 'md:col-span-5', index === 1 && 'md:mt-24')}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#141414]">
                      <img
                        src={project.image}
                        alt={`${project.title} project still`}
                        className="h-full w-full object-cover grayscale-[0.15] transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                      <div className="absolute left-5 top-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /> {project.number}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                        <div>
                          <p className="mb-2 font-body text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">{project.category}</p>
                          <h3 className="font-display text-2xl leading-none text-white md:text-3xl">{project.title}</h3>
                        </div>
                        <span className="font-body text-xs text-white/50">{project.year}</span>
                      </div>
                      <div className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center border border-white/20 bg-black/20 opacity-0 backdrop-blur-sm transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4 text-[#D4AF37]" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#contact')}
                className="mt-14 inline-flex items-center gap-3 border-b border-[#D4AF37]/50 pb-2 font-body text-xs uppercase tracking-[0.24em] text-[#D4AF37] transition-colors hover:border-[#D4AF37] hover:text-white"
              >
                See the full reel <ArrowDownRight className="h-4 w-4" />
              </motion.button>
            </div>
          </section>

          <section id="about" className="relative overflow-hidden bg-[#111111] px-6 py-28 md:px-10 md:py-40">
            <div className="absolute right-[-10%] top-[16%] h-[420px] w-[420px] rounded-full border border-[#D4AF37]/15 md:h-[620px] md:w-[620px]" />
            <div className="absolute right-[0%] top-[27%] h-[260px] w-[260px] rounded-full border border-[#D4AF37]/20 md:h-[390px] md:w-[390px]" />
            <div className="relative mx-auto max-w-[1400px]">
              <SectionHeader
                eyebrow="The studio / 02"
                title={<>Business first.<br /><span className="text-white/35">Story always.</span></>}
                copy="IMAGINE is an independent creative production studio for brands ready to move with intention."
              />
              <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-24">
                <div className="max-w-xl">
                  <p className="font-display text-2xl leading-tight text-white md:text-4xl">We turn clear thinking into <span className="text-[#D4AF37]">cinema</span> — work that looks beautiful, works hard, and leaves a trace.</p>
                  <p className="mt-8 max-w-md font-body text-sm leading-7 text-white/55">From the first question to the final grade, every decision has a job. Strategy gives the story a spine. Craft gives it a pulse.</p>
                </div>
                <div className="grid gap-8 border-l border-white/10 pl-6 md:grid-cols-2 md:pl-10">
                  {['Strategy-led', 'Culture-aware', 'Detail-obsessed', 'Built to move'].map((item, index) => (
                    <div key={item} className="border-t border-white/10 pt-4">
                      <span className="font-body text-[10px] text-[#D4AF37]">0{index + 1}</span>
                      <h3 className="mt-4 font-display text-xl text-white">{item}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="process" className="bg-[#050505] px-6 py-28 md:px-10 md:py-40">
            <div className="mx-auto max-w-[1400px]">
              <SectionHeader
                eyebrow="How we work / 03"
                title={<>Make it matter.<br /><span className="text-white/35">Then make it move.</span></>}
                copy="A focused process keeps the work brave, useful, and unmistakably yours."
              />
              <div className="mt-20 grid border-t border-white/10 md:grid-cols-4">
                {processSteps.map(([number, title, description], index) => (
                  <motion.div
                    key={number}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="group border-b border-white/10 py-7 md:border-b-0 md:border-r md:px-6 md:py-0 md:first:pl-0 md:last:border-r-0"
                  >
                    <span className="font-body text-[10px] tracking-[0.2em] text-[#D4AF37]">{number}</span>
                    <h3 className="mt-14 font-display text-3xl text-white transition-colors group-hover:text-[#D4AF37]">{title}</h3>
                    <p className="mt-5 max-w-[190px] font-body text-sm leading-6 text-white/45">{description}</p>
                    <ArrowDownRight className="mt-12 h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-[#D4AF37]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-[#D4AF37] via-[#E6C45B] to-[#B58B22] px-6 py-28 text-[#050505] md:px-10 md:py-40">
            <div className="pointer-events-none absolute -right-[4%] top-[10%] font-display text-[17vw] font-semibold uppercase leading-none tracking-[-0.09em] text-black/[0.06]">IMAGINE</div>
            <div className="pointer-events-none absolute right-[8%] top-[12%] hidden md:block"><ApertureMark size={140} radius={34} color="#050505" strokeWidth={0.8} className="opacity-20" /></div>
            <div className="absolute bottom-[-35%] left-[-5%] h-[520px] w-[520px] rounded-full border border-black/15" />
            <div className="absolute bottom-[-18%] left-[5%] h-[300px] w-[300px] rounded-full border border-black/20" />
            <div className="relative mx-auto max-w-[1400px]">
              <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr] md:items-end">
                <div>
                  <span className="font-body text-[10px] uppercase tracking-[0.28em] text-black/60">Start a conversation / 04</span>
                  <h2 className="mt-8 max-w-4xl font-display text-5xl leading-[0.9] tracking-[-0.05em] md:text-8xl">Have a story worth telling?</h2>
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
              <div className="mt-24 flex flex-col gap-6 border-t border-black/20 pt-6 font-body text-[10px] uppercase tracking-[0.2em] text-black/55 md:flex-row md:items-center md:justify-between">
                <span>IMAGINE Studio © 2025</span>
                <span>Made for the stories ahead</span>
                <button type="button" onClick={() => scrollTo('#top')} className="flex items-center gap-2 transition-colors hover:text-black"><Play className="h-3 w-3 rotate-[-90deg]" /> Back to top</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </LenisProvider>
  );
}
