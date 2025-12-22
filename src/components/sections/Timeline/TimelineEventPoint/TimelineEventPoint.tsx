'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { scaleIn } from '../timeline.animations'
import type { TimelineEventPointProps } from './TimelineEventPoint.types'

export function TimelineEventPoint({
  event,
  index,
  isActive,
  prefersReducedMotion,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: TimelineEventPointProps) {
  if (prefersReducedMotion) {
    return (
      <button
        onClick={() => onClick(index)}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
        className={cn(
          'relative w-16 h-16 rounded-full transition-all duration-200',
          'flex items-center justify-center cursor-pointer',
          'border-4 border-light-text dark:border-dark-text',
          'hover:scale-110 focus:scale-110 focus:outline-none',
          isActive
            ? 'bg-light-secondary-accent dark:bg-dark-secondary-accent'
            : 'bg-light-surface dark:bg-dark-surface'
        )}
        aria-label={`${event.title} - ${event.year}`}
      >
        <span className="font-tilda font-extrabold text-sm md:text-base text-light-text dark:text-dark-text">
          {event.year}
        </span>
      </button>
    )
  }

  return (
    <motion.button
      variants={scaleIn}
      onClick={() => onClick(index)}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      className={cn(
        'relative w-16 h-16 rounded-full transition-all duration-200',
        'flex items-center justify-center cursor-pointer',
        'border-4 border-light-text dark:border-dark-text',
        'hover:scale-110 focus:scale-110 focus:outline-none',
        isActive
          ? 'bg-light-secondary-accent dark:bg-dark-secondary-accent'
          : 'bg-light-surface dark:bg-dark-surface'
      )}
      aria-label={`${event.title} - ${event.year}`}
    >
      <span className="font-tilda font-extrabold text-sm md:text-base text-light-text dark:text-dark-text">
        {event.year}
      </span>
    </motion.button>
  )
}
