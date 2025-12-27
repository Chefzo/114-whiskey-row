// HPI 1.6-G
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Clock, Music, Beer, Instagram, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Events, GalleryPhotos } from '@/entities';

// --- MANDATORY ANIMATED ELEMENT COMPONENT ---
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, threshold = 0.1, delay = '0s' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      className={`reveal-on-scroll ${className || ''}`}
      style={{ transitionDelay: delay } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// --- CUSTOM CURSOR COMPONENT ---
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed w-8 h-8 border border-neon-red-orange rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block transition-transform duration-100 ease-out"
    />
  );
};

export default function HomePage() {
  // --- DATA FIDELITY PROTOCOL: CANONICAL DATA SOURCES ---
  const [upcomingEvents, setUpcomingEvents] = useState<Events[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { items: events } = await BaseCrudService.getAll<Events>('events');
      const { items: photos } = await BaseCrudService.getAll<GalleryPhotos>('galleryphotos');
      
      // Preserve original logic: Sort events by date and get the next 3
      const sortedEvents = events
        .filter(event => event.eventDate && new Date(event.eventDate) >= new Date())
        .sort((a, b) => new Date(a.eventDate!).getTime() - new Date(b.eventDate!).getTime())
        .slice(0, 3);
      
      setUpcomingEvents(sortedEvents);
      setGalleryPhotos(photos.slice(0, 6));
    };

    fetchData();
  }, []);

  // --- SCROLL PROGRESS FOR PARALLAX ---
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-clip selection:bg-neon-red-orange selection:text-white">
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .neon-text-glow {
          text-shadow: 0 0 10px rgba(255, 69, 0, 0.5), 0 0 20px rgba(255, 69, 0, 0.3);
        }
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        .clip-diagonal-reverse {
          clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
        }
        .marquee-container {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      <CustomCursor />
      <Header />

      {/* --- GLOBAL GRAIN OVERLAY --- */}
      <div className="fixed inset-0 pointer-events-none z-[9998] grain-overlay opacity-40 mix-blend-overlay" />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Background */}
        <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/528274_35252937b8844d3aa9c84f25f80ad280~mv2.png?originWidth=1920&originHeight=1024"
            alt="Dark atmospheric bar interior with neon lights"
            className="w-full h-full object-cover opacity-60"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background" />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <AnimatedElement className="mb-4">
            <span className="font-paragraph text-neon-red-orange tracking-[0.2em] text-sm md:text-base uppercase border border-neon-red-orange/30 px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm">
              Est. Louisville, KY
            </span>
          </AnimatedElement>
          
          <h1 className="font-heading text-7xl md:text-9xl lg:text-[11rem] leading-[0.85] font-bold tracking-tighter text-white mix-blend-overlay opacity-90 mb-8">
            <AnimatedElement delay="0.1s">ONE</AnimatedElement>
            <AnimatedElement delay="0.2s" className="text-neon-red-orange neon-text-glow">FOURTEEN</AnimatedElement>
            <AnimatedElement delay="0.3s">WHISKEY ROW</AnimatedElement>
          </h1>

          <AnimatedElement delay="0.5s" className="max-w-xl mx-auto mb-12">
            <p className="font-paragraph text-lg md:text-xl text-gray-300 leading-relaxed">
              Modern dive. Late-night energy. <br/>
              The spot locals choose before the game and after the show.
            </p>
          </AnimatedElement>

          <AnimatedElement delay="0.7s" className="flex flex-col sm:flex-row gap-6">
            <Link 
              to="/events" 
              className="group relative px-8 py-4 bg-neon-red-orange text-white font-heading font-bold uppercase tracking-wider overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                See What's On <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 mix-blend-difference" />
            </Link>
            <Link 
              to="/visit" 
              className="group px-8 py-4 border border-white/20 text-white font-heading font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
            >
              Visit Tonight
            </Link>
          </AnimatedElement>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="font-paragraph text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-neon-red-orange to-transparent" />
        </motion.div>
      </section>

      {/* --- MANIFESTO / VIBE SECTION (STICKY) --- */}
      <section className="relative py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sticky Title */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <AnimatedElement>
                <h2 className="font-heading text-5xl md:text-6xl font-bold leading-none mb-6">
                  NOT <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px #FF4500' }}>UPSCALE.</span><br/>
                  NOT <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px #FF4500' }}>CORPORATE.</span>
                </h2>
                <div className="w-24 h-1 bg-neon-red-orange mb-8" />
                <p className="font-paragraph text-gray-400 text-sm uppercase tracking-widest">
                  The Anti-Tourist Trap
                </p>
              </AnimatedElement>
            </div>

            {/* Scrolling Content */}
            <div className="lg:col-span-8 space-y-24">
              <AnimatedElement className="group">
                <p className="font-heading text-2xl md:text-4xl leading-tight text-gray-200">
                  We are the grit on Whiskey Row. A place where the music is loud, the drinks are strong, and the vibe is unapologetically real.
                </p>
              </AnimatedElement>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatedElement delay="0.2s">
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <Image 
                      src="https://static.wixstatic.com/media/528274_e4221517eb594f6c9272ee4c169be2e7~mv2.png?originWidth=576&originHeight=704"
                      alt="Neon sign glowing in dark bar"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      width={600}
                    />
                    <div className="absolute inset-0 bg-neon-red-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  </div>
                  <h3 className="font-heading text-xl mt-4 text-neon-red-orange">Neon Nights</h3>
                  <p className="font-paragraph text-sm text-gray-400 mt-2">Bathed in the glow of red and amber.</p>
                </AnimatedElement>

                <AnimatedElement delay="0.4s" className="md:mt-24">
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <Image 
                      src="https://static.wixstatic.com/media/528274_1e3b18178c724c0d93259c4c736b07bf~mv2.png?originWidth=576&originHeight=704"
                      alt="Friends toasting drinks"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      width={600}
                    />
                    <div className="absolute inset-0 bg-neon-red-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  </div>
                  <h3 className="font-heading text-xl mt-4 text-neon-red-orange">Real Energy</h3>
                  <p className="font-paragraph text-sm text-gray-400 mt-2">No pretense. Just good times.</p>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EVENTS SECTION (DYNAMIC) --- */}
      <section className="relative py-32 bg-[#1a1a1a] clip-diagonal">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <AnimatedElement>
              <h2 className="font-heading text-6xl md:text-8xl font-bold text-white opacity-90">
                WHAT'S <span className="text-neon-red-orange">ON</span>
              </h2>
            </AnimatedElement>
            <AnimatedElement delay="0.2s">
              <Link to="/events" className="flex items-center gap-2 font-paragraph text-sm uppercase tracking-widest hover:text-neon-red-orange transition-colors">
                Full Calendar <ChevronRight className="w-4 h-4" />
              </Link>
            </AnimatedElement>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <AnimatedElement key={event._id} delay={`${index * 0.1}s`}>
                  <Link to="/events" className="group block h-full">
                    <article className="relative h-full bg-[#222] border border-white/5 hover:border-neon-red-orange/50 transition-colors duration-300 flex flex-col">
                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 z-20 bg-neon-red-orange text-white px-3 py-2 font-paragraph text-xs font-bold uppercase tracking-wider">
                        {event.eventDate && new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>

                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {event.eventImage ? (
                          <Image
                            src={event.eventImage}
                            alt={event.eventName || 'Event'}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            width={600}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <Music className="w-12 h-12 text-gray-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-neon-red-orange font-paragraph text-xs uppercase tracking-widest mb-2">
                          {event.eventType || 'Event'}
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-neon-red-orange transition-colors">
                          {event.eventName}
                        </h3>
                        {event.eventDescription && (
                          <p className="font-paragraph text-sm text-gray-400 line-clamp-3 mb-6 flex-grow">
                            {event.eventDescription}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs font-paragraph text-gray-500 uppercase tracking-wider mt-auto pt-4 border-t border-white/5">
                          <Clock className="w-3 h-3" />
                          {event.startTime ? new Date(event.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Late'}
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
              <p className="font-paragraph text-gray-500">No upcoming events listed right now. Drop by anyway.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- GAME DAY ENERGY (FULL BLEED) --- */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/528274_7bc24a7700974a2fbd10b0d0dc1a80eb~mv2.png?originWidth=1920&originHeight=1024"
            alt="Crowd cheering at 114 Whiskey Row"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <AnimatedElement>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-neon-red-orange" />
                <span className="font-paragraph text-neon-red-orange uppercase tracking-widest text-sm">Game Day HQ</span>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay="0.2s">
              <h2 className="font-heading text-6xl md:text-8xl font-bold text-white mb-8 leading-[0.9]">
                ACROSS FROM <br/> THE <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #fff' }}>YUM CENTER</span>
              </h2>
            </AnimatedElement>

            <AnimatedElement delay="0.4s">
              <p className="font-paragraph text-lg text-gray-300 mb-10 max-w-lg">
                We are the unofficial pre-game and post-game headquarters. 
                Cold drinks, packed crowds, and the best energy on Main Street.
              </p>
            </AnimatedElement>

            <AnimatedElement delay="0.6s">
              <Link 
                to="/visit" 
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-heading font-bold uppercase tracking-wider hover:bg-neon-red-orange hover:text-white transition-colors"
              >
                <MapPin className="w-5 h-5" /> Get Directions
              </Link>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* --- GALLERY MARQUEE (DYNAMIC) --- */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-12 flex justify-between items-end">
          <AnimatedElement>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">THE SCENE</h2>
          </AnimatedElement>
          <Link to="/gallery" className="hidden md:block font-paragraph text-sm text-gray-500 hover:text-neon-red-orange transition-colors">
            @114WhiskeyRow
          </Link>
        </div>

        <div className="marquee-container relative w-full">
          <div className="flex gap-6 w-max animate-scroll hover:pause-animation pl-4">
            {/* Double the array for seamless loop */}
            {[...galleryPhotos, ...galleryPhotos].map((photo, index) => (
              <div 
                key={`${photo._id}-${index}`} 
                className="relative w-[300px] md:w-[400px] aspect-[4/5] flex-shrink-0 group overflow-hidden bg-gray-900"
              >
                {photo.photo && (
                  <Image
                    src={photo.photo}
                    alt={photo.altText || 'Gallery photo'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    width={400}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="font-paragraph text-xs text-white uppercase tracking-wider">
                    {photo.caption || 'Whiskey Row Nights'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .hover\:pause-animation:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* --- VISIT / INFO SECTION --- */}
      <section className="relative py-32 bg-[#111] border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info Column */}
            <div className="space-y-12">
              <AnimatedElement>
                <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8">
                  DROP <span className="text-neon-red-orange">IN</span>
                </h2>
                <p className="font-paragraph text-xl text-gray-400 max-w-md">
                  No reservations. No dress code. Just walk in and grab a drink.
                </p>
              </AnimatedElement>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <AnimatedElement delay="0.2s">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-neon-red-orange mt-1" />
                    <div>
                      <h3 className="font-heading text-xl text-white mb-2">Location</h3>
                      <p className="font-paragraph text-sm text-gray-400 leading-relaxed">
                        114 W Main St<br/>
                        Louisville, KY 40202<br/>
                        <span className="text-neon-red-orange text-xs uppercase mt-2 block">Opposite Yum Center</span>
                      </p>
                    </div>
                  </div>
                </AnimatedElement>

                <AnimatedElement delay="0.3s">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-neon-red-orange mt-1" />
                    <div>
                      <h3 className="font-heading text-xl text-white mb-2">Hours</h3>
                      <ul className="font-paragraph text-sm text-gray-400 space-y-1">
                        <li className="flex justify-between w-32"><span>Mon-Thu</span> <span>4PM - 2AM</span></li>
                        <li className="flex justify-between w-32 text-white"><span>Fri-Sat</span> <span>4PM - 4AM</span></li>
                        <li className="flex justify-between w-32"><span>Sun</span> <span>4PM - 2AM</span></li>
                      </ul>
                    </div>
                  </div>
                </AnimatedElement>
              </div>

              <AnimatedElement delay="0.4s">
                <div className="flex gap-4 pt-8">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-full hover:bg-neon-red-orange hover:border-neon-red-orange transition-all group">
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <Link to="/contact" className="px-8 py-3 border border-white/20 font-paragraph text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center">
                    Contact Us
                  </Link>
                </div>
              </AnimatedElement>
            </div>

            {/* Map / Image Column */}
            <AnimatedElement delay="0.5s" className="relative h-[500px] lg:h-auto w-full bg-gray-900 overflow-hidden group">
              <Image
                src="https://static.wixstatic.com/media/528274_b8688cb2ca394172971b44f46b12014d~mv2.png?originWidth=768&originHeight=448"
                alt="Street view of 114 Whiskey Row entrance"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                width={800}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-full border-2 border-neon-red-orange flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-neon-red-orange rounded-full" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <p className="font-paragraph text-xs text-center text-gray-400 uppercase tracking-widest">
                  Heart of Whiskey Row
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}