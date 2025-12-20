'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { HeroProps } from './Hero.types'

const diagonalSlideIn = {
  hidden: { x: -100, y: -100, opacity: 0 },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  },
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }
  },
}

const geometricShapes = {
  hidden: { scale: 0, rotate: -45 },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
}

export function Hero({ className }: HeroProps) {
  const t = useTranslations('hero')

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animationProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: 'visible' }

  return (
    <section
      id="hero"
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        'bg-light-background dark:bg-dark-background',
        className
      )}
    >
      {/* Geometric Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          {...animationProps}
          variants={geometricShapes}
          custom={0}
          className="absolute top-20 right-20 w-32 h-32 bg-light-secondary-accent dark:bg-dark-secondary-accent"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
        <motion.div
          {...animationProps}
          variants={geometricShapes}
          custom={1}
          className="absolute bottom-32 left-16 w-24 h-24 rounded-full border-4 border-light-primary-accent dark:border-dark-primary-accent"
        />
        <motion.div
          {...animationProps}
          variants={geometricShapes}
          custom={2}
          className="absolute top-1/2 right-1/4 w-20 h-20 bg-light-surface dark:bg-dark-surface"
        />
        <motion.div
          {...animationProps}
          variants={geometricShapes}
          custom={3}
          className="absolute bottom-20 right-40 w-16 h-16"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        >
          <div className="w-full h-full bg-light-primary-accent dark:bg-dark-primary-accent" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl">
          {/* Title with diagonal line */}
          <div className="relative mb-6">
            <motion.h1
              {...animationProps}
              variants={diagonalSlideIn}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-tilda font-extrabold uppercase tracking-tight leading-none"
            >
              {t('title')}
            </motion.h1>
            {/* Diagonal line cutting through */}
            <motion.div
              {...animationProps}
              variants={fadeIn}
              className="absolute top-1/2 left-0 right-0 h-1 bg-light-primary-accent dark:bg-dark-primary-accent transform -rotate-6"
              style={{ transformOrigin: 'left center' }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            {...animationProps}
            variants={fadeIn}
            className="text-xl sm:text-2xl md:text-3xl font-tilda font-bold uppercase mb-8 text-light-primary-accent dark:text-dark-primary-accent"
          >
            {t('subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            {...animationProps}
            variants={fadeIn}
            className="text-base sm:text-lg md:text-xl font-tilda font-medium leading-relaxed max-w-3xl text-light-text dark:text-dark-text"
          >
            {t('description')}
          </motion.p>
        </div>
      </div>

      {/* Divider lines - Tech Constructivism style */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-light-text dark:bg-dark-text" />
        <div className="h-px bg-light-text dark:bg-dark-text opacity-50 mt-2" />
      </div>
    </section>
  )
}
