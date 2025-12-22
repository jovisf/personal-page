'use client'

import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { cn } from '@/lib/utils'
import { TIMELINE_EVENTS } from '@/data/timeline.data'
import { fadeInUp, staggerContainer } from './timeline.animations'
import { TimelineEventPoint } from './TimelineEventPoint'
import { TimelineEventCard } from './TimelineEventCard'
import { TimelineGeometricElements } from './TimelineGeometricElements'
import type { TimelineProps, TimelineEvent } from './Timeline.types'

export function Timeline({ className }: TimelineProps) {
  const t = useTranslations('timeline')
  const [ref, isVisible] = useScrollObserver<HTMLElement>({ threshold: 0.1 })
  const [activeEvent, setActiveEvent] = useState<number | null>(null)
  const { isDesktop } = useBreakpoint()

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animationProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: isVisible ? 'visible' : 'hidden' }

  const events: TimelineEvent[] = TIMELINE_EVENTS.map((eventData) => ({
    title: t(`events.${eventData.id}.title`),
    year: eventData.year,
    description: t(`events.${eventData.id}.description`),
    logo: eventData.logo,
    logoDark: eventData.logoDark,
    alt: eventData.alt,
  }))

  const handleEventClick = (index: number) => {
    setActiveEvent(activeEvent === index ? null : index)
  }

  const handleEventHover = (index: number) => {
    if (isDesktop) {
      setActiveEvent(index)
    }
  }

  const handleMouseLeave = () => {
    if (isDesktop) {
      setActiveEvent(null)
    }
  }

  return (
    <section
      id="timeline"
      ref={ref}
      className={cn(
        'relative py-20 md:py-32 overflow-visible',
        'bg-light-background dark:bg-dark-background',
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          {...animationProps}
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-tilda font-extrabold uppercase tracking-tight mb-16 md:mb-24 text-light-text dark:text-dark-text"
        >
          {t('title')}
        </motion.h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Lines */}
          <motion.div
            {...animationProps}
            variants={fadeInUp}
            className="absolute top-8 left-0 right-0 h-1 bg-light-primary-accent dark:bg-dark-primary-accent hidden md:block"
          />
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-light-primary-accent dark:bg-dark-primary-accent md:hidden" />

          {/* Events */}
          <motion.div
            {...animationProps}
            variants={staggerContainer}
            className="relative flex flex-col md:flex-row md:justify-between gap-8 md:gap-4"
          >
            {events.map((event, index) => (
              <div
                key={index}
                className="relative flex-1 flex flex-col items-start md:items-center"
              >
                <TimelineEventPoint
                  event={event}
                  index={index}
                  isActive={activeEvent === index}
                  prefersReducedMotion={prefersReducedMotion}
                  onClick={handleEventClick}
                  onMouseEnter={handleEventHover}
                  onMouseLeave={handleMouseLeave}
                />

                <AnimatePresence mode="wait">
                  {activeEvent === index && (
                    <TimelineEventCard
                      event={event}
                      index={index}
                      prefersReducedMotion={prefersReducedMotion}
                      isDesktop={isDesktop}
                      onMouseEnter={() => setActiveEvent(index)}
                      onMouseLeave={() => setActiveEvent(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* Instruction Text */}
          <motion.p
            {...animationProps}
            variants={fadeInUp}
            className="mt-16 md:mt-20 text-center font-tilda font-medium text-sm text-light-text dark:text-dark-text opacity-60"
          >
            {isDesktop ? t('instructionDesktop') : t('instructionMobile')}
          </motion.p>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-light-text dark:bg-dark-text opacity-30" />
      </div>

      {/* Geometric Background Elements */}
      <TimelineGeometricElements animationProps={animationProps} />
    </section>
  )
}
