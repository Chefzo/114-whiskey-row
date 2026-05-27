import { Image } from '@/components/ui/image';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, AlertCircle } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Cocktails } from '@/entities';

type MenuSection =
  | {
      id: string;
      title: string;
      description: string;
      alt: string;
      image: string;
      layout?: 'image';
    }
  | {
      id: string;
      title: string;
      description: string;
      layout: 'cms-cocktails';
    };

export default function MenuPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [cocktails, setCocktails] = useState<Cocktails[]>([]);

  // Fetch cocktails from the CMS so the COCKTAILS section renders as a
  // grid of photo cards (one per drink) instead of a single static image.
  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Cocktails>('cocktails');
        const sorted = items.sort(
          (a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
        );
        setCocktails(sorted);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : 'Could not load the cocktail menu.',
        );
      }
    };
    fetchCocktails();
  }, []);

  const menuSections: MenuSection[] = [
    {
      id: 'cocktails',
      title: 'COCKTAILS',
      description: 'Bourbon-forward with a few left turns. Old-fashioneds built on Old Forester, espresso pours, and house riffs made for late nights on Whiskey Row.',
      layout: 'cms-cocktails',
    },
    {
      id: 'beer',
      title: 'BEER & CANS',
      description: 'A rotating selection of local and craft beers, plus classic canned favorites. Always cold, always fresh.',
      alt: 'One Fourteen beer and cans menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_4436bb1e92cc442cb585b1d70b3fc1c4~mv2.png',
    },
    {
      id: 'happy-hour',
      title: 'HAPPY HOUR',
      description: 'Drink specials before the crowd hits. Check the board on the wall for tonight\'s pricing.',
      alt: 'One Fourteen happy hour menu – drink specials at the bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_3230c9da8c484a2180f35dd85db6e599~mv2.png',
    },
    {
      id: 'shots',
      title: 'SHOTS & BOILERMAKERS',
      description: 'Quick hits and classic combinations. Perfect for groups or when you want to keep the night moving.',
      alt: 'One Fourteen shots and boilermakers menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_413deccf778f49e190fe61166c47d62e~mv2.png',
    },
  ];

  const scrollToSection = useCallback((index: number) => {
    setActiveSection(index);
    const element = document.getElementById(menuSections[index].id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Focus the section for accessibility
      element.focus();
    }
  }, [menuSections]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuSections.map(s => document.getElementById(s.id)).filter(Boolean);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top < window.innerHeight / 2) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuSections]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full">
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
                Thirsty?
              </h1>
              <p className="font-paragraph text-lg sm:text-xl text-foreground/70 max-w-3xl">
                Explore our carefully curated selection of cocktails, beers, and spirits. From craft creations to classic favorites, there's something for every taste.
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
                The complete menu for <a href="/" className="text-neon-red-orange hover:underline">One Fourteen, a late-night bar on Whiskey Row</a> in downtown Louisville, Kentucky.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="w-full bg-background/50 sticky top-16 z-40 border-b border-foreground/10 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex overflow-x-auto gap-2 py-3 sm:py-4 md:py-6 scrollbar-hide">
              {menuSections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`font-paragraph text-xs sm:text-xs md:text-sm uppercase tracking-widest whitespace-nowrap px-3 sm:px-4 py-2 rounded-full transition-all flex-shrink-0 ${
                    activeSection === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={activeSection === index ? 'page' : undefined}
                >
                  {section.title}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 sm:mx-6 lg:mx-8 mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded flex items-start gap-3"
            role="alert"
          >
            <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
            <p className="font-paragraph text-sm text-destructive">{error}</p>
          </motion.div>
        )}

        {/* Menu Sections */}
        <section className="w-full bg-background py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[120rem] mx-auto">
            <div className="space-y-16 sm:space-y-24 md:space-y-32">
              {menuSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6 }}
                  className="w-full focus:outline-none focus:ring-2 focus:ring-neon-red-orange rounded p-4"
                  tabIndex={-1}
                >
                  {/* Section Header with Description */}
                  <div className={`mb-8 sm:mb-12 md:mb-16 ${index % 2 === 1 ? 'md:ml-auto md:max-w-2xl' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                        {section.title}
                      </h2>
                      <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed">
                        {section.description}
                      </p>
                    </motion.div>
                  </div>

                  {section.layout === 'cms-cocktails' ? (
                    /* Cocktails — CMS-driven photo grid, one card per drink */
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
                    >
                      {cocktails.length === 0 && !error && (
                        <div className="col-span-full text-center font-paragraph text-sm text-foreground/50 py-12">
                          Loading the menu…
                        </div>
                      )}
                      {cocktails.map((cocktail, cIndex) => (
                        <motion.article
                          key={cocktail._id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ duration: 0.5, delay: cIndex * 0.05 }}
                          whileHover={{ y: -4 }}
                          className="group bg-black/40 border border-neon-red-orange/20 rounded-lg overflow-hidden hover:border-neon-red-orange/50 transition-colors"
                        >
                          {cocktail.photo && (
                            <div className="aspect-square overflow-hidden bg-black/60">
                              <motion.div
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.4 }}
                                className="origin-center w-full h-full"
                              >
                                <Image
                                  src={cocktail.photo}
                                  alt={`${cocktail.title} cocktail at One Fourteen Bar on Whiskey Row, Louisville KY`}
                                  width={600}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            </div>
                          )}
                          <div className="p-5 sm:p-6">
                            <div className="flex items-baseline justify-between gap-3 mb-2">
                              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground leading-tight">
                                {cocktail.title}
                              </h3>
                              {typeof cocktail.price === 'number' && (
                                <div className="font-heading text-lg sm:text-xl text-neon-red-orange whitespace-nowrap">
                                  ${cocktail.price}
                                </div>
                              )}
                            </div>
                            {cocktail.spiritBase && (
                              <div className="font-paragraph text-[10px] sm:text-xs uppercase tracking-widest text-warm-amber mb-3">
                                {cocktail.spiritBase}
                              </div>
                            )}
                            {cocktail.ingredients && (
                              <p className="font-paragraph text-xs sm:text-sm text-foreground/60 leading-relaxed mb-3">
                                {cocktail.ingredients}
                              </p>
                            )}
                            {cocktail.description && (
                              <p className="font-paragraph text-sm sm:text-base text-foreground/85 leading-relaxed italic">
                                {cocktail.description}
                              </p>
                            )}
                          </div>
                        </motion.article>
                      ))}
                    </motion.div>
                  ) : (
                    /* Menu Image with Hover Effect (BEER / HAPPY HOUR / SHOTS) */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className={`w-full ${index % 2 === 1 ? 'md:flex md:justify-end' : ''}`}
                    >
                      <div className="w-full md:max-w-2xl group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="origin-center"
                          >
                            <Image
                              src={section.image}
                              alt={section.alt}
                              width={800}
                              className="w-full h-auto"
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Divider */}
                  {index < menuSections.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mt-16 sm:mt-24 md:mt-32 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-background py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-foreground/5 border border-foreground/10 rounded-lg p-6 sm:p-8 md:p-12 text-center"
            >
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 sm:mb-4">
                Ready to experience One Fourteen?
              </h3>
              <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join us for late nights on Whiskey Row. Walk-ins only. 21+. Open Tuesday–Sunday, 4pm–2am.
              </p>
              
              <div className="flex flex-col gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto w-full"
                  onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
                >
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Get Directions
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground/30 text-foreground hover:bg-foreground/10 font-paragraph text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto w-full"
                  onClick={() => window.location.href = '/contact'}
                >
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Contact Us
                </Button>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-foreground/10 space-y-1 sm:space-y-2">
                <p className="font-paragraph text-xs sm:text-sm text-foreground/60">
                  114 W Main St, Louisville, KY 40202
                </p>
                <p className="font-paragraph text-xs sm:text-sm text-foreground/60">
                  Open Tue–Sun · 4pm–2am
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
