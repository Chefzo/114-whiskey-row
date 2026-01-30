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
      const { items } = await BaseCrudService.getAll<Events>('events');
      
      // Sort by date (upcoming first)
      const sorted = items.sort((a, b) => {
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
    const now = new Date();
    
    if (filter === 'upcoming') return eventDate >= now;
    if (filter === 'past') return eventDate < now;
    return true;
  });

  const formatTime = (timeValue: any) => {
    if (!timeValue) return '';
    
    // Handle if it's already a formatted string
    if (typeof timeValue === 'string') {
      return timeValue;
    }
    
    return '';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Mobile Fixed Get Directions Button */}
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

      {/* Events Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-[120rem] mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.article
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-black/40 border border-neon-red-orange/20 rounded overflow-hidden hover:border-neon-red-orange/60 transition-all"
                >
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Image */}
                    {event.eventImage && (
                      <div className="md:col-span-2 aspect-square md:aspect-auto overflow-hidden">
                        <Image
                          src={event.eventImage}
                          alt={event.eventName || 'Event image'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={400}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className={`${event.eventImage ? 'md:col-span-3' : 'md:col-span-5'} p-8`}>
                      {event.eventType && (
                        <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-warm-amber mb-3 px-3 py-1 bg-warm-amber/10 rounded">
                          {event.eventType}
                        </span>
                      )}

                      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        {event.eventName}
                      </h2>

                      {event.eventDescription && (
                        <p className="font-paragraph text-base text-foreground/80 mb-6">
                          {event.eventDescription}
                        </p>
                      )}

                      <div className="space-y-3">
                        {event.eventDate && (
                          <div className="flex items-center gap-3 text-foreground/70">
                            <Calendar size={18} className="text-neon-red-orange flex-shrink-0" />
                            <span className="font-paragraph text-sm">
                              {new Date(event.eventDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        )}

                        {(event.startTime || event.endTime) && (
                          <div className="flex items-center gap-3 text-foreground/70">
                            <Clock size={18} className="text-neon-red-orange flex-shrink-0" />
                            <span className="font-paragraph text-sm">
                              {formatTime(event.startTime)}
                              {event.startTime && event.endTime && ' - '}
                              {formatTime(event.endTime)}
                            </span>
                          </div>
                        )}
                      </div>

                      {event.callToActionUrl && (
                        <a
                          href={event.callToActionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-6 bg-neon-red-orange text-white font-paragraph text-sm uppercase tracking-wider px-6 py-3 rounded transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.5)]"
                        >
                          Learn More
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Calendar size={64} className="text-neon-red-orange/30 mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                No Events Found
              </h3>
              <p className="font-paragraph text-foreground/60">
                {filter === 'upcoming' && 'Check back soon for upcoming events.'}
                {filter === 'past' && 'No past events to display.'}
                {filter === 'all' && 'No events available at the moment.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
