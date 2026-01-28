import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Zap, Music, Users, Flame } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { GalleryPhotos } from '@/entities';
import { getBarStatus, BarStatus } from '@/lib/bar-hours';

export default function HomePage() {
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotos[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const [barStatus, setBarStatus] = useState<BarStatus | null>(null);

  useEffect(() => {
    loadGallery();
    updateBarStatus();
    const interval = setInterval(updateBarStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const updateBarStatus = () => {
    setBarStatus(getBarStatus());
  };

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

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events-section');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0" />
        
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-16 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="max-w-5xl"
          >
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-foreground mb-6 leading-[1.1] tracking-tight">
              Before the Game.<br />
              After the Show.<br />
              <span className="text-primary">Late Night on Whiskey Row.</span>
            </h1>
            
            <p className="font-paragraph text-xl md:text-2xl text-foreground/80 mb-12 tracking-wide">
              Loud music. Strong drinks. Walk-ins only.
            </p>
            
            {barStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 bg-black/50 border-2 border-foreground/20 px-6 py-3 rounded-full">
                  <div className={`w-3 h-3 rounded-full ${barStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-foreground/30'}`} />
                  <span className="font-paragraph text-lg md:text-xl text-foreground tracking-wide">
                    {barStatus.isOpen ? 'OPEN NOW' : 'CLOSED'} • {barStatus.nextEvent}
                  </span>
                </div>
              </motion.div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph text-lg px-10 py-7 h-auto"
                onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
              >
                <MapPin className="w-5 h-5 mr-2" />
                GET DIRECTIONS
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-black font-paragraph text-lg px-10 py-7 h-auto"
                onClick={scrollToEvents}
              >
                TONIGHT AT ONE FOURTEEN
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What This Place Is */}
      <section className="w-full py-32 md:py-40 bg-[#1a1a1a]">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center md:text-left"
          >
            <div className="space-y-6 md:space-y-8">
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight tracking-tight">
                Before the game.
              </h2>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight tracking-tight">
                After the show.
              </h2>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary leading-tight tracking-tight">
                Loud music.
              </h2>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight tracking-tight">
                Strong drinks.
              </h2>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight tracking-tight">
                Walk-ins welcome.
              </h2>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight tracking-tight">
                Late nights.
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's On / Events Preview */}
      <section id="events-section" className="w-full py-32 md:py-40 bg-black">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-16">
              What's On
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="border-l-4 border-primary pl-8 py-4"
              >
                <div className="font-paragraph text-3xl md:text-4xl text-foreground/50 mb-2">THU</div>
                <div className="font-heading text-4xl md:text-5xl text-foreground">DJs</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border-l-4 border-foreground pl-8 py-4"
              >
                <div className="font-paragraph text-3xl md:text-4xl text-foreground/50 mb-2">FRI</div>
                <div className="font-heading text-4xl md:text-5xl text-foreground">Late Night</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="border-l-4 border-foreground pl-8 py-4"
              >
                <div className="font-paragraph text-3xl md:text-4xl text-foreground/50 mb-2">SAT</div>
                <div className="font-heading text-4xl md:text-5xl text-foreground">DJs till close</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="border-l-4 border-primary pl-8 py-4"
              >
                <div className="font-paragraph text-3xl md:text-4xl text-foreground/50 mb-2">GAME DAYS</div>
                <div className="font-heading text-4xl md:text-5xl text-foreground">Sound on</div>
              </motion.div>
            </div>

            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-black font-paragraph text-lg px-10 py-7 h-auto"
              onClick={() => window.location.href = '/events'}
            >
              VIEW EVENTS
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why One Fourteen */}
      <section className="w-full py-32 md:py-40 bg-black">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-20">
              Why One Fourteen
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'High Energy',
                  description: 'Loud music, louder crowds. This is where the night gets real.'
                },
                {
                  icon: Music,
                  title: 'Live Entertainment',
                  description: 'DJs spinning all weekend. Game days with sound on. Always something happening.'
                },
                {
                  icon: Users,
                  title: 'Real People',
                  description: 'No dress code. No attitude. Just genuine connections and good vibes.'
                },
                {
                  icon: Flame,
                  title: 'Strong Drinks',
                  description: 'Crafted cocktails and cold beer. We know how to pour.'
                },
                {
                  icon: MapPin,
                  title: 'Prime Location',
                  description: 'Right on Whiskey Row. The heart of Louisville nightlife.'
                },
                {
                  icon: ArrowRight,
                  title: 'Walk-Ins Welcome',
                  description: 'No reservations needed. Show up as you are, whenever you want.'
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex flex-col h-full p-8 bg-gradient-to-br from-neon-red-orange/5 to-transparent border border-neon-red-orange/20 rounded-lg hover:border-neon-red-orange/50 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-neon-red-orange/20 flex items-center justify-center mb-4 group-hover:bg-neon-red-orange/30 transition-colors">
                        <IconComponent size={24} className="text-neon-red-orange" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="w-full py-32 md:py-40 bg-[#1a1a1a]">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-16">
              The Scene
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" style={{ minHeight: '300px' }}>
              {isLoadingGallery ? null : galleryPhotos.length > 0 ? (
                galleryPhotos.map((photo, index) => (
                  <motion.div
                    key={photo._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative aspect-square overflow-hidden rounded-lg"
                  >
                    <Image
                      src={photo.photo || 'https://static.wixstatic.com/media/528274_9a5eac4526fd48bca44e841c71d9fe4f~mv2.png?originWidth=384&originHeight=384'}
                      alt={photo.altText || photo.caption || 'Bar scene'}
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
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="relative aspect-square overflow-hidden bg-black/50 rounded-lg"
                    >
                      <Image
                        src="https://static.wixstatic.com/media/528274_f518207e582240d69cafec056473a326~mv2.png?originWidth=384&originHeight=384"
                        alt="Bar atmosphere"
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
              variant="outline"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-black font-paragraph text-lg px-10 py-7 h-auto"
              onClick={() => window.location.href = '/gallery'}
            >
              VIEW FULL GALLERY
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 md:py-40 bg-gradient-to-r from-neon-red-orange/10 via-black to-neon-red-orange/5 border-t border-neon-red-orange/20">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
              See You <span className="text-neon-red-orange">Tonight</span>
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 mb-12 max-w-2xl mx-auto">
              Open Tue-Sun, 4pm-2am. Walk-ins only. 21+. No reservations needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-lg px-10 py-7 h-auto"
                onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
              >
                <MapPin className="w-5 h-5 mr-2" />
                GET DIRECTIONS
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-neon-red-orange text-neon-red-orange hover:bg-neon-red-orange hover:text-white font-paragraph text-lg px-10 py-7 h-auto"
                onClick={() => window.location.href = '/contact'}
              >
                CONTACT US
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
