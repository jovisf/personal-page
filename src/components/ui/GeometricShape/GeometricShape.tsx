'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useThemeTransition } from '@/hooks/useThemeTransition'
import type { GeometricShapeProps } from './GeometricShape.types'

/**
 * Wrapper component for geometric shapes that adds automatic 360° rotation
 * animation during theme transitions while preserving all original animations
 */
export function GeometricShape({
  initialRotation = 0,
  disableThemeAnimation = false,
  style,
  ...props
}: GeometricShapeProps) {
  const isTransitioning = useThemeTransition()
  const rotation = useMotionValue(initialRotation)
  const animatedRotation = useSpring(rotation, {
    stiffness: 200,
    damping: 40,
  })

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (isTransitioning && !disableThemeAnimation && !prefersReducedMotion) {
      const newRotation = rotation.get() + 360
      rotation.set(newRotation)
    }
  }, [isTransitioning, disableThemeAnimation, prefersReducedMotion, rotation])

  return (
    <motion.div
      {...props}
      style={{
        ...style,
        rotate: animatedRotation,
      }}
    />
  )
}
