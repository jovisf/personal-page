import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

const locales = ['pt-BR', 'en']

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !locales.includes(locale as any)) {
    locale = 'pt-BR'
  }

  return {
    locale,
    messages: (await import(`./src/messages/${locale}.json`)).default,
  }
})
