import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { requireAuthenticatedAdmin } from '@/lib/admin/auth'
import { defaultSiteConfig } from '@/lib/content/defaults'
import { bootstrapAdminData, invalidateContentCache } from '@/lib/content/store'

export const dynamic = 'force-dynamic'

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
    const config = await prisma.siteConfig.findUnique({
      where: { id: 1 },
    })

    return NextResponse.json({
      success: true,
      config: config
        ? {
            brandName: config.brandName,
            brandTagline: config.brandTagline,
            phone: config.phone,
            heroEyebrow: config.heroEyebrow,
            heroTitle: config.heroTitle,
            heroSubtitle: config.heroSubtitle,
          }
        : defaultSiteConfig,
    })
  } catch (error) {
    console.error('Fetch site config failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch site config.' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireAuthenticatedAdmin()
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const payload = (await request.json()) as Partial<typeof defaultSiteConfig>
    const brandName = (payload.brandName || '').trim()
    const brandTagline = (payload.brandTagline || '').trim()
    const phone = (payload.phone || '').trim()
    const heroEyebrow = (payload.heroEyebrow || '').trim()
    const heroTitle = (payload.heroTitle || '').trim()
    const heroSubtitle = (payload.heroSubtitle || '').trim()

    if (!brandName || !brandTagline || !phone || !heroEyebrow || !heroTitle || !heroSubtitle) {
      return NextResponse.json(
        {
          success: false,
          message: 'All site config fields are required.',
        },
        { status: 400 }
      )
    }

    const updated = await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: {
        brandName,
        brandTagline,
        phone,
        heroEyebrow,
        heroTitle,
        heroSubtitle,
      },
      create: {
        id: 1,
        brandName,
        brandTagline,
        phone,
        heroEyebrow,
        heroTitle,
        heroSubtitle,
      },
    })

    invalidateContentCache('site-config')

    return NextResponse.json({
      success: true,
      config: {
        brandName: updated.brandName,
        brandTagline: updated.brandTagline,
        phone: updated.phone,
        heroEyebrow: updated.heroEyebrow,
        heroTitle: updated.heroTitle,
        heroSubtitle: updated.heroSubtitle,
      },
    })
  } catch (error) {
    console.error('Update site config failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update site config.' },
      { status: 500 }
    )
  }
}
