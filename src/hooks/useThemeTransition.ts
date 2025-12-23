'use client'

import { useEffect, useState } from 'react'

/**
 * Hook that detects theme transitions and triggers a brief animation state
 * Returns isTransitioning which is true for 600ms when theme changes
 */
export function useThemeTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleThemeChange = () => {
      setIsTransitioning(true)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    }

    window.addEventListener('themeChange', handleThemeChange)

    return () => {
      window.removeEventListener('themeChange', handleThemeChange)
    }
  }, [])

  return isTransitioning
}
