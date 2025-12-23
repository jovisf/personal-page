'use client'

import { useEffect, useState } from 'react'
import { preferences } from '@/lib/preferences'
import type { Theme } from '@/lib/preferences'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const cookieTheme = preferences.getTheme()
  if (cookieTheme) return cookieTheme

  const localStorageTheme = localStorage.getItem('theme') as Theme | null
  if (localStorageTheme && (localStorageTheme === 'light' || localStorageTheme === 'dark')) {
    preferences.setTheme(localStorageTheme)
    localStorage.removeItem('theme') 
    return localStorageTheme
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const systemTheme = prefersDark ? 'dark' : 'light'
  preferences.setTheme(systemTheme)
  return systemTheme
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initialTheme = getInitialTheme()
    setTheme(initialTheme)

    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Save to cookie
    preferences.setTheme(newTheme)

    // Dispatch event for theme change animations
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: newTheme } }))
  }

  return { theme, toggleTheme, mounted }
}
