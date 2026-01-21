import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog' },
    { path: '/visit', label: 'Visit' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleGetDirections = () => {
    window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-foreground/5 grain-texture">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center">
            <Image 
              src="https://static.wixstatic.com/media/528274_363951d44b154fd697adf91d897f90f4~mv2.png" 
              alt="One Fourteen Bar Logo" 
              width={120}
              className="h-12 w-auto object-contain group-hover:opacity-90 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-xs uppercase tracking-widest transition-all relative group ${
                  isActive(link.path) ? 'text-foreground' : 'text-foreground/60 hover:text-foreground/90'
                }`}
              >
                {link.label}
                <motion.span
                  layoutId={isActive(link.path) ? 'activeNav' : undefined}
                  className={`absolute -bottom-2 left-0 h-0.5 bg-foreground transition-all ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Get Directions Button */}
          <motion.button
            onClick={handleGetDirections}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-lg transition-all"
          >
            <MapPin size={16} />
            Get Directions
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-neon-red-orange transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 border-t border-foreground/5 overflow-hidden grain-texture"
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-paragraph text-sm uppercase tracking-wider transition-colors py-2 px-3 rounded ${
                      isActive(link.path) ? 'text-neon-red-orange bg-neon-red-orange/10' : 'text-foreground/80 hover:text-neon-red-orange hover:bg-neon-red-orange/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                onClick={() => {
                  handleGetDirections();
                  setIsMenuOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="w-full flex items-center justify-center gap-2 bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-xs uppercase tracking-wider font-semibold px-4 py-3 rounded-lg transition-all mt-4"
              >
                <MapPin size={16} />
                Get Directions
              </motion.button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
