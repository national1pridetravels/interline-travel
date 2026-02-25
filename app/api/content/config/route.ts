import { NextResponse } from 'next/server'
import { getSiteConfig } from '@/lib/content/store'

export async function GET() {
  try {
    const config = await getSiteConfig()
    return NextResponse.json({
      success: true,
      config,
    })
  } catch (error) {
    console.error('Fetch public config failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch config.' },
      { status: 500 }
    )
  }
}
