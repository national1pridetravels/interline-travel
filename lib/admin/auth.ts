import { randomBytes } from 'crypto'
import { cookies } from 'next/headers'
import type { AdminUser } from '@prisma/client'
import prisma from '@/lib/db/prisma'
import { bootstrapAdminData } from '@/lib/content/store'

export const ADMIN_SESSION_COOKIE = 'npt_admin_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7

export async function createAdminSession(userId: string) {
  await bootstrapAdminData()
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS)

  await prisma.adminSession.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  })

  return { token, expiresAt }
}

export function getSessionCookieConfig(expiresAt: Date) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  }
}

export async function getAuthenticatedAdmin() {
  await bootstrapAdminData()
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value

  if (!token) {
    return null
  }

  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session) {
    return null
  }

  if (session.expiresAt <= new Date()) {
    await prisma.adminSession.deleteMany({
      where: { token },
    })
    return null
  }

  return session.user
}

export async function requireAuthenticatedAdmin() {
  const user = await getAuthenticatedAdmin()
  if (!user) {
    return null
  }

  return user
}

export async function clearSessionToken(token?: string) {
  if (!token) {
    return
  }

  await prisma.adminSession.deleteMany({
    where: { token },
  })
}

export async function clearExpiredAdminSessions() {
  await prisma.adminSession.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  })
}

export function toPublicAdmin(user: AdminUser) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  }
}
