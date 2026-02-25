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
    <section className="py-20">
      <div className="section-wrap">
        <div className="text-center mb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            Kashmir Tour and Travel Destinations
          </p>
          <h2 className="headline-main font-semibold mb-3">Popular Destinations</h2>
          <p className="text-lg text-slate-600">
            Beautiful locations with curated plans, smooth transfers, and premium stays.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {items.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group relative overflow-hidden rounded-[30px] border border-white/75 shadow-[0_22px_60px_rgba(19,45,62,0.18)]"
            >
              <div className="relative h-[420px]">
                <Image
                  src={dest.heroImage}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-100/90">
                  <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">{dest.category}</span>
                  <span>{dest.bestSeason}</span>
                </div>
                <h3 className="text-3xl font-semibold mb-2">{dest.name}</h3>
                <p className="text-sm text-slate-100/90 leading-relaxed">
                  {dest.shortDescription}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/90">
                  Explore {dest.name} Kashmir tour package
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
