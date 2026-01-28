import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <section className="w-full py-32 md:py-40 bg-black">
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-6xl md:text-8xl text-foreground mb-16 leading-tight tracking-tight">
              The Story of <span className="text-primary">One Fourteen</span>
            </h1>

            <div className="space-y-12 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-paragraph text-xl md:text-2xl text-foreground/80 leading-relaxed">
                  114 West Main Street. A corner on Whiskey Row that's seen it all. From the roar of the crowd before game day to the pulse of the night after the show ends, this address has become synonymous with one thing: where Louisville comes to let loose.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-paragraph text-xl md:text-2xl text-foreground/80 leading-relaxed">
                  One Fourteen isn't just a bar. It's a state of mind. It's the place where strangers become friends over a strong drink and louder music. It's where the energy never dies, where walk-ins are always welcome, and where the night is always young.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="font-paragraph text-xl md:text-2xl text-foreground/80 leading-relaxed">
                  Before the game. After the show. Late nights on Whiskey Row. This is where the city's heartbeat is strongest. No reservations. No dress code. No attitude. Just real people, real drinks, and real moments that matter.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="font-paragraph text-xl md:text-2xl text-foreground/80 leading-relaxed">
                  The story of One Fourteen is still being written. Every night brings new faces, new stories, new memories. It's a place where the night never ends, where the music never stops, and where everyone belongs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-8 border-t border-foreground/20"
              >
                <p className="font-paragraph text-lg md:text-xl text-primary font-bold">
                  Open Tue-Sun, 4pm-2am<br />
                  114 W Main St, Louisville, KY 40202<br />
                  21+ • Walk-ins Welcome • No Reservations
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
