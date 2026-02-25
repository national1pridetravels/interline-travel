import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import {
  ADMIN_SESSION_COOKIE,
  clearExpiredAdminSessions,
  createAdminSession,
  getSessionCookieConfig,
  toPublicAdmin,
} from '@/lib/admin/auth'
import { verifyPassword } from '@/lib/admin/password'
import { bootstrapAdminData } from '@/lib/content/store'

export async function POST(request: Request) {
  try {
    await bootstrapAdminData()
    await clearExpiredAdminSessions()

    const { email, password } = (await request.json()) as {
      email?: string
      password?: string
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      )
    }

    const user = await prisma.adminUser.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    })

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials.' },
        { status: 401 }
      )
    }

    const { token, expiresAt } = await createAdminSession(user.id)
    const response = NextResponse.json({
      success: true,
      user: toPublicAdmin(user),
    })

    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      token,
      getSessionCookieConfig(expiresAt)
    )

    return response
  } catch (error) {
    console.error('Admin login failed:', error)
    return NextResponse.json(
      { success: false, message: 'Login failed.' },
      { status: 500 }
    )
  }
}
