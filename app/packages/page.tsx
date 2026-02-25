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
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Kashmir Packages By Season</h1>
        <p className="text-gray-600 mb-8">
          {selectedType === 'all'
            ? 'Explore weather-based itineraries for winter, spring, summer, and autumn in Kashmir.'
            : `Showing ${typeLabels[selectedType] || selectedType} packages.`}
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/packages"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedType === 'all'
                ? 'bg-gray-900 text-white'
                : 'border border-gray-300 bg-white text-gray-700 hover:border-gray-400'
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
                  ? 'bg-gray-900 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {typeLabels[season]}
            </Link>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
            <p className="text-gray-700 mb-4">No packages found for this filter.</p>
            <Link href="/packages" className="text-blue-600 hover:text-blue-700 font-medium">
              View all packages
            </Link>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/packages/${pkg.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition block"
            >
              <div className="relative h-52">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{pkg.title}</h2>
                <p className="text-sm text-gray-600 mb-1">{pkg.duration}</p>
                <p className="font-bold text-gray-900">{pkg.priceFrom}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
