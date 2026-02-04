import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <section className="w-full py-24 md:py-32 lg:py-40 bg-black">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary mb-12 md:mb-16 lg:mb-20 leading-tight tracking-tight">
              THE STORY OF ONE FOURTEEN
            </h1>

            <div className="space-y-8 md:space-y-10 lg:space-y-12 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="font-paragraph text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                  More than ten years ago, the founder of One Fourteen used to walk past this building on Main Street.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <p className="font-paragraph text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                  Not looking for a concept.
                  <br />
                  Not chasing a trend.
                  <br />
                  Just noticing a space that felt like it should matter.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-paragraph text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                  At the time, the idea was a coffee shop called Whiskey Row Café.
                  <br />
                  Not because coffee was the point — but because it felt like the kind of place people return to.
                  <br />
                  Built around conversation, routine, and showing up.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <p className="font-paragraph text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                  Over time, it became clear the idea was never really about coffee.
                  <br />
                  It was about the room.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-paragraph text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                  A simple space filled with energy.
                  <br />
                  Late nights.
                  <br />
                  Familiar faces.
                  <br />
                  People finding their people.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <p className="font-paragraph text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                  One Fourteen came from that original thought.
                  <br />
                  A bar built on connection, not polish.
                  <br />
                  Atmosphere over pretense.
                  <br />
                  A place where the room comes alive because of who's inside it.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="font-paragraph text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                  Because in the end, it's never about how a space looks from the outside.
                  <br />
                  It's about what happens once you walk in.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <p className="font-paragraph text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
                  That's One Fourteen.
                  <br />
                  Whiskey Row.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
