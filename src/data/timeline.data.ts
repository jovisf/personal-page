import type { TimelineEvent } from '@/components/sections/Timeline/Timeline.types'

export interface TimelineEventData
  extends Omit<TimelineEvent, 'title' | 'description'> {
  id: string
}

export const TIMELINE_EVENTS: TimelineEventData[] = [
  {
    id: 'ufpe-admission',
    year: '2020',
    logo: '/assets/UFPELogo.png',
    logoDark: '/assets/UFPELogoWhite.png',
    alt: 'UFPE Logo',
  },
  {
    id: 'logic-monitor',
    year: '2021',
    logo: '/assets/CinUFPE Logo.png',
    logoDark: '/assets/CInUFPEWhite.png',
    alt: 'CIn-UFPE Logo',
  },
  {
    id: 'pet-member',
    year: '2022',
    logo: '/assets/PetLogo.png',
    logoDark: '/assets/PetLogo.png',
    alt: 'PET Informatics Logo',
  },
  {
    id: 'reciprev-project',
    year: '2023',
    logo: '/assets/RECIPREVLogo.png',
    logoDark: '/assets/RECIPREVLogo.png',
    alt: 'RECIPREV Logo',
  },
  {
    id: 'cozextech-developer',
    year: '2024',
    logo: '/assets/cozex_tech_logo.png',
    logoDark: '/assets/cozex_tech_logo.png',
    alt: 'CozexTech Logo',
  },
]
