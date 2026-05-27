import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities';

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    const fetchEvents = async () => {
      const { items } = await BaseCrudService.getAll<Events>('events');
      
      // Sort by date (upcoming first)
      const sorted = items.sort((a, b) => {
        const dateA = a.eventDate ? new Date(a.eventDate + 'T00:00:00').getTime() : Infinity;
        const dateB = b.eventDate ? new Date(b.eventDate + 'T00:00:00').getTime() : Infinity;
        return dateA - dateB;
      });
      
      setEvents(sorted);
    };

    fetchEvents();
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

  const formatTime = (timeValue: any) => {
    if (!timeValue) return '';
    
    // Handle if it's already a formatted string
    if (typeof timeValue === 'string') {
      // Check if it's in military time format (HH:MM:SS.mmm or HH:MM or HHMM)
      const militaryMatch = timeValue.match(/^(\d{1,2}):?(\d{2})(?::(\d{2}))?(?:\.(\d{3}))?$/);
      if (militaryMatch) {
        let hours = parseInt(militaryMatch[1], 10);
        const minutes = militaryMatch[2];
        
        // Create a date object for today to format with timezone
        const today = new Date();
        today.setHours(hours, parseInt(minutes, 10), 0, 0);
        
        // Format time in ET timezone
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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-8 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-black/40" />
          <div className="absolute top-0 right-0 w-40 sm:w-72 h-40 sm:h-72 bg-neon-red-orange/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-warm-amber/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-2 md:space-y-4"
          >
            <div className="inline-block">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-paragraph text-xs uppercase tracking-widest text-neon-red-orange font-bold"
              >
                ✦ Live Entertainment
              </motion.span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block"
              >
                Events &
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-neon-red-orange"
              >
                Nightlife
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-paragraph text-sm sm:text-base md:text-xl text-foreground/75 max-w-2xl leading-relaxed"
            >
              Weekly DJs, game days, and live entertainment at One Fourteen Bar on Whiskey Row.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-red-orange rounded-full" />
                <span className="font-paragraph text-xs text-foreground/70">Upcoming Events</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warm-amber rounded-full" />
                <span className="font-paragraph text-xs text-foreground/70">Live DJs & Artists</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-16 border-b border-neon-red-orange/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8"
          >
            <div>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                Browse Events
              </h2>
              <p className="font-paragraph text-xs sm:text-sm text-foreground/60">
                Filter by event status to find what you're looking for
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['all', 'upcoming', 'past'].map((filterOption) => (
                <motion.button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as 'all' | 'upcoming' | 'past')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`font-paragraph text-xs uppercase tracking-widest font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 ${
                    filter === filterOption
                      ? 'bg-neon-red-orange text-white shadow-lg shadow-neon-red-orange/30'
                      : 'bg-black/40 text-foreground/70 border border-foreground/20 hover:border-neon-red-orange/50 hover:text-foreground'
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
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:pb-24">
        <div className="max-w-[120rem] mx-auto">
          {filteredEvents.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredEvents.map((event, index) => (
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

                    {/* Event Name - Enhanced */}
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2 line-clamp-3 leading-tight">
                      {event.eventName}
                    </h2>

                    {/* Featured Artist - Enhanced Visibility */}
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

                    {/* Event Details - Enhanced Layout */}
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
          )}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <p className="font-paragraph text-base sm:text-lg text-foreground/60">
                No {filter !== 'all' ? filter : ''} events at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Menu Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-neon-red-orange/10 to-warm-amber/10 border border-neon-red-orange/30 rounded-lg p-6 sm:p-8 md:p-12 text-center"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Check Our <span className="text-neon-red-orange">Menu</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
              View our full drink and food offerings for your next visit.
            </p>
            <a
              href="https://www.canva.com/design/DAG_2euCblU/ckgz_XuNGPefPUcU3OJPtw/view?utm_content=DAG_2euCblU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf0f4a319b5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-4 rounded transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.5)]"
            >
              View Menu
              <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
