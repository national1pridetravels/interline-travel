import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDestinations } from '@/lib/content/store'

export const metadata: Metadata = {
  title: 'Kashmir Tourist Places By Season',
  description:
    'Discover famous Kashmir tourist places by season, including Srinagar, Gulmarg, Pahalgam, Sonmarg, and more.',
  keywords: [
    'kashmir tourist places',
    'kashmir destinations by season',
    'srinagar gulmarg pahalgam sonmarg',
    'places to visit in kashmir',
  ],
  alternates: {
    canonical: '/destinations',
  },
}

const seasonOptions = ['all', 'winter', 'spring', 'summer', 'autumn', 'all-season'] as const

function toSeasonParam(season: string) {
  return season.toLowerCase().replace(/\s+/g, '-')
}

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams?: { type?: string; season?: string }
}) {
  const destinations = await getDestinations()
  const selectedSeason = (searchParams?.season || searchParams?.type || 'all').toLowerCase()
  const filteredDestinations =
    selectedSeason === 'all'
      ? destinations
      : destinations.filter(
          (destination) => toSeasonParam(destination.season) === selectedSeason
        )

  return (
    <main className="min-h-screen bg-[#eef4f7] py-24">
      <div className="section-wrap">
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            Destination Directory
          </p>
          <h1 className="headline-main font-semibold mb-2">
            Explore Kashmir Destinations By Season
          </h1>
          <p className="text-slate-600">
            {selectedSeason === 'all'
              ? 'Browse famous Kashmir locations across winter, spring, summer, and autumn.'
              : `Showing ${selectedSeason.replace('-', ' ')} destinations.`}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {seasonOptions.map((season) => (
            <Link
              key={season}
              href={season === 'all' ? '/destinations' : `/destinations?season=${season}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedSeason === season
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >
              {season === 'all'
                ? 'All'
                : season
                    .split('-')
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(' ')}
            </Link>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-slate-700 mb-3">No destinations found for this season.</p>
            <Link
              href="/destinations"
              className="text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              View all destinations
            </Link>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <Link
              key={destination.slug}
              href={`/destinations/${destination.slug}`}
              className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_18px_40px_rgba(15,35,58,0.12)] transition hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(15,35,58,0.18)]"
            >
              <div className="relative h-52">
                <Image
                  src={destination.heroImage}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-800">
                  {destination.season}
                </div>
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-800">
                  {destination.category}
                </div>
              </div>

              <div className="p-5">
                <h2 className="mb-1 text-2xl font-semibold text-slate-900">{destination.name}</h2>
                <p className="mb-3 text-sm text-slate-600">{destination.tagline}</p>
                <p className="text-sm text-slate-700">{destination.shortDescription}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
                  Best Season: {destination.bestSeason}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
