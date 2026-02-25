import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireAuthenticatedAdmin } from '@/lib/admin/auth'
import { bootstrapAdminData, invalidateContentCache } from '@/lib/content/store'

type PackagePayload = {
  slug?: string
  title?: string
  duration?: string
  priceFrom?: string
  image?: string
  season?: string
  tags?: string[] | string
  summary?: string
  idealFor?: string
  includes?: string[] | string
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

function normalizePackagePayload(payload: PackagePayload) {
  return {
    slug: (payload.slug || '').trim().toLowerCase(),
    title: (payload.title || '').trim(),
    duration: (payload.duration || '').trim(),
    priceFrom: (payload.priceFrom || '').trim(),
    image: (payload.image || '').trim(),
    season: (payload.season || '').trim().toLowerCase(),
    tags: parseListInput(payload.tags),
    summary: (payload.summary || '').trim(),
    idealFor: (payload.idealFor || '').trim(),
    includes: parseListInput(payload.includes),
  }
}

function validatePackage(entry: ReturnType<typeof normalizePackagePayload>) {
  return (
    !!entry.slug &&
    !!entry.title &&
    !!entry.duration &&
    !!entry.priceFrom &&
    !!entry.image &&
    !!entry.season &&
    entry.tags.length > 0
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
    const packages = await prisma.packageEntry.findMany({
      orderBy: [{ season: 'asc' }, { title: 'asc' }],
    })

    return NextResponse.json({
      success: true,
      packages,
    })
  } catch (error) {
    console.error('Fetch packages failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch packages.' },
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

    const payload = (await request.json()) as PackagePayload
    const entry = normalizePackagePayload(payload)

    if (!validatePackage(entry)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Missing fields. Provide slug, title, duration, price, image, season, and tags.',
        },
        { status: 400 }
      )
    }

    const created = await prisma.packageEntry.create({
      data: {
        ...entry,
        summary: entry.summary || null,
        idealFor: entry.idealFor || null,
        includes: entry.includes,
      },
    })

    invalidateContentCache('packages')

    return NextResponse.json({
      success: true,
      package: created,
    })
  } catch (error) {
    console.error('Create package failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create package.' },
      { status: 500 }
    )
  }
}
