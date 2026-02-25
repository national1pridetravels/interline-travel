'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SmartVideoBackground from '@/components/ui/SmartVideoBackground'

type HeroConfig = {
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
}

const defaultHeroConfig: HeroConfig = {
  heroEyebrow: 'KASHMIR CURATED JOURNEYS',
  heroTitle: 'Discover the Paradise on Earth',
  heroSubtitle:
    'Slow mornings on Dal Lake, alpine adventures in Gulmarg, and handcrafted itineraries that feel premium from day one.',
}

export default function HeroSection() {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(defaultHeroConfig)

  useEffect(() => {
    let isMounted = true

    async function loadHeroConfig() {
      try {
        const response = await fetch('/api/content/config', {
          cache: 'no-store',
        })

        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as {
          success: boolean
          config?: HeroConfig
        }

        if (isMounted && payload.success && payload.config) {
          setHeroConfig({
            heroEyebrow: payload.config.heroEyebrow,
            heroTitle: payload.config.heroTitle,
            heroSubtitle: payload.config.heroSubtitle,
          })
        }
      } catch (error) {
        console.error('Failed to load hero config', error)
      }
    }

    void loadHeroConfig()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="relative min-h-[calc(100svh-88px)] w-full overflow-hidden lg:min-h-[calc(100svh-146px)]">
      <SmartVideoBackground
        src="/assets/media/hero-legacy.mp4"
        poster="/assets/destinations/srinagar.jpg"
        preload="none"
        pauseWhenOffscreen
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#041523]/70 via-[#071926]/55 to-[#081b24]/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(73,163,154,0.3),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(170,196,118,0.22),transparent_42%)]" />

      <div className="relative z-10 flex h-full items-center px-6 pb-16 pt-16 md:pt-20 text-white">
        <div className="section-wrap w-full">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/15 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase">
                {heroConfig.heroEyebrow}
              </p>
              <h1 className="mb-6 text-4xl font-semibold leading-[1.02] md:text-6xl lg:text-7xl">
                {heroConfig.heroTitle}
              </h1>
              <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-100/95 md:text-xl">
                {heroConfig.heroSubtitle} Explore trusted Kashmir tour and travel planning with
                registered local experts.
              </p>

              <div className="mb-12 flex flex-wrap items-center gap-4">
                <Link
                  href="/packages"
                  className="chip-glow inline-flex items-center rounded-full bg-emerald-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Explore Packages
                </Link>
                <Link
                  href="/destinations"
                  className="inline-flex items-center rounded-full border border-white/55 bg-white/15 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/25"
                >
                  Browse Destinations
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/30 bg-black/20 p-4 backdrop-blur-sm">
                  <p className="mb-1 text-xs uppercase tracking-wider text-slate-200/80">
                    Signature Route
                  </p>
                  <p className="text-sm font-semibold">Srinagar - Gulmarg - Pahalgam</p>
                </div>
                <div className="rounded-2xl border border-white/30 bg-black/20 p-4 backdrop-blur-sm">
                  <p className="mb-1 text-xs uppercase tracking-wider text-slate-200/80">
                    Curated Support
                  </p>
                  <p className="text-sm font-semibold">Hotels, transfers, and local experts</p>
                </div>
                <div className="rounded-2xl border border-white/30 bg-black/20 p-4 backdrop-blur-sm">
                  <p className="mb-1 text-xs uppercase tracking-wider text-slate-200/80">
                    Best Time
                  </p>
                  <p className="text-sm font-semibold">April to October for valley tours</p>
                </div>
              </div>
            </div>

            <aside className="hidden gap-4 lg:grid">
              <article className="float-soft rounded-3xl border border-white/35 bg-white/15 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/90">Kashmir Focus</p>
                <h2 className="mt-2 text-3xl font-semibold leading-tight text-white">
                  Season-Wise Itineraries Built For Real Travel Days
                </h2>
                <p className="mt-3 text-sm text-slate-100/90">
                  Every plan is customized by weather, road conditions, and your comfort level.
                </p>
              </article>
              <div className="grid grid-cols-2 gap-4">
                <article className="float-soft-delay rounded-2xl border border-white/30 bg-black/30 p-4 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200/80">
                    Support
                  </p>
                  <p className="mt-1 text-xl font-semibold">24/7</p>
                </article>
                <article className="float-soft rounded-2xl border border-white/30 bg-black/30 p-4 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200/80">
                    Registered
                  </p>
                  <p className="mt-1 text-xl font-semibold">JKAE00005259</p>
                </article>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white/90">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Scroll to explore top Kashmir tours
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#eef4f7] to-transparent" />
    </section>
  )
}
