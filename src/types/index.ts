export interface LocaleParams {
  locale: string
}

export interface PageProps {
  params: Promise<LocaleParams>
}

export interface LayoutProps {
  children: React.ReactNode
  params: Promise<LocaleParams>
}
