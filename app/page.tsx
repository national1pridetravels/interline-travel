import type { Metadata } from 'next'
import HeroSection, { type HeroConfig } from '@/components/sections/HeroSection'
import SearchBooking from '@/components/sections/SearchBooking'
import TrustBar from '@/components/sections/TrustBar'
import PopularDestinations from '@/components/sections/PopularDestinations'
import KashmirHighlights from '@/components/sections/KashmirHighlights'
import Packages from '@/components/sections/Packages'
import AdventureActivities from '@/components/sections/AdventureActivities'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Testimonials from '@/components/sections/Testimonials'
import KashmirFaq from '@/components/sections/KashmirFaq'
import Newsletter from '@/components/sections/Newsletter'
import Footer from '@/components/sections/Footer'
import { kashmirFaqs } from '@/lib/faq'
import {
  getDestinations,
  getFeaturedDestinations,
  getHighlightDestinations,
  getPackages,
  getSiteConfig,
} from '@/lib/content/store'
import { absoluteUrl, siteName, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Kashmir Tour and Travel Packages',
  description:
    'Book Kashmir tour packages with National Pride Travels. Explore Srinagar, Gulmarg, Pahalgam, Sonmarg, and season-wise Kashmir tours with local experts.',
  keywords: [
    'kashmir tour packages',
    'tour and travel in kashmir',
    'kashmir travel agency',
    'srinagar gulmarg pahalgam package',
    'kashmir honeymoon package',
  ],
  alternates: {
    canonical: '/',
  },
}

export const revalidate = 300

export default async function HomePage() {
  const [siteConfig, featuredDestinations, highlightDestinations, destinations, packages] =
    await Promise.all([
      getSiteConfig(),
      getFeaturedDestinations(),
      getHighlightDestinations(),
      getDestinations(),
      getPackages(),
    ])

  const heroConfig: HeroConfig = {
    heroEyebrow: siteConfig.heroEyebrow,
    heroTitle: siteConfig.heroTitle,
    heroSubtitle: siteConfig.heroSubtitle,
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/packages')}?type={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: kashmirFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <main className="relative overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="relative z-10">
          <HeroSection heroConfig={heroConfig} />
          <section className="relative z-20 -mt-10 px-4 pb-6 sm:-mt-12 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <SearchBooking destinations={destinations} />
            </div>
          </section>
          <TrustBar />
          <div className="relative space-y-0 pb-10">
            <section className="bg-gradient-to-b from-white to-slate-50/90">
              <PopularDestinations items={featuredDestinations} />
              <KashmirHighlights highlights={highlightDestinations} />
              <Packages packages={packages} />
            </section>

            <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50/80">
              <AdventureActivities />
              <WhyChooseUs />
              <KashmirFaq />
              <Testimonials />
            </section>
          </div>

          <section className="bg-[radial-gradient(circle_at_top,rgba(229,34,62,0.3),transparent_30%),linear-gradient(135deg,#111827_0%,#1f2937_52%,#7f1d1d_100%)]">
            <Newsletter />
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
