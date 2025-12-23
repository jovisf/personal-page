import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['pt-BR', 'en', 'fr', 'es'],
  defaultLocale: 'pt-BR',
  localePrefix: 'always'
})

export const config = {
  matcher: ['/', '/(pt-BR|en|fr|es)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
}
