import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  clearSessionToken,
  getSessionCookieConfig,
} from '@/lib/admin/auth'

export async function POST() {
  try {
    const token = cookies().get(ADMIN_SESSION_COOKIE)?.value
    await clearSessionToken(token)

    const response = NextResponse.json({ success: true })
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      '',
      getSessionCookieConfig(new Date(0))
    )

    return response
  } catch (error) {
    console.error('Admin logout failed:', error)
    return NextResponse.json(
      { success: false, message: 'Logout failed.' },
      { status: 500 }
    )
  }
}
