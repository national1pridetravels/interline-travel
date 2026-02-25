import { NextResponse } from 'next/server'
import {
  getDestinations,
  getFeaturedDestinations,
  getHighlightDestinations,
} from '@/lib/content/store'

const cacheHeaders = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
}

export async function GET() {
  try {
    const [destinations, featured, highlights] = await Promise.all([
      getDestinations(),
      getFeaturedDestinations(),
      getHighlightDestinations(),
    ])

    return NextResponse.json(
      {
        success: true,
        destinations,
        featured,
        highlights,
      },
      { headers: cacheHeaders }
    )
  } catch (error) {
    console.error('Fetch public destinations failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch destinations.' },
      { status: 500 }
    )
  }
}
