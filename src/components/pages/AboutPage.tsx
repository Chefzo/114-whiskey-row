import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  } as const;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full flex items-center justify-center pt-20 pb-0 px-4 overflow-hidden min-h-[60vh] md:min-h-[70vh]">
        {/* Background - Pure texture, no AI images */}
        <div className="absolute inset-0 z-0 bg-background" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto text-left flex flex-col justify-center min-h-[60vh] md:min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-foreground mb-6">
              About One Fourteen | Whiskey Row Bar in Louisville
            </h1>
            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl">
              One Fourteen is a late night bar on Whiskey Row in downtown Louisville, KY. Built around music, walk-in culture, and a no-reservations policy, it's a spot that keeps the night moving. Open until 2am Tuesday through Sunday.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== STORY SECTION ===== */}
      <section className="w-full py-16 sm:py-24 px-4 border-t border-neon-red-orange/20">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 sm:space-y-16"
          >
            {/* Opening Block */}
            <motion.div variants={itemVariants} className="max-w-2xl space-y-4">
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                More than ten years ago, <span className="text-neon-red-orange font-semibold">Enzo Palombino</span> used to walk past this building on Main Street and picture it as a coffee shop called Whiskey Row Café.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                Not because it was trendy — because it felt like the kind of place people would return to.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                A place built around conversation, routine, and showing up.
              </p>
            </motion.div>

            {/* Vision Evolution Block */}
            <motion.div variants={itemVariants} className="max-w-2xl space-y-4">
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                As time passed, the idea evolved. It was never really about coffee.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                It was about taking a simple space and filling it with energy.
              </p>
              <div className="pt-2 space-y-2">
                <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                  Late nights.
                </p>
                <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                  Familiar faces.
                </p>
                <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                  People finding their people.
                </p>
              </div>
            </motion.div>

            {/* Core Philosophy Block */}
            <motion.div variants={itemVariants} className="max-w-2xl space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                One Fourteen
              </h2>
              <div className="space-y-4">
                <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                  One Fourteen came from that original thought.
                </p>
                <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                  A bar built on connection, not polish.
                </p>
                <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                  On atmosphere, not pretense.
                </p>
                <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                  A place where the room comes alive because of the people in it.
                </p>
              </div>
            </motion.div>

            {/* Closing Block */}
            <motion.div variants={itemVariants} className="max-w-2xl space-y-4 pt-6 border-t border-neon-red-orange/20">
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                Because in the end, it's never about what the space looks like from the outside.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                It's about who you become when you walk inside.
              </p>
              <div className="pt-4">
                <p className="font-handwriting text-2xl sm:text-3xl text-neon-red-orange leading-relaxed">
                  That's One Fourteen.
                </p>
              </div>
            </motion.div>

            {/* Location Block */}
            <motion.div variants={itemVariants} className="max-w-2xl space-y-2 pt-4">
              <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
                114 W Main St. Whiskey Row. Louisville, KY
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== IMAGE SECTION - REMOVED ===== */}
      {/* Removed AI-generated imagery. Real bar photos will be added when available. */}

      <Footer />
    </div>
  );
}
