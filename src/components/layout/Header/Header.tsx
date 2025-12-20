'use client'

import { useState, useTransition } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/lib/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'
import type { HeaderProps } from './Header.types'

export function Header({ className }: HeaderProps) {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { theme, toggleTheme, mounted} = useTheme()

  const navigationItems = [
    { label: t('home'), anchor: 'hero' },
    { label: t('about'), anchor: 'about' },
    { label: t('timeline'), anchor: 'timeline' },
    { label: t('stacks'), anchor: 'stacks' },
    { label: t('contact'), anchor: 'contact' },
  ]

  const handleNavClick = (anchor: string) => {
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return

    // Use the locale-aware router from next-intl
    router.replace('/', { locale: newLocale })
    router.refresh()
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-light-background/95 dark:bg-dark-background/95',
        'backdrop-blur-sm',
        'border-b-2 border-light-text dark:border-dark-text',
        className
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="font-tilda font-extrabold text-xl md:text-2xl uppercase tracking-tight text-light-text dark:text-dark-text hover:text-light-primary-accent dark:hover:text-dark-primary-accent transition-colors"
          >
            JV
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item.anchor)}
                className="font-tilda font-medium text-sm uppercase tracking-wide text-light-text dark:text-dark-text hover:text-light-primary-accent dark:hover:text-dark-primary-accent transition-colors"
              >
                {item.label}
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center border-2 border-light-text dark:border-dark-text hover:bg-light-primary-accent dark:hover:bg-dark-secondary-accent hover:border-light-primary-accent dark:hover:border-dark-secondary-accent transition-colors duration-0"
              aria-label="Toggle theme"
            >
              {mounted && (
                <span className="font-tilda font-bold text-lg text-light-text dark:text-dark-text">
                  {theme === 'light' ? '☾' : '☀'}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l-2 border-light-text dark:border-dark-text">
              <button
                onClick={() => handleLocaleChange('pt-BR')}
                className={cn(
                  'font-tilda font-bold text-sm uppercase px-2 py-1 transition-colors',
                  locale === 'pt-BR'
                    ? 'bg-light-primary-accent dark:bg-dark-primary-accent text-light-background dark:text-dark-background'
                    : 'text-light-text dark:text-dark-text hover:text-light-primary-accent dark:hover:text-dark-primary-accent'
                )}
              >
                PT
              </button>
              <span className="text-light-text dark:text-dark-text">/</span>
              <button
                onClick={() => handleLocaleChange('en')}
                className={cn(
                  'font-tilda font-bold text-sm uppercase px-2 py-1 transition-colors',
                  locale === 'en'
                    ? 'bg-light-primary-accent dark:bg-dark-primary-accent text-light-background dark:text-dark-background'
                    : 'text-light-text dark:text-dark-text hover:text-light-primary-accent dark:hover:text-dark-primary-accent'
                )}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden font-tilda font-bold text-sm uppercase"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t-2 border-light-text dark:border-dark-text"
          >
            <div className="flex flex-col gap-4">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.anchor)}
                  className="font-tilda font-medium text-sm uppercase tracking-wide text-left text-light-text dark:text-dark-text hover:text-light-primary-accent dark:hover:text-dark-primary-accent transition-colors"
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Theme and Language Controls */}
              <div className="flex items-center gap-4 pt-4 border-t border-light-text dark:border-dark-text">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 flex items-center justify-center border-2 border-light-text dark:border-dark-text hover:bg-light-primary-accent hover:dark:bg-dark-primary-accent hover:border-light-primary-accent hover:dark:border-dark-primary-accent transition-colors duration-0"
                  aria-label="Toggle theme"
                >
                  {mounted && (
                    <span className="font-tilda font-bold text-lg">
                      {theme === 'light' ? '☾' : '☀'}
                    </span>
                  )}
                </button>

                {/* Language Switcher */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLocaleChange('pt-BR')}
                    className={cn(
                      'font-tilda font-bold text-sm uppercase px-2 py-1 transition-colors',
                      locale === 'pt-BR'
                        ? 'bg-light-primary-accent dark:bg-dark-primary-accent text-light-background dark:text-dark-background'
                        : 'text-light-text dark:text-dark-text hover:text-light-primary-accent dark:hover:text-dark-primary-accent'
                    )}
                  >
                    PT
                  </button>
                  <span className="text-light-text dark:text-dark-text">/</span>
                  <button
                    onClick={() => handleLocaleChange('en')}
                    className={cn(
                      'font-tilda font-bold text-sm uppercase px-2 py-1 transition-colors',
                      locale === 'en'
                        ? 'bg-light-primary-accent dark:bg-dark-primary-accent text-light-background dark:text-dark-background'
                        : 'text-light-text dark:text-dark-text hover:text-light-primary-accent dark:hover:text-dark-primary-accent'
                    )}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
