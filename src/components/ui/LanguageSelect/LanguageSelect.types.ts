export interface LanguageOption {
  value: string
  label: string
  flag: string
}

export interface LanguageSelectProps {
  currentLocale: string
  languages: LanguageOption[]
  onLocaleChange: (locale: string) => void
  className?: string
}
