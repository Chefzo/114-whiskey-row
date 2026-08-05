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
      const result = await BaseCrudService.getAll<GalleryPhotos>('galleryphotos', {}, { limit: 4 });
      setGalleryPhotos(result.items.slice(0, 4));
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const loadEvents = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Events>('events', {}, { limit: 10 });
      
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
            src="https://static.wixstatic.com/media/528274_7bc832b382af4413beb7821cd87c4bce~mv2.jpg"
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

      {/* Utility Strip - Status & Facts */}
      <section className="w-full bg-[#1D1410] border-b border-[#DCD0B8]/20 py-4 sm:py-5" aria-label="Status and facts">
        <div className="w-full max-w-[120rem] mx-auto px-3 sm:px-6 md:px-16">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12">
            <div className="flex-1">
              <p className="font-paragraph text-xs uppercase tracking-widest text-[#DCD0B8]/60 mb-1">Late Night Status</p>
              <p className="font-heading text-sm sm:text-base text-[#EEE5D4]">Open Tue–Sun · 4pm–2am</p>
            </div>
            <div className="flex-1">
              <p className="font-paragraph text-xs uppercase tracking-widest text-[#DCD0B8]/60 mb-1">Access</p>
              <p className="font-heading text-sm sm:text-base text-[#EEE5D4]">Whiskey Row · Walk-ins · 21+</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Paragraph Section - The Room */}
      <section id="about" className="w-full py-12 sm:py-16 md:py-20 bg-black border-b border-[#DCD0B8]/10" aria-label="About One Fourteen">
        <div className="w-full max-w-[120rem] mx-auto px-3 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 sm:mb-8">
              <p className="font-paragraph text-xs uppercase tracking-[0.15em] text-[#F1B653] mb-3">01 / THE ROOM</p>
              <div className="w-8 h-px bg-[#F1B653]/40" />
            </div>
            <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/80 max-w-3xl leading-relaxed">
              One Fourteen is a late night bar located at 114 W Main Street on <a href="/visit" className="text-[#F1B653] hover:text-[#F1B653]/80 transition-colors">Whiskey Row</a> in downtown Louisville, KY. Steps from the Yum Center, we're open Tuesday through Sunday until 2am with DJs, game day sound on, and a steady nightlife crowd. Walk-ins only. 21+.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events - Tonight */}
      <section id="events-section" className="w-full py-12 sm:py-16 md:py-20 bg-black border-t border-[#DCD0B8]/10" aria-label="Upcoming Events">
        <div className="w-full max-w-[120rem] mx-auto px-3 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 sm:mb-12 md:mb-14">
              <p className="font-paragraph text-xs uppercase tracking-[0.15em] text-[#F1B653] mb-3">02 / TONIGHT</p>
              <div className="w-8 h-px bg-[#F1B653]/40" />
            </div>

            {isLoadingEvents ? null : events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-14">
                {events.map((event, index) => (
                  <motion.article
                    key={event._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-black border border-[#DCD0B8]/30 overflow-hidden hover:border-[#F1B653]/60 transition-all duration-300 flex flex-col h-full"
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
                      </div>
                    )}

                    {/* Content Container */}
                    <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6">
                      {/* Day Label */}
                      {event.eventDate && (
                        <p className="font-paragraph text-xs uppercase tracking-widest text-[#DCD0B8]/60 mb-2">
                          {new Date(event.eventDate + 'T00:00:00').toLocaleDateString('en-US', {
                            weekday: 'short',
                            timeZone: 'UTC'
                          })}
                        </p>
                      )}

                      {/* Event Name */}
                      <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-[#EEE5D4] mb-2 line-clamp-2 leading-tight">
                        {event.eventName}
                      </h3>

                      {/* Featured Artist */}
                      {event.featuredArtist && (
                        <p className="font-paragraph text-xs sm:text-sm text-[#F1B653] mb-3 font-semibold">
                          {event.featuredArtist}
                        </p>
                      )}

                      {/* Event Description */}
                      {event.eventDescription && (
                        <p className="font-paragraph text-xs sm:text-sm text-[#DCD0B8]/70 mb-4 line-clamp-2 flex-grow leading-relaxed">
                          {event.eventDescription}
                        </p>
                      )}

                      {/* Event Details - Compact */}
                      <div className="space-y-2 mb-4 border-t border-[#DCD0B8]/20 pt-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            <Calendar size={14} className="text-[#F1B653] flex-shrink-0" />
                            <p className="font-paragraph text-xs text-[#DCD0B8]/80">
                              {event.eventDate
                                ? new Date(event.eventDate + 'T00:00:00').toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    timeZone: 'UTC'
                                  })
                                : 'TBA'}
                            </p>
                          </div>
                          {event.coverCharge && event.coverCharge > 0 && (
                            <p className="font-heading text-xs text-[#F1B653] font-semibold">
                              ${event.coverCharge}
                            </p>
                          )}
                        </div>

                        {(event.startTime || event.endTime) && (
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-[#F1B653] flex-shrink-0" />
                            <p className="font-paragraph text-xs text-[#DCD0B8]/80">
                              {formatTime(event.startTime)}
                              {event.startTime && event.endTime && ' - '}
                              {formatTime(event.endTime)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      {event.callToActionUrl && (
                        <a
                          href={event.callToActionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full bg-[#F1B653] hover:bg-[#F1B653]/90 text-[#1D1410] font-paragraph text-xs uppercase tracking-wider px-3 sm:px-4 py-2 sm:py-2.5 transition-all duration-300 font-semibold"
                        >
                          Learn More
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-14">
                {/* Fallback placeholder cards */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative bg-black border border-[#DCD0B8]/20 p-5 sm:p-6 hover:border-[#F1B653]/40 transition-all duration-300"
                  >
                    <div className="font-paragraph text-xs uppercase tracking-widest text-[#DCD0B8]/60 mb-3">Event {i}</div>
                    <div className="font-heading text-lg sm:text-xl text-[#EEE5D4] mb-2">Coming Soon</div>
                    <p className="font-paragraph text-xs sm:text-sm text-[#DCD0B8]/60">Check back for updates</p>
                  </motion.div>
                ))}
              </div>
            )}

            <Button 
              size="lg"
              className="bg-[#F1B653] hover:bg-[#F1B653]/90 text-[#1D1410] font-paragraph text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto font-semibold"
              onClick={() => window.location.href = '/events'}
            >
              VIEW ALL EVENTS
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview - Inside 114 */}
      <section id="gallery" className="w-full py-12 sm:py-16 md:py-20 bg-black border-t border-[#DCD0B8]/10" aria-label="Inside One Fourteen">
        <div className="w-full max-w-[120rem] mx-auto px-3 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 sm:mb-10 md:mb-12">
              <p className="font-paragraph text-xs uppercase tracking-[0.15em] text-[#F1B653] mb-3">03 / INSIDE 114</p>
              <div className="w-8 h-px bg-[#F1B653]/40" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12" style={{ minHeight: '250px' }}>
              {isLoadingGallery ? null : galleryPhotos.length > 0 ? (
                galleryPhotos.map((photo, index) => (
                  <motion.div
                    key={photo._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="relative aspect-square overflow-hidden"
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
                  {[1, 2, 3, 4].map((i) => {
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="relative aspect-square overflow-hidden bg-black/50"
                      >
                        <Image
                          src="https://static.wixstatic.com/media/528274_f518207e582240d69cafec056473a326~mv2.png?originWidth=384&originHeight=384"
                          alt="Inside One Fourteen, a downtown Louisville bar"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          width={400}
                        />
                      </motion.div>
                    );
                  })}
                </>
              )}
            </div>

            <Button 
              size="lg"
              className="border-2 border-[#DCD0B8] text-[#DCD0B8] hover:bg-[#DCD0B8] hover:text-[#1D1410] font-paragraph text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto transition-all duration-300 font-semibold"
              onClick={() => window.location.href = '/gallery'}
            >
              VIEW FULL GALLERY
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Location & Hours - Find Us */}
      <section id="location" className="w-full py-12 sm:py-16 md:py-20 bg-[#EEE5D4]" aria-label="Location and hours">
        <div className="w-full max-w-[120rem] mx-auto px-3 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 sm:mb-8">
              <p className="font-paragraph text-xs uppercase tracking-[0.15em] text-[#1D1410] mb-3">04 / FIND US</p>
              <div className="w-8 h-px bg-[#F1B653]" />
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="font-heading text-lg sm:text-xl md:text-2xl text-[#1D1410] font-semibold mb-2">
                  114 W Main St
                </p>
                <p className="font-paragraph text-sm sm:text-base text-[#1D1410]/80 mb-4">
                  Whiskey Row, Louisville, KY 40202
                </p>
                <p className="font-heading text-base sm:text-lg text-[#1D1410] font-semibold mb-1">
                  Open Tue–Sun · 4pm–2am
                </p>
                <p className="font-paragraph text-sm sm:text-base text-[#1D1410]/70">
                  Walk-ins only. 21+.
                </p>
              </div>

              <Button 
                size="lg"
                className="bg-[#F1B653] hover:bg-[#F1B653]/90 text-[#1D1410] font-paragraph text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto font-semibold"
                onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
              >
                <MapPin className="w-4 h-4 mr-2" />
                GET DIRECTIONS
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
