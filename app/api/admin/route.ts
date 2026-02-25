import { NextResponse } from 'next/server'
import { requireAuthenticatedAdmin, toPublicAdmin } from '@/lib/admin/auth'

export async function GET() {
  const user = await requireAuthenticatedAdmin()
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    success: true,
    message: 'Admin API ready',
    user: toPublicAdmin(user),
    endpoints: [
      '/api/admin/auth/login',
      '/api/admin/auth/logout',
      '/api/admin/auth/session',
      '/api/admin/config',
      '/api/admin/destinations',
      '/api/admin/packages',
    ],
  })
}
