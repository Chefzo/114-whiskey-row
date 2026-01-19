import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Clock, Music, Flame, AlertCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events, GalleryPhotos } from '@/entities';
import { Link } from 'react-router-dom';
import { getBarStatus } from '@/lib/bar-hours';

export default function HomePage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Events[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotos[]>([]);
  const [barStatus, setBarStatus] = useState(getBarStatus());

  useEffect(() => {
    const fetchData = async () => {
      const { items: events } = await BaseCrudService.getAll<Events>('events');
      const { items: photos } = await BaseCrudService.getAll<GalleryPhotos>('galleryphotos');
      
      const sortedEvents = events
        .filter(event => event.eventDate && new Date(event.eventDate) >= new Date())
        .sort((a, b) => new Date(a.eventDate!).getTime() - new Date(b.eventDate!).getTime())
        .slice(0, 3);
      
      setUpcomingEvents(sortedEvents);
      setGalleryPhotos(photos.slice(0, 6));
    };

    fetchData();

    // Update bar status every minute
    const interval = setInterval(() => {
      setBarStatus(getBarStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  } as const;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full flex items-center justify-center pt-20 pb-0 px-4 overflow-hidden min-h-screen md:min-h-[90vh]">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/528274_de41e140f4b5413493d5959e97c96f5a~mv2.png?originWidth=1920&originHeight=1024"
            alt="One Fourteen Bar interior"
            className="w-full h-full object-cover opacity-15"
            width={1920}
          />
          <div className="absolute inset-0 bg-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto text-left flex flex-col items-start justify-center min-h-[calc(100vh-80px)] md:min-h-[90vh] pl-4 md:pl-12">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-foreground/20 rounded-full bg-foreground/5 backdrop-blur-sm"
          >
            <MapPin size={14} className="text-foreground" />
            <span className="font-paragraph text-xs uppercase tracking-widest text-foreground/80">
              Downtown Louisville • Whiskey Row
            </span>
          </motion.div>

          {/* H1 - One Fourteen Bar */}
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[1.1] text-foreground mb-6 max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="inline-block text-neon-red-orange"
            >
              One Fourteen
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              className="inline-block text-foreground"
            >
              Bar
            </motion.span>
          </h1>

          {/* Identity & Status Lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4 mb-10 max-w-2xl px-2"
          >
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
              Modern dive on Whiskey Row.
            </p>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
              Built for late nights. Loud music. Strong drinks.
            </p>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
              Bar inside. Backyard out back.
            </p>
          </motion.div>

          {/* Opening Status - Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="hidden md:flex flex-col items-start gap-2 mb-10"
          >
            <p className="font-paragraph text-lg text-foreground font-semibold">
              Opening January 14
            </p>
            <p className="font-paragraph text-sm text-foreground/70">
              Walk-ins only
            </p>
          </motion.div>

          {/* Desktop CTA Button - Get Directions Only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="hidden md:flex"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
                className="inline-flex items-center justify-center gap-3 bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-sm uppercase tracking-wider font-semibold px-8 py-4 rounded-lg transition-all"
              >
                Get Directions
                <MapPin size={18} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ===== MOBILE STATUS STRIP ===== */}
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
        className="md:hidden w-full py-4 px-4 bg-black/80 border-b border-neon-red-orange/30 cursor-pointer hover:bg-black/90 transition-colors"
      >
        <div className="max-w-[120rem] mx-auto flex items-center justify-center gap-3">
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${barStatus.isOpen ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className="font-paragraph text-sm text-foreground text-center">
            {barStatus.isOpen ? '🟢 Open Now' : '🔴 Closed'} • {barStatus.todayHours}
          </span>
        </div>
      </motion.section>
      {/* Mobile Fixed Get Directions Button - ONLY CTA on mobile */}
      <motion.button
        onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-6 left-4 right-4 md:hidden z-40 flex items-center justify-center gap-2 bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-lg transition-all shadow-xl hover:shadow-2xl hover:shadow-neon-red-orange/40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MapPin size={16} />
        Get Directions
      </motion.button>
      {/* ===== WHAT THIS PLACE IS SECTION ===== */}
      <section className="w-full py-16 sm:py-24 px-4 border-t border-neon-red-orange/20">
        <div className="max-w-[100rem] mx-auto">
          <div className="space-y-6 sm:space-y-8 max-w-2xl">
            {/* Title */}
            <h2 className="font-heading text-5xl sm:text-6xl font-bold text-foreground">
              What This Place Is
            </h2>

            {/* Declarative Lines - Raw and Minimal */}
            <div className="space-y-2 sm:space-y-3">
              <p className="font-paragraph text-base sm:text-lg text-foreground/90">
                Before the game.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/90">
                After the show.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/90">
                Loud music.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/90">
                Strong drinks.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/90">
                Walk-ins welcome.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/90">
                Late nights.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ===== TONIGHT AT ONE FOURTEEN SECTION (Desktop Only) ===== */}
      <section className="w-full py-16 sm:py-24 px-4 hidden sm:block">
        <div className="max-w-[120rem] mx-auto">
          {/* Tonight Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 bg-black/40 border border-foreground/10 rounded-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Status */}
              <div>
                <p className="font-paragraph text-xs uppercase tracking-widest text-foreground/60 mb-2">Status</p>
                <p className={`font-heading text-2xl font-bold ${barStatus.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                  {barStatus.isOpen ? 'OPEN' : 'CLOSED'}
                </p>
              </div>

              {/* Hours */}
              <div>
                <p className="font-paragraph text-xs uppercase tracking-widest text-foreground/60 mb-2">Today's Hours</p>
                <p className="font-heading text-2xl font-bold text-foreground">{barStatus.todayHours.split(':')[1]}</p>
              </div>

              {/* CTA */}
              <div className="flex flex-col justify-between">
                <button
                  onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
                  className="inline-flex items-center justify-center gap-2 bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-sm uppercase tracking-wider font-semibold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl hover:shadow-neon-red-orange/40 w-full sm:w-auto"
                >
                  <MapPin size={16} />
                  Get Directions
                </button>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Events Preview */}
          {upcomingEvents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Coming Up</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.slice(0, 2).map((event) => (
                  <motion.div
                    key={event._id}
                    whileHover={{ y: -4 }}
                    className="group relative bg-black/40 border border-neon-red-orange/20 hover:border-neon-red-orange/60 rounded-lg overflow-hidden transition-all p-6"
                  >
                    {event.eventType && (
                      <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-warm-amber mb-3 px-3 py-1 bg-warm-amber/10 rounded-full border border-warm-amber/20">
                        {event.eventType}
                      </span>
                    )}
                    <h4 className="font-heading text-lg font-bold text-foreground mb-2">
                      {event.eventName}
                    </h4>
                    {event.eventDate && (
                      <div className="flex items-center gap-2 text-foreground/70">
                        <Calendar size={14} className="text-neon-red-orange flex-shrink-0" />
                        <span className="font-paragraph text-sm">
                          {new Date(event.eventDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
      {/* ===== THE STORY SECTION ===== */}
      <section className="w-full py-16 sm:py-24 px-4 border-t border-neon-red-orange/20">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-8 sm:space-y-12"
          >
            <div className="max-w-2xl">
              <p className="font-paragraph text-lg sm:text-xl text-foreground/90 leading-relaxed">
                One Fourteen is a walk-in bar on Whiskey Row.
              </p>
              <div className="mt-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-neon-red-orange hover:text-neon-red-orange/80 font-paragraph text-sm uppercase tracking-wider font-semibold transition-colors"
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ===== ABOUT SECTION ===== */}

      {/* ===== EVENTS SECTION ===== */}
      <section className="w-full py-16 sm:py-24 px-4">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2 className="font-heading text-5xl sm:text-6xl font-bold text-foreground mb-3">
              What's <span className="text-neon-red-orange">On</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground/70">
              DJs, game days, and late-night energy.
            </p>
          </motion.div>

          {upcomingEvents.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            >
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event._id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group relative bg-black/40 border border-neon-red-orange/20 hover:border-neon-red-orange/60 rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Image */}
                  {event.eventImage && (
                    <div className="aspect-[16/10] overflow-hidden bg-black/20">
                      <Image
                        src={event.eventImage}
                        alt={event.eventName || 'Event'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={600}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {event.eventType && (
                      <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-warm-amber mb-3 px-3 py-1 bg-warm-amber/10 rounded-full border border-warm-amber/20">
                        {event.eventType}
                      </span>
                    )}
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                      {event.eventName}
                    </h3>
                    {event.eventDate && (
                      <div className="flex items-center gap-2 text-foreground/70 mb-3">
                        <Calendar size={16} className="text-neon-red-orange flex-shrink-0" />
                        <span className="font-paragraph text-sm">
                          {new Date(event.eventDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                    {event.eventDescription && (
                      <p className="font-paragraph text-sm text-foreground/80 line-clamp-2">
                        {event.eventDescription}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-6"
            >
              <p className="font-paragraph text-base text-foreground/60">
                Weekly DJs, game days, and pop-ups. Full calendar dropping soon.
              </p>
            </motion.div>
          )}

          {upcomingEvents.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-neon-red-orange hover:bg-neon-red-orange/10 text-neon-red-orange font-paragraph text-sm uppercase tracking-wider font-semibold px-8 py-3 rounded-lg transition-all"
                >
                  View All Events
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
      {/* ===== GALLERY SECTION ===== */}
      <section className="w-full py-16 sm:py-24 px-4">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2 className="font-heading text-5xl sm:text-6xl font-bold text-foreground mb-3">
              Inside <span className="text-neon-red-orange">One Fourteen</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground/70">
              A late night on Whiskey Row.
            </p>
          </motion.div>

          {galleryPhotos.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10"
            >
              {galleryPhotos.map((photo) => (
                <motion.div
                  key={photo._id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-black/40 border border-neon-red-orange/20 hover:border-neon-red-orange/60 transition-all cursor-pointer"
                >
                  {photo.photo && (
                    <Image
                      src={photo.photo}
                      alt={photo.altText || photo.caption || 'Gallery photo'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={600}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <p className="font-paragraph text-base text-foreground/60">
                Gallery coming soon
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-neon-red-orange hover:bg-neon-red-orange/10 text-neon-red-orange font-paragraph text-sm uppercase tracking-wider font-semibold px-8 py-3 rounded-lg transition-all"
              >
                View Full Gallery
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ===== CLOSING SECTION ===== */}
      <section className="w-full py-16 sm:py-24 px-4 border-t border-foreground/10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
              Loud music. Strong drinks.
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
