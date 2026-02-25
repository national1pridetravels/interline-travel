'use client'

import { useEffect, useMemo, useState } from 'react'
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

export default function Packages() {
  const [packages, setPackages] = useState<PackageItem[]>(fallbackPackages)

  useEffect(() => {
    let isMounted = true

    async function loadPackages() {
      try {
        const response = await fetch('/api/content/packages', {
          cache: 'no-store',
        })

        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as {
          success: boolean
          packages?: PackageItem[]
        }

        if (isMounted && payload.success && Array.isArray(payload.packages)) {
          setPackages(payload.packages)
        }
      } catch (error) {
        console.error('Failed to load packages', error)
      }
    }

    void loadPackages()

    return () => {
      isMounted = false
    }
  }, [])

  const topPackages = useMemo(() => packages.slice(0, 4), [packages])

  return (
    <section className="py-20">
      <div className="section-wrap">
        <div className="text-center mb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            Best Kashmir Tour Packages
          </p>
          <h2 className="headline-main font-semibold mb-3">Trending Kashmir Itineraries</h2>
          <p className="text-lg text-slate-600">Top picks for families, couples, and seasonal travelers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPackages.map((pkg) => (
            <div
              key={pkg.id || pkg.slug}
              className="overflow-hidden rounded-[28px] bg-white/85 backdrop-blur border border-white/75 shadow-[0_20px_50px_rgba(16,36,58,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_55px_rgba(16,36,58,0.2)]"
            >
              <div className="relative h-52">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />

                <div className="absolute top-4 left-4 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-slate-900 shadow">
                  {pkg.duration}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  Kashmir
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{pkg.title}</h3>

                <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
                  <FiMapPin className="w-4 h-4" />
                  <span>{inferLocationFromTitle(pkg.title)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-xs text-slate-500">Starting From</p>
                    <p className="text-2xl font-semibold text-slate-900">{pkg.priceFrom}</p>
                  </div>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-emerald-600 hover:to-teal-700"
                  >
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
