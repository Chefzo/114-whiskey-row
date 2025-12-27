import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events, GalleryPhotos } from '@/entities';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Events[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotos[]>([]);

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
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full flex items-center justify-center pt-24 pb-12 px-4 overflow-hidden min-h-[85vh]">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/528274_b5fc498d1389496f9827cabc0c47edde~mv2.png?originWidth=1920&originHeight=832"
            alt="One Fourteen Bar interior"
            className="w-full h-full object-cover opacity-30"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="inline-block font-paragraph text-xs uppercase tracking-widest text-warm-amber mb-3">
              Est. Louisville, KY
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold leading-tight text-foreground mb-3">
              <span className="text-neon-red-orange">One Fourteen</span>
              <br />
              <span className="text-foreground">Bar</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-sm sm:text-base text-foreground/80 mb-6 leading-relaxed px-2"
          >
            Modern dive. Late-night energy. The spot locals choose before the game and after the show.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-2 w-full"
          >
            <Link
              to="/events"
              className="w-full inline-flex items-center justify-center gap-2 bg-neon-red-orange text-white font-paragraph text-xs sm:text-sm uppercase tracking-wider px-4 py-3 sm:py-4 rounded transition-all active:scale-95"
            >
              See What's On
              <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
            <Link
              to="/visit"
              className="w-full inline-flex items-center justify-center gap-2 bg-transparent border border-neon-red-orange text-neon-red-orange font-paragraph text-xs sm:text-sm uppercase tracking-wider px-4 py-3 sm:py-4 rounded transition-all active:bg-neon-red-orange active:text-white"
            >
              Visit Tonight
              <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="w-full py-12 sm:py-16 px-4 bg-black/20">
        <div className="w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {/* Text */}
            <motion.div variants={itemVariants}>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Not Upscale.<br />
                <span className="text-neon-red-orange">Not Corporate.</span>
              </h2>
              <div className="w-12 h-1 bg-neon-red-orange mb-6" />
              <p className="font-paragraph text-sm sm:text-base text-foreground/80 mb-4 leading-relaxed">
                We are the grit on Whiskey Row. A place where the music is loud, the drinks are strong, and the vibe is unapologetically real.
              </p>
              <p className="font-paragraph text-xs sm:text-sm text-foreground/70">
                No pretense. No dress code. Just good times and real energy.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div variants={itemVariants} className="relative h-64 sm:h-80 rounded overflow-hidden">
              <Image
                src="https://static.wixstatic.com/media/528274_49336cbe823f403cb9ef14b08b71d3c6~mv2.png?originWidth=576&originHeight=768"
                alt="Neon lights and bar atmosphere"
                className="w-full h-full object-cover"
                width={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== EVENTS SECTION ===== */}
      <section className="w-full py-12 sm:py-16 px-4">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-2">
              What's <span className="text-neon-red-orange">On</span>
            </h2>
            <p className="font-paragraph text-xs sm:text-sm text-foreground/70">
              DJs, game days, and late-night energy. Check what's happening at 114.
            </p>
          </motion.div>

          {upcomingEvents.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4 mb-8"
            >
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event._id}
                  variants={itemVariants}
                  className="group relative bg-black/40 border border-neon-red-orange/20 rounded overflow-hidden active:border-neon-red-orange/60 transition-all"
                >
                  {/* Image */}
                  {event.eventImage && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <Image
                        src={event.eventImage}
                        alt={event.eventName || 'Event'}
                        className="w-full h-full object-cover group-active:scale-110 transition-transform duration-500"
                        width={600}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    {event.eventType && (
                      <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-warm-amber mb-2 px-2 py-1 bg-warm-amber/10 rounded">
                        {event.eventType}
                      </span>
                    )}
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-2">
                      {event.eventName}
                    </h3>
                    {event.eventDate && (
                      <div className="flex items-center gap-2 text-foreground/70 mb-2">
                        <Calendar size={14} className="text-neon-red-orange flex-shrink-0" />
                        <span className="font-paragraph text-xs sm:text-sm">
                          {new Date(event.eventDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                    {event.eventDescription && (
                      <p className="font-paragraph text-xs sm:text-sm text-foreground/80 line-clamp-2">
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
              className="text-center py-8"
            >
              <p className="font-paragraph text-xs sm:text-sm text-foreground/60">
                Check back soon for upcoming events
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-transparent border border-neon-red-orange text-neon-red-orange font-paragraph text-xs sm:text-sm uppercase tracking-wider px-4 py-2 sm:px-6 sm:py-3 rounded transition-all active:bg-neon-red-orange active:text-white"
            >
              View All Events
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section className="w-full py-12 sm:py-16 px-4 bg-black/20">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-2">
              The <span className="text-neon-red-orange">Vibe</span>
            </h2>
            <p className="font-paragraph text-xs sm:text-sm text-foreground/70">
              Real moments. Real energy. This is what 114 looks like.
            </p>
          </motion.div>

          {galleryPhotos.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 sm:gap-4 mb-8"
            >
              {galleryPhotos.map((photo) => (
                <motion.div
                  key={photo._id}
                  variants={itemVariants}
                  className="group relative aspect-square overflow-hidden rounded bg-black/40 border border-neon-red-orange/20 active:border-neon-red-orange/60 transition-all"
                >
                  {photo.photo && (
                    <Image
                      src={photo.photo}
                      alt={photo.altText || photo.caption || 'Gallery photo'}
                      className="w-full h-full object-cover group-active:scale-110 transition-transform duration-500"
                      width={600}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300">
                    {photo.caption && (
                      <p className="absolute bottom-2 left-2 right-2 font-paragraph text-xs text-foreground line-clamp-2">
                        {photo.caption}
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
              className="text-center py-8"
            >
              <p className="font-paragraph text-xs sm:text-sm text-foreground/60">
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
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-transparent border border-neon-red-orange text-neon-red-orange font-paragraph text-xs sm:text-sm uppercase tracking-wider px-4 py-2 sm:px-6 sm:py-3 rounded transition-all active:bg-neon-red-orange active:text-white"
            >
              View Full Gallery
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="w-full py-12 sm:py-16 px-4">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-neon-red-orange/10 to-warm-amber/10 border border-neon-red-orange/30 rounded p-6 sm:p-10 text-center"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-3">
              See You <span className="text-neon-red-orange">Tonight</span>
            </h2>
            <p className="font-paragraph text-xs sm:text-sm text-foreground/80 mb-6">
              No reservations. No dress code. Just show up and vibe.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                to="/visit"
                className="w-full inline-flex items-center justify-center gap-2 bg-neon-red-orange text-white font-paragraph text-xs sm:text-sm uppercase tracking-wider px-4 py-3 sm:py-4 rounded transition-all active:scale-95"
              >
                Find Us
                <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Link>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-transparent border border-neon-red-orange text-neon-red-orange font-paragraph text-xs sm:text-sm uppercase tracking-wider px-4 py-3 sm:py-4 rounded transition-all active:bg-neon-red-orange active:text-white"
              >
                Get In Touch
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
