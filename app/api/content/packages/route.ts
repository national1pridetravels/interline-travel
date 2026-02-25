import { NextResponse } from 'next/server'
import { getPackages } from '@/lib/content/store'

const cacheHeaders = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
}

export async function GET() {
  try {
    const packages = await getPackages()
    return NextResponse.json(
      {
        success: true,
        packages,
      },
      { headers: cacheHeaders }
    )
  } catch (error) {
    console.error('Fetch public packages failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch packages.' },
      { status: 500 }
    )
  }
}
