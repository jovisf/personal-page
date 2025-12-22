import type { TimelineEvent } from '@/components/sections/Timeline/Timeline.types'

export interface TimelineEventData
  extends Omit<TimelineEvent, 'title' | 'description'> {
  id: string
}

export const TIMELINE_EVENTS: TimelineEventData[] = [
  {
    id: 'ufpe-admission',
    year: '2020',
    logo: '/assets/timeline/UFPELogo.png',
    logoDark: '/assets/timeline/UFPELogoWhite.png',
    alt: 'UFPE Logo',
  },
  {
    id: 'logic-monitor',
    year: '2021',
    logo: '/assets/timeline/CinUFPE Logo.png',
    logoDark: '/assets/timeline/CInUFPEWhite.png',
    alt: 'CIn-UFPE Logo',
  },
  {
    id: 'pet-member',
    year: '2022',
    logo: '/assets/timeline/PetLogo.png',
    logoDark: '/assets/timeline/PetLogo.png',
    alt: 'PET Informatics Logo',
  },
  {
    id: 'reciprev-project',
    year: '2023',
    logo: '/assets/timeline/RECIPREVLogo.png',
    logoDark: '/assets/timeline/RECIPREVLogo.png',
    alt: 'RECIPREV Logo',
  },
  {
    id: 'cozextech-developer',
    year: '2024',
    logo: '/assets/timeline/cozex_tech_logo.png',
    logoDark: '/assets/timeline/cozex_tech_logo.png',
    alt: 'CozexTech Logo',
  },
]
