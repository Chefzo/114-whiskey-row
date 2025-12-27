import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Zap } from 'lucide-react';
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
      <section className="relative w-full flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden min-h-[90vh]">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/528274_de41e140f4b5413493d5959e97c96f5a~mv2.png?originWidth=1920&originHeight=1024"
            alt="One Fourteen Bar interior"
            className="w-full h-full object-cover opacity-20"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-red-orange/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-warm-amber/8 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-warm-amber/40 rounded-full bg-warm-amber/5 backdrop-blur-sm"
            >
              <Zap size={14} className="text-warm-amber" />
              <span className="font-paragraph text-xs uppercase tracking-widest text-warm-amber">
                Est. Louisville, KY
              </span>
            </motion.div>

            <h1 className="font-heading text-7xl sm:text-8xl md:text-9xl font-bold leading-[1.1] text-foreground mb-6">
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
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-paragraph text-lg sm:text-xl text-foreground/85 mb-10 leading-relaxed px-2 max-w-3xl mx-auto"
          >
            Modern dive. Late-night energy. The spot locals choose before the game and after the show.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none">
              <Link
                to="/events"
                className="w-full inline-flex items-center justify-center gap-3 bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-sm uppercase tracking-wider font-semibold px-8 py-4 rounded-lg transition-all shadow-xl hover:shadow-2xl hover:shadow-neon-red-orange/40"
              >
                See What's On
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none">
              <Link
                to="/visit"
                className="w-full inline-flex items-center justify-center gap-3 bg-transparent border-2 border-neon-red-orange hover:bg-neon-red-orange/10 text-neon-red-orange font-paragraph text-sm uppercase tracking-wider font-semibold px-8 py-4 rounded-lg transition-all"
              >
                Visit Tonight
                <MapPin size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="w-full py-16 sm:py-24 px-4 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="font-heading text-5xl sm:text-6xl font-bold text-foreground leading-tight">
                Not Upscale.<br />
                <span className="text-neon-red-orange">Not Corporate.</span>
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-neon-red-orange to-warm-amber rounded-full" />
              <p className="font-paragraph text-base sm:text-lg text-foreground/85 leading-relaxed">
                We are the grit on Whiskey Row. A place where the music is loud, the drinks are strong, and the vibe is unapologetically real.
              </p>
              <p className="font-paragraph text-sm sm:text-base text-foreground/70">
                No pretense. No dress code. Just good times and real energy.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div variants={itemVariants} className="relative h-80 sm:h-96 rounded-xl overflow-hidden group">
              <Image
                src="https://static.wixstatic.com/media/528274_88f8eb54d37a4c2299daf3b1c414aae2~mv2.png?originWidth=576&originHeight=960"
                alt="Neon lights and bar atmosphere"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                width={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 border border-neon-red-orange/20 rounded-xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

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
              DJs, game days, and late-night energy. Check what's happening at One Fourteen.
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
              className="text-center py-12"
            >
              <p className="font-paragraph text-base text-foreground/60">
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
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section className="w-full py-16 sm:py-24 px-4 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2 className="font-heading text-5xl sm:text-6xl font-bold text-foreground mb-3">
              The <span className="text-neon-red-orange">Vibe</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground/70">
              Real moments. Real energy. This is what One Fourteen looks like.
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
                    {photo.caption && (
                      <p className="absolute bottom-3 left-3 right-3 font-paragraph text-xs sm:text-sm text-foreground line-clamp-2">
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

      {/* ===== CTA SECTION ===== */}
      <section className="w-full py-16 sm:py-24 px-4">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-r from-neon-red-orange/15 via-warm-amber/10 to-neon-red-orange/15 border border-neon-red-orange/30 rounded-2xl p-8 sm:p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-heading text-5xl sm:text-6xl font-bold text-foreground mb-4">
                See You <span className="text-neon-red-orange">Tonight</span>
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                No reservations. No dress code. Just show up and vibe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none">
                  <Link
                    to="/visit"
                    className="w-full inline-flex items-center justify-center gap-3 bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-sm uppercase tracking-wider font-semibold px-8 py-4 rounded-lg transition-all shadow-xl hover:shadow-2xl hover:shadow-neon-red-orange/40"
                  >
                    Find Us
                    <MapPin size={18} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none">
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-3 bg-transparent border-2 border-neon-red-orange hover:bg-neon-red-orange/10 text-neon-red-orange font-paragraph text-sm uppercase tracking-wider font-semibold px-8 py-4 rounded-lg transition-all"
                  >
                    Get In Touch
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
