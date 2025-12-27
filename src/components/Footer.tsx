import { Instagram, Facebook, MapPin, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <footer className="bg-black/80 border-t border-neon-red-orange/10 backdrop-blur-sm">
      <div className="w-full px-4 py-12 sm:py-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          >
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3">
                <span className="text-neon-red-orange">One Fourteen</span>
                <span className="text-foreground ml-2">Bar</span>
              </h3>
              <p className="font-paragraph text-xs sm:text-sm text-foreground/70 mb-4 leading-relaxed">
                Modern dive. Late-night energy. Whiskey Row grit.
              </p>
              <div className="flex gap-3">
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neon-red-orange/40 flex items-center justify-center text-neon-red-orange hover:bg-neon-red-orange hover:text-white hover:border-neon-red-orange transition-all"
                  aria-label="Instagram"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={18} className="sm:w-5 sm:h-5" />
                </motion.a>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neon-red-orange/40 flex items-center justify-center text-neon-red-orange hover:bg-neon-red-orange hover:text-white hover:border-neon-red-orange transition-all"
                  aria-label="Facebook"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook size={18} className="sm:w-5 sm:h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div variants={itemVariants}>
              <h4 className="font-heading text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-neon-red-orange flex-shrink-0" />
                Location
              </h4>
              <div className="space-y-2">
                <p className="font-paragraph text-xs sm:text-sm text-foreground/90">
                  114 W Main St
                </p>
                <p className="font-paragraph text-xs sm:text-sm text-foreground/90">
                  Louisville, KY 40202
                </p>
                <p className="font-paragraph text-xs text-warm-amber">
                  Across from KFC Yum Center
                </p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div variants={itemVariants}>
              <h4 className="font-heading text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock size={18} className="text-neon-red-orange flex-shrink-0" />
                Hours
              </h4>
              <div className="font-paragraph text-xs sm:text-sm text-foreground/90 space-y-2">
                <div className="flex justify-between">
                  <span>Mon - Thu</span>
                  <span className="text-neon-red-orange font-semibold">4pm - 2am</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri - Sat</span>
                  <span className="text-neon-red-orange font-semibold">12pm - 4am</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-neon-red-orange font-semibold">12pm - 2am</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-heading text-base sm:text-lg font-bold text-foreground mb-4">
                Quick Links
              </h4>
              <div className="space-y-2">
                <a href="/" className="font-paragraph text-xs sm:text-sm text-foreground/80 hover:text-neon-red-orange transition-colors flex items-center gap-1 group">
                  Home
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="/events" className="font-paragraph text-xs sm:text-sm text-foreground/80 hover:text-neon-red-orange transition-colors flex items-center gap-1 group">
                  Events
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="/gallery" className="font-paragraph text-xs sm:text-sm text-foreground/80 hover:text-neon-red-orange transition-colors flex items-center gap-1 group">
                  Gallery
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="/contact" className="font-paragraph text-xs sm:text-sm text-foreground/80 hover:text-neon-red-orange transition-colors flex items-center gap-1 group">
                  Contact
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-6 border-t border-neon-red-orange/10"
          >
            <p className="font-paragraph text-xs text-center text-foreground/50">
              © {new Date().getFullYear()} One Fourteen Bar. All rights reserved. | Whiskey Row, Louisville, KY
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
