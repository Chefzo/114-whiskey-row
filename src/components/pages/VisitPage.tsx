import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MapPin, Clock, Navigation, Zap, Users, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

// Helper function to determine open/closed status
function getOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes; // Convert to minutes since midnight

  // Monday (1) is closed
  if (day === 1) {
    // Closed on Monday, opens at 4pm Tuesday
    return {
      isOpen: false,
      text: 'Closed · Opens at 4:00 PM',
      statusColor: 'text-foreground/60'
    };
  }

  // Tuesday-Sunday: 4:00 PM (960 min) - 2:00 AM (120 min next day)
  const openTime = 16 * 60; // 4:00 PM in minutes
  const closeTime = 2 * 60; // 2:00 AM in minutes

  let isOpen = false;
  let nextEvent = '';

  if (currentTime >= openTime) {
    // After 4 PM - still open (closes at 2 AM)
    isOpen = true;
    nextEvent = 'Closes at 2:00 AM';
  } else if (currentTime < closeTime) {
    // Before 2 AM - still open from previous day
    isOpen = true;
    nextEvent = 'Closes at 2:00 AM';
  } else {
    // Between 2 AM and 4 PM - closed
    isOpen = false;
    nextEvent = 'Opens at 4:00 PM';
  }

  const statusText = isOpen ? `Open now · ${nextEvent}` : `Closed · ${nextEvent}`;
  const statusColor = isOpen ? 'text-foreground/80' : 'text-foreground/60';

  return {
    isOpen,
    text: statusText,
    statusColor
  };
}

export default function VisitPage() {
  const [status, setStatus] = useState(getOpenStatus());

  useEffect(() => {
    // Google Tag Manager noscript fallback
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-WMRZT82N';
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);

    // Update status every minute
    const interval = setInterval(() => {
      setStatus(getOpenStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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
                  className="inline-flex items-center gap-2 bg-neon-red-orange text-black font-paragraph text-sm uppercase tracking-wider px-6 py-3 rounded transition-all hover:bg-neon-red-orange/90 contrast-[1.25]"
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
                      Location & Hours
                    </h2>

                    {/* Open/Closed Status Indicator */}
                    <div className="mb-6 pb-6 border-b border-neon-red-orange/10">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${status.isOpen ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'}`} />
                        <p className={`font-paragraph text-base font-medium ${status.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                          {status.text}
                        </p>
                      </div>
                    </div>
                    
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

      {/* What to Expect Section */}
      <section className="w-full py-32 md:py-40 bg-black">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-20">
              What to Expect
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'High Energy',
                  description: 'Loud music, louder crowds. This is where the night gets real. Come ready to have a good time.'
                },
                {
                  icon: Users,
                  title: 'Real People',
                  description: 'No dress code. No attitude. Just genuine connections and good vibes with locals and visitors.'
                },
                {
                  icon: Lightbulb,
                  title: 'Unforgettable Nights',
                  description: 'Whether it\'s a game day, DJ night, or just a Tuesday, you\'ll leave with stories to tell.'
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex flex-col h-full p-8 bg-gradient-to-br from-neon-red-orange/5 to-transparent border border-neon-red-orange/20 rounded-lg hover:border-neon-red-orange/50 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-neon-red-orange/20 flex items-center justify-center mb-4 group-hover:bg-neon-red-orange/30 transition-colors">
                        <IconComponent size={24} className="text-neon-red-orange" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
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
                className="inline-flex items-center justify-center gap-2 bg-neon-red-orange text-white font-paragraph text-sm uppercase tracking-wider px-8 py-3 rounded transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.5)] contrast-[1.25]"
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
