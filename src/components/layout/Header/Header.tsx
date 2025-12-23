'use client'

import { useState, useTransition, useRef, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, useParams, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useMarkerPosition } from '@/hooks/useMarkerPosition'
import { LanguageSelect } from '@/components/ui/LanguageSelect'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import type { HeaderProps } from './Header.types'

export function Header({ className }: HeaderProps) {
  const t = useTranslations('navigation')
  const tHeader = useTranslations('header')
  const params = useParams()
  const pathname = usePathname()
  const locale = params.locale as string || 'pt-BR'
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const navigationItems = [
    { label: t('home'), anchor: 'hero' },
    { label: t('about'), anchor: 'about' },
    { label: t('timeline'), anchor: 'timeline' },
    { label: t('stacks'), anchor: 'stacks' },
    { label: t('contact'), anchor: 'contact' },
  ]

  const languageOptions = [
    { value: 'pt-BR', label: 'Português', flag: '🇧🇷' },
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
  ]

  const sectionIds = useMemo(() => ['hero', 'about', 'timeline', 'stacks', 'contact'], [])
  const activeSection = useActiveSection(sectionIds)
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])
  const markerStyle = useMarkerPosition(sectionIds, navRefs)

  const handleNavClick = (anchor: string) => {
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return

    startTransition(() => {
      const currentPath = pathname.replace(`/${locale}`, '')
      router.push(`/${newLocale}${currentPath || '/'}`)
    })
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
            className="font-extrabold text-xl md:text-2xl uppercase tracking-tight text-light-text dark:text-dark-text hover:text-light-primary-accent dark:hover:text-dark-primary-accent transition-colors"
          >
            {tHeader('welcome')}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 relative">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                ref={(el) => { navRefs.current[index] = el }}
                onClick={() => handleNavClick(item.anchor)}
                className={cn(
                  "font-medium text-sm uppercase tracking-wide transition-colors relative",
                  activeSection === item.anchor
                    ? "text-light-primary-accent dark:text-dark-primary-accent"
                    : "text-light-text dark:text-dark-text hover:text-light-primary-accent dark:hover:text-dark-primary-accent"
                )}
              >
                {item.label}
              </button>
            ))}

            {/* Animated Marker */}
            {activeSection && markerStyle.width > 0 && (
              <motion.div
                className="absolute bottom-0 h-0.5 bg-light-primary-accent dark:bg-dark-primary-accent"
                initial={false}
                animate={{
                  left: markerStyle.left,
                  width: markerStyle.width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <div className="ml-4 pl-4 border-l-2 border-light-text dark:border-dark-text">
              <LanguageSelect
                currentLocale={locale}
                languages={languageOptions}
                onLocaleChange={handleLocaleChange}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden font-bold text-sm uppercase text-light-text dark:text-dark-text"
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
                  className="font-medium text-sm uppercase tracking-wide text-left text-light-text dark:text-dark-text hover:text-light-primary-accent dark:hover:text-dark-primary-accent transition-colors"
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Theme and Language Controls */}
              <div className="flex items-center gap-4 pt-4 border-t border-light-text dark:border-dark-text">
                <ThemeToggle />
                <LanguageSelect
                  currentLocale={locale}
                  languages={languageOptions}
                  onLocaleChange={handleLocaleChange}
                />
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
