'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiChevronDown, FiMenu, FiSearch, FiX } from 'react-icons/fi'
import { destinationList, type Destination } from '@/lib/destinations'

const navItems = [
  { href: '/packages', label: 'Packages By Season' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact Us' },
]

type SiteConfig = {
  brandName: string
  brandTagline: string
  phone: string
}

const defaultSiteConfig: SiteConfig = {
  brandName: 'National Pride Travels',
  brandTagline: 'Time to travel with us',
  phone: '+91 99064 69903',
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMobileDestinations, setShowMobileDestinations] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [destinations, setDestinations] = useState<Destination[]>(destinationList)
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let isMounted = true

    async function fetchNavbarData() {
      try {
        const [destinationsResponse, configResponse] = await Promise.all([
          fetch('/api/content/destinations', { cache: 'no-store' }),
          fetch('/api/content/config', { cache: 'no-store' }),
        ])

        if (destinationsResponse.ok) {
          const payload = (await destinationsResponse.json()) as {
            success: boolean
            destinations?: Destination[]
          }
          if (isMounted && payload.success && Array.isArray(payload.destinations)) {
            setDestinations(payload.destinations)
          }
        }

        if (configResponse.ok) {
          const payload = (await configResponse.json()) as {
            success: boolean
            config?: SiteConfig
          }
          if (isMounted && payload.success && payload.config) {
            setSiteConfig(payload.config)
          }
        }
      } catch (error) {
        console.error('Failed to load navbar content', error)
      }
    }

    void fetchNavbarData()

    return () => {
      isMounted = false
    }
  }, [])

  const groupedDestinations = useMemo(
    () => ({
      mountains: destinations.filter(
        (destination) => destination.category === 'Mountain Escapes'
      ),
      sacred: destinations.filter(
        (destination) => destination.category === 'Sacred Trails'
      ),
    }),
    [destinations]
  )

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/15 bg-[#091a2b]/96 shadow-2xl backdrop-blur-2xl'
          : 'border-white/10 bg-[#0b1f33]/90 shadow-[0_12px_34px_rgba(5,15,28,0.4)] backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 lg:px-6">
        <div className="flex h-[98px] items-center justify-between border-b border-white/15">
          <Link href="/" className="flex items-center gap-2 lg:gap-3">
            <div className="relative h-[68px] w-[96px] shrink-0 lg:h-[84px] lg:w-[124px]">
              <Image
                src="/images/logo.png"
                alt={siteConfig.brandName}
                fill
                sizes="124px"
                className="object-contain scale-[1.18]"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-[28px] font-semibold text-[#f2cf64] leading-none">
                {siteConfig.brandName}
              </p>
              <p className="mt-1 text-[15px] tracking-[0.08em] text-cyan-100/95">
                {siteConfig.brandTagline}
              </p>
            </div>
          </Link>

          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <label className="relative block">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Explore destinations and packages"
                className="w-[400px] rounded-full border border-white/45 bg-white/95 py-3.5 pl-11 pr-4 text-base text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </label>
          </div>

          <a
            href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
            className="hidden lg:inline-flex rounded-full bg-gradient-to-r from-[#d8e25a] to-[#b9d544] px-7 py-3.5 text-[18px] font-bold text-slate-900 shadow-lg transition hover:brightness-95"
          >
            {siteConfig.phone}
          </a>

          <button onClick={() => setIsOpen((value) => !value)} className="lg:hidden p-2 text-white">
            {isOpen ? <FiX size={25} /> : <FiMenu size={25} />}
          </button>
        </div>

        <div className="hidden h-[68px] items-center justify-center gap-10 lg:flex">
          <button
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3 text-[17px] font-semibold text-white shadow-lg"
          >
            Popular Destination
            <FiChevronDown
              size={18}
              className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[18px] font-semibold text-white transition hover:text-[#f2cf64]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {showDropdown && (
        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          className="absolute left-0 right-0 top-[166px] border-t border-slate-200 bg-white/98 shadow-2xl"
        >
          <div className="mx-auto max-w-[1400px] px-6 py-7">
            <div className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-[#0f3e63] to-[#157568] p-6 text-white">
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-100/90">
                  Popular Destination Collection
                </p>
                <h3 className="mb-2 text-3xl font-semibold">Explore Every Route With Detail</h3>
                <p className="max-w-3xl text-sm text-slate-100/90">
                  Each destination includes key experiences, best season advice, and a custom plan option.
                  Open any location card to view full details.
                </p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-40 w-full object-cover"
                  aria-hidden="true"
                >
                  <source src="/assets/media/hero-legacy.mp4" type="video/mp4" />
                </video>
                <div className="p-4 text-white">
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-100/85">Aerial Preview</p>
                  <p className="mt-1 text-sm text-slate-100">See valley, lake, and mountain transitions in one cinematic loop.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <section>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Mountain Escapes
                </h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupedDestinations.mountains.map((destination) => (
                    <Link
                      key={destination.slug}
                      href={`/destinations/${destination.slug}`}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,35,58,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(15,35,58,0.16)]"
                    >
                      <div className="relative h-24">
                        <Image
                          src={destination.heroImage}
                          alt={destination.name}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold text-slate-900">{destination.name}</p>
                        <p className="mt-1 text-xs text-slate-600">{destination.tagline}</p>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-teal-700">
                          {destination.bestSeason}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Sacred Trails
                </h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupedDestinations.sacred.map((destination) => (
                    <Link
                      key={destination.slug}
                      href={`/destinations/${destination.slug}`}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,35,58,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(15,35,58,0.16)]"
                    >
                      <div className="relative h-24">
                        <Image
                          src={destination.heroImage}
                          alt={destination.name}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold text-slate-900">{destination.name}</p>
                        <p className="mt-1 text-xs text-slate-600">{destination.tagline}</p>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-teal-700">
                          {destination.bestSeason}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="border-t border-white/10 bg-[#0a1422]/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          <label className="relative mb-4 block">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search destinations"
              className="w-full rounded-full bg-white py-3 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </label>

          <button
            onClick={() => setShowMobileDestinations((value) => !value)}
            className="mb-3 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 text-left text-base font-semibold text-white"
          >
            Popular Destination
          </button>

          {showMobileDestinations && (
            <div className="mb-4 grid grid-cols-2 gap-2">
              {destinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/destinations/${destination.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-white/15 bg-white/10 p-3 text-[15px] text-white"
                >
                  <p className="font-semibold">{destination.name}</p>
                  <p className="mt-1 text-[11px] text-cyan-100/85">{destination.bestSeason}</p>
                </Link>
              ))}
            </div>
          )}

          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-lg font-semibold text-white/95 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <a
            href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
            className="mt-4 block rounded-full bg-gradient-to-r from-[#d8e25a] to-[#b9d544] px-5 py-3 text-center text-base font-bold text-slate-900"
          >
            {siteConfig.phone}
          </a>
        </div>
      )}
    </nav>
  )
}
