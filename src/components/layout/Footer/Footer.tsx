'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import type { FooterProps } from './Footer.types'

export function Footer({ className }: FooterProps) {
  const t = useTranslations('footer')

  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'relative py-8 md:py-12',
        'bg-light-text dark:bg-dark-text',
        'text-light-background dark:text-dark-background',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="font-tilda font-medium text-sm md:text-base text-center md:text-left">
            {t('text')} © {currentYear}
          </p>

          {/* Geometric Decoration */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-light-secondary-accent dark:bg-dark-secondary-accent" />
            <div className="w-3 h-3 bg-light-primary-accent dark:bg-dark-primary-accent rotate-45" />
            <div className="w-3 h-3 bg-light-surface dark:bg-dark-surface rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  )
}
