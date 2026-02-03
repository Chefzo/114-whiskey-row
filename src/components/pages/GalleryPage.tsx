import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { GalleryPhotos } from '@/entities';

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhotos[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotos | null>(null);

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
    const fetchPhotos = async () => {
      const { items } = await BaseCrudService.getAll<GalleryPhotos>('galleryphotos');
      
      // Sort by date taken (most recent first)
      const sorted = items.sort((a, b) => {
        const dateA = a.dateTaken ? new Date(a.dateTaken).getTime() : 0;
        const dateB = b.dateTaken ? new Date(b.dateTaken).getTime() : 0;
        return dateB - dateA;
      });
      
      setPhotos(sorted);
    };

    fetchPhotos();
  }, []);

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
              The <span className="text-neon-red-orange">Vibe</span>
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-foreground/70 max-w-3xl">
              Real moments. Real energy. This is what 114 looks like.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-[120rem] mx-auto">
          {photos.length > 0 ? (
            <>
              <p className="font-paragraph text-sm text-foreground/60 mb-8">
                Backyard
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo, index) => (
                <motion.div
                  key={photo._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded cursor-pointer bg-black/40 border border-neon-red-orange/20 hover:border-neon-red-orange/60 transition-all"
                  onClick={() => setSelectedPhoto(photo)}
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
                </motion.div>
              ))}
              </div>
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
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-foreground hover:text-neon-red-orange text-4xl font-light leading-none transition-colors"
            aria-label="Close"
          >
            ×
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedPhoto.photo && (
              <Image
                src={selectedPhoto.photo}
                alt={selectedPhoto.altText || selectedPhoto.caption || 'Gallery photo'}
                className="w-full h-auto max-h-[85vh] object-contain rounded"
                width={1200}
              />
            )}
            
            {(selectedPhoto.caption || selectedPhoto.photographerCredit || selectedPhoto.dateTaken) && (
              <div className="mt-6 text-center">
                {selectedPhoto.caption && (
                  <p className="font-paragraph text-base text-foreground mb-2">
                    {selectedPhoto.caption}
                  </p>
                )}
                <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
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
              </div>
            )}
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
