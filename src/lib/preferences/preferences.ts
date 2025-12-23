import { getCookie, setCookie, deleteCookie, COOKIE_NAMES } from '../cookies'
import type { Theme, Locale, UserPreferences, PreferencesService } from './preferences.types'


class Preferences implements PreferencesService {

  getTheme(): Theme | null {
    const theme = getCookie(COOKIE_NAMES.THEME)
    if (theme === 'light' || theme === 'dark') {
      return theme
    }
    return null
  }

  setTheme(theme: Theme): void {
    setCookie(COOKIE_NAMES.THEME, theme)
  }

  getLocale(): Locale | null {
    const locale = getCookie(COOKIE_NAMES.LOCALE)
    if (locale === 'pt-BR' || locale === 'en' || locale === 'fr' || locale === 'es') {
      return locale
    }
    return null
  }

  setLocale(locale: Locale): void {
    setCookie(COOKIE_NAMES.LOCALE, locale)
  }

  getEmail(): string | null {
    return getCookie(COOKIE_NAMES.EMAIL)
  }


  setEmail(email: string): void {
    if (email && email.includes('@')) {
      setCookie(COOKIE_NAMES.EMAIL, email)
    }
  }

  clearEmail(): void {
    deleteCookie(COOKIE_NAMES.EMAIL)
  }


  getAllPreferences(): Partial<UserPreferences> {
    return {
      theme: this.getTheme() || undefined,
      locale: this.getLocale() || undefined,
      email: this.getEmail() || undefined,
    }
  }


  clearAllPreferences(): void {
    deleteCookie(COOKIE_NAMES.THEME)
    deleteCookie(COOKIE_NAMES.LOCALE)
    deleteCookie(COOKIE_NAMES.EMAIL)
  }
}

export const preferences = new Preferences()
