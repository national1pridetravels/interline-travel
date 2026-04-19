import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPackages } from '@/lib/content/store'

export const metadata: Metadata = {
  title: 'Kashmir Tour Packages By Season',
  description:
    'Explore Kashmir tour packages for winter, spring, summer, and autumn with destination-wise itineraries and local support.',
  keywords: [
    'kashmir tour packages',
    'kashmir winter package',
    'kashmir summer package',
    'kashmir honeymoon package',
    'kashmir family package',
  ],
  alternates: {
    canonical: '/packages',
  },
}

export const revalidate = 300

const typeLabels: Record<string, string> = {
  family: 'Family',
  honeymoon: 'Honeymoon',
  adventure: 'Adventure',
  group: 'Group',
  trekking: 'Trekking',
  'hill-station': 'Hill Station',
  seasonal: 'Seasonal',
  winter: 'Winter',
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Autumn',
  'all-season': 'All Season',
}

const seasonFilters = ['winter', 'spring', 'summer', 'autumn', 'all-season'] as const

export default async function PackagesPage({
  searchParams,
}: {
  searchParams?: { type?: string }
}) {
  const packages = await getPackages()
  const selectedType = (searchParams?.type || 'all').toLowerCase()
  const isSeasonFilter = seasonFilters.includes(
    selectedType as (typeof seasonFilters)[number]
  )

  const filteredPackages =
    selectedType === 'all'
      ? packages
      : packages.filter(
          (pkg) =>
            pkg.tags.includes(selectedType) ||
            (isSeasonFilter &&
              selectedType !== 'all-season' &&
              pkg.tags.includes('all-season'))
        )

  return (
    <main className="page-shell-dark py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
          Kashmir Packages By Season
        </h1>
        <p className="mb-8 text-slate-200/90">
          {selectedType === 'all'
            ? 'Explore weather-based itineraries for winter, spring, summer, and autumn in Kashmir.'
            : `Showing ${typeLabels[selectedType] || selectedType} packages.`}
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/packages"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedType === 'all'
                ? 'bg-white text-slate-900'
                : 'border border-white/35 bg-white/10 text-white hover:border-white/60'
            }`}
          >
            All Seasons
          </Link>
          {seasonFilters.map((season) => (
            <Link
              key={season}
              href={`/packages?type=${season}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedType === season
                  ? 'bg-white text-slate-900'
                  : 'border border-white/35 bg-white/10 text-white hover:border-white/60'
              }`}
            >
              {typeLabels[season]}
            </Link>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="page-panel-dark mb-8 rounded-xl p-6">
            <p className="mb-4 text-slate-100">No packages found for this filter.</p>
            <Link href="/packages" className="font-medium text-[var(--brand-gold-soft)] hover:text-white">
              View all packages
            </Link>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/packages/${pkg.slug}`}
              className="page-panel-dark block overflow-hidden rounded-2xl transition hover:-translate-y-1"
            >
              <div className="relative h-52">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h2 className="mb-2 text-xl font-semibold text-white">{pkg.title}</h2>
                <p className="text-sm text-[var(--brand-gold-soft)]">
                  Season: {typeLabels[pkg.season] || pkg.season}
                </p>
                {pkg.summary && (
                  <p className="mt-3 text-sm text-slate-100/90">{pkg.summary}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
