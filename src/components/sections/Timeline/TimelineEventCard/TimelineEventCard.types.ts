import type { TimelineEvent } from '../Timeline.types'

export interface TimelineEventCardProps {
  event: TimelineEvent
  index: number
  prefersReducedMotion: boolean
  isDesktop: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}
