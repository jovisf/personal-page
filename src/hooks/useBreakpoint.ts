'use client'

import { useState, useEffect } from 'react'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof breakpoints

export interface UseBreakpointReturn {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  currentBreakpoint: Breakpoint | 'xs'
  width: number
}


export function useBreakpoint(): UseBreakpointReturn {
  const [breakpoint, setBreakpoint] = useState<UseBreakpointReturn>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    currentBreakpoint: 'xs',
    width: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const updateBreakpoint = () => {
      const width = window.innerWidth

      let currentBreakpoint: Breakpoint | 'xs' = 'xs'
      if (width >= breakpoints['2xl']) {
        currentBreakpoint = '2xl'
      } else if (width >= breakpoints.xl) {
        currentBreakpoint = 'xl'
      } else if (width >= breakpoints.lg) {
        currentBreakpoint = 'lg'
      } else if (width >= breakpoints.md) {
        currentBreakpoint = 'md'
      } else if (width >= breakpoints.sm) {
        currentBreakpoint = 'sm'
      }

      setBreakpoint({
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.md,
        currentBreakpoint,
        width,
      })
    }

    updateBreakpoint()

    window.addEventListener('resize', updateBreakpoint)

    return () => {
      window.removeEventListener('resize', updateBreakpoint)
    }
  }, [])

  return breakpoint
}
