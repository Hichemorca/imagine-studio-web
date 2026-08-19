import { useState, lazy, Suspense } from 'react';
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
            ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]'
            : 'bg-transparent'
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[88px] max-w-[1400px] items-center justify-between px-6 md:px-10"
        >
          {/* Brand Logo Lockup */}
          <button
            type="button"
            onClick={() => handleNavigate('#top')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-[#D4AF37]/50 bg-[#D4AF37]/10 transition-colors group-hover:border-[#D4AF37]">
              <ApertureMark size={22} radius={5} color="#D4AF37" strokeWidth={0.8} />
            </span>
            <div>
              <span className="block font-display text-sm font-medium tracking-[0.2em] text-white">
                IMAGINE
              </span>
              <span className="block font-body text-[8px] uppercase tracking-[0.3em] text-[#D4AF37]">
                Creative Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navigationLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavigate(link.href)}
                  className={cn(
                    'relative font-body text-xs uppercase tracking-[0.22em] transition-colors py-2',
                    isActive ? 'text-[#D4AF37]' : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-[#D4AF37]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigate('#contact')}
              className="hidden md:inline-flex items-center gap-2 border-white/20 bg-transparent text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 text-white md:hidden hover:border-[#D4AF37]"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <Suspense fallback={null}>
        <MobileMenu
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          links={navigationLinks}
          activeId={activeId}
          onNavigate={handleNavigate}
        />
      </Suspense>
    </>
  );
}
