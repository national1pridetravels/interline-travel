import type { DestinationEntry, PackageEntry, SiteConfig } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'
import prisma from '@/lib/db/prisma'
import { hashPassword } from '@/lib/admin/password'
import {
  defaultFeaturedDestinationSlugs,
  defaultHighlightDestinationSlugs,
  defaultPackageSeeds,
  defaultSiteConfig,
} from '@/lib/content/defaults'
import { destinationList as fallbackDestinationList, type Destination } from '@/lib/destinations'

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@nationalpride.com'
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const CONTENT_REVALIDATE_SECONDS = 300
const CONTENT_CACHE_TAGS = {
  siteConfig: 'content-site-config',
  destinations: 'content-destinations',
  packages: 'content-packages',
}

export type PackageItem = {
  id?: string
  slug: string
  title: string
  duration: string
  priceFrom: string
  image: string
  season: string
  tags: string[]
  summary: string
  idealFor: string
  includes: string[]
}

export type SiteConfigData = {
  brandName: string
  brandTagline: string
  phone: string
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
}

let bootstrapPromise: Promise<void> | null = null
let databaseAvailable = true

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((entry): entry is string => typeof entry === 'string')
}

function asDestinationCategory(category: string): Destination['category'] {
  return category === 'Sacred Trails' ? 'Sacred Trails' : 'Mountain Escapes'
}

function mapDestination(entry: DestinationEntry): Destination {
  return {
    slug: entry.slug,
    name: entry.name,
    season:
      entry.season === 'Winter' ||
      entry.season === 'Spring' ||
      entry.season === 'Summer' ||
      entry.season === 'Autumn' ||
      entry.season === 'All Season'
        ? entry.season
        : 'All Season',
    tagline: entry.tagline,
    shortDescription: entry.shortDescription,
    description: entry.description,
    bestSeason: entry.bestSeason,
    idealFor: entry.idealFor,
    altitude: entry.altitude,
    travelTime: entry.travelTime,
    heroImage: entry.heroImage,
    category: asDestinationCategory(entry.category),
    highlights: asStringArray(entry.highlights),
    attractions: asStringArray(entry.attractions),
  }
}

function mapPackage(entry: PackageEntry): PackageItem {
  return {
    id: entry.id,
    slug: entry.slug,
    title: entry.title,
    duration: entry.duration,
    priceFrom: entry.priceFrom,
    image: entry.image,
    season: entry.season || 'all-season',
    tags: asStringArray(entry.tags),
    summary: entry.summary || 'Customizable Kashmir package details are available.',
    idealFor: entry.idealFor || 'All travelers',
    includes: asStringArray(entry.includes),
  }
}

const fallbackPackages: PackageItem[] = defaultPackageSeeds.map((entry) => ({
  slug: entry.slug,
  title: entry.title,
  duration: entry.duration,
  priceFrom: entry.priceFrom,
  image: entry.image,
  season: entry.season,
  tags: entry.tags,
  summary: entry.summary,
  idealFor: entry.idealFor,
  includes: entry.includes,
}))

function markDatabaseUnavailable(error: unknown) {
  if (!databaseAvailable) {
    return
  }

  databaseAvailable = false
  console.warn('Database unavailable. Falling back to static content.', error)
}

async function seedAdminUser() {
  await prisma.adminUser.upsert({
    where: {
      email: DEFAULT_ADMIN_EMAIL,
    },
    update: {},
    create: {
      email: DEFAULT_ADMIN_EMAIL,
      passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
      role: 'SUPER_ADMIN',
    },
  })
}

async function seedDestinations() {
  for (const destination of fallbackDestinationList) {
    await prisma.destinationEntry.upsert({
      where: {
        slug: destination.slug,
      },
      update: {},
      create: {
        slug: destination.slug,
        name: destination.name,
        season: destination.season,
        tagline: destination.tagline,
        shortDescription: destination.shortDescription,
        description: destination.description,
        bestSeason: destination.bestSeason,
        idealFor: destination.idealFor,
        altitude: destination.altitude,
        travelTime: destination.travelTime,
        heroImage: destination.heroImage,
        category: destination.category,
        highlights: destination.highlights,
        attractions: destination.attractions,
        isFeatured: defaultFeaturedDestinationSlugs.includes(destination.slug),
        isHighlight: defaultHighlightDestinationSlugs.includes(destination.slug),
      },
    })
  }
}

async function seedPackages() {
  for (const entry of defaultPackageSeeds) {
    await prisma.packageEntry.upsert({
      where: {
        slug: entry.slug,
      },
      update: {},
      create: {
        slug: entry.slug,
        title: entry.title,
        duration: entry.duration,
        priceFrom: entry.priceFrom,
        image: entry.image,
        season: entry.season,
        tags: entry.tags,
        summary: entry.summary,
        idealFor: entry.idealFor,
        includes: entry.includes,
      },
    })
  }
}

async function seedSiteConfig() {
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      ...defaultSiteConfig,
    },
  })
}

export async function bootstrapAdminData() {
  if (!databaseAvailable) {
    return
  }

  if (!bootstrapPromise) {
    bootstrapPromise = Promise.all([
      seedAdminUser(),
      seedDestinations(),
      seedPackages(),
      seedSiteConfig(),
    ])
      .then(() => undefined)
      .catch((error) => {
        markDatabaseUnavailable(error)
      })
  }

  await bootstrapPromise
}

