import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities';

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

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
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const { items } = await BaseCrudService.getAll<any>('Events/Events');
      
      // Map Wix Events app fields to our Events interface
      const mappedEvents: Events[] = items.map((item: any) => ({
        _id: item._id,
        _createdDate: item._createdDate,
        _updatedDate: item._updatedDate,
        eventName: item.title,
        location: item.location,
        eventType: item.eventType,
        eventDate: item.eventDate,
        startTime: item.startTime,
        endTime: item.endTime,
        eventDescription: item.description,
        eventImage: item.image,
        callToActionUrl: item.url,
      }));
      
      // Sort by date (upcoming first)
      const sorted = mappedEvents.sort((a, b) => {
        const dateA = a.eventDate ? new Date(a.eventDate).getTime() : Infinity;
        const dateB = b.eventDate ? new Date(b.eventDate).getTime() : Infinity;
        return dateA - dateB;
      });
      
      setEvents(sorted);
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    if (!event.eventDate) return filter === 'all';
    
    const eventDate = new Date(event.eventDate);
    // Set to start of day for comparison
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
      // Check if it's in military time format (HH:MM or HHMM)
      const militaryMatch = timeValue.match(/^(\d{1,2}):?(\d{2})$/);
      if (militaryMatch) {
        let hours = parseInt(militaryMatch[1], 10);
        const minutes = militaryMatch[2];
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
      }
      return timeValue;
    }
    
    return '';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Mobile Fixed Get Directions Button - Deferred animation for performance */}
      <button
        onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
        className="fixed bottom-6 left-4 right-4 md:hidden z-40 flex items-center justify-center gap-2 bg-neon-red-orange hover:bg-neon-red-orange/90 text-black font-paragraph text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-lg transition-all shadow-xl hover:shadow-2xl hover:shadow-neon-red-orange/40"
      >
        <MapPin size={16} />
        Get Directions
      </button>

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
              What's <span className="text-neon-red-orange">On</span>
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-foreground/70 max-w-3xl">
              Weekly DJs, game days, and live entertainment at One Fourteen Bar on Whiskey Row.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mt-4 max-w-3xl">
              Some nights spill into the backyard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex gap-6 pb-4">
            <button
              onClick={() => setFilter('all')}
              className={`font-paragraph text-xs uppercase tracking-wider transition-all ${
                filter === 'all'
                  ? 'text-foreground'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`font-paragraph text-xs uppercase tracking-wider transition-all ${
                filter === 'upcoming'
                  ? 'text-foreground'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`font-paragraph text-xs uppercase tracking-wider transition-all ${
                filter === 'past'
                  ? 'text-foreground'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
            >
              Past
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-[120rem] mx-auto">
          {filteredEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <div className="absolute top-4 left-4">
                          <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-white bg-neon-red-orange px-3 py-1.5 rounded">
                            {event.eventType}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content Container */}
                  <div className="flex flex-col flex-grow p-6">
                    {!event.eventImage && event.eventType && (
                      <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-white bg-neon-red-orange px-3 py-1.5 rounded mb-3 w-fit">
                        {event.eventType}
                      </span>
                    )}

                    <h2 className="font-heading text-2xl font-bold text-foreground mb-3 line-clamp-2">
                      {event.eventName}
                    </h2>

                    {event.eventDescription && (
                      <p className="font-paragraph text-sm text-foreground/70 mb-4 line-clamp-2 flex-grow">
                        {event.eventDescription}
                      </p>
                    )}

                    {/* Event Details */}
                    <div className="space-y-2 mb-6 border-t border-neon-red-orange/20 pt-4">
                      {event.eventDate && (
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Calendar size={16} className="text-neon-red-orange flex-shrink-0" />
                          <span className="font-paragraph text-xs">
                            {new Date(event.eventDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      )}

                      {(event.startTime || event.endTime) && (
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Clock size={16} className="text-neon-red-orange flex-shrink-0" />
                          <span className="font-paragraph text-xs">
                            {formatTime(event.startTime)}
                            {event.startTime && event.endTime && ' - '}
                            {formatTime(event.endTime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    {event.callToActionUrl && (
                      <a
                        href={event.callToActionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-xs uppercase tracking-wider px-4 py-3 rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,69,0,0.5)]"
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
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-foreground/60">
                No {filter !== 'all' ? filter : ''} events at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Menu Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-neon-red-orange/10 to-warm-amber/10 border border-neon-red-orange/30 rounded-lg p-8 md:p-12 text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Check Our <span className="text-neon-red-orange">Menu</span>
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              View our full drink and food offerings for your next visit.
            </p>
            <a
              href="https://www.canva.com/design/DAG_2euCblU/ckgz_XuNGPefPUcU3OJPtw/view?utm_content=DAG_2euCblU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf0f4a319b5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-sm uppercase tracking-wider px-8 py-4 rounded transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.5)]"
            >
              View Menu
              <ExternalLink size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
