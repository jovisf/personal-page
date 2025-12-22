'use client'

import { motion } from 'framer-motion'
import { scaleIn } from '../timeline.animations'
import type { TimelineGeometricElementsProps } from './TimelineGeometricElements.types'

export function TimelineGeometricElements({ animationProps }: TimelineGeometricElementsProps) {
  return (
    <>
      <motion.div
        {...animationProps}
        variants={scaleIn}
        className="absolute top-20 right-10 w-32 h-32 border-4 border-light-secondary-accent dark:border-dark-secondary-accent opacity-20 rotate-45 hidden lg:block"
      />
      <motion.div
        {...animationProps}
        variants={scaleIn}
        className="absolute bottom-20 left-10 w-24 h-24 bg-light-primary-accent dark:bg-dark-primary-accent opacity-10 hidden lg:block"
      />
    </>
  )
}
