import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/sanity/lib/fetch'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'Citi Maju Group — Trusted. Certified. Delivered.',
    template: '%s | Citi Maju Group',
  },
  description:
    'Citi Maju Group is a CIDB G7 certified contractor delivering water reticulation, civil, structural, and renovation works across Klang Valley.',
  metadataBase: new URL('https://citimaju.com'),
  openGraph: {
    siteName: 'Citi Maju Group',
    locale: 'en_MY',
    type: 'website',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [locale, messages, settings] = await Promise.all([
    getLocale(),
    getMessages(),
    getSiteSettings(),
  ])

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Sora:wght@300;400;500;600;700;800&family=Noto+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar settings={settings} />
          <main style={{ minHeight: '100vh' }}>{children}</main>
          <Footer settings={settings} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
