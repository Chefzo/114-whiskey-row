import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  /** Full-bleed background image URL. */
  image: string;
  imageAlt: string;
  /** Small uppercase label above the title. */
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** CTAs or extra content rendered below the subtitle. */
  children?: ReactNode;
  /** 'full' = full-screen landing hero, 'page' = shorter interior header. */
  size?: 'full' | 'page';
  /** CSS object-position for the backdrop (e.g. 'center 30%'). */
  objectPosition?: string;
}

export default function PageHero({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  children,
  size = 'page',
  objectPosition = 'center',
}: PageHeroProps) {
  const heightClass =
    size === 'full'
      ? 'min-h-[100svh] md:min-h-screen'
      : 'min-h-[56vh] md:min-h-[64vh]';

  return (
    <section
      className={`relative w-full flex items-end overflow-hidden ${heightClass}`}
      aria-label="Page header"
    >
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
        loading="eager"
      />

      {/* Legibility scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent" />
      {/* Top fade keeps the fixed header readable over bright photos */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/90 to-transparent" />

      <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 md:px-16 pb-12 sm:pb-16 md:pb-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-5xl"
        >
          {eyebrow && (
            <div className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.3em] text-neon-red-orange mb-4 sm:mb-6">
              {eyebrow}
            </div>
          )}
          <h1 className="font-heading text-foreground leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            {title}
          </h1>
          {subtitle && (
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-foreground/75 mt-5 sm:mt-6 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8 sm:mt-10">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
