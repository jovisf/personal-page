'use client'

import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { useBreakpoint } from '@/hooks/useBreakpoint'
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
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
  },
}


const sketchVariants = {
  hidden: {
    pathLength: 0
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: [0.165, 0.84, 0.44, 1] as const
    }
  },
  exit: {
    pathLength: 0,
    transition: {
      duration: 0.5,
      ease: [0.165, 0.84, 0.44, 1] as const
    }
  }
}

const cardBackgroundVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.6,
      ease: [0.165, 0.84, 0.44, 1] as const
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.165, 0.84, 0.44, 1] as const
    }
  }
}

// Animation 3: Content fades in from top (starts at 0.8s)
const cardContentVariants = {
  hidden: {
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.8,
      ease: [0.165, 0.84, 0.44, 1] as const
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: [0.165, 0.84, 0.44, 1] as const
    }
  }
}

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

  const cardAnimationProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden' as const, animate: 'visible' as const, exit: 'exit' as const }

  const events: TimelineEvent[] = [
    {
      title: t('events.0.title'),
      year: t('events.0.year'),
      description: t('events.0.description'),
      logo: t('events.0.logo'),
      alt: t('events.0.alt'),
    },
    {
      title: t('events.1.title'),
      year: t('events.1.year'),
      description: t('events.1.description'),
      logo: t('events.1.logo'),
      alt: t('events.1.alt'),
    },
    {
      title: t('events.2.title'),
      year: t('events.2.year'),
      description: t('events.2.description'),
      logo: t('events.2.logo'),
      alt: t('events.2.alt'),
    },
    {
      title: t('events.3.title'),
      year: t('events.3.year'),
      description: t('events.3.description'),
      logo: t('events.3.logo'),
      alt: t('events.3.alt'),
    },
    {
      title: t('events.4.title'),
      year: t('events.4.year'),
      description: t('events.4.description'),
      logo: t('events.4.logo'),
      alt: t('events.4.alt'),
    },
  ]

  const handleEventClick = (index: number) => {
    if (activeEvent === index) {
      setActiveEvent(null)
    } else {
      setActiveEvent(index)
    }
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

        {/* Horizontal Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            {...animationProps}
            variants={fadeInUp}
            className="absolute top-8 left-0 right-0 h-1 bg-light-primary-accent dark:bg-dark-primary-accent hidden md:block"
          />

          {/* Mobile: Vertical Line */}
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
                {/* Event Point */}
                <motion.button
                  variants={scaleIn}
                  onClick={() => handleEventClick(index)}
                  onMouseEnter={() => handleEventHover(index)}
                  onMouseLeave={handleMouseLeave}
                  className={cn(
                    'relative w-16 h-16 rounded-full transition-all duration-200',
                    'flex items-center justify-center cursor-pointer',
                    'border-4 border-light-text dark:border-dark-text',
                    'hover:scale-110 focus:scale-110 focus:outline-none',
                    activeEvent === index
                      ? 'bg-light-secondary-accent dark:bg-dark-secondary-accent'
                      : 'bg-light-surface dark:bg-dark-surface'
                  )}
                  aria-label={`${event.title} - ${event.year}`}
                >
                  <span className="font-tilda font-extrabold text-sm md:text-base text-light-text dark:text-dark-text">
                    {event.year}
                  </span>
                </motion.button>

                {/* Event Card */}
                <AnimatePresence mode="wait">
                  {activeEvent === index && (
                    <motion.div
                      key={`card-${index}`}
                      variants={cardBackgroundVariants}
                      {...cardAnimationProps}
                      className={cn(
                        'absolute top-24 left-0 md:left-1/2 md:-translate-x-1/2',
                        'w-80 md:w-72 lg:w-80 p-6',
                        'bg-light-surface dark:bg-dark-surface',
                        'shadow-2xl z-[100]'
                      )}
                      onMouseEnter={() => {
                        if (isDesktop) {
                          setActiveEvent(index)
                        }
                      }}
                      onMouseLeave={() => {
                        if (isDesktop) {
                          setActiveEvent(null)
                        }
                      }}
                    >
                      {/* Sketch Border SVG Overlay */}
                      {!prefersReducedMotion ? (
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none z-20"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <motion.path
                            d="M 2 2 L 98 2 L 98 98 L 2 98 Z"
                            fill="none"
                            className="stroke-light-text dark:stroke-dark-text"
                            strokeWidth="4"
                            vectorEffect="non-scaling-stroke"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sketchVariants}
                          />
                        </svg>
                      ) : (
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none z-20"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M 2 2 L 98 2 L 98 98 L 2 98 Z"
                            fill="none"
                            className="stroke-light-text dark:stroke-dark-text"
                            strokeWidth="4"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      )}

                      {/* Card Content with fade-in animation */}
                      <motion.div
                        variants={cardContentVariants}
                        {...cardAnimationProps}
                        className="relative z-10"
                      >
                        {/* Logo */}
                        {event.logo && event.alt && (
                          <div className="mb-4 flex justify-center">
                            <div className="relative w-20 h-20 bg-light-background dark:bg-dark-background p-2 border-3 border-light-primary-accent dark:border-dark-primary-accent">
                              <Image
                                src={event.logo}
                                alt={event.alt}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                          </div>
                        )}

                        {/* Year Badge */}
                        <div className="inline-block px-3 py-1 mb-3 bg-light-primary-accent dark:bg-dark-primary-accent">
                          <span className="font-tilda font-extrabold text-lg text-light-background dark:text-dark-background">
                            {event.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-tilda font-bold text-xl mb-3 text-light-text dark:text-dark-text leading-tight">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="font-tilda font-medium text-sm leading-relaxed text-light-text dark:text-dark-text opacity-90">
                          {event.description}
                        </p>
                      </motion.div>

                      {/* Decorative Corner */}
                      <motion.div
                        variants={cardContentVariants}
                        {...cardAnimationProps}
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-light-secondary-accent dark:bg-dark-secondary-accent z-10"
                      />
                    </motion.div>
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

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-light-text dark:bg-dark-text opacity-30" />
      </div>

      {/* Geometric Background Elements */}
      <motion.div
        {...animationProps}
        variants={scaleIn}
        className="absolute top-20 right-10 w-32 h-32 border-4 border-light-secondary-accent dark:border-dark-secondary-accent opacity-20 rotate-45 hidden lg:block"
      />
      <motion.div
        {...animationProps}
        variants={scaleIn}
        className="absolute bottom-20 left-10 w-24 h-24 bg-light-primary-accent dark:bg-dark-primary-accent opacity-10 hidden lg:block"
      />
    </section>
  )
}
