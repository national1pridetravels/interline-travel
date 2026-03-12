'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FiChevronDown, FiMenu, FiSearch, FiX } from 'react-icons/fi'
import { destinationList, type Destination } from '@/lib/destinations'
import SmartVideoBackground from '@/components/ui/SmartVideoBackground'

const navItems = [
  { href: '/packages', label: 'Packages By Season' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
]

type SiteConfig = {
  brandName: string
  brandTagline: string
  phone: string
}

export type NavbarDestination = Pick<
  Destination,
  'slug' | 'name' | 'category' | 'tagline' | 'bestSeason' | 'heroImage'
>

type NavbarProps = {
  initialDestinations?: NavbarDestination[]
  initialSiteConfig?: SiteConfig
}

const defaultSiteConfig: SiteConfig = {
  brandName: 'National Pride Travels',
  brandTagline: 'Time To Travel With Us',
  phone: '+91 99064 69903',
}

const fallbackNavbarDestinations: NavbarDestination[] = destinationList.map((destination) => ({
  slug: destination.slug,
  name: destination.name,
  category: destination.category,
  tagline: destination.tagline,
  bestSeason: destination.bestSeason,
  heroImage: destination.heroImage,
}))

function normalize(value: string) {
  return value.trim().toLowerCase()
}

export default function Navbar({
  initialDestinations = fallbackNavbarDestinations,
  initialSiteConfig = defaultSiteConfig,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMobileDestinations, setShowMobileDestinations] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [desktopSearch, setDesktopSearch] = useState('')
  const [mobileSearch, setMobileSearch] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  const destinations = initialDestinations
  const siteConfig = initialSiteConfig

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setShowDropdown(false)
    setShowMobileDestinations(false)
  }, [pathname])

  useEffect(() => {
    const shouldLockScroll = isOpen || showDropdown
    const previousOverflow = document.body.style.overflow
    if (shouldLockScroll) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, showDropdown])

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

  const destinationNames = useMemo(
    () => destinations.map((destination) => destination.name),
    [destinations]
  )

  const runSearch = (query: string) => {
    const cleanQuery = query.trim()
    if (!cleanQuery) {
      router.push('/destinations')
      return
    }

    const normalizedQuery = normalize(cleanQuery)
    const exactMatch = destinations.find(
      (destination) =>
        normalize(destination.name) === normalizedQuery ||
        normalize(destination.slug) === normalizedQuery
    )
    const fuzzyMatch = destinations.find(
      (destination) =>
        normalize(destination.name).includes(normalizedQuery) ||
        normalize(destination.tagline).includes(normalizedQuery)
    )

    const match = exactMatch || fuzzyMatch
    if (match) {
      router.push(`/destinations/${match.slug}`)
      return
    }

    router.push(`/destinations?query=${encodeURIComponent(cleanQuery)}`)
  }

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/20 bg-[#08182a]/80 shadow-2xl backdrop-blur-2xl'
          : 'border-white/20 bg-[linear-gradient(145deg,rgba(7,20,36,0.8),rgba(12,35,58,0.8))] shadow-[0_20px_45px_rgba(5,15,28,0.4)] backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 lg:px-6">
        <div className="flex min-h-[108px] items-center gap-4 border-b border-white/15 lg:gap-6">
          <Link href="/" className="group flex min-w-0 items-center gap-3 lg:gap-5">
            <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden lg:h-[112px] lg:w-[112px] xl:h-[124px] xl:w-[124px]">
              <div className="brand-orbit absolute -inset-0.5 rounded-[32%] bg-[conic-gradient(from_90deg,_rgba(56,189,248,0.42),rgba(250,204,21,0.52),rgba(16,185,129,0.44),rgba(56,189,248,0.42))] blur-[1px]" />
              <div className="absolute inset-[1.5px] rounded-[30%] bg-[#06192f]/92 ring-1 ring-white/32 shadow-[0_16px_30px_rgba(0,0,0,0.45)]" />
              <div className="absolute inset-[4.5px] rounded-[28%] bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.26),transparent_52%),radial-gradient(circle_at_80%_80%,rgba(250,204,21,0.22),transparent_55%),#041223]" />
              <Image
                src="/images/logo.png"
                alt={siteConfig.brandName}
                fill
                sizes="(max-width: 1024px) 90px, (max-width: 1280px) 112px, 124px"
                className="relative z-10 scale-[1.14] object-contain p-0.5 drop-shadow-[0_16px_24px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>

            <div className="hidden min-w-0 max-w-[40vw] sm:block lg:max-w-[31vw] 2xl:max-w-none">
              <p className="truncate font-[family:var(--font-brand-display)] text-[clamp(1.35rem,1.95vw,2.45rem)] font-semibold leading-[0.98] tracking-[0.028em] text-transparent [background-image:linear-gradient(112deg,#ffe3a1_4%,#f2c75f_42%,#ddab3d_74%,#ffe2a6_98%)] bg-clip-text [text-shadow:0_6px_20px_rgba(0,0,0,0.4)] transition duration-500 group-hover:brightness-110">
                {siteConfig.brandName}
              </p>
              <p className="mt-1 font-[family:var(--font-brand-accent)] text-[9px] font-semibold uppercase tracking-[0.26em] text-[#d4e5fb] sm:text-[10px] lg:text-[11px]">
                {siteConfig.brandTagline}
              </p>
            </div>
          </Link>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              runSearch(desktopSearch)
            }}
            className="hidden min-w-[250px] flex-1 items-center gap-2 rounded-full border border-white/35 bg-white/95 p-1.5 shadow-[0_16px_32px_rgba(9,27,43,0.15)] lg:flex xl:min-w-[340px]"
          >
            <FiSearch className="ml-2 text-slate-500" />
            <input
              type="text"
              list="navbar-destination-options"
              value={desktopSearch}
              onChange={(event) => setDesktopSearch(event.target.value)}
              placeholder="Search all Kashmir destinations"
              className="w-full bg-transparent py-2 pl-1 pr-2 text-[15px] text-slate-900 placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-[#02996f] to-[#1166a1] px-5 py-2 text-base font-semibold text-white transition hover:brightness-105"
            >
              Search
            </button>
          </form>

          <datalist id="navbar-destination-options">
            {destinationNames.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>

          <a
            href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
            className="hidden shrink-0 xl:inline-flex rounded-full bg-gradient-to-r from-[#d8e25a] to-[#b9d544] px-6 py-3.5 text-[17px] font-bold text-slate-900 shadow-lg transition hover:brightness-95"
          >
            {siteConfig.phone}
          </a>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="ml-auto rounded-lg p-2 text-white lg:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

        <div className="hidden h-[72px] items-center justify-center gap-10 lg:flex">
          <button
            onClick={() => setShowDropdown((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3 text-[17px] font-semibold text-white shadow-lg"
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
        <>
          <button
            type="button"
            aria-label="Close destination panel"
            className="fixed inset-0 top-[176px] z-[54] bg-[#051120]/45 backdrop-blur-[2px]"
            onClick={() => setShowDropdown(false)}
          />

          <div className="fixed inset-x-0 top-[176px] z-[55] max-h-[calc(100vh-190px)] overflow-y-auto border-t border-slate-200 bg-white/98 shadow-2xl">
            <div className="mx-auto max-w-[1440px] px-6 py-7">
              <div className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-[#0f3e63] to-[#157568] p-6 text-white">
                  <p className="mb-2 text-xs uppercase tracking-[0.16em] text-cyan-100/90">
                    Popular Destination Collection
                  </p>
                  <h3 className="mb-2 text-3xl font-semibold">Explore Every Route With Detail</h3>
                  <p className="max-w-3xl text-sm text-slate-100/90">
                    All destinations are searchable and available with season guidance, route tips,
                    and complete planning support.
                  </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900">
                  <div className="relative h-40 w-full">
                    <SmartVideoBackground
                      src="/assets/media/hero-legacy.mp4"
                      poster="/assets/destinations/srinagar.jpg"
                      preload="metadata"
                      disableOnMobile={false}
                      forceVideo
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-white">
                    <p className="text-xs uppercase tracking-[0.16em] text-cyan-100/85">Aerial Preview</p>
                    <p className="mt-1 text-sm text-slate-100">
                      Valley, lake, and mountain destinations in one premium collection.
                    </p>
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
                        onClick={() => setShowDropdown(false)}
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
                        onClick={() => setShowDropdown(false)}
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
        </>
      )}

      {isOpen && (
        <div className="max-h-[calc(100vh-104px)] overflow-y-auto border-t border-white/10 bg-[#061220]/96 px-5 py-4 backdrop-blur-xl lg:hidden">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              runSearch(mobileSearch)
              setIsOpen(false)
            }}
            className="relative mb-4 flex items-center gap-2"
          >
            <FiSearch className="absolute left-3 text-slate-400" />
            <input
              type="text"
              list="navbar-destination-options"
              value={mobileSearch}
              onChange={(event) => setMobileSearch(event.target.value)}
              placeholder="Search all destinations"
              className="w-full rounded-full bg-white py-3 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </form>

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
