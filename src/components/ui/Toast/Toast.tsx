'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ToastProps } from './Toast.types'

const typeStyles = {
  success: 'bg-light-secondary-accent/95 dark:bg-dark-secondary-accent/95 border-light-primary-accent dark:border-dark-primary-accent',
  error: 'bg-red-100/95 dark:bg-red-900/80 border-red-500',
}

const textStyles = {
  success: 'text-light-text dark:text-dark-text',
  error: 'text-red-700 dark:text-red-400',
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 100 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'fixed top-6 right-6 z-50',
            'px-6 py-4 border-3 shadow-lg',
            'flex items-center gap-3',
            typeStyles[type]
          )}
          role="alert"
          aria-live="polite"
        >
          <span className={cn('font-tilda font-medium', textStyles[type])}>
            {message}
          </span>
          <button
            onClick={onClose}
            className={cn(
              'ml-2 font-bold text-lg leading-none hover:opacity-70 transition-opacity',
              textStyles[type]
            )}
            aria-label="Close"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
