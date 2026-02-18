import { Image } from '@/components/ui/image';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

export default function MenuPage() {
  const [activeSection, setActiveSection] = useState(0);

  const menuSections = [
    {
      id: 'cocktails',
      title: 'COCKTAILS',
      description: 'Craft cocktails made with premium spirits and fresh ingredients. Our signature drinks showcase the best of what Whiskey Row has to offer.',
      alt: 'One Fourteen cocktail menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_640990ba91134702b82fec2797323e66~mv2.png',
    },
    {
      id: 'beer',
      title: 'BEER & CANS',
      description: 'A rotating selection of local and craft beers, plus classic canned favorites. Always cold, always fresh.',
      alt: 'One Fourteen beer and cans menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_0d9e6a4253104d8fa5c724b23eabc95d~mv2.png',
    },
    {
      id: 'happy-hour',
      title: 'HAPPY HOUR',
      description: 'Weekdays 4–7 PM. Specials on select cocktails and beers. The perfect way to start your evening.',
      alt: 'One Fourteen happy hour menu – weekdays 4-7 PM',
      image: 'https://static.wixstatic.com/media/528274_37c545ac599e4795b4cc69c70b810a3b~mv2.png',
    },
    {
      id: 'shots',
      title: 'SHOTS & BOILERMAKERS',
      description: 'Quick hits and classic combinations. Perfect for groups or when you want to keep the night moving.',
      alt: 'One Fourteen shots and boilermakers menu – modern dive bar on Whiskey Row in Louisville, KY',
      image: 'https://static.wixstatic.com/media/528274_6218139bf6e2426588a1aba9e9b9b049~mv2.png',
    },
  ];

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    const element = document.getElementById(menuSections[index].id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full bg-background pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-[120rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-heading text-6xl md:text-8xl font-bold text-foreground mb-6">
                Menu
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
                Explore our carefully curated selection of cocktails, beers, and spirits. From craft creations to classic favorites, there's something for every taste at One Fourteen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="w-full bg-background/50 sticky top-16 z-40 border-b border-foreground/10 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto px-4 md:px-8">
            <div className="flex overflow-x-auto gap-2 md:gap-4 py-4 md:py-6 scrollbar-hide">
              {menuSections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`font-paragraph text-xs md:text-sm uppercase tracking-widest whitespace-nowrap px-4 py-2 rounded-full transition-all ${ 
                    activeSection === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.title}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Sections */}
        <section className="w-full bg-background py-12 md:py-20">
          <div className="max-w-[120rem] mx-auto px-4 md:px-8">
            <div className="space-y-24 md:space-y-32">
              {menuSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6 }}
                  className="w-full"
                >
                  {/* Section Header with Description */}
                  <div className={`mb-12 md:mb-16 ${index % 2 === 1 ? 'md:ml-auto md:max-w-2xl' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {section.title}
                      </h2>
                      <p className="font-paragraph text-base md:text-lg text-foreground/70 leading-relaxed">
                        {section.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Menu Image with Hover Effect */}
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

                  {/* Divider */}
                  {index < menuSections.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mt-24 md:mt-32 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-background py-16 md:py-24">
          <div className="max-w-[120rem] mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-foreground/5 border border-foreground/10 rounded-lg p-8 md:p-12 text-center"
            >
              <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                Ready to experience One Fourteen?
              </h3>
              <p className="font-paragraph text-base md:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                Join us for late nights on Whiskey Row. Walk-ins only. 21+.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph text-base px-8 py-6 h-auto w-full sm:w-auto"
                  onClick={() => window.open('https://maps.google.com/?q=114+W+Main+St+Louisville+KY+40202', '_blank')}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground/30 text-foreground hover:bg-foreground/10 font-paragraph text-base px-8 py-6 h-auto w-full sm:w-auto"
                  onClick={() => window.location.href = '/contact'}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-foreground/10 space-y-2">
                <p className="font-paragraph text-sm text-foreground/60">
                  114 W Main St, Louisville, KY 40202
                </p>
                <p className="font-paragraph text-sm text-foreground/60">
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
