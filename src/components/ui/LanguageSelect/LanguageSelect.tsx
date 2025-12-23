'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { LanguageSelectProps } from './LanguageSelect.types'

export function LanguageSelect({
  currentLocale,
  languages,
  onLocaleChange,
  className,
}: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find((lang) => lang.value === currentLocale)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (locale: string) => {
    onLocaleChange(locale)
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className={cn('relative', className)}>
      {/* Select Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2',
          'border-2 border-light-text dark:border-dark-text',
          'bg-light-background dark:bg-dark-background',
          'text-light-text dark:text-dark-text',
          'font-bold text-sm uppercase tracking-wide',
          'hover:bg-light-primary-accent dark:hover:bg-dark-secondary-accent',
          'hover:border-light-primary-accent dark:hover:border-dark-secondary-accent',
          'transition-colors duration-0',
          'min-w-[120px] justify-between',
          'cursor-pointer'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span>{currentLanguage?.flag}</span>
          <span>{currentLanguage?.label}</span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs"
        >
          ▼
        </motion.span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute top-full left-0 right-0 mt-1',
              'border-2 border-light-text dark:border-dark-text',
              'bg-light-background dark:bg-dark-background',
              'overflow-hidden',
              'z-50'
            )}
          >
            {languages.map((language) => (
              <button
                key={language.value}
                onClick={() => handleSelect(language.value)}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2',
                  'font-bold text-sm uppercase tracking-wide text-left',
                  'transition-colors duration-0',
                  'cursor-pointer',
                  currentLocale === language.value
                    ? 'bg-light-primary-accent dark:bg-dark-primary-accent text-light-background dark:text-dark-background'
                    : 'text-light-text dark:text-dark-text hover:bg-light-secondary-accent dark:hover:bg-dark-surface'
                )}
              >
                <span>{language.flag}</span>
                <span>{language.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
