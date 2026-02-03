import { Instagram, Facebook } from 'lucide-react';
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
    <footer className="bg-black border-t border-foreground/10" role="contentinfo">
      <div className="w-full px-4 py-12 sm:py-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8"
          >
             {/* Brand */}
             <motion.div variants={itemVariants}>
               <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3">
                 <span className="text-neon-red-orange">One Fourteen</span>
               </h3>
              <div className="flex gap-3">
                <motion.a
                  href="https://www.instagram.com/onefourteenwhiskeyrow/"
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
               <h4 className="font-heading text-base sm:text-lg font-bold text-foreground mb-4">
                 Location
               </h4>
              <div className="space-y-2">
                <p className="font-paragraph text-xs sm:text-sm text-foreground/90">
                  114 W Main St
                </p>
                <p className="font-paragraph text-xs sm:text-sm text-foreground/90">
                  Louisville, KY 40202
                </p>
              </div>
            </motion.div>

             {/* Hours */}
             <motion.div variants={itemVariants}>
               <h4 className="font-heading text-base sm:text-lg font-bold text-foreground mb-4">
                 Hours
               </h4>
              <div className="font-paragraph text-xs sm:text-sm text-foreground/90 space-y-2">
                <div className="flex justify-between">
                  <span>Monday</span>
                  <span className="text-foreground/60 font-semibold">Closed</span>
                </div>
                <div className="flex justify-between">
                  <span>Tue - Sun</span>
                  <span className="text-neon-red-orange font-semibold">4pm - 2am</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-6 border-t border-foreground/10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="font-paragraph text-xs text-foreground/50">
                © {new Date().getFullYear()} One Fourteen Bar. All rights reserved.
              </p>
              <p className="font-paragraph text-xs text-neon-red-orange font-semibold">
                Walk-ins only · 21+
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
