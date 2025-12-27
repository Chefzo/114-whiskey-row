import { Instagram, Facebook, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neon-red-orange/20">
      <div className="w-full px-4 py-8 sm:py-12">
        <div className="flex flex-col gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
              <span className="text-foreground">114</span>
              <span className="text-neon-red-orange ml-2">Whiskey Row</span>
            </h3>
            <p className="font-paragraph text-xs sm:text-sm text-foreground/70 mb-4">
              Modern dive. Late-night energy. Whiskey Row grit.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neon-red-orange/40 flex items-center justify-center text-neon-red-orange active:bg-neon-red-orange active:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neon-red-orange/40 flex items-center justify-center text-neon-red-orange active:bg-neon-red-orange active:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-neon-red-orange flex-shrink-0 sm:w-5 sm:h-5" />
              Location
            </h4>
            <p className="font-paragraph text-xs sm:text-sm text-foreground/90 mb-1">
              114 W Main St
            </p>
            <p className="font-paragraph text-xs sm:text-sm text-foreground/90 mb-3">
              Louisville, KY
            </p>
            <p className="font-paragraph text-xs text-warm-amber">
              Directly on Whiskey Row, across from the KFC Yum Center
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Clock size={18} className="text-neon-red-orange flex-shrink-0 sm:w-5 sm:h-5" />
              Hours
            </h4>
            <div className="font-paragraph text-xs sm:text-sm text-foreground/90 space-y-2">
              <div className="flex justify-between">
                <span>Mon - Thu</span>
                <span className="text-neon-red-orange">4pm - 2am</span>
              </div>
              <div className="flex justify-between">
                <span>Fri - Sat</span>
                <span className="text-neon-red-orange">12pm - 4am</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-neon-red-orange">12pm - 2am</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-neon-red-orange/20">
          <p className="font-paragraph text-xs text-center text-foreground/60">
            © {new Date().getFullYear()} 114 Whiskey Row. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
