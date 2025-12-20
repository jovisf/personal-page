'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { cn } from '@/lib/utils'
import type { TimelineProps, TimelineEvent } from './Timeline.types'

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
      staggerChildren: 0.15,
    },
  },
}

const scaleIn = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
  },
}

export function Timeline({ className }: TimelineProps) {
  const t = useTranslations('timeline')
  const [ref, isVisible] = useScrollObserver<HTMLElement>({ threshold: 0.1 })

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animationProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: isVisible ? 'visible' : 'hidden' }

  const events: TimelineEvent[] = [
    {
      title: t('events.0.title'),
      year: t('events.0.year'),
      description: t('events.0.description'),
    },
    {
      title: t('events.1.title'),
      year: t('events.1.year'),
      description: t('events.1.description'),
    },
    {
      title: t('events.2.title'),
      year: t('events.2.year'),
      description: t('events.2.description'),
    },
    {
      title: t('events.3.title'),
      year: t('events.3.year'),
      description: t('events.3.description'),
    },
    {
      title: t('events.4.title'),
      year: t('events.4.year'),
      description: t('events.4.description'),
    },
  ]

  return (
    <section
      id="timeline"
      ref={ref}
      className={cn(
        'relative py-20 md:py-32',
        'bg-light-background dark:bg-dark-background',
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          {...animationProps}
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-tilda font-extrabold uppercase tracking-tight mb-16 text-light-text dark:text-dark-text"
        >
          {t('title')}
        </motion.h2>

        {/* Timeline */}
        <motion.div
          {...animationProps}
          variants={staggerContainer}
          className="relative"
        >
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-light-primary-accent dark:bg-dark-primary-accent -translate-x-1/2" />

          {/* Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={cn(
                  'relative grid grid-cols-1 md:grid-cols-2 gap-8',
                  index % 2 === 0 ? 'md:text-right' : ''
                )}
              >
                {/* Left side (year on desktop) */}
                <div className={cn(
                  'flex items-start',
                  index % 2 === 0 ? 'md:justify-end' : 'md:order-2'
                )}>
                  <div className="ml-12 md:ml-0">
                    <motion.div
                      variants={scaleIn}
                      className="inline-block px-4 py-2 bg-light-primary-accent dark:bg-dark-primary-accent text-light-background dark:text-dark-background font-tilda font-extrabold text-2xl md:text-3xl mb-4"
                    >
                      {event.year}
                    </motion.div>
                    <h3 className="font-tilda font-bold text-xl md:text-2xl mb-2 max-w-md text-light-text dark:text-dark-text">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Timeline Dot */}
                <motion.div
                  variants={scaleIn}
                  className="absolute left-4 md:left-1/2 top-2 w-4 h-4 bg-light-secondary-accent dark:bg-dark-secondary-accent border-3 border-light-text dark:border-dark-text rounded-full -translate-x-1/2"
                />

                {/* Right side (description on desktop) */}
                <div className={cn(
                  'flex items-start',
                  index % 2 === 0 ? 'md:order-2' : ''
                )}>
                  <div className="ml-12 md:ml-0 max-w-md">
                    <p className="font-tilda font-medium text-base md:text-lg leading-relaxed text-light-text dark:text-dark-text">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-light-text dark:bg-dark-text opacity-30" />
      </div>
    </section>
  )
}
