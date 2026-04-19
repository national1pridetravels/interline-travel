import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import ServicesSection from '@/components/sections/ServicesSection'

export const metadata: Metadata = {
  title: 'Cab and Transport Services in Kashmir',
  description:
    'Book verified cab and transport services in Kashmir with airport transfers, Srinagar-Gulmarg-Pahalgam-Sonmarg routes, and group vehicles with local support.',
  keywords: [
    'kashmir cab service',
    'srinagar taxi service',
    'gulmarg taxi fare',
    'pahalgam cab booking',
    'tempo traveller kashmir',
  ],
  alternates: {
    canonical: '/services',
  },
}

const addOnServices = [
  'Airport pickup and drop',
  'Hotel to hotel transfers',
  'Multi-day circuit planning',
  'Group tempo traveller support',
  'Custom stopover sightseeing',
  'Event and family trip transport',
]

export default function ServicesPage() {
  return (
    <main className="page-shell-dark py-20">
      <div className="section-wrap">
        <header className="page-panel-dark mb-10 overflow-hidden rounded-3xl text-white">
          <div className="grid gap-6 p-8 md:p-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="chip-3d-dark mb-4">
                Kashmir Transport Desk
              </p>
              <h1 className="mb-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Reliable Cab Services Across Kashmir
              </h1>
              <p className="max-w-4xl text-lg leading-relaxed text-slate-100/90">
                Choose from hatchbacks, sedans, SUVs, luxury cars, and tempo travellers with local
                drivers. Get route-based fares and full support for your Kashmir trip.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="button-3d-primary rounded-full px-6 py-3 text-sm"
                >
                  Get Fare Quote
                  <FiArrowRight />
                </Link>
                <Link
                  href="/booking"
                  className="button-3d-light rounded-full px-6 py-3 text-sm"
                >
                  Build Full Travel Plan
                </Link>
              </div>
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-white/20 bg-slate-900">
              <Image
                src="/assets/services/hero-cab-bg.webp"
                alt="Kashmir cab service fleet"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071a2e]/85 via-[#071a2e]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--brand-gold-soft)]">
                  Verified Local Fleet
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Srinagar, Gulmarg, Pahalgam, Sonmarg routes
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 border-t border-white/12 bg-slate-950/28 px-8 py-5 text-sm text-slate-100 md:grid-cols-3 md:px-12">
            <p>
              <span className="font-semibold text-white">Category range:</span> INR 1,500 to INR
              12,000 per day
            </p>
            <p>
              <span className="font-semibold text-white">Fleet options:</span> Hatchback, Sedan,
              SUV/MUV, Luxury, Tempo Traveller
            </p>
            <p>
              <span className="font-semibold text-white">Support:</span> 24/7 planning desk and
              route updates
            </p>
          </div>
        </header>
      </div>

      <section className="rounded-[32px] bg-gradient-to-b from-white to-slate-50/95 py-2">
        <ServicesSection showHeader={false} />
      </section>

      <div className="section-wrap mt-10">
        <section className="page-panel-dark rounded-3xl p-7 text-white md:p-9">
          <h2 className="mb-4 text-3xl font-semibold">Additional Service Support</h2>
          <p className="mb-6 max-w-4xl text-slate-200/90">
            Beyond fixed routes, our operations team can align transport with your hotel timings,
            activity plans, and on-ground changes.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {addOnServices.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-xl border border-white/16 bg-white/8 px-4 py-3 text-sm text-slate-100"
              >
                <FiCheckCircle className="text-[var(--brand-gold)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
