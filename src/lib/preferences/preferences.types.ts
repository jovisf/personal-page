export type Theme = 'light' | 'dark'

export type Locale = 'pt-BR' | 'en' | 'fr' | 'es'

export interface UserPreferences {
  theme: Theme
  locale: Locale
  email?: string
}

export interface PreferencesService {
  getTheme(): Theme | null
  setTheme(theme: Theme): void
  getLocale(): Locale | null
  setLocale(locale: Locale): void
  getEmail(): string | null
  setEmail(email: string): void
  clearEmail(): void
  getAllPreferences(): Partial<UserPreferences>
  clearAllPreferences(): void
}
