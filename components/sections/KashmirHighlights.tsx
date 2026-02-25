'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { destinationList, type Destination } from '@/lib/destinations'

const defaultHighlights = destinationList.filter((destination) =>
  ['doodhpathri', 'gurez', 'patnitop', 'vaishno-devi', 'katra'].includes(
    destination.slug
  )
)

export default function KashmirHighlights() {
  const [highlights, setHighlights] = useState<Destination[]>(defaultHighlights)

  useEffect(() => {
    let isMounted = true

    async function loadHighlights() {
      try {
        const response = await fetch('/api/content/destinations', {
          cache: 'no-store',
        })

        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as {
          success: boolean
          highlights?: Destination[]
        }

        if (isMounted && payload.success && Array.isArray(payload.highlights)) {
          setHighlights(payload.highlights)
        }
      } catch (error) {
        console.error('Failed to load highlight destinations', error)
      }
    }

    void loadHighlights()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="py-20">
      <div className="section-wrap">
        <div className="glass-panel p-10 md:p-12">
          <div className="text-center mb-12">
            <h2 className="headline-main font-semibold mb-3">
              Kashmir Highlights and Hidden Gems
            </h2>
            <p className="text-lg text-slate-600">
              Distinct routes for nature, pilgrimage, and offbeat discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
            {highlights.map((item) => (
              <Link
                key={item.slug}
                href={`/destinations/${item.slug}`}
                className="group rounded-3xl overflow-hidden bg-white shadow-[0_14px_34px_rgba(15,35,58,0.15)] border border-slate-100"
              >
                <div className="relative h-56">
                  <Image
                    src={item.heroImage}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1280px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white">
                      {item.bestSeason}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-slate-600">{item.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
