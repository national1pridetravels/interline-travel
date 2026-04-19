import type { Metadata } from 'next'
import { Cormorant_Garamond, Jura, Manrope, Rajdhani } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import type { NavbarDestination } from '@/components/layout/Navbar'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import { getDestinations, getSiteConfig } from '@/lib/content/store'
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

const brandDisplay = Jura({
  subsets: ['latin'],
  variable: '--font-brand-display',
  display: 'swap',
  weight: ['500', '600'],
})

const brandAccent = Rajdhani({
  subsets: ['latin'],
  variable: '--font-brand-accent',
  display: 'swap',
  weight: ['500', '600'],
})

const googleAnalyticsId = 'G-FE5VN93SRS'

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [siteConfig, destinations] = await Promise.all([getSiteConfig(), getDestinations()])
  const navbarDestinations: NavbarDestination[] = destinations.map((destination) => ({
    slug: destination.slug,
    name: destination.name,
    category: destination.category,
    tagline: destination.tagline,
    bestSeason: destination.bestSeason,
    heroImage: destination.heroImage,
  }))

  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
      </head>
      <body
        className={`${manrope.variable} ${cormorant.variable} ${brandDisplay.variable} ${brandAccent.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar
          initialDestinations={navbarDestinations}
          initialSiteConfig={{
            brandName: siteConfig.brandName,
            brandTagline: siteConfig.brandTagline,
            phone: siteConfig.phone,
          }}
        />
        <div>{children}</div>
        <WhatsAppFloat />
      </body>
    </html>
  )
}
