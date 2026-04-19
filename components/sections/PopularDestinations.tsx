import Image from 'next/image'
import Link from 'next/link'
import { featuredDestinations, type Destination } from '@/lib/destinations'

type PopularDestinationsProps = {
  items?: Destination[]
}

export default function PopularDestinations({
  items = featuredDestinations,
}: PopularDestinationsProps) {
  return (
    <section className="section-space">
      <div className="section-wrap">
        <div className="section-header-center mb-12">
          <p className="chip-3d mb-4">Kashmir Tour and Travel Destinations</p>
          <h2 className="section-title">Popular destinations with route-ready planning</h2>
          <p className="section-copy mx-auto">
            The same premium presentation, but using your Kashmir destinations, local knowledge,
            and package content without changing any travel details.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items.map((dest, index) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="surface-3d group rounded-[2rem] p-4"
            >
              <div className="image-stage">
                <div
                  className={`image-frame-3d relative h-[20rem] rounded-[1.7rem] ${
                    index % 2 === 0 ? 'image-tilt-right' : 'image-tilt-left'
                  }`}
                >
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="image-depth object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="chip-3d-dark">{dest.category}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-100/85">
                      {dest.bestSeason}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold text-white">{dest.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">
                      {dest.shortDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-5 flex items-center justify-between gap-4 px-2">
                <p className="text-sm text-slate-600">{dest.tagline}</p>
                <span className="text-sm font-semibold text-[var(--brand-teal)]">Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
