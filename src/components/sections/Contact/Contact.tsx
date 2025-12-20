'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { ContactProps } from './Contact.types'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  },
}

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  },
}

export function Contact({ className }: ContactProps) {
  const t = useTranslations('contact')
  const [ref, isVisible] = useScrollObserver<HTMLElement>({ threshold: 0.3 })

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animationProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: isVisible ? 'visible' : 'hidden' }

  const handleEmailClick = () => {
    window.location.href = 'mailto:joaovictor@example.com'
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={cn(
        'relative py-20 md:py-32',
        'bg-light-background dark:bg-dark-background',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Title */}
          <motion.h2
            {...animationProps}
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-tilda font-extrabold uppercase tracking-tight mb-8 text-light-text dark:text-dark-text"
          >
            {t('title')}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...animationProps}
            variants={fadeInUp}
            className="font-tilda font-medium text-lg md:text-xl leading-relaxed mb-12 text-light-text dark:text-dark-text"
          >
            {t('description')}
          </motion.p>

          {/* Email Button */}
          <motion.div
            {...animationProps}
            variants={scaleIn}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleEmailClick}
            >
              {t('emailLabel')}
            </Button>
          </motion.div>

          {/* Geometric decoration */}
          <div className="relative mt-16">
            <motion.div
              {...animationProps}
              variants={fadeInUp}
              className="flex items-center justify-center gap-4"
            >
              <div className="w-16 h-1 bg-light-primary-accent dark:bg-dark-primary-accent" />
              <div className="w-4 h-4 bg-light-secondary-accent dark:bg-dark-secondary-accent rotate-45" />
              <div className="w-16 h-1 bg-light-primary-accent dark:bg-dark-primary-accent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
