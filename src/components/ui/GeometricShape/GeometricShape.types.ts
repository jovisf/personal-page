import { type HTMLMotionProps } from 'framer-motion'

export interface GeometricShapeProps extends HTMLMotionProps<'div'> {
  /**
   * Initial rotation angle in degrees
   * @default 0
   */
  initialRotation?: number
  /**
   * Whether to disable theme transition animation
   * @default false
   */
  disableThemeAnimation?: boolean
}
