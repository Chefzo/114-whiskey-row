import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { GalleryPhotos } from '@/entities';

const PHOTOS_PER_PAGE = 12;

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhotos[]>([]);
  const [displayedPhotos, setDisplayedPhotos] = useState<GalleryPhotos[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotos | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch photos on mount
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { items } = await BaseCrudService.getAll<GalleryPhotos>('galleryphotos');
        
        // Sort by date taken (most recent first)
        const sorted = items.sort((a, b) => {
          const dateA = a.dateTaken ? new Date(a.dateTaken).getTime() : 0;
          const dateB = b.dateTaken ? new Date(b.dateTaken).getTime() : 0;
          return dateB - dateA;
        });
        
        setPhotos(sorted);
        
        // Set initial page of photos
        const initialPhotos = sorted.slice(0, PHOTOS_PER_PAGE);
        setDisplayedPhotos(initialPhotos);
        setHasMore(sorted.length > PHOTOS_PER_PAGE);
      } catch (err) {
        setError('Failed to load gallery photos. Please try again later.');
        console.error('Gallery fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Handle pagination
  const loadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * PHOTOS_PER_PAGE;
    const endIndex = startIndex + PHOTOS_PER_PAGE;
    const newPhotos = photos.slice(0, endIndex);
    
    setDisplayedPhotos(newPhotos);
    setCurrentPage(nextPage);
    setHasMore(endIndex < photos.length);
  }, [currentPage, photos]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedPhoto) return;

    if (e.key === 'Escape') {
      setSelectedPhoto(null);
      setSelectedIndex(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (selectedIndex + 1) % displayedPhotos.length;
      setSelectedPhoto(displayedPhotos[nextIndex]);
      setSelectedIndex(nextIndex);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = selectedIndex === 0 ? displayedPhotos.length - 1 : selectedIndex - 1;
      setSelectedPhoto(displayedPhotos[prevIndex]);
      setSelectedIndex(prevIndex);
    }
  }, [selectedPhoto, selectedIndex, displayedPhotos]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus management for lightbox
  useEffect(() => {
    if (selectedPhoto && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [selectedPhoto]);

  const openPhoto = (photo: GalleryPhotos, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  const navigatePhoto = (direction: 'next' | 'prev') => {
    if (!selectedPhoto) return;
    
    const newIndex = direction === 'next'
      ? (selectedIndex + 1) % displayedPhotos.length
      : selectedIndex === 0 ? displayedPhotos.length - 1 : selectedIndex - 1;
    
    setSelectedPhoto(displayedPhotos[newIndex]);
    setSelectedIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
              Gallery | One Fourteen Bar on Whiskey Row
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-foreground/70 max-w-3xl">
              Real moments. Real energy. This is what 114 looks like.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEO Intro Text */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 bg-background border-b border-neon-red-orange/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-paragraph text-base sm:text-lg text-foreground/80 max-w-3xl leading-relaxed">
              Photos from One Fourteen, a <a href="/" className="text-neon-red-orange hover:underline">late night bar on Whiskey Row</a> in downtown Louisville. Inside the crowd, neon lighting, bartenders at work, and the after-dark energy that defines Louisville nightlife.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="max-w-[120rem] mx-auto">
          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-destructive/10 border border-destructive/30 rounded flex items-start gap-3"
              role="alert"
            >
              <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
              <p className="font-paragraph text-sm text-destructive">{error}</p>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <LoadingSpinner />
            </div>
          ) : displayedPhotos.length > 0 ? (
            <>
              <p className="font-paragraph text-sm text-foreground/60 mb-8">
                Backyard
              </p>
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                ref={gridRef}
              >
                <AnimatePresence mode="popLayout">
                  {displayedPhotos.map((photo, index) => (
                    <motion.button
                      key={photo._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => openPhoto(photo, index)}
                      className="group relative aspect-square overflow-hidden rounded bg-black/40 border border-neon-red-orange/20 hover:border-neon-red-orange/60 transition-all focus:outline-none focus:ring-2 focus:ring-neon-red-orange focus:ring-offset-2 focus:ring-offset-background"
                      aria-label={`View ${photo.caption || 'gallery photo'}`}
                    >
                      {photo.photo && (
                        <Image
                          src={photo.photo}
                          alt={photo.altText || photo.caption || 'Gallery photo'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={600}
                        />
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          {photo.caption && (
                            <p className="font-paragraph text-sm text-foreground mb-2">
                              {photo.caption}
                            </p>
                          )}
                          {photo.photographerCredit && (
                            <p className="font-paragraph text-xs text-warm-amber">
                              Photo: {photo.photographerCredit}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>

              {/* Load More Button */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={loadMore}
                    className="px-8 py-3 bg-neon-red-orange text-primary-foreground font-paragraph font-semibold rounded hover:bg-neon-red-orange/90 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-red-orange focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Load more photos"
                  >
                    Load More Photos
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <Camera size={64} className="text-neon-red-orange/30 mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                Gallery Coming Soon
              </h3>
              <p className="font-paragraph text-foreground/60">
                We're capturing the energy. Check back soon for photos.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            tabIndex={-1}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-foreground hover:text-neon-red-orange text-4xl font-light leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-neon-red-orange rounded p-2"
              aria-label="Close photo viewer (Esc)"
              title="Press Escape to close"
            >
              ×
            </motion.button>

            {/* Navigation Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 left-4 text-foreground/60 font-paragraph text-sm"
            >
              {selectedIndex + 1} / {displayedPhotos.length}
            </motion.div>

            {/* Main Content */}
            <div 
              className="max-w-6xl w-full flex flex-col items-center" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <motion.div
                key={selectedPhoto._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {selectedPhoto.photo && (
                  <Image
                    src={selectedPhoto.photo}
                    alt={selectedPhoto.altText || selectedPhoto.caption || 'Gallery photo'}
                    className="w-full h-auto max-h-[75vh] object-contain rounded"
                    width={1200}
                  />
                )}
              </motion.div>
              
              {/* Photo Info */}
              {(selectedPhoto.caption || selectedPhoto.photographerCredit || selectedPhoto.dateTaken) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center max-w-2xl"
                >
                  {selectedPhoto.caption && (
                    <p className="font-paragraph text-base text-foreground mb-2">
                      {selectedPhoto.caption}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-4 text-sm text-foreground/60 flex-wrap">
                    {selectedPhoto.photographerCredit && (
                      <span className="font-paragraph">
                        Photo: {selectedPhoto.photographerCredit}
                      </span>
                    )}
                    {selectedPhoto.dateTaken && (
                      <span className="font-paragraph">
                        {new Date(selectedPhoto.dateTaken).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation Buttons */}
            {displayedPhotos.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => navigatePhoto('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground hover:text-neon-red-orange transition-colors focus:outline-none focus:ring-2 focus:ring-neon-red-orange rounded p-2"
                  aria-label="Previous photo (Left arrow)"
                  title="Press left arrow to go to previous photo"
                >
                  <ChevronLeft size={32} />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => navigatePhoto('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground hover:text-neon-red-orange transition-colors focus:outline-none focus:ring-2 focus:ring-neon-red-orange rounded p-2"
                  aria-label="Next photo (Right arrow)"
                  title="Press right arrow to go to next photo"
                >
                  <ChevronRight size={32} />
                </motion.button>
              </>
            )}

            {/* Keyboard Hints */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground/50 font-paragraph text-xs text-center"
            >
              <p>Use arrow keys to navigate • Press Esc to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
