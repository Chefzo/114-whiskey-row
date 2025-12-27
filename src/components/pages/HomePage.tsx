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
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hero-home-bg"
            alt="114 Whiskey Row bar interior"
            className="w-full h-full object-cover opacity-30"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block font-paragraph text-sm uppercase tracking-widest text-warm-amber mb-6">
              Est. Louisville, KY
            </span>
            <h1 className="font-heading text-7xl sm:text-8xl md:text-9xl font-bold leading-tight text-foreground mb-6">
              114
              <br />
              <span className="text-neon-red-orange">Whiskey Row</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-lg sm:text-xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Modern dive. Late-night energy. The spot locals choose before the game and after the show.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-neon-red-orange text-white font-paragraph text-sm uppercase tracking-wider px-8 py-4 rounded transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.5)] hover:scale-105"
            >
              See What's On
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/visit"
              className="inline-flex items-center gap-2 bg-transparent border border-neon-red-orange text-neon-red-orange font-paragraph text-sm uppercase tracking-wider px-8 py-4 rounded transition-all hover:bg-neon-red-orange hover:text-white"
            >
              Visit Tonight
              <MapPin size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-neon-red-orange/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-neon-red-orange rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text */}
            <motion.div variants={itemVariants}>
              <h2 className="font-heading text-5xl sm:text-6xl font-bold text-foreground mb-6">
                Not Upscale.<br />
                <span className="text-neon-red-orange">Not Corporate.</span>
              </h2>
              <div className="w-16 h-1 bg-neon-red-orange mb-8" />
              <p className="font-paragraph text-lg text-foreground/80 mb-6 leading-relaxed">
                We are the grit on Whiskey Row. A place where the music is loud, the drinks are strong, and the vibe is unapologetically real.
              </p>
              <p className="font-paragraph text-base text-foreground/70">
                No pretense. No dress code. Just good times and real energy.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div variants={itemVariants} className="relative h-[500px] rounded overflow-hidden">
              <Image
                src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=about-image"
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
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-heading text-5xl sm:text-6xl font-bold text-foreground mb-4">
              What's <span className="text-neon-red-orange">On</span>
            </h2>
            <p className="font-paragraph text-lg text-foreground/70">
              DJs, game days, and late-night energy. Check what's happening at 114.
            </p>
          </motion.div>

          {upcomingEvents.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event._id}
                  variants={itemVariants}
                  className="group relative bg-black/40 border border-neon-red-orange/20 rounded overflow-hidden hover:border-neon-red-orange/60 transition-all"
                >
                  {/* Image */}
                  {event.eventImage && (
                    <div className="aspect-[16/10] overflow-hidden">
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
                      <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-warm-amber mb-3 px-2 py-1 bg-warm-amber/10 rounded">
                        {event.eventType}
                      </span>
                    )}
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                      {event.eventName}
                    </h3>
                    {event.eventDate && (
                      <div className="flex items-center gap-2 text-foreground/70 mb-3">
                        <Calendar size={16} className="text-neon-red-orange" />
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
              <p className="font-paragraph text-foreground/60">
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
              className="inline-flex items-center gap-2 bg-transparent border border-neon-red-orange text-neon-red-orange font-paragraph text-sm uppercase tracking-wider px-8 py-3 rounded transition-all hover:bg-neon-red-orange hover:text-white"
            >
              View All Events
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-heading text-5xl sm:text-6xl font-bold text-foreground mb-4">
              The <span className="text-neon-red-orange">Vibe</span>
            </h2>
            <p className="font-paragraph text-lg text-foreground/70">
              Real moments. Real energy. This is what 114 looks like.
            </p>
          </motion.div>

          {galleryPhotos.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {galleryPhotos.map((photo) => (
                <motion.div
                  key={photo._id}
                  variants={itemVariants}
                  className="group relative aspect-square overflow-hidden rounded bg-black/40 border border-neon-red-orange/20 hover:border-neon-red-orange/60 transition-all"
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
                      <p className="absolute bottom-4 left-4 right-4 font-paragraph text-sm text-foreground">
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
              <p className="font-paragraph text-foreground/60">
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
              className="inline-flex items-center gap-2 bg-transparent border border-neon-red-orange text-neon-red-orange font-paragraph text-sm uppercase tracking-wider px-8 py-3 rounded transition-all hover:bg-neon-red-orange hover:text-white"
            >
              View Full Gallery
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-neon-red-orange/10 to-warm-amber/10 border border-neon-red-orange/30 rounded p-12 sm:p-16 text-center"
          >
            <h2 className="font-heading text-5xl sm:text-6xl font-bold text-foreground mb-6">
              See You <span className="text-neon-red-orange">Tonight</span>
            </h2>
            <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              No reservations. No dress code. Just show up and vibe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/visit"
                className="inline-flex items-center justify-center gap-2 bg-neon-red-orange text-white font-paragraph text-sm uppercase tracking-wider px-8 py-4 rounded transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.5)]"
              >
                Find Us
                <MapPin size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-neon-red-orange text-neon-red-orange font-paragraph text-sm uppercase tracking-wider px-8 py-4 rounded transition-all hover:bg-neon-red-orange hover:text-white"
              >
                Get In Touch
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
