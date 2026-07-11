import { useState } from 'react';
import { Loader } from '@/components/Loader';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { LenisProvider } from '@/lib/LenisProvider';

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <LenisProvider enabled={introDone}>
      <div className="relative bg-[#050505]">
        <Loader onComplete={() => setIntroDone(true)} />
        <Navbar visible={introDone} />
        <Hero introDone={introDone} />
        
        {/* Placeholder sections for future content */}
        <section id="portfolio" className="min-h-screen bg-[#050505] flex items-center justify-center border-t border-[rgba(255,255,255,0.08)]">
          <div className="text-center">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Portfolio</h2>
            <p className="text-[#9F9F9F]">Coming soon...</p>
          </div>
        </section>

        <section id="about" className="min-h-screen bg-[#111111] flex items-center justify-center border-t border-[rgba(255,255,255,0.08)]">
          <div className="text-center">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">About Studio</h2>
            <p className="text-[#9F9F9F]">Coming soon...</p>
          </div>
        </section>

        <section id="process" className="min-h-screen bg-[#050505] flex items-center justify-center border-t border-[rgba(255,255,255,0.08)]">
          <div className="text-center">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Our Process</h2>
            <p className="text-[#9F9F9F]">Coming soon...</p>
          </div>
        </section>

        <section id="contact" className="min-h-screen bg-[#111111] flex items-center justify-center border-t border-[rgba(255,255,255,0.08)]">
          <div className="text-center">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Get In Touch</h2>
            <p className="text-[#9F9F9F]">Coming soon...</p>
          </div>
        </section>
      </div>
    </LenisProvider>
  );
}
