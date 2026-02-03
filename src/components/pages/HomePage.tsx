import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { GalleryPhotos } from '@/entities';

export default function HomePage() {
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotos[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);

  useEffect(() => {
    loadGallery();
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

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section - Clean */}
      <section className="relative w-full min-h-screen md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-16" aria-label="Hero section">
        <div className="absolute inset-0 bg-black z-0" />
        
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16 py-12 sm:py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl"
          >
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground mb-2 sm:mb-3 leading-[1.1] tracking-tight">
              Late nights on Whiskey Row.
            </h1>
            
            <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/70 mb-8 sm:mb-10 tracking-wide">
              Walk-ins only. 21+.
            </p>

            <Button 
              size="lg"
              className="bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 h-auto"
              onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Get Directions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Tonight at One Fourteen */}
      <section id="events-section" className="w-full py-16 sm:py-20 md:py-24 bg-black" aria-label="Tonight at One Fourteen">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 sm:mb-10 md:mb-12">
              Tonight at One Fourteen
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="border-l-4 border-primary pl-4 sm:pl-6 md:pl-8 py-3 sm:py-4"
              >
                <div className="font-paragraph text-lg sm:text-xl md:text-2xl text-foreground/50 mb-1 sm:mb-2">THU</div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground">DJs</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="border-l-4 border-foreground pl-4 sm:pl-6 md:pl-8 py-3 sm:py-4"
              >
                <div className="font-paragraph text-lg sm:text-xl md:text-2xl text-foreground/50 mb-1 sm:mb-2">FRI</div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground">late night</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="border-l-4 border-foreground pl-4 sm:pl-6 md:pl-8 py-3 sm:py-4"
              >
                <div className="font-paragraph text-lg sm:text-xl md:text-2xl text-foreground/50 mb-1 sm:mb-2">SAT</div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground">DJs till close</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="border-l-4 border-primary pl-4 sm:pl-6 md:pl-8 py-3 sm:py-4"
              >
                <div className="font-paragraph text-lg sm:text-xl md:text-2xl text-foreground/50 mb-1 sm:mb-2">GAME DAYS</div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground">Sound on</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="border-l-4 border-foreground pl-4 sm:pl-6 md:pl-8 py-3 sm:py-4"
              >
                <div className="font-paragraph text-lg sm:text-xl md:text-2xl text-foreground/50 mb-1 sm:mb-2">SUN</div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">Industry Night</div>
                <div className="font-paragraph text-sm sm:text-base text-foreground/60">9pm–2am</div>
                <div className="font-paragraph text-xs sm:text-sm text-foreground/50 mt-2">Service industry welcome.</div>
              </motion.div>
            </div>

            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-black font-paragraph text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 h-auto w-full sm:w-auto"
              onClick={() => window.location.href = '/events'}
            >
              VIEW EVENTS
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
              variant="outline"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-black font-paragraph text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 h-auto w-full sm:w-auto"
              onClick={() => window.location.href = '/gallery'}
            >
              VIEW FULL GALLERY
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* The Story of One Fourteen */}
      <section className="w-full py-16 sm:py-20 md:py-24 bg-black" aria-label="The story of One Fourteen">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 sm:mb-10 md:mb-12">
              The Story of <span className="text-primary">One Fourteen</span>
            </h2>

            <div className="space-y-6 sm:space-y-8 md:space-y-10 max-w-4xl mb-8 sm:mb-10 md:mb-12">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed"
              >
                More than ten years ago, I used to walk past this building on Main Street and picture it as a coffee shop called Whiskey Row Café. Not because it was trendy — because it felt like the kind of place people would return to. A place built around conversation, routine, and showing up.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed"
              >
                As time passed, I realized the idea was never really about coffee. It was about taking a simple space and filling it with energy. Late nights. Familiar faces. People finding their people.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed"
              >
                One Fourteen came from that original thought. A bar built on connection, not polish. On atmosphere, not pretense. A place where the room comes alive because of the people in it.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed"
              >
                Because in the end, it's never about what the space looks like from the outside. It's about who you become when you walk inside. That's One Fourteen.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed"
              >
                📍 Whiskey Row
              </motion.p>
            </div>

            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-black font-paragraph text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 h-auto w-full sm:w-auto"
              onClick={() => window.location.href = '/story'}
            >
              READ FULL STORY
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
                114 W Main St
              </p>
              <p className="font-paragraph text-lg sm:text-xl md:text-2xl text-foreground tracking-wide">
                Whiskey Row, Louisville, KY
              </p>
              <p className="font-paragraph text-lg sm:text-xl md:text-2xl text-foreground tracking-wide">
                Open Tue–Sun · 4pm–2am
              </p>
              <p className="font-paragraph text-xs text-foreground/30 mt-8 pt-4 border-t border-foreground/5 hover:text-foreground/60 transition-colors cursor-pointer">
                <a href="/story" className="hover:underline">our story</a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
