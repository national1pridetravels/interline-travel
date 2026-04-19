'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiChevronDown, FiMenu, FiMessageCircle, FiPhoneCall, FiX } from 'react-icons/fi'
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

export default function Navbar({
  initialDestinations = fallbackNavbarDestinations,
  initialSiteConfig = defaultSiteConfig,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMobileDestinations, setShowMobileDestinations] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const destinations = initialDestinations
  const siteConfig = initialSiteConfig

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setShowDropdown(false)
    setShowMobileDestinations(false)
  }, [pathname])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (isOpen || showDropdown) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, showDropdown])

  const groupedDestinations = useMemo(
    () => ({
      mountains: destinations.filter((destination) => destination.category === 'Mountain Escapes'),
      sacred: destinations.filter((destination) => destination.category === 'Sacred Trails'),
      all: destinations,
    }),
    [destinations]
  )

  const phoneLink = siteConfig.phone.replace(/[^\d+]/g, '')
  const whatsappLink = `https://wa.me/${phoneLink.replace('+', '')}?text=Hello%20National%20Pride%20Travels%2C%20I%20want%20to%20plan%20a%20Kashmir%20tour.`

  return (
    <nav
      className="sticky top-0 z-50 px-2 pt-2 sm:px-3 sm:pt-3 md:px-4 md:pt-4"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="relative mx-auto max-w-7xl">
        <div
          className={`nav-shell px-3 sm:px-6 lg:px-8 ${
            scrolled ? 'shadow-[0_24px_80px_rgba(15,23,42,0.14)]' : ''
          }`}
        >
          <div className="flex min-h-[76px] items-center justify-between gap-3 sm:min-h-[82px] lg:min-h-[92px]">
            <Link
              href="/"
              className="group flex min-w-0 flex-1 items-center gap-2.5 sm:gap-4 md:gap-5 lg:max-w-[430px]"
              aria-label={`${siteConfig.brandName} home`}
            >
              <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[1.35rem] bg-[#111827] ring-1 ring-rose-100 shadow-[0_20px_42px_rgba(17,24,39,0.18)] sm:h-[72px] sm:w-[72px] sm:rounded-[1.5rem] lg:h-[84px] lg:w-[84px] lg:rounded-[1.6rem]">
                <div className="brand-orbit absolute inset-0 rounded-[1.6rem] bg-[conic-gradient(from_90deg,_rgba(229,34,62,0.5),rgba(255,255,255,0.34),rgba(248,113,113,0.42),rgba(229,34,62,0.5))] opacity-85 blur-[1px]" />
                <div className="absolute inset-[2px] rounded-[1.2rem] bg-[#111827] sm:rounded-[1.35rem] lg:rounded-[1.45rem]" />
                <Image
                  src="/images/logo-mark.png"
                  alt={siteConfig.brandName}
                  fill
                  sizes="(max-width: 640px) 60px, (max-width: 1024px) 72px, 84px"
                  className="relative z-10 scale-[1.04] object-contain p-1.5 sm:p-2"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="brand-wordmark font-[family:var(--font-brand-display)] text-[0.94rem] font-semibold leading-[0.88] tracking-[0.01em] sm:text-[1.3rem] lg:text-[2rem]">
                  <span className="block min-[430px]:inline">National Pride</span>{' '}
                  <span className="block min-[430px]:inline">Travels</span>
                </p>
                <p className="mt-1 hidden truncate font-[family:var(--font-brand-accent)] text-[8px] font-semibold uppercase tracking-[0.24em] text-slate-500 min-[390px]:block sm:mt-1.5 sm:text-[9px] lg:mt-2 lg:text-[11px]">
                  {siteConfig.brandTagline}
                </p>
              </div>
            </Link>

            <div className="hidden items-center gap-1 xl:flex 2xl:gap-2">
              <button
                onClick={() => setShowDropdown((value) => !value)}
                className={`flex items-center gap-1 rounded-xl px-3 py-2 text-[0.94rem] font-semibold tracking-[0.01em] transition-colors xl:px-4 ${
                  showDropdown
                    ? 'bg-red-50 text-red-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
                    : 'text-slate-700 hover:bg-red-50 hover:text-red-600'
                }`}
                aria-expanded={showDropdown}
                aria-haspopup="true"
              >
                Popular Destination
                <FiChevronDown
                  size={17}
                  className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {navItems.map((item) => {
                const active =
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-xl px-3 py-2 text-[0.94rem] font-semibold tracking-[0.01em] transition-colors xl:px-4 ${
                      active
                        ? 'bg-red-50 text-red-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
                        : 'text-slate-700 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <a
              href={`tel:${phoneLink}`}
              className="hidden shrink-0 items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(17,24,39,0.18)] 2xl:inline-flex"
            >
              <FiPhoneCall className="text-[15px]" />
              {siteConfig.phone}
            </a>

            <button
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.08)] xl:hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {isOpen ? (
            <div
              id="mobile-menu"
              className="border-t border-slate-200/80 px-1 pb-4 pt-4 xl:hidden"
            >
              <div className="mb-4 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${phoneLink}`}
                  className="button-3d-secondary min-h-[52px] rounded-2xl text-sm"
                >
                  <FiPhoneCall className="text-base" />
                  Call Now
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="button-3d-primary min-h-[52px] rounded-2xl text-sm"
                >
                  <FiMessageCircle className="text-base" />
                  WhatsApp
                </a>
              </div>

              <button
                onClick={() => setShowMobileDestinations((value) => !value)}
                className="button-3d-primary mb-3 w-full justify-between rounded-2xl px-5 py-4"
              >
                Popular Destination
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    showMobileDestinations ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showMobileDestinations ? (
                <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {groupedDestinations.all.map((destination) => (
                    <Link
                      key={destination.slug}
                      href={`/destinations/${destination.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="surface-3d rounded-2xl p-3"
                    >
                      <p className="text-sm font-semibold text-slate-900">{destination.name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[var(--brand-teal)]">
                        {destination.bestSeason}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : null}

              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="surface-3d block rounded-2xl px-4 py-3.5 text-base font-semibold text-slate-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-red-100 bg-red-50/70 px-4 py-3 text-center text-sm font-semibold text-red-700">
                {siteConfig.phone}
              </div>
            </div>
          ) : null}
        </div>

        {showDropdown ? (
          <>
            <button
              type="button"
              aria-label="Close destination panel"
              className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px]"
              onClick={() => setShowDropdown(false)}
            />

            <div className="dropdown-3d absolute left-0 right-0 top-[calc(100%+1rem)] z-50 rounded-[2rem] p-5 lg:p-7">
              <div className="mb-6 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
                <div className="surface-3d-dark rounded-[2rem] p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.18em] text-rose-100/90">
                    Popular Destination Collection
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">
                    Kashmir routes arranged like a premium catalog
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm text-slate-200">
                    Searchable destinations, season guidance, and quick route previews for valley
                    stays, meadows, pilgrimage travel, and offbeat circuits.
                  </p>
                </div>

                <div className="surface-3d-dark overflow-hidden rounded-[2rem] p-0 text-white">
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
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-rose-100/85">
                      Aerial Preview
                    </p>
                    <p className="mt-1 text-sm text-slate-100">
                      Lakes, meadows, glaciers, and shrine routes in one visual panel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
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
                        className="surface-3d overflow-hidden rounded-[1.5rem] p-0"
                      >
                        <div className="relative h-28">
                          <Image
                            src={destination.heroImage}
                            alt={destination.name}
                            fill
                            sizes="280px"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-semibold text-slate-900">{destination.name}</p>
                          <p className="mt-1 text-xs text-slate-600">{destination.tagline}</p>
                          <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--brand-teal)]">
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
                        className="surface-3d overflow-hidden rounded-[1.5rem] p-0"
                      >
                        <div className="relative h-28">
                          <Image
                            src={destination.heroImage}
                            alt={destination.name}
                            fill
                            sizes="280px"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-semibold text-slate-900">{destination.name}</p>
                          <p className="mt-1 text-xs text-slate-600">{destination.tagline}</p>
                          <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--brand-teal)]">
                            {destination.bestSeason}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </nav>
  )
}
