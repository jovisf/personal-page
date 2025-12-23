'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import type { FooterProps } from './Footer.types'
import { SiInstagram, SiLinkedin, SiGithub } from 'react-icons/si'

export function Footer({ className }: FooterProps) {
  const t = useTranslations('footer')

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/jv.soares30/',
      icon: SiInstagram,
    },
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/in/jo%C3%A3o-victor-25b434235/',
      icon: SiLinkedin,
    },
    {
      name: 'Github',
      href: 'https://github.com/jovisf',
      icon: SiGithub,
    },
  ]

  return (
    <footer
      className={cn(
        'relative py-8 md:py-6',
        'bg-light-text dark:bg-dark-text',
        'text-light-background dark:text-dark-background',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="font-medium text-sm md:text-base text-center md:text-left">
            {t('text')} © {currentYear}
          </p>

          
          

          {/* Geometric Decoration */}
            {/* Social Media Links */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={cn(
                      'p-2 transition-colors duration-0',
                      'hover:text-light-primary-accent hover:dark:text-dark-primary-accent'
                    )}
                  >
                    <Icon className="w-4 h-4 md:w-6 md:h-6" />
                  </a>
                )
              })}
            </div>
            <div className="w-3 h-3 bg-light-secondary-accent dark:bg-dark-secondary-accent" />
            <div className="w-3 h-3 bg-light-primary-accent dark:bg-dark-primary-accent rotate-45" />
            <div className="w-3 h-3 bg-light-surface dark:bg-dark-surface rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  )
}
