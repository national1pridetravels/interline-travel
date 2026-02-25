import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDestinationBySlug, getDestinations } from '@/lib/content/store'
import type { Destination } from '@/lib/destinations'

function formatSlug(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getFallbackDestination(slug: string): Destination {
  return {
    slug,
    name: formatSlug(slug),
    season: 'All Season',
    tagline: 'Custom route planning available',
    shortDescription: 'Talk to our team for a personalized plan.',
    description:
      'This location is available in custom itineraries. We can prepare season-wise routes, stays, and transfers based on your dates and preferences.',
    bestSeason: 'Season-based',
    idealFor: 'All travelers',
    altitude: 'Varies by route',
    travelTime: 'Shared during consultation',
    heroImage: '/assets/media/kashmir-bg.jpg',
    category: 'Mountain Escapes',
    highlights: ['Custom itinerary support', 'Stay recommendations', 'Ground assistance'],
    attractions: ['Flexible location coverage'],
  }
}

export const revalidate = 300

export async function generateStaticParams() {
  const destinations = await getDestinations()
  return destinations.map((destination) => ({
    slug: destination.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const destination = (await getDestinationBySlug(params.slug)) || getFallbackDestination(params.slug)

  const title = `${destination.name}, Kashmir | Travel Guide`
  const description = `${destination.shortDescription} Best time: ${destination.bestSeason}. Plan your ${destination.name} Kashmir trip with local experts.`

  return {
    title,
    description,
    keywords: [
      `${destination.name} kashmir`,
      `${destination.name} tour`,
      'kashmir tourist place',
      'kashmir destination guide',
    ],
    alternates: {
      canonical: `/destinations/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      images: destination.heroImage ? [destination.heroImage] : undefined,
      type: 'article',
    },
  }
}

export default async function DestinationDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const destination = (await getDestinationBySlug(params.slug)) || getFallbackDestination(params.slug)

  return (
    <main className="min-h-screen bg-[#eef4f7] py-24">
      <div className="section-wrap">
        <section className="relative overflow-hidden rounded-[34px] shadow-[0_30px_70px_rgba(12,28,44,0.22)]">
          <div className="relative h-[480px]">
            <Image
              src={destination.heroImage}
              alt={destination.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071726]/90 via-[#071726]/45 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-white">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cyan-100/90">
              {destination.category}
            </p>
            <h1 className="mb-3 text-4xl md:text-6xl font-semibold">{destination.name}</h1>
            <p className="max-w-3xl text-sm md:text-lg text-slate-100">{destination.tagline}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="glass-panel p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Peak Season</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{destination.season}</p>
          </div>
          <div className="glass-panel p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Best Months</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{destination.bestSeason}</p>
          </div>
          <div className="glass-panel p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Ideal For</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{destination.idealFor}</p>
          </div>
          <div className="glass-panel p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Altitude</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{destination.altitude}</p>
          </div>
          <div className="glass-panel p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Travel Time</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{destination.travelTime}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="glass-panel p-7 md:p-8">
            <h2 className="mb-4 text-3xl font-semibold text-slate-900">Overview</h2>
            <p className="mb-6 leading-relaxed text-slate-700">{destination.description}</p>

            <h3 className="mb-3 text-2xl font-semibold text-slate-900">Top Highlights</h3>
            <ul className="space-y-3">
              {destination.highlights.map((point) => (
                <li key={point} className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
                  {point}
                </li>
              ))}
            </ul>
          </article>

          <aside className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,35,58,0.14)]">
              <div className="relative h-52 w-full">
                <Image
                  src={destination.heroImage || '/assets/destinations/srinagar.jpg'}
                  alt={`${destination.name} scenic view`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-teal-700 mb-2">
                  Cinematic Preview
                </p>
                <p className="text-sm text-slate-700">
                  A quick visual route preview to match your on-ground itinerary style.
                </p>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="mb-3 text-2xl font-semibold text-slate-900">Key Attractions</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {destination.attractions.map((attraction) => (
                  <li key={attraction} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                    {attraction}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/packages"
                className="inline-flex rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white hover:from-emerald-600 hover:to-teal-700"
              >
                View Packages
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Plan This Destination
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
