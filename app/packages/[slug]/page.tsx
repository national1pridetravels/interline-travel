import type { Metadata } from 'next'
import Link from 'next/link'
import { getDestinationBySlug, getPackageBySlug, getPackages } from '@/lib/content/store'

function formatSlug(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const revalidate = 300

export async function generateStaticParams() {
  const packages = await getPackages()
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const packageData = await getPackageBySlug(params.slug)
  const destinationData = packageData ? null : await getDestinationBySlug(params.slug)

  const title = packageData
    ? `${packageData.title} | Kashmir Tour Package`
    : destinationData
      ? `${destinationData.name} Tour Package`
      : `${formatSlug(params.slug)} Tour Package`

  const description =
    packageData?.summary ||
    destinationData?.description ||
    'Customizable Kashmir tour package with hotel, transfer, and destination support.'

  return {
    title,
    description,
    keywords: [
      `${formatSlug(params.slug)} package`,
      'kashmir travel package',
      'kashmir tour itinerary',
      'kashmir booking package',
    ],
    alternates: {
      canonical: `/packages/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      images: packageData?.image ? [packageData.image] : undefined,
      type: 'article',
    },
  }
}

export default async function PackageDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const packageData = await getPackageBySlug(params.slug)
  const destinationData = packageData ? null : await getDestinationBySlug(params.slug)

  const data = packageData
    ? {
        title: packageData.title,
        duration: packageData.duration,
        priceFrom: packageData.priceFrom,
        idealFor: packageData.idealFor,
        summary: packageData.summary,
        includes: packageData.includes.length
          ? packageData.includes
          : ['Flexible planning', 'Stay options', 'Travel support'],
      }
    : destinationData
      ? {
          title: `${destinationData.name} Tour Package`,
          duration: 'Customizable 4D3N - 6D5N',
          priceFrom: 'On Request',
          idealFor: destinationData.idealFor,
          summary: destinationData.description,
          includes: [
            `${destinationData.name} sightseeing planning`,
            'Hotel stay options by budget',
            'Cab and transfer support',
            'Custom itinerary with local guidance',
          ],
        }
      : {
          title: formatSlug(params.slug),
          duration: 'Custom Duration',
          priceFrom: 'On Request',
          idealFor: 'All travelers',
          summary: 'Customizable Kashmir package details are available for this itinerary.',
          includes: ['Flexible planning', 'Stay options', 'Travel support'],
        }

  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
          <p className="text-gray-700 mb-8">{data.summary}</p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Duration</p>
              <p className="font-semibold text-gray-900">{data.duration}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Starting Price</p>
              <p className="font-semibold text-gray-900">{data.priceFrom}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Ideal For</p>
              <p className="font-semibold text-gray-900">{data.idealFor}</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Package Includes</h2>
          <ul className="list-disc list-inside text-gray-700 mb-8">
            {data.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <Link href="/booking" className="px-6 py-3 bg-gray-900 text-white rounded-lg">
              Book Now
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-gray-300 rounded-lg text-gray-900">
              Talk To Expert
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
