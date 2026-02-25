import { NextResponse } from 'next/server'
import { getSiteConfig } from '@/lib/content/store'

const cacheHeaders = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
}

export async function GET() {
  try {
    const config = await getSiteConfig()
    return NextResponse.json(
      {
        success: true,
        config,
      },
      { headers: cacheHeaders }
    )
  } catch (error) {
    console.error('Fetch public config failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch config.' },
      { status: 500 }
    )
  }
}
