import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Menu } from 'lucide-react';
import { ApertureMark } from './ApertureMark';
import { Button } from '@/components/ui/button';
import { useScrolled, useActiveSection, cn } from '@/lib/utils';
import { useLenisContext } from '@/lib/LenisProvider';

const MobileMenu = lazy(() => import('./MobileMenu').then(m => ({ default: m.MobileMenu })));

const navigationLinks = [
  { id: 'portfolio', label: 'Work', href: '#portfolio' },
  { id: 'about', label: 'Studio', href: '#about' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const SECTION_IDS = navigationLinks.map((link) => link.id);

interface NavbarProps {
  visible: boolean;
}

export function Navbar({ visible }: NavbarProps) {
  const scrolled = useScrolled(24);
  const activeId = useActiveSection(SECTION_IDS);
  const { scrollTo } = useLenisContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (href: string) => {
    scrollTo(href);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-500',
          scrolled
            ? 'bg-[#050505]/60 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
            : 'bg-transparent'
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[88px] max-w-[1400px] items-center justify-between px-6 md:px-10"
        >
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('#top');
            }}
            className="group flex items-center gap-3"
            aria-label="IMAGINE Studio — home"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-[#D4AF37]/60 bg-black/20 transition-colors group-hover:border-[#D4AF37]">
              <ApertureMark
                size={28}
                radius={7.4}
                color="#D4AF37"
                strokeWidth={0.95}
                className="transition-transform duration-500 group-hover:rotate-90"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-semibold uppercase tracking-[0.18em] text-white transition-colors group-hover:text-[#D4AF37] md:text-lg">IMAGINE</span>
              <span className="mt-1 font-body text-[8px] uppercase tracking-[0.28em] text-white/45">Creative Production Studio</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.href)}
                className={cn(
                  'text-sm font-body transition-colors',
                  activeId === link.id
                    ? 'text-[#D4AF37]'
                    : 'text-[#9F9F9F] hover:text-white'
                )}
                aria-current={activeId === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavigate('#contact')}
              variant="ghost"
              className="group h-auto rounded-none border-b border-[#D4AF37]/60 bg-transparent px-0 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] hover:border-[#D4AF37] hover:bg-transparent hover:text-white"
            >
              Get In Touch <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <Suspense fallback={null}>
        <MobileMenu
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          onNavigate={handleNavigate}
          activeId={activeId}
          links={navigationLinks}
        />
      </Suspense>
    </>
  );
}
