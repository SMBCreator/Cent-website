import React from "react"
import type { Metadata } from 'next'
import { IBM_Plex_Sans, Jura, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({ 
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-ibm-plex'
});

const jura = Jura({ 
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-jura'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'Central ADV - Programmatic Advertising Platform',
  description: 'Технологии, экспертиза и персональный подход для достижения ваших целей в digital-маркетинге. Комплексные Programmatic решения для брендов.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${ibmPlexSans.variable} ${jura.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
