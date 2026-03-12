import Image from 'next/image'
import Link from 'next/link'
import {
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiShield,
  FiTruck,
  FiUsers,
  FiZap,
  FiDroplet,
} from 'react-icons/fi'
import {
  cabCategoryRanges,
  cabServiceUseCases,
  fleetVehicles,
  routeRates,
  serviceHighlights,
} from '@/lib/cab-services'

type ServicesSectionProps = {
  compact?: boolean
  showHeader?: boolean
}

export default function ServicesSection({ compact = false, showHeader = true }: ServicesSectionProps) {
  return (
    <section className={compact ? 'py-14' : 'py-20'}>
      <div className="section-wrap">
        {showHeader ? (
          <div className="mb-12 text-center">
            <p className="luxury-kicker mb-2">
              Ground Travel Services
            </p>
            <h2 className="headline-main mb-3 font-semibold">Cab Services In Kashmir</h2>
            <p className="mx-auto max-w-3xl text-lg text-[#c4beaf]">
              Reliable cabs, trained local drivers, and route-ready vehicles for airport transfers,
              intercity tours, and complete Kashmir circuits.
            </p>
          </div>
        ) : null}

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(120deg,#d5ba7f,#a88649)] text-white">
              <FiShield size={18} />
            </div>
            <p className="text-sm font-semibold text-[#f4edde]">Verified Fleet</p>
            <p className="mt-1 text-sm text-[#bfb8a9]">Tour-ready vehicles with local permits.</p>
          </div>

          <div className="rounded-2xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(120deg,#d5ba7f,#a88649)] text-white">
              <FiTruck size={18} />
            </div>
            <p className="text-sm font-semibold text-[#f4edde]">Route Coverage</p>
            <p className="mt-1 text-sm text-[#bfb8a9]">Srinagar, Gulmarg, Pahalgam, Sonmarg and more.</p>
          </div>

          <div className="rounded-2xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(120deg,#d5ba7f,#a88649)] text-white">
              <FiClock size={18} />
            </div>
            <p className="text-sm font-semibold text-[#f4edde]">24/7 Assistance</p>
            <p className="mt-1 text-sm text-[#bfb8a9]">Instant support for updates and delays.</p>
          </div>

          <div className="rounded-2xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(120deg,#d5ba7f,#a88649)] text-white">
              <FiMapPin size={18} />
            </div>
            <p className="text-sm font-semibold text-[#f4edde]">Local Driver Network</p>
            <p className="mt-1 text-sm text-[#bfb8a9]">Experienced mountain-route professionals.</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.44)] backdrop-blur-xl">
            <h3 className="mb-5 text-2xl font-semibold uppercase tracking-[0.06em] text-[#f4edde]">Vehicle Category Rates</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {cabCategoryRanges.map((item) => (
                <div
                  key={item.category}
                  className="rounded-2xl border border-[#cfbe95]/18 bg-[#121721] px-4 py-4"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#bcb29f]">
                    {item.category}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-[#f4edde]">{item.range}</p>
                  <p className="mt-2 text-sm text-[#beb7a8]">{item.idealFor}</p>
                  <p className="mt-1 text-xs text-[#a8a18f]">{item.notes}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-6 text-white shadow-[0_20px_44px_rgba(0,0,0,0.45)]">
            <h3 className="mb-4 text-2xl font-semibold uppercase tracking-[0.06em] text-[#f4edde]">Support Highlights</h3>
            <ul className="space-y-3">
              {serviceHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#c3bcad]">
                  <FiCheckCircle className="mt-0.5 text-[#d3bd8f]" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-[#cfbe95]/16 bg-[#121721] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[#d4c29a]/90">Included Services</p>
              <div className="mt-3 grid gap-2">
                {cabServiceUseCases.map((item) => (
                  <p key={item} className="flex items-start gap-2 text-sm text-[#c3bcad]">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-[#d3bd8f]" size={14} />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#cfbe95]/16 bg-[#121721] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[#d4c29a]/90">Quick Note</p>
              <p className="mt-2 text-sm text-[#c3bcad]">
                Rates depend on route permits, season, waiting hours, and vehicle availability.
                Final confirmation is shared before booking.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <article className="rounded-3xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.44)] backdrop-blur-xl">
            <h3 className="mb-4 text-2xl font-semibold uppercase tracking-[0.06em] text-[#f4edde]">Sample Fleet With Specs</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {fleetVehicles.map((car) => (
                <div key={car.name} className="overflow-hidden rounded-2xl border border-[#cfbe95]/20 bg-[#11161f]">
                  <div className="relative h-36">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="(max-width:768px) 100vw, 280px"
                      className="object-cover"
                    />
                    {car.badge ? (
                      <span className="absolute left-3 top-3 rounded-full bg-[#111722]/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#d4c29a]">
                        {car.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-2.5 p-4">
                    <div>
                      <p className="text-base font-semibold text-[#f4edde]">{car.name}</p>
                      <p className="text-xs uppercase tracking-[0.14em] text-[#bcb29f]">{car.segment}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#d3bd8f]">{car.ratePerDay}</p>
                    <p className="text-xs text-[#beb7a8]">{car.fit}</p>
                    <div className="grid grid-cols-3 gap-2 text-[11px] text-[#beb7a8]">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-[#1c2330] px-2 py-1.5">
                        <FiUsers size={12} />
                        {car.seats}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-[#1c2330] px-2 py-1.5">
                        <FiZap size={12} />
                        {car.transmission}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-[#1c2330] px-2 py-1.5">
                        <FiDroplet size={12} />
                        {car.fuel}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.44)] backdrop-blur-xl">
            <h3 className="mb-4 text-2xl font-semibold uppercase tracking-[0.06em] text-[#f4edde]">Popular Route Fares</h3>
            <div className="overflow-hidden rounded-2xl border border-[#cfbe95]/20 bg-[#11161f]">
              <div className="grid grid-cols-5 border-b border-[#cfbe95]/16 bg-[#151c28] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#bcb29f]">
                <span>Route</span>
                <span>Distance</span>
                <span>Hatchback</span>
                <span>Sedan</span>
                <span>SUV</span>
              </div>
              {routeRates.map((row) => (
                <div
                  key={row.route}
                  className="grid grid-cols-5 border-b border-[#cfbe95]/12 px-3 py-3 text-sm last:border-none"
                >
                  <span className="font-semibold text-[#f4edde]">
                    {row.route}
                    <span className="mt-0.5 block text-[11px] font-normal text-[#a9a294]">
                      {row.from} to {row.to}
                    </span>
                  </span>
                  <span className="text-[#beb7a8]">{row.distance}</span>
                  <span className="text-[#beb7a8]">{row.hatchback}</span>
                  <span className="text-[#beb7a8]">{row.sedan}</span>
                  <span className="text-[#beb7a8]">{row.suv}</span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-[linear-gradient(112deg,#d5ba7f,#b99250_58%,#99773f)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#0b0d12] transition hover:brightness-105"
          >
            Request Cab Quote
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center rounded-full border border-[#cfbe95]/34 bg-[#131821] px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#f3ecde] transition hover:bg-[#1a202c]"
          >
            Plan Full Trip
          </Link>
          <p className="text-xs text-[#9f998a]">
            Source reference: kashmirtourtravel.com/cars (public listing, checked March 7, 2026).
          </p>
        </div>
      </div>
    </section>
  )
}
