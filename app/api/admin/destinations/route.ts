import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireAuthenticatedAdmin } from '@/lib/admin/auth'
import { bootstrapAdminData, invalidateContentCache } from '@/lib/content/store'

type DestinationPayload = {
  slug?: string
  name?: string
  season?: string
  tagline?: string
  shortDescription?: string
  description?: string
  bestSeason?: string
  idealFor?: string
  altitude?: string
  travelTime?: string
  heroImage?: string
  category?: string
  highlights?: string[] | string
  attractions?: string[] | string
  isFeatured?: boolean
  isHighlight?: boolean
}

function parseListInput(value: string[] | string | undefined) {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

function normalizeDestinationPayload(payload: DestinationPayload) {
  return {
    slug: (payload.slug || '').trim().toLowerCase(),
    name: (payload.name || '').trim(),
    season: (payload.season || '').trim(),
    tagline: (payload.tagline || '').trim(),
    shortDescription: (payload.shortDescription || '').trim(),
    description: (payload.description || '').trim(),
    bestSeason: (payload.bestSeason || '').trim(),
    idealFor: (payload.idealFor || '').trim(),
    altitude: (payload.altitude || '').trim(),
    travelTime: (payload.travelTime || '').trim(),
    heroImage: (payload.heroImage || '').trim(),
    category: (payload.category || '').trim(),
    highlights: parseListInput(payload.highlights),
    attractions: parseListInput(payload.attractions),
    isFeatured: Boolean(payload.isFeatured),
    isHighlight: Boolean(payload.isHighlight),
  }
}

function validateRequiredFields(entry: ReturnType<typeof normalizeDestinationPayload>) {
  return (
    !!entry.slug &&
    !!entry.name &&
    !!entry.season &&
    !!entry.tagline &&
    !!entry.shortDescription &&
    !!entry.description &&
    !!entry.bestSeason &&
    !!entry.idealFor &&
    !!entry.altitude &&
    !!entry.travelTime &&
    !!entry.heroImage &&
    !!entry.category &&
    entry.highlights.length > 0 &&
    entry.attractions.length > 0
  )
}

export async function GET() {
  try {
    const user = await requireAuthenticatedAdmin()
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    await bootstrapAdminData()
    const destinations = await prisma.destinationEntry.findMany({
      orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
    })

    return NextResponse.json({
      success: true,
      destinations: destinations.map((entry) => ({
        id: entry.id,
        slug: entry.slug,
        name: entry.name,
        season: entry.season,
        tagline: entry.tagline,
        shortDescription: entry.shortDescription,
        description: entry.description,
        bestSeason: entry.bestSeason,
        idealFor: entry.idealFor,
        altitude: entry.altitude,
        travelTime: entry.travelTime,
        heroImage: entry.heroImage,
        category: entry.category,
        highlights: entry.highlights,
        attractions: entry.attractions,
        isFeatured: entry.isFeatured,
        isHighlight: entry.isHighlight,
      })),
    })
  } catch (error) {
    console.error('Fetch destinations failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch destinations.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuthenticatedAdmin()
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const payload = (await request.json()) as DestinationPayload
    const entry = normalizeDestinationPayload(payload)

    if (!validateRequiredFields(entry)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Missing fields. Fill all required destination fields, highlights, and attractions.',
        },
        { status: 400 }
      )
    }

    const created = await prisma.destinationEntry.create({
      data: entry,
    })

    invalidateContentCache('destinations')

    return NextResponse.json({
      success: true,
      destination: created,
    })
  } catch (error) {
    console.error('Create destination failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create destination.' },
      { status: 500 }
    )
  }
}
