import { createNavigation } from 'next-intl/navigation'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/constants'

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
})
