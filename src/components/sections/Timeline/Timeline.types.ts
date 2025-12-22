import { BaseSectionProps } from '@/types/common'

export interface TimelineProps extends BaseSectionProps {}

export interface TimelineEvent {
  title: string
  year: string
  description: string
  logo?: string
  logoDark?: string
  alt?: string
}
