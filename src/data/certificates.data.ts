export interface CertificateData {
  id: number
  logo: string
  logoDark?: string
  alt: string
}

export const CERTIFICATES_LOGOS: CertificateData[] = [
  {
    id: 0,
    logo: '/assets/certificates/CiscoLogo.png',
    logoDark: '/assets/certificates/CiscoWhiteLogo1.png',
    alt: 'Cisco Logo',
  },
  {
    id: 1,
    logo: '/assets/certificates/TempestLogo.png',
    alt: 'Tempest Logo',
  },
  {
    id: 2,
    logo: '/assets/certificates/GoogleLogo.png',
    alt: 'Google Cloud Logo',
  },
]
