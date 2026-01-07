import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/528274_de41e140f4b5413493d5959e97c96f5a~mv2.png?originWidth=1920&originHeight=1024"
            alt="One Fourteen Bar interior"
            className="w-full h-full object-cover opacity-15"
            width={1920}
          />
          <div className="absolute inset-0 bg-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto text-left flex flex-col justify-center min-h-[60vh] md:min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-foreground mb-6">
              The Story of <span className="text-neon-red-orange">One Fourteen</span>
            </h1>
            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl">
              Built for real people. Real moments.
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
            {/* Vision Block */}
            <motion.div variants={itemVariants} className="max-w-2xl space-y-4">
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                One Fourteen started with a simple idea: create a place where people show up as themselves. Where conversations matter more than appearances.
              </p>
            </motion.div>

            {/* Philosophy Block */}
            <motion.div variants={itemVariants} className="max-w-2xl space-y-4">
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                When we opened, we didn't cover the scars or polish the edges. We kept the honesty. We kept the real.
              </p>
              <div className="pt-2">
                <p className="font-handwriting text-2xl sm:text-3xl text-neon-red-orange leading-relaxed">
                  Because people connect with real.
                </p>
              </div>
            </motion.div>

            {/* Core Values Block */}
            <motion.div variants={itemVariants} className="max-w-2xl space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                What We Stand For
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-neon-red-orange mb-2">No Polish</h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    We don't pretend to be something we're not. The building has character. The bar has soul.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-neon-red-orange mb-2">No Pretense</h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    Walk in as you are. No dress code. No attitude. Just people being people.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-neon-red-orange mb-2">All In</h3>
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    Loud music. Strong drinks. Real conversations. We're committed to creating an experience that feels genuine.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Closing Block */}
            <motion.div variants={itemVariants} className="max-w-2xl space-y-4 pt-6 border-t border-neon-red-orange/20">
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                One Fourteen is about what happens inside. The conversations. The energy. The people who show up as themselves.
              </p>
              <p className="font-paragraph text-base sm:text-lg text-foreground/90 leading-relaxed">
                It's not about the building. It's about the feeling.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== IMAGE SECTION ===== */}
      <section className="w-full py-16 sm:py-24 px-4 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative h-96 sm:h-[500px] rounded-xl overflow-hidden group"
          >
            <Image
              src="https://static.wixstatic.com/media/528274_88f8eb54d37a4c2299daf3b1c414aae2~mv2.png?originWidth=576&originHeight=960"
              alt="One Fourteen Bar atmosphere"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              width={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 border border-neon-red-orange/20 rounded-xl" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
