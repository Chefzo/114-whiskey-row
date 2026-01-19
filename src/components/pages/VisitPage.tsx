import { motion } from 'framer-motion';
import { MapPin, Clock, Navigation } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VisitPage() {
  const address = '114 W Main St, Louisville, KY 40202';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background" />
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-foreground mb-6">
              Find <span className="text-neon-red-orange">Us</span>
              <span className="block text-base sm:text-lg md:text-xl font-paragraph font-normal text-foreground/80 mt-4">
                One Fourteen Bar on Whiskey Row
              </span>
            </h1>
            <p className="font-paragraph text-base sm:text-lg text-foreground/80 max-w-3xl leading-relaxed">
              Located at 114 W Main St in downtown Louisville.
              <br />
              Right on Whiskey Row, across from the Yum Center.
              <br />
              Open late. Walk-ins always welcome.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Location Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Address */}
              <div className="bg-black/40 border border-neon-red-orange/20 rounded p-8">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="text-neon-red-orange flex-shrink-0 mt-1" size={28} />
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                      Location
                    </h2>
                    <address className="font-paragraph text-lg text-foreground/90 not-italic">
                      114 W Main St<br />
                      Louisville, KY 40202
                    </address>
                  </div>
                </div>

                <div className="bg-warm-amber/10 border border-warm-amber/30 rounded p-4 mb-6">
                  <p className="font-paragraph text-sm text-warm-amber">
                    📍 Directly on Whiskey Row, across from the KFC Yum Center
                  </p>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-neon-red-orange text-white font-paragraph text-sm uppercase tracking-wider px-6 py-3 rounded transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.5)]"
                >
                  <Navigation size={18} />
                  Get Directions
                </a>
              </div>

              {/* Hours */}
              <div className="bg-black/40 border border-neon-red-orange/20 rounded p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Clock className="text-neon-red-orange flex-shrink-0 mt-1" size={28} />
                  <div className="flex-1">
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                      Hours
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-neon-red-orange/10">
                        <span className="font-paragraph text-base text-foreground/80">Monday</span>
                        <span className="font-paragraph text-base text-foreground/60 font-medium">Closed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-paragraph text-base text-foreground/80">Tuesday - Sunday</span>
                        <span className="font-paragraph text-base text-neon-red-orange font-medium">4:00 PM - 2:00 AM</span>
                      </div>
                    </div>

                    <p className="font-paragraph text-sm text-foreground/70 mt-6 pt-4 border-t border-neon-red-orange/10">
                      Indoor bar with a backyard out back.
                    </p>
                  </div>
                </div>
              </div>

              {/* Game Day Callout */}
              <div className="bg-gradient-to-br from-neon-red-orange/20 to-warm-amber/10 border border-neon-red-orange/40 rounded p-8">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                  Game Day Ready
                </h3>
                <p className="font-paragraph text-base text-foreground/80 mb-4">
                  Perfect spot before and after games at the Yum Center. Get here early on game days — it fills up fast.
                </p>
                <p className="font-paragraph text-sm text-warm-amber">
                  Cardinals, concerts, and everything in between.
                </p>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <div className="bg-black/40 border border-neon-red-orange/20 rounded overflow-hidden">
                <div className="aspect-square lg:aspect-[4/5]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3133.0234567890123!2d-85.75912!3d38.25432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDE1JzE1LjYiTiA4NcKwNDUnMzIuOCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="114 Whiskey Row Location Map"
                  />
                </div>
              </div>

              {/* Parking Info */}
              <div className="mt-6 bg-black/40 border border-neon-red-orange/20 rounded p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  Parking
                </h3>
                <p className="font-paragraph text-sm text-foreground/80">
                  Street parking and nearby lots available. On game days, arrive early or use rideshare.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-neon-red-orange/10 to-warm-amber/10 border border-neon-red-orange/30 rounded p-12 text-center"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              See You <span className="text-neon-red-orange">Tonight</span>
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              No reservations. No dress code. Just show up.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-neon-red-orange text-white font-paragraph text-sm uppercase tracking-wider px-8 py-3 rounded transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.5)]"
              >
                <Navigation size={18} />
                Navigate Here
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
