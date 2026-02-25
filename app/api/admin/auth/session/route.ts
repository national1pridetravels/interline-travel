import { NextResponse } from 'next/server'
import { getAuthenticatedAdmin, toPublicAdmin } from '@/lib/admin/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getAuthenticatedAdmin()

    if (!user) {
      return NextResponse.json({
        authenticated: false,
      })
    }

    return NextResponse.json({
      authenticated: true,
      user: toPublicAdmin(user),
    })
  } catch (error) {
    console.error('Admin session lookup failed:', error)
    return NextResponse.json(
      {
        authenticated: false,
      },
      { status: 500 }
    )
  }
}
