/**
 * Cookie names used throughout the application
 */
export const COOKIE_NAMES = {
  THEME: 'user-theme',
  LOCALE: 'user-locale',
  EMAIL: 'user-email',
} as const

/**
 * Cookie configuration
 */
export const COOKIE_CONFIG = {
  MAX_AGE: 365,
  PATH: '/',
  SAME_SITE: 'lax' as const,
} as const
