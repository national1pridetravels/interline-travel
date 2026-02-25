import { NextResponse } from 'next/server'
import {
  getDestinations,
  getFeaturedDestinations,
  getHighlightDestinations,
} from '@/lib/content/store'

export async function GET() {
  try {
    const [destinations, featured, highlights] = await Promise.all([
      getDestinations(),
      getFeaturedDestinations(),
      getHighlightDestinations(),
    ])

    return NextResponse.json({
      success: true,
      destinations,
      featured,
      highlights,
    })
  } catch (error) {
    console.error('Fetch public destinations failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch destinations.' },
      { status: 500 }
    )
  }
}
