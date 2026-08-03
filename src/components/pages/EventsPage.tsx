import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities';
import { formatTime } from '@/lib/time-formatter';
import { handleFetchError } from '@/lib/error-handler';

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Events>('events', {}, { limit: 50 });
        
        // Filter for published events only
        const publishedEvents = items.filter(event => {
          // If publishDate exists and is in the future, don't show it yet
          if (event.publishDate) {
            const publishDate = new Date(event.publishDate);
            if (publishDate > new Date()) {
              return false;
            }
          }
          // If unpublishDate exists and is in the past, don't show it
          if (event.unpublishDate) {
            const unpublishDate = new Date(event.unpublishDate);
            if (unpublishDate < new Date()) {
              return false;
            }
          }
          return true;
        });
        
        // Sort by date (upcoming first)
        const sorted = publishedEvents.sort((a, b) => {
          const dateA = a.eventDate ? new Date(a.eventDate + 'T00:00:00').getTime() : Infinity;
          const dateB = b.eventDate ? new Date(b.eventDate + 'T00:00:00').getTime() : Infinity;
          return dateA - dateB;
        });
        
        setEvents(sorted);
      } catch (error) {
        handleFetchError({ component: 'EventsPage', operation: 'load-events' }, error);
      }
    };

    fetchEvents();
    
    // Refetch data when page becomes visible (user returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchEvents();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const filteredEvents = events.filter((event) => {
    if (!event.eventDate) return filter === 'all';
    
    const eventDate = new Date(event.eventDate + 'T00:00:00');
    eventDate.setHours(0, 0, 0, 0);
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    if (filter === 'upcoming') return eventDate >= now;
    if (filter === 'past') return eventDate < now;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Full Bleed */}
      <section className="relative w-full pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-black/50" />
          <div className="absolute top-10 right-0 w-96 h-96 bg-neon-red-orange/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-warm-amber/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 md:space-y-8"
          >
            <div className="inline-block">
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-paragraph text-xs uppercase tracking-[0.15em] text-neon-red-orange font-bold"
              >
                ✦ Live Entertainment
              </motion.span>
            </div>
            
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block"
              >
                Events &
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block text-neon-red-orange"
              >
                Nightlife
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/80 max-w-3xl leading-relaxed"
            >
              Weekly DJs, game days, and live entertainment at One Fourteen Bar on Whiskey Row. Experience the best nightlife in the heart of the city.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-neon-red-orange rounded-full" />
                <span className="font-paragraph text-sm text-foreground/75">Upcoming Events</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-warm-amber rounded-full" />
                <span className="font-paragraph text-sm text-foreground/75">Live DJs & Artists</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-b border-neon-red-orange/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                Browse Events
              </h2>
              <p className="font-paragraph text-sm text-foreground/60">
                Filter by event status to find what you're looking for
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {['all', 'upcoming', 'past'].map((filterOption) => (
                <motion.button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as 'all' | 'upcoming' | 'past')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`font-paragraph text-xs uppercase tracking-[0.1em] font-bold px-6 py-3 rounded-lg transition-all duration-300 ${
                    filter === filterOption
                      ? 'bg-neon-red-orange text-white shadow-lg shadow-neon-red-orange/40'
                      : 'bg-white/5 text-foreground/70 border border-foreground/20 hover:border-neon-red-orange/60 hover:text-foreground hover:bg-white/10'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-[120rem] mx-auto">
          {filteredEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredEvents.map((event, index) => (
                <motion.article
                  key={event._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-neon-red-orange/20 rounded-xl overflow-hidden hover:border-neon-red-orange/60 transition-all duration-500 hover:shadow-2xl hover:shadow-neon-red-orange/20 flex flex-col h-full backdrop-blur-sm"
                >
                  {/* Image Container */}
                  {event.eventImage && (
                    <div className="relative w-full aspect-video overflow-hidden bg-black/40">
                      <Image
                        src={event.eventImage}
                        alt={event.eventName || 'Event image'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        width={600}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {event.eventType && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-white bg-neon-red-orange/90 backdrop-blur-sm px-4 py-2 rounded-lg font-bold">
                            {event.eventType}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content Container */}
                  <div className="flex flex-col flex-grow p-6 md:p-7">
                    {/* Event Type Badge */}
                    {!event.eventImage && event.eventType && (
                      <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-white bg-neon-red-orange/90 px-4 py-2 rounded-lg mb-4 w-fit font-bold">
                        {event.eventType}
                      </span>
                    )}

                    {/* Event Name */}
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3 line-clamp-2 leading-tight">
                      {event.eventName}
                    </h2>

                    {/* Featured Artist */}
                    {event.featuredArtist && (
                      <div className="mb-4 pb-4 border-b border-neon-red-orange/30">
                        <p className="font-paragraph text-xs uppercase tracking-widest text-neon-red-orange/70 mb-2">
                          Featured Artist
                        </p>
                        <p className="font-heading text-lg md:text-xl font-bold text-neon-red-orange">
                          {event.featuredArtist}
                        </p>
                      </div>
                    )}

                    {/* Event Description */}
                    {event.eventDescription && (
                      <p className="font-paragraph text-sm text-foreground/75 mb-5 line-clamp-2 flex-grow leading-relaxed">
                        {event.eventDescription}
                      </p>
                    )}

                    {/* Event Details */}
                    <div className="space-y-3 mb-6 bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Calendar size={18} className="text-neon-red-orange flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">Date</p>
                            <p className="font-heading text-sm font-bold text-foreground truncate">
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
                            <p className="font-heading text-sm font-bold text-neon-red-orange">
                              ${event.coverCharge}
                            </p>
                          </div>
                        )}
                      </div>

                      {(event.startTime || event.endTime) && (
                        <div className="flex items-center gap-3">
                          <Clock size={18} className="text-neon-red-orange flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">Time</p>
                            <p className="font-heading text-sm font-bold text-foreground truncate">
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
                        className="inline-flex items-center justify-center gap-2 w-full bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-xs uppercase tracking-wider px-4 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,69,0,0.6)] font-bold"
                      >
                        Learn More
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-foreground/60">
                No {filter !== 'all' ? filter : ''} events at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-neon-red-orange/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-2xl border border-neon-red-orange/30 bg-gradient-to-r from-neon-red-orange/10 via-warm-amber/5 to-neon-red-orange/10 p-8 md:p-16 text-center"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-neon-red-orange/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-warm-amber/5 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
                Check Our <span className="text-neon-red-orange">Menu</span>
              </h2>
              <p className="font-paragraph text-base md:text-lg text-foreground/75 mb-8 max-w-2xl mx-auto leading-relaxed">
                View our full drink and food offerings for your next visit. From classic cocktails to signature creations.
              </p>
              <a
                href="https://www.canva.com/design/DAG_2euCblU/ckgz_XuNGPefPUcU3OJPtw/view?utm_content=DAG_2euCblU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf0f4a319b5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-sm uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,69,0,0.6)] font-bold"
              >
                View Menu
                <ExternalLink size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
