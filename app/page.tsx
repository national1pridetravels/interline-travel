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

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#e6f3f7_0%,#f7f8ef_42%,#eaf6f2_100%)]" />
          <div className="float-soft absolute -top-36 left-[-7rem] hidden h-[420px] w-[420px] rounded-full bg-cyan-200/45 blur-[110px] md:block" />
          <div className="float-soft-delay absolute top-[34%] right-[-6rem] hidden h-[390px] w-[390px] rounded-full bg-emerald-200/45 blur-[110px] md:block" />
          <div className="float-soft absolute bottom-20 left-[14%] h-[220px] w-[220px] rounded-full bg-sky-300/30 blur-[72px] md:h-[300px] md:w-[300px] md:blur-[90px]" />
          <div className="float-soft-delay absolute bottom-0 right-[20%] h-[200px] w-[200px] rounded-full bg-lime-200/35 blur-[68px] md:h-[270px] md:w-[270px] md:blur-[95px]" />
        </div>

        <div className="relative z-10">
          <HeroSection heroConfig={heroConfig} />
          <section className="relative z-20 mt-4 px-6 pb-6">
            <div className="mx-auto max-w-7xl">
              <SearchBooking destinations={destinations} />
            </div>
          </section>
          <TrustBar />
          <div className="relative space-y-2 pb-10">
            <PopularDestinations items={featuredDestinations} />
            <KashmirHighlights highlights={highlightDestinations} />
            <Packages packages={packages} />
            <AdventureActivities />
            <WhyChooseUs />
            <KashmirFaq />
            <Testimonials />
          </div>

          <section className="bg-gradient-to-r from-[#0f3f69] via-[#0f6a73] to-[#138b65]">
            <Newsletter />
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
