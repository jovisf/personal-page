'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { cn } from '@/lib/utils'
import type { AboutProps } from './About.types'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export function About({ className }: AboutProps) {
  const t = useTranslations('about')
  const [ref, isVisible] = useScrollObserver<HTMLElement>({ threshold: 0.2 })

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animationProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: isVisible ? 'visible' : 'hidden' }

  const paragraphs = [
    t('paragraphs.0'),
    t('paragraphs.1'),
    t('paragraphs.2'),
    t('paragraphs.3'),
  ]

  const hobbies = [
    t('hobbies.0'),
    t('hobbies.1'),
    t('hobbies.2'),
    t('hobbies.3'),
  ]

  return (
    <section
      id="about"
      ref={ref}
      className={cn(
        'relative py-20 md:py-32',
        'bg-light-surface dark:bg-dark-surface',
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          {...animationProps}
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl  font-extrabold uppercase tracking-tight mb-12 text-light-text dark:text-dark-text"
        >
          {t('title')}
        </motion.h2>

        {/* Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <motion.div
            {...animationProps}
            variants={staggerContainer}
            className="lg:col-span-7 space-y-6"
          >
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeInUp}
                className="font-medium text-base md:text-lg leading-relaxed text-light-text dark:text-dark-text"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Geometric Divider */}
          <div className="hidden lg:block lg:col-span-1">
            <motion.div
              {...animationProps}
              variants={fadeInUp}
              className="h-full w-1 bg-light-primary-accent dark:bg-dark-primary-accent mx-auto"
            />
          </div>

          {/* Hobbies Section */}
          <motion.div
            {...animationProps}
            variants={staggerContainer}
            className="lg:col-span-4 bg-light-background dark:bg-dark-background p-6 md:p-8 border-3 border-light-text dark:border-dark-text"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6 text-light-primary-accent dark:text-dark-primary-accent"
            >
              {t('hobbiesTitle')}
            </motion.h3>
            <motion.ul
              variants={staggerContainer}
              className="space-y-4"
            >
              {hobbies.map((hobby, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="font-medium text-sm md:text-base leading-relaxed flex items-start text-light-text dark:text-dark-text"
                >
                  <span className="inline-block w-2 h-2 bg-light-primary-accent dark:bg-dark-primary-accent mt-2 mr-3 flex-shrink-0" />
                  <span>{hobby}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-light-text dark:bg-dark-text opacity-30" />
      </div>
    </section>
  )
}
