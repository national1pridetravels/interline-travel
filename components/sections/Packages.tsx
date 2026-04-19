import Image from 'next/image'
import Link from 'next/link'
import { FiMapPin } from 'react-icons/fi'

type PackageItem = {
  id?: string
  slug: string
  title: string
  duration: string
  priceFrom: string
  image: string
}

const fallbackPackages: PackageItem[] = [
  {
    slug: 'mesmerizing-kashmir-holiday',
    title: 'Mesmerizing Kashmir Holiday',
    duration: '5D4N',
    priceFrom: '₹26,300',
    image: '/images/hero/hero-1.webp',
  },
  {
    slug: 'beautiful-kashmir-tour',
    title: 'Beautiful Kashmir Tour',
    duration: '6D5N',
    priceFrom: '₹16,900',
    image: '/images/hero/hero-2.webp',
  },
  {
    slug: 'kashmir-adventure-trekking',
    title: 'Kashmir Adventure & Trekking',
    duration: '5D4N',
    priceFrom: '₹25,500',
    image: '/images/hero/hero-3.webp',
  },
  {
    slug: 'ultimate-kashmir-experience',
    title: 'Ultimate Kashmir Experience',
    duration: '7D6N',
    priceFrom: '₹24,200',
    image: '/images/hero/hero-4.webp',
  },
]

function inferLocationFromTitle(title: string) {
  const normalized = title.toLowerCase()
  if (normalized.includes('gulmarg')) return 'Gulmarg'
  if (normalized.includes('pahalgam')) return 'Pahalgam'
  if (normalized.includes('srinagar')) return 'Srinagar'
  if (normalized.includes('sonmarg')) return 'Sonmarg'
  return 'Kashmir'
}

type PackagesProps = {
  packages?: PackageItem[]
}

export default function Packages({ packages = fallbackPackages }: PackagesProps) {
  const topPackages = packages.slice(0, 4)

  return (
    <section className="section-space">
      <div className="section-wrap">
        <div className="section-header-center mb-12">
          <p className="chip-3d mb-4">Best Kashmir Tour Packages</p>
          <h2 className="section-title">Trending Kashmir itineraries</h2>
          <p className="section-copy mx-auto">
            Top picks for families, couples, and seasonal travelers, now presented in the same
            premium card system as the reference design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPackages.map((pkg) => (
            <div
              key={pkg.id || pkg.slug}
              className="surface-3d overflow-hidden rounded-[2rem] p-4"
            >
              <div className="image-stage">
                <div className="image-frame-3d image-tilt-soft relative h-52 rounded-[1.6rem]">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="image-depth object-cover"
                  />

                  <div className="absolute right-4 top-4 rounded-full bg-slate-950/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    Kashmir
                  </div>
                </div>
              </div>

              <div className="relative z-10 p-2 pt-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{pkg.title}</h3>

                <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
                  <FiMapPin className="w-4 h-4" />
                  <span>{inferLocationFromTitle(pkg.title)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Link href={`/packages/${pkg.slug}`} className="button-3d-primary rounded-full px-5 py-3 text-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
