import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import {
  defaultDescription,
  defaultKeywords,
  organizationJsonLd,
  siteName,
  siteTitle,
  siteUrl,
} from '@/lib/seo'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | National Pride Travels',
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  alternates: {
    canonical: '/',
  },
  applicationName: siteName,
  category: 'travel',
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: defaultDescription,
    locale: 'en_IN',
    images: [
      {
        url: '/assets/destinations/srinagar.jpg',
        width: 1600,
        height: 900,
        alt: 'Kashmir tour and travel with National Pride Travels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: defaultDescription,
    images: ['/assets/destinations/srinagar.jpg'],
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <div className="pt-[98px] lg:pt-[166px]">{children}</div>
        <WhatsAppFloat />
      </body>
    </html>
  )
}
