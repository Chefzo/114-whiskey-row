import { Instagram, Facebook, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neon-red-orange/20">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-3xl font-bold mb-4">
              <span className="text-foreground">114</span>
              <span className="text-neon-red-orange ml-2">Whiskey Row</span>
            </h3>
            <p className="font-paragraph text-sm text-foreground/70 mb-6">
              Modern dive. Late-night energy. Whiskey Row grit.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-neon-red-orange/40 flex items-center justify-center text-neon-red-orange hover:bg-neon-red-orange hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-neon-red-orange/40 flex items-center justify-center text-neon-red-orange hover:bg-neon-red-orange hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-neon-red-orange" />
              Location
            </h4>
            <p className="font-paragraph text-sm text-foreground/90 mb-2">
              114 W Main St
            </p>
            <p className="font-paragraph text-sm text-foreground/90 mb-2">
              Louisville, KY
            </p>
            <p className="font-paragraph text-xs text-warm-amber mt-4">
              Directly on Whiskey Row, across from the KFC Yum Center
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock size={20} className="text-neon-red-orange" />
              Hours
            </h4>
            <div className="font-paragraph text-sm text-foreground/90 space-y-2">
              <div className="flex justify-between">
                <span>Mon - Thu</span>
                <span>4pm - 2am</span>
              </div>
              <div className="flex justify-between">
                <span>Fri - Sat</span>
                <span>12pm - 4am</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>12pm - 2am</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neon-red-orange/20">
          <p className="font-paragraph text-xs text-center text-foreground/60">
            © {new Date().getFullYear()} 114 Whiskey Row. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
