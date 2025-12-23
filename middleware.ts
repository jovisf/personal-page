import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['pt-BR', 'en', 'fr', 'es'],
  defaultLocale: 'pt-BR',
  localePrefix: 'always'
})

export const config = {
  matcher: ['/', '/(pt-BR|en|fr|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
}
