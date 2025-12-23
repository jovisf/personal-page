'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { cn } from '@/lib/utils'
import type { StacksProps } from './Stacks.types'
import {
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiJavascript,
  SiAngular,
  SiRubyonrails,
  SiLinux,
  SiBurpsuite,
  SiWireshark
} from 'react-icons/si'
import { FaCodeBranch } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import Image from 'next/image'
import { CERTIFICATES_LOGOS } from '@/data/certificates.data'

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

const techIcons: Record<string, IconType> = {
  'TypeScript': SiTypescript,
  'Next.js': SiNextdotjs,
  'React': SiReact,
  'Node.js': SiNodedotjs,
  'Python': SiPython,
  'PostgreSQL': SiPostgresql,
  'Docker': SiDocker,
  'Git': SiGit,
  'Javascript': SiJavascript,
  'Angular': SiAngular,
  'Ruby on Rails': SiRubyonrails,
  'Linux': SiLinux,
  'CI/CD': FaCodeBranch,
  'Burp Suite': SiBurpsuite,
  'Wireshark': SiWireshark,
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
    t('technologies.8'),
    t('technologies.9'),
    t('technologies.10'),
    t('technologies.11'),
    t('technologies.12'),
    t('technologies.13'),
    t('technologies.14'),
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
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight mb-16 text-light-text dark:text-dark-text"
        >
          {t('title')}
        </motion.h2>

        {/* Technologies Title */}
        <motion.h3
          {...animationProps}
          variants={fadeInUp}
          className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-8 text-light-primary-accent dark:text-dark-primary-accent"
        >
          {t('technologiesTitle')}
        </motion.h3>
      </div>

      {/* Full Width Carousels */}
      <div className="space-y-4 mb-16">
        {/* First Row - Moving Right */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              },
            }}
            className="flex gap-4"
          >
            {[...technologies.slice(0, 8), ...technologies.slice(0, 8), ...technologies.slice(0, 8)].map((tech, index) => (
              <motion.div
                key={index}
                whileHover="hover"
                initial="rest"
                className="group flex-shrink-0"
              >
                <motion.div
                  variants={cardHover}
                  className={cn(
                    'relative p-3 md:p-4 w-[120px] md:w-[140px]',
                    'bg-light-background dark:bg-dark-background',
                    'border-2 border-light-text dark:border-dark-text',
                    'group-hover:border-4 group-hover:border-light-primary-accent group-hover:dark:border-dark-primary-accent',
                    'group-hover:bg-light-primary-accent group-hover:dark:bg-dark-primary-accent',
                    'transition-colors duration-0'
                  )}
                >
                  <div className="aspect-square flex flex-col items-center justify-center gap-2">
                    {techIcons[tech] && (
                      <div className={cn(
                        'text-3xl md:text-4xl',
                        'text-light-text dark:text-dark-text',
                        'group-hover:text-light-background group-hover:dark:text-dark-background',
                        'transition-colors duration-0'
                      )}>
                        {(() => {
                          const Icon = techIcons[tech]
                          return <Icon />
                        })()}
                      </div>
                    )}
                    <span className={cn(
                      'font-bold text-xs md:text-sm text-center',
                      'text-light-text dark:text-dark-text',
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

        {/* Second Row - Moving Left */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [-1000, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              },
            }}
            className="flex gap-4"
          >
            {[...technologies.slice(8, 15), ...technologies.slice(8, 15), ...technologies.slice(8, 15)].map((tech, index) => (
              <motion.div
                key={index}
                whileHover="hover"
                initial="rest"
                className="group flex-shrink-0"
              >
                <motion.div
                  variants={cardHover}
                  className={cn(
                    'relative p-3 md:p-4 w-[120px] md:w-[140px]',
                    'bg-light-background dark:bg-dark-background',
                    'border-2 border-light-text dark:border-dark-text',
                    'group-hover:border-4 group-hover:border-light-primary-accent group-hover:dark:border-dark-primary-accent',
                    'group-hover:bg-light-primary-accent group-hover:dark:bg-dark-primary-accent',
                    'transition-colors duration-0'
                  )}
                >
                  <div className="aspect-square flex flex-col items-center justify-center gap-2">
                    {techIcons[tech] && (
                      <div className={cn(
                        'text-3xl md:text-4xl',
                        'text-light-text dark:text-dark-text',
                        'group-hover:text-light-background group-hover:dark:text-dark-background',
                        'transition-colors duration-0'
                      )}>
                        {(() => {
                          const Icon = techIcons[tech]
                          return <Icon />
                        })()}
                      </div>
                    )}
                    <span className={cn(
                      'font-bold text-xs md:text-sm text-center',
                      'text-light-text dark:text-dark-text',
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
      </div>

      <div className="container mx-auto px-4 space-y-16">
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
            className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-8 text-light-primary-accent dark:text-dark-primary-accent"
          >
            {t('certificatesTitle')}
          </motion.h3>

          <motion.div
            {...animationProps}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificates.map((cert, index) => {
              const certLogo = CERTIFICATES_LOGOS[index]
              return (
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
                  {/* Logo */}
                  {certLogo && (
                    <div className="mb-4 h-16 flex items-center  relative">
                      <Image
                        src={certLogo.logo}
                        alt={certLogo.alt}
                        width={64}
                        height={64}
                        className={cn(
                          'object-contain',
                          certLogo.logoDark ? 'dark:hidden' : ''
                        )}
                      />
                      {certLogo.logoDark && (
                        <Image
                          src={certLogo.logoDark}
                          alt={certLogo.alt}
                          width={120}
                          height={64}
                          className="object-contain hidden dark:block"
                        />
                      )}
                    </div>
                  )}

                  <p className="font-medium text-base md:text-lg leading-relaxed relative z-10 text-light-text dark:text-dark-text">
                    {cert}
                  </p>
                </motion.div>
              )
            })}
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
