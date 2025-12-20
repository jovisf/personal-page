import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import localFont from 'next/font/local'
import { locales } from '@/i18n/config'
import type { LayoutProps } from '@/types'
import './globals.css'

const tildaSans = localFont({
  src: [
    {
      path: '../fonts/TildaSans/TildaSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/TildaSans/TildaSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/TildaSans/TildaSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/TildaSans/TildaSans-Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/TildaSans/TildaSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/TildaSans/TildaSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/TildaSans/TildaSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-tilda-sans',
})

export const metadata: Metadata = {
  title: 'João Victor - Fullstack Developer',
  description: 'Software Engineering • Secure Development • Web',
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    theme = prefersDark ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${tildaSans.variable} ${tildaSans.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
