import type { TimelineEvent } from '../Timeline.types'

export interface TimelineEventPointProps {
  event: TimelineEvent
  index: number
  isActive: boolean
  prefersReducedMotion: boolean
  onClick: (index: number) => void
  onMouseEnter: (index: number) => void
  onMouseLeave: () => void
}
