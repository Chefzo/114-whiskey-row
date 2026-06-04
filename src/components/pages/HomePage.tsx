import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Clock, ExternalLink } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { GalleryPhotos, Events } from '@/entities';

export default function HomePage() {
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotos[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const [events, setEvents] = useState<Events[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    loadGallery();
    loadEvents();
  }, []);

  const loadGallery = async () => {
    try {
      const result = await BaseCrudService.getAll<GalleryPhotos>('galleryphotos', [], { limit: 4 });
      setGalleryPhotos(result.items.slice(0, 4));
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const loadEvents = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Events>('events');
      
      // Sort by date (upcoming first)
      const sorted = items.sort((a, b) => {
        const dateA = a.eventDate ? new Date(a.eventDate + 'T00:00:00').getTime() : Infinity;
        const dateB = b.eventDate ? new Date(b.eventDate + 'T00:00:00').getTime() : Infinity;
        return dateA - dateB;
      });
      
      // Filter upcoming events
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      
      const upcomingEvents = sorted.filter((event) => {
        if (!event.eventDate) return false;
        const eventDate = new Date(event.eventDate + 'T00:00:00');
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= now;
      });
      
      setEvents(upcomingEvents.slice(0, 3));
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const formatTime = (timeValue: any) => {
    if (!timeValue) return '';
    
    if (typeof timeValue === 'string') {
      const militaryMatch = timeValue.match(/^(\d{1,2}):?(\d{2})(?::(\d{2}))?(?:\.(\d{3}))?$/);
      if (militaryMatch) {
        let hours = parseInt(militaryMatch[1], 10);
        const minutes = militaryMatch[2];
        
        const today = new Date();
        today.setHours(hours, parseInt(minutes, 10), 0, 0);
        
        const etTime = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'America/New_York'
        }).format(today);
        
        return `${etTime} ET`;
      }
      return timeValue;
    }
    
    return '';
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section - Optimized for mobile performance */}
      <section className="relative w-full min-h-screen sm:min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 sm:pt-20 md:pt-16" aria-label="Hero section">
        <div className="absolute inset-0 bg-black z-0" />
        <div className="absolute inset-0 z-5 opacity-20">
          <Image
            src="https://static.wixstatic.com/media/528274_c3a7f070ea8545b4811fd5e5d93c3ef7~mv2.png"
            alt="Faded background image of One Fourteen bar"
            className="w-full h-full object-cover"
            width={1920}
          />
        </div>
        
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-3 sm:px-6 md:px-16 py-8 sm:py-12 md:py-20">
          {/* Hero headline renders immediately without animation on mobile */}
          <div className="max-w-5xl">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-3 sm:mb-4 md:mb-6 leading-[1.1] tracking-tight">
              A LATE ROOM ON WHISKEY ROW.
            </h1>
            
            <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/70 mb-6 sm:mb-8 md:mb-10 tracking-wide leading-relaxed">
              Walk-ins only. 21+.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Button 
                size="lg"
                className="bg-neon-red-orange hover:bg-neon-red-orange/90 text-black font-paragraph text-sm sm:text-base px-4 sm:px-8 py-4 sm:py-6 h-auto w-full sm:w-auto"
                onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO Paragraph Section */}
      <section className="w-full py-8 sm:py-12 md:py-16 bg-black border-b border-foreground/10" aria-label="About One Fourteen">
        <div className="w-full max-w-[120rem] mx-auto px-3 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/80 max-w-3xl leading-relaxed">
              One Fourteen is a late night bar located at 114 W Main Street on <a href="/visit" className="text-neon-red-orange hover:underline">Whiskey Row</a> in downtown Louisville, KY. Steps from the Yum Center, we're open Tuesday through Sunday until 2am with DJs, game day sound on, and a steady nightlife crowd. Walk-ins only. 21+.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Events Carousel */}
      <section id="events-section" className="w-full py-16 sm:py-20 md:py-24 bg-black border-t border-foreground/10" aria-label="The Events Carousel">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 sm:mb-14 md:mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 sm:mb-4">
                The Events Carousel
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-foreground/60 max-w-2xl">
                Experience our nightly lineup of DJs, live entertainment, and special events.
              </p>
            </div>

            {isLoadingEvents ? null : events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16">
                {events.map((event, index) => (
                  <motion.article
                    key={event._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-black/60 border border-neon-red-orange/30 rounded-lg overflow-hidden hover:border-neon-red-orange/80 transition-all duration-300 hover:shadow-lg hover:shadow-neon-red-orange/20 flex flex-col h-full"
                  >
                    {/* Image Container */}
                    {event.eventImage && (
                      <div className="relative w-full aspect-video overflow-hidden bg-black/40">
                        <Image
                          src={event.eventImage}
                          alt={event.eventName || 'Event image'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={500}
                        />
                        {event.eventType && (
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                            <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-white bg-neon-red-orange px-2 sm:px-3 py-1 sm:py-1.5 rounded">
                              {event.eventType}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Content Container */}
                    <div className="flex flex-col flex-grow p-4 sm:p-6">
                      {/* Event Type Badge */}
                      {!event.eventImage && event.eventType && (
                        <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-white bg-neon-red-orange px-2 sm:px-3 py-1 sm:py-1.5 rounded mb-3 sm:mb-4 w-fit">
                          {event.eventType}
                        </span>
                      )}

                      {/* Event Name */}
                      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2 line-clamp-3 leading-tight">
                        {event.eventName}
                      </h2>

                      {/* Featured Artist */}
                      {event.featuredArtist && (
                        <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-neon-red-orange/30">
                          <p className="font-paragraph text-xs uppercase tracking-widest text-neon-red-orange/70 mb-1">
                            Featured
                          </p>
                          <p className="font-heading text-lg sm:text-xl font-bold text-neon-red-orange">
                            {event.featuredArtist}
                          </p>
                        </div>
                      )}

                      {/* Event Description */}
                      {event.eventDescription && (
                        <p className="font-paragraph text-xs sm:text-sm text-foreground/75 mb-3 sm:mb-4 line-clamp-2 flex-grow leading-relaxed">
                          {event.eventDescription}
                        </p>
                      )}

                      {/* Event Details */}
                      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 bg-black/30 rounded-lg p-3 sm:p-4">
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Calendar size={16} className="text-neon-red-orange flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">Date</p>
                              <p className="font-heading text-xs sm:text-sm font-bold text-foreground truncate">
                                {event.eventDate
                                  ? new Date(event.eventDate + 'T00:00:00').toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                      timeZone: 'UTC'
                                    })
                                  : 'TBA'}
                              </p>
                            </div>
                          </div>
                          {event.coverCharge && event.coverCharge > 0 && (
                            <div className="text-right flex-shrink-0">
                              <p className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">Cover</p>
                              <p className="font-heading text-xs sm:text-sm font-bold text-neon-red-orange">
                                ${event.coverCharge}
                              </p>
                            </div>
                          )}
                        </div>

                        {(event.startTime || event.endTime) && (
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-neon-red-orange flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">Time</p>
                              <p className="font-heading text-xs sm:text-sm font-bold text-foreground truncate">
                                {formatTime(event.startTime)}
                                {event.startTime && event.endTime && ' - '}
                                {formatTime(event.endTime)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      {event.callToActionUrl && (
                        <a
                          href={event.callToActionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-xs uppercase tracking-wider px-3 sm:px-4 py-2 sm:py-3 rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,69,0,0.5)] font-bold"
                        >
                          Learn More
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16">
                {/* Fallback placeholder cards */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative bg-gradient-to-br from-foreground/5 to-transparent border border-foreground/10 rounded-lg p-6 sm:p-8 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="absolute top-0 left-0 w-1 h-12 bg-primary rounded-r" />
                    <div className="font-paragraph text-sm sm:text-base text-primary uppercase tracking-widest mb-3">Event {i}</div>
                    <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">Coming Soon</div>
                    <p className="font-paragraph text-sm sm:text-base text-foreground/60">Check back for updates</p>
                  </motion.div>
                ))}
              </div>
            )}

            <Button 
              size="lg"
              className="bg-neon-red-orange hover:bg-neon-red-orange/90 text-black font-paragraph text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 h-auto w-full sm:w-auto"
              onClick={() => window.location.href = '/events'}
            >
              VIEW ALL EVENTS
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview - Inside One Fourteen */}
      <section className="w-full py-16 sm:py-20 md:py-24 bg-[#1a1a1a]" aria-label="Inside One Fourteen">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 sm:mb-10 md:mb-12">
              Inside One Fourteen
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12" style={{ minHeight: '250px' }}>
              {isLoadingGallery ? null : galleryPhotos.length > 0 ? (
                galleryPhotos.map((photo, index) => (
                  <motion.div
                    key={photo._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="relative aspect-square overflow-hidden rounded-lg"
                  >
                    <Image
                      src={photo.photo || 'https://static.wixstatic.com/media/528274_9a5eac4526fd48bca44e841c71d9fe4f~mv2.png?originWidth=384&originHeight=384'}
                      alt={photo.altText || 'Late-night crowd at One Fourteen bar on Whiskey Row in Louisville'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      width={400}
                    />
                  </motion.div>
                ))
              ) : (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="relative aspect-square overflow-hidden bg-black/50 rounded-lg"
                    >
                      <Image
                        src="https://static.wixstatic.com/media/528274_f518207e582240d69cafec056473a326~mv2.png?originWidth=384&originHeight=384"
                        alt="Inside One Fourteen, a downtown Louisville bar"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        width={400}
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            <Button 
              size="lg"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-black font-paragraph text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 h-auto w-full sm:w-auto"
              onClick={() => window.location.href = '/gallery'}
            >
              VIEW FULL GALLERY
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="w-full py-16 sm:py-20 md:py-24 bg-black border-t border-foreground/10" aria-label="Location and hours">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <p className="font-paragraph text-lg sm:text-xl md:text-2xl text-foreground tracking-wide">
                114 W Main St, Whiskey Row, Louisville, KY<br />
                Open Tue–Sun · 4pm–2am
              </p>
              <Button 
                variant="ghost"
                className="text-foreground/60 hover:text-foreground font-paragraph text-base sm:text-lg px-0 py-2 h-auto hover:bg-transparent mt-6"
                onClick={() => window.location.href = '/story'}
              >
                our story
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