function mapSiteConfig(config: SiteConfig): SiteConfigData {
  return {
    brandName: config.brandName,
    brandTagline: config.brandTagline,
    phone: config.phone,
    heroEyebrow: config.heroEyebrow,
    heroTitle: config.heroTitle,
    heroSubtitle: config.heroSubtitle,
  }
}

async function querySiteConfig() {
  const config = await prisma.siteConfig.findUnique({ where: { id: 1 } })
  if (!config) {
    return defaultSiteConfig
  }

  return mapSiteConfig(config)
}

const getCachedSiteConfig = unstable_cache(querySiteConfig, ['site-config'], {
  revalidate: CONTENT_REVALIDATE_SECONDS,
  tags: [CONTENT_CACHE_TAGS.siteConfig],
})

async function queryDestinations() {
  const rows = await prisma.destinationEntry.findMany({
    orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
  })

  return rows.length ? rows.map(mapDestination) : fallbackDestinationList
}

const getCachedDestinations = unstable_cache(queryDestinations, ['destinations'], {
  revalidate: CONTENT_REVALIDATE_SECONDS,
  tags: [CONTENT_CACHE_TAGS.destinations],
})

async function queryFeaturedDestinations() {
  const fallback = fallbackDestinationList.filter((destination) =>
    defaultFeaturedDestinationSlugs.includes(destination.slug)
  )

  const rows = await prisma.destinationEntry.findMany({
    where: { isFeatured: true },
    orderBy: { name: 'asc' },
  })

  return rows.length ? rows.map(mapDestination) : fallback
}

const getCachedFeaturedDestinations = unstable_cache(
  queryFeaturedDestinations,
  ['featured-destinations'],
  {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: [CONTENT_CACHE_TAGS.destinations],
  }
)

async function queryHighlightDestinations() {
  const fallback = fallbackDestinationList.filter((destination) =>
    defaultHighlightDestinationSlugs.includes(destination.slug)
  )

  const rows = await prisma.destinationEntry.findMany({
    where: { isHighlight: true },
    orderBy: { name: 'asc' },
  })

  return rows.length ? rows.map(mapDestination) : fallback
}

const getCachedHighlightDestinations = unstable_cache(
  queryHighlightDestinations,
  ['highlight-destinations'],
  {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: [CONTENT_CACHE_TAGS.destinations],
  }
)

async function queryPackages() {
  const rows = await prisma.packageEntry.findMany({
    orderBy: [{ season: 'asc' }, { title: 'asc' }],
  })

  return rows.length ? rows.map(mapPackage) : fallbackPackages
}

const getCachedPackages = unstable_cache(queryPackages, ['packages'], {
  revalidate: CONTENT_REVALIDATE_SECONDS,
  tags: [CONTENT_CACHE_TAGS.packages],
})

export function invalidateContentCache(
  scope: 'site-config' | 'destinations' | 'packages' | 'all' = 'all'
) {
  if (scope === 'all' || scope === 'site-config') {
    revalidateTag(CONTENT_CACHE_TAGS.siteConfig)
  }
  if (scope === 'all' || scope === 'destinations') {
    revalidateTag(CONTENT_CACHE_TAGS.destinations)
  }
  if (scope === 'all' || scope === 'packages') {
    revalidateTag(CONTENT_CACHE_TAGS.packages)
  }
}

export async function getSiteConfig() {
  try {
    await bootstrapAdminData()
    if (!databaseAvailable) {
      return defaultSiteConfig
    }

    return getCachedSiteConfig()
  } catch (error) {
    markDatabaseUnavailable(error)
    return defaultSiteConfig
  }
}

export async function getDestinations() {
  try {
    await bootstrapAdminData()
    if (!databaseAvailable) {
      return fallbackDestinationList
    }

    return getCachedDestinations()
  } catch (error) {
    markDatabaseUnavailable(error)
    return fallbackDestinationList
  }
}

export async function getDestinationBySlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase()
  const fallback =
    fallbackDestinationList.find((destination) => destination.slug === normalizedSlug) || null

  try {
    const destinations = await getDestinations()
    return destinations.find((destination) => destination.slug === normalizedSlug) || fallback
  } catch (error) {
    markDatabaseUnavailable(error)
    return fallback
  }
}

export async function getFeaturedDestinations() {
  const fallback = fallbackDestinationList.filter((destination) =>
    defaultFeaturedDestinationSlugs.includes(destination.slug)
  )

  try {
    await bootstrapAdminData()
    if (!databaseAvailable) {
      return fallback
    }

    return getCachedFeaturedDestinations()
  } catch (error) {
    markDatabaseUnavailable(error)
    return fallback
  }
}

export async function getHighlightDestinations() {
  const fallback = fallbackDestinationList.filter((destination) =>
    defaultHighlightDestinationSlugs.includes(destination.slug)
  )

  try {
    await bootstrapAdminData()
    if (!databaseAvailable) {
      return fallback
    }

    return getCachedHighlightDestinations()
  } catch (error) {
    markDatabaseUnavailable(error)
    return fallback
  }
}

export async function getPackages() {
  try {
    await bootstrapAdminData()
    if (!databaseAvailable) {
      return fallbackPackages
    }

    return getCachedPackages()
  } catch (error) {
    markDatabaseUnavailable(error)
    return fallbackPackages
  }
}

export async function getPackageBySlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase()
  const fallback = fallbackPackages.find((entry) => entry.slug === normalizedSlug) || null

  try {
    const packages = await getPackages()
    return packages.find((entry) => entry.slug === normalizedSlug) || fallback
  } catch (error) {
    markDatabaseUnavailable(error)
    return fallback
  }
}
