'use client'

import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import type { ThemeToggleProps } from './ThemeToggle.types'

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'w-10 h-10 flex items-center justify-center',
        'border-2 border-light-text dark:border-dark-text',
        'hover:bg-light-primary-accent dark:hover:bg-dark-secondary-accent',
        'hover:border-light-primary-accent dark:hover:border-dark-secondary-accent',
        'transition-colors duration-0',
        'text-light-text dark:text-dark-text',
        'cursor-pointer',
        className
      )}
      aria-label="Toggle theme"
    >
      {mounted && (
        <>
          {theme === 'light' ? (
            <MdDarkMode className="w-5 h-5" />
          ) : (
            <MdLightMode className="w-5 h-5" />
          )}
        </>
      )}
    </button>
  )
}
