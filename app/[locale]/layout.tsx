import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'

import { Toaster } from 'react-hot-toast'

import {
  SessionProvider,
  TanstackProvider,
  ThemeProvider
} from '@/src/config/providers'

import { routing } from '@/src/i18n/routing'

import type { ReactNode } from 'react'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TanstackProvider>
            <SessionProvider>
              <ThemeProvider>{children}</ThemeProvider>

              <NextTopLoader />
              <Toaster />
            </SessionProvider>
          </TanstackProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
