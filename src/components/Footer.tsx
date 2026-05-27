import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-foreground/10" role="contentinfo">
      <div className="w-full px-4 py-12 sm:py-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl text-foreground mb-4">
                One Fourteen
              </h3>
              <div className="space-y-2 mb-6">
                <p className="font-paragraph text-sm sm:text-base text-foreground/90">
                  114 W Main St, Louisville, KY 40202
                </p>
                <p className="font-paragraph text-sm sm:text-base text-foreground/90">
                  Open Tue–Sun · 4pm–2am
                </p>
                <p className="font-paragraph text-sm sm:text-base text-foreground/90">
                  Walk-ins only. 21+.
                </p>
              </div>
              <motion.a
                href="https://www.instagram.com/onefourteenwhiskeyrow/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neon-red-orange hover:text-neon-red-orange/80 transition-colors"
                aria-label="Instagram"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} />
                <span className="font-paragraph text-sm">Instagram</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-6 mt-6 border-t border-foreground/10"
          >
            <p className="font-paragraph text-xs text-foreground/50 text-center">
              One Fourteen · Whiskey Row · Louisville, KY
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
