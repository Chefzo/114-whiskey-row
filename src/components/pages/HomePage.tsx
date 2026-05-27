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

      {/* Tonight at One Fourteen */}
      <section id="events-section" className="w-full py-16 sm:py-20 md:py-24 bg-black border-t border-foreground/10" aria-label="Tonight at One Fourteen">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 sm:mb-14 md:mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 sm:mb-4">
                Tonight at One Fourteen
              </h2>
              <p className="font-paragraph text-base sm:text-lg text-foreground/60 max-w-2xl">
                Experience our nightly lineup of DJs, live entertainment, and special events.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16">
              {/* Thursday */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative bg-gradient-to-br from-foreground/5 to-transparent border border-foreground/10 rounded-lg p-6 sm:p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-1 h-12 bg-primary rounded-r" />
                <div className="font-paragraph text-sm sm:text-base text-primary uppercase tracking-widest mb-3">Thursday</div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">DJs</div>
                <p className="font-paragraph text-sm sm:text-base text-foreground/60">Spin all night long</p>
              </motion.div>

              {/* Friday */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="group relative bg-gradient-to-br from-foreground/5 to-transparent border border-foreground/10 rounded-lg p-6 sm:p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-1 h-12 bg-foreground/40 rounded-r" />
                <div className="font-paragraph text-sm sm:text-base text-foreground/60 uppercase tracking-widest mb-3">Friday</div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">Late Night</div>
                <p className="font-paragraph text-sm sm:text-base text-foreground/60">Weekend energy starts here</p>
              </motion.div>

              {/* Saturday */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative bg-gradient-to-br from-foreground/5 to-transparent border border-foreground/10 rounded-lg p-6 sm:p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-1 h-12 bg-primary rounded-r" />
                <div className="font-paragraph text-sm sm:text-base text-primary uppercase tracking-widest mb-3">Saturday</div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">DJs Till Close</div>
                <p className="font-paragraph text-sm sm:text-base text-foreground/60">Peak nightlife experience</p>
              </motion.div>

              {/* Game Days */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="group relative bg-gradient-to-br from-foreground/5 to-transparent border border-foreground/10 rounded-lg p-6 sm:p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-1 h-12 bg-primary rounded-r" />
                <div className="font-paragraph text-sm sm:text-base text-primary uppercase tracking-widest mb-3">Game Days</div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">Sound On</div>
                <p className="font-paragraph text-sm sm:text-base text-foreground/60">Catch the action with us</p>
              </motion.div>

              {/* Sunday - Industry Night */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative bg-gradient-to-br from-foreground/5 to-transparent border border-foreground/10 rounded-lg p-6 sm:p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-1 h-12 bg-foreground/40 rounded-r" />
                <div className="font-paragraph text-sm sm:text-base text-foreground/60 uppercase tracking-widest mb-3">Sunday</div>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">Industry Night</div>
                <div className="space-y-2">
                  <p className="font-paragraph text-sm sm:text-base text-foreground/80">9pm–2am</p>
                  <p className="font-paragraph text-xs sm:text-sm text-foreground/60">Service industry welcome</p>
                </div>
              </motion.div>
            </div>

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
