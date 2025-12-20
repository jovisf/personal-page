'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { cn } from '@/lib/utils'
import type { StacksProps } from './Stacks.types'

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

const cardHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0 }
  },
}

export function Stacks({ className }: StacksProps) {
  const t = useTranslations('stacks')
  const [ref, isVisible] = useScrollObserver<HTMLElement>({ threshold: 0.2 })

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animationProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: isVisible ? 'visible' : 'hidden' }

  const technologies = [
    t('technologies.0'),
    t('technologies.1'),
    t('technologies.2'),
    t('technologies.3'),
    t('technologies.4'),
    t('technologies.5'),
    t('technologies.6'),
    t('technologies.7'),
  ]

  const certificates = [
    t('certificates.0'),
    t('certificates.1'),
    t('certificates.2'),
  ]

  return (
    <section
      id="stacks"
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
          className="text-4xl md:text-5xl lg:text-6xl font-tilda font-extrabold uppercase tracking-tight mb-16 text-light-text dark:text-dark-text"
        >
          {t('title')}
        </motion.h2>

        <div className="space-y-16">
          {/* Technologies Section */}
          <div>
            <motion.h3
              {...animationProps}
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-tilda font-bold uppercase tracking-tight mb-8 text-light-primary-accent dark:text-dark-primary-accent"
            >
              {t('technologiesTitle')}
            </motion.h3>

            <motion.div
              {...animationProps}
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover="hover"
                  initial="rest"
                  className="group"
                >
                  <motion.div
                    variants={cardHover}
                    className={cn(
                      'relative p-6 md:p-8',
                      'bg-light-background dark:bg-dark-background',
                      'border-2 border-light-text dark:border-dark-text',
                      'group-hover:border-4 group-hover:border-light-primary-accent group-hover:dark:border-dark-primary-accent',
                      'group-hover:bg-light-primary-accent group-hover:dark:bg-dark-primary-accent',
                      'transition-colors duration-0'
                    )}
                  >
                    <div className="aspect-square flex items-center justify-center">
                      <span className={cn(
                        'font-tilda font-bold text-base md:text-lg text-center',
                        'group-hover:text-light-background group-hover:dark:text-dark-background',
                        'transition-colors duration-0'
                      )}>
                        {tech}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            {...animationProps}
            variants={fadeInUp}
            className="h-1 bg-light-primary-accent dark:bg-dark-primary-accent max-w-xs"
          />

          {/* Certificates Section */}
          <div>
            <motion.h3
              {...animationProps}
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-tilda font-bold uppercase tracking-tight mb-8 text-light-primary-accent dark:text-dark-primary-accent"
            >
              {t('certificatesTitle')}
            </motion.h3>

            <motion.div
              {...animationProps}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={cn(
                    'p-6 md:p-8',
                    'bg-light-background dark:bg-dark-background',
                    'border-3 border-light-primary-accent dark:border-dark-primary-accent',
                    'relative overflow-hidden'
                  )}
                >
                  {/* Geometric accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-light-secondary-accent dark:bg-dark-secondary-accent opacity-20" />

                  <p className="font-tilda font-medium text-base md:text-lg leading-relaxed relative z-10 text-light-text dark:text-dark-text">
                    {cert}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-light-text dark:bg-dark-text opacity-30" />
      </div>
    </section>
  )
}
