import Link from 'next/link'
import { FiArrowRight, FiMapPin } from 'react-icons/fi'
import SmartVideoBackground from '@/components/ui/SmartVideoBackground'

export type HeroConfig = {
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
}

const defaultHeroConfig: HeroConfig = {
  heroEyebrow: 'KASHMIR CURATED JOURNEYS',
  heroTitle: 'Discover the Paradise on Earth',
  heroSubtitle:
    'Slow mornings on Dal Lake, alpine adventures in Gulmarg, and handcrafted itineraries that feel premium from day one.',
}

type HeroSectionProps = {
  heroConfig?: HeroConfig
}

const proofCards = [
  {
    label: 'Signature Route',
    value: 'Srinagar · Gulmarg · Pahalgam',
  },
  {
    label: 'Registered Support',
    value: 'Licensed local planners with 24/7 assistance',
  },
  {
    label: 'Best Window',
    value: 'Season-wise departures across winter, spring, summer, and autumn',
  },
]

export default function HeroSection({ heroConfig = defaultHeroConfig }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_-5%,rgba(229,34,62,0.28),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(248,113,113,0.16),transparent_30%),linear-gradient(135deg,#111827_0%,#1f2937_55%,#374151_100%)] text-white">
      <div className="absolute -top-28 right-[-5rem] h-72 w-72 rounded-full bg-red-500/15 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-[-6rem] left-[-3rem] h-80 w-80 rounded-full bg-rose-400/12 blur-3xl" aria-hidden="true" />

      <div className="section-space section-wrap relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="section-header">
            <div className="chip-3d-dark mb-6">{heroConfig.heroEyebrow}</div>
            <h1 className="hero-display mb-6 max-w-[11ch]">
              {heroConfig.heroTitle}
            </h1>
            <p className="hero-copy mb-8 text-slate-200">
              {heroConfig.heroSubtitle} National Pride Travels plans each journey around road
              access, comfort level, and your preferred season.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/packages" className="button-3d-primary">
                Explore Packages
              </Link>
              <Link href="/contact" className="button-3d-light">
                Speak With Our Team
              </Link>
            </div>
          </div>

          <div className="image-stage">
            <div className="image-frame-3d image-tilt-right image-float relative h-[22rem] rounded-[2rem] ring-1 ring-white/15 sm:h-[26rem] lg:h-[32rem]">
              <SmartVideoBackground
                src="/assets/media/hero-legacy.mp4"
                poster="/assets/destinations/srinagar.jpg"
                preload="metadata"
                disableOnMobile={false}
                forceVideo
                className="image-depth h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061120]/78 via-transparent to-white/10" />

              <div className="image-badge-3d absolute left-4 top-4 rounded-2xl border border-white/15 bg-slate-950/45 px-4 py-3 text-white sm:left-6 sm:top-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-rose-100/85">
                  Valley Preview
                </p>
                <p className="mt-1 text-sm font-semibold">Aerial routes, lakes, meadows, and alpine stays</p>
              </div>

              <div className="image-badge-3d absolute bottom-4 left-4 right-4 rounded-[1.5rem] border border-white/12 bg-slate-950/55 p-4 text-white sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="icon-orb-3d h-11 w-11 shrink-0 rounded-xl">
                    <FiMapPin className="text-lg" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-rose-100/85">
                      Travel Ready
                    </p>
                    <p className="mt-1 text-base font-semibold">Curated stays, airport transfers, and day-by-day route planning</p>
                    <Link
                      href="/destinations"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-gold-soft)]"
                    >
                      Browse all destinations
                      <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {proofCards.map((item) => (
            <article key={item.label} className="surface-3d-dark rounded-[1.75rem] p-5 text-white">
              <p className="metric-label text-rose-100/75">{item.label}</p>
              <p className="mt-3 text-base font-semibold leading-relaxed text-slate-50">
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
