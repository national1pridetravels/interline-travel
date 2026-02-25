import type { DestinationEntry, PackageEntry, SiteConfig } from '@prisma/client'
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
  if (!bootstrapPromise) {
    bootstrapPromise = Promise.all([
      seedAdminUser(),
      seedDestinations(),
      seedPackages(),
      seedSiteConfig(),
    ]).then(() => undefined)
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

export async function getSiteConfig() {
  await bootstrapAdminData()
  const config = await prisma.siteConfig.findUnique({ where: { id: 1 } })

  if (!config) {
    return defaultSiteConfig
  }

  return mapSiteConfig(config)
}

export async function getDestinations() {
  await bootstrapAdminData()
  const rows = await prisma.destinationEntry.findMany({
    orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
  })
  return rows.map(mapDestination)
}

export async function getDestinationBySlug(slug: string) {
  await bootstrapAdminData()
  const row = await prisma.destinationEntry.findUnique({
    where: { slug },
  })

  if (!row) {
    return null
  }

  return mapDestination(row)
}

export async function getFeaturedDestinations() {
  await bootstrapAdminData()
  const rows = await prisma.destinationEntry.findMany({
    where: { isFeatured: true },
    orderBy: { name: 'asc' },
  })

  if (rows.length === 0) {
    return fallbackDestinationList.filter((destination) =>
      defaultFeaturedDestinationSlugs.includes(destination.slug)
    )
  }

  return rows.map(mapDestination)
}

export async function getHighlightDestinations() {
  await bootstrapAdminData()
  const rows = await prisma.destinationEntry.findMany({
    where: { isHighlight: true },
    orderBy: { name: 'asc' },
  })

  if (rows.length === 0) {
    return fallbackDestinationList.filter((destination) =>
      defaultHighlightDestinationSlugs.includes(destination.slug)
    )
  }

  return rows.map(mapDestination)
}

export async function getPackages() {
  await bootstrapAdminData()
  const rows = await prisma.packageEntry.findMany({
    orderBy: [{ season: 'asc' }, { title: 'asc' }],
  })
  return rows.map(mapPackage)
}

export async function getPackageBySlug(slug: string) {
  await bootstrapAdminData()
  const row = await prisma.packageEntry.findUnique({
    where: { slug },
  })

  if (!row) {
    return null
  }

  return mapPackage(row)
}
