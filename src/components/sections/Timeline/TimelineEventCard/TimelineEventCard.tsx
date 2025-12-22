'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  cardBackgroundVariants,
  cardContentVariants,
  sketchVariants
} from '../timeline.animations'
import type { TimelineEventCardProps } from './TimelineEventCard.types'

export function TimelineEventCard({
  event,
  index,
  prefersReducedMotion,
  isDesktop,
  onMouseEnter,
  onMouseLeave,
}: TimelineEventCardProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const cardAnimationProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden' as const, animate: 'visible' as const, exit: 'exit' as const }

  const logoSrc = isDarkMode && event.logoDark ? event.logoDark : event.logo

  return (
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
          onMouseEnter()
        }
      }}
      onMouseLeave={() => {
        if (isDesktop) {
          onMouseLeave()
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
        {logoSrc && event.alt && (
          <div className="mb-4 flex justify-center">
            <div className="relative w-24 h-24 bg-light-background dark:bg-dark-background border-3 border-light-primary-accent dark:border-dark-primary-accent overflow-hidden">
              <Image
                src={logoSrc}
                alt={event.alt}
                fill
                className="object-contain"
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
  )
}
