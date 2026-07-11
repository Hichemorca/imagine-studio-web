import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  activeId: string | null;
  links: Array<{ id: string; label: string; href: string }>;
}

export function MobileMenu({
  open,
  onClose,
  onNavigate,
  activeId,
  links,
}: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            role="dialog"
            aria-modal="true"
            className="fixed right-0 top-0 bottom-0 z-40 w-full max-w-sm bg-[#111111] border-l border-[rgba(255,255,255,0.08)]"
          >
            <div className="flex flex-col h-full p-6">
              {/* Close button area */}
              <div className="h-20 flex items-center justify-end">
                <button
                  onClick={onClose}
                  className="text-white hover:text-[#D4AF37] transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col gap-6 py-8">
                {links.map((link) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => onNavigate(link.href)}
                    className={cn(
                      'text-left text-lg font-display font-medium transition-colors',
                      activeId === link.id
                        ? 'text-[#D4AF37]'
                        : 'text-white hover:text-[#D4AF37]'
                    )}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-8 border-t border-[rgba(255,255,255,0.08)]"
              >
                <Button
                  onClick={() => onNavigate('#contact')}
                  className="w-full bg-[#D4AF37] text-[#050505] hover:bg-[#E5C158] font-medium"
                >
                  Get In Touch
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
