import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-16" aria-label="Hero section">
        <div className="absolute inset-0 bg-black z-0" />
        
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16 py-12 sm:py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl"
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground mb-6 sm:mb-8 md:mb-10 leading-[1.1] tracking-tight">
              Before the Game.<br className="hidden sm:block" />
              After the Show.<br className="hidden sm:block" />
              <span className="text-primary">Late Night on Whiskey Row.</span>
            </h1>
            
            <div className="space-y-4 mb-8 sm:mb-10 md:mb-12">
              <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/90 tracking-wide">
                114 W Main St. Whiskey Row. Louisville, KY
              </p>
              <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/90 tracking-wide">
                Tue - Sun, 4pm - 2am
              </p>
              <p className="font-paragraph text-base sm:text-lg md:text-xl text-neon-red-orange font-semibold tracking-wide">
                Walk-ins. 21+
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Status */}
      {barStatus && (
        <section className="w-full py-4 sm:py-6 bg-black border-b border-foreground/10" aria-label="Bar status">
          <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-paragraph text-sm sm:text-base text-foreground/70 tracking-wide">
                {barStatus.isOpen ? 'OPEN NOW' : 'CLOSED'} · Closes at 2:00am
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* What's On / Events Preview */}
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
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground">Late Night</div>
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

      {/* Gallery Preview */}
      <section className="w-full py-16 sm:py-20 md:py-24 bg-[#1a1a1a]" aria-label="Gallery preview">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 sm:mb-10 md:mb-12">
              The Scene
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
                      transition={{ duration: 0.5, delay: i * 0.08 }}
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
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-black font-paragraph text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 h-auto w-full sm:w-auto"
              onClick={() => window.location.href = '/gallery'}
            >
              VIEW FULL GALLERY
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 sm:py-20 md:py-24 bg-gradient-to-r from-neon-red-orange/10 via-black to-neon-red-orange/5 border-t border-neon-red-orange/20" aria-label="Call to action">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-6">
              See You <span className="text-neon-red-orange">Tonight</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/80 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
              Open Tue-Sun, 4pm-2am. Walk-ins only. 21+. No reservations needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-neon-red-orange hover:bg-neon-red-orange/90 text-white font-paragraph text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 h-auto w-full sm:w-auto"
                onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                GET DIRECTIONS
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-neon-red-orange text-neon-red-orange hover:bg-neon-red-orange hover:text-white font-paragraph text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 h-auto w-full sm:w-auto"
                onClick={() => window.location.href = '/contact'}
              >
                CONTACT US
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="w-full py-12 sm:py-16 md:py-20 bg-black border-t border-foreground/10" aria-label="The story of One Fourteen">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/story"
              className="inline-block group"
            >
              <h3 className="font-heading text-lg sm:text-2xl md:text-3xl text-foreground/60 group-hover:text-foreground transition-colors duration-300">
                The Story of One Fourteen
              </h3>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
