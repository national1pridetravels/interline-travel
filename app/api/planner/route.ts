import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { sanitizeHtml, sendLeadMail } from '@/lib/lead-mail'

type PlannerPayload = {
  name?: string
  email?: string
  phone?: string
  destination?: string
  travelers?: number | string
  checkIn?: string
  checkOut?: string
  budget?: string
}

function toSafeDate(value: string | undefined, fallback: Date) {
  if (!value) {
    return fallback
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return fallback
  }
  return date
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as PlannerPayload
    const name = (payload.name || '').trim()
    const email = (payload.email || '').trim().toLowerCase()
    const phone = (payload.phone || '').trim()
    const destination = (payload.destination || '').trim()
    const budget = (payload.budget || 'not-selected').trim()
    const travelers = Number(payload.travelers || 2)

    if (!name || !phone || !destination || Number.isNaN(travelers) || travelers < 1) {
      return NextResponse.json(
        { success: false, message: 'Name, phone, destination and travelers are required.' },
        { status: 400 }
      )
    }

    const today = new Date()
    const nextDay = new Date(today)
    nextDay.setDate(nextDay.getDate() + 1)

    const checkInDate = toSafeDate(payload.checkIn, today)
    const checkOutDate = toSafeDate(payload.checkOut, nextDay)

    const leadLabel = `Instant Plan Builder - ${destination} (${budget})`
    const booking = await prisma.booking.create({
      data: {
        name,
        email: email || 'no-email@nationalpridetravels.com',
        phone,
        package: leadLabel,
        travelers,
        checkIn: checkInDate,
        checkOut: checkOutDate,
      },
    })

    const html = `
      <h2>New Instant Plan Builder Request</h2>
      <p><strong>Lead ID:</strong> ${sanitizeHtml(booking.id)}</p>
      <p><strong>Name:</strong> ${sanitizeHtml(name)}</p>
      <p><strong>Email:</strong> ${sanitizeHtml(email || 'Not provided')}</p>
      <p><strong>Phone:</strong> ${sanitizeHtml(phone)}</p>
      <p><strong>Destination:</strong> ${sanitizeHtml(destination)}</p>
      <p><strong>Budget Type:</strong> ${sanitizeHtml(budget)}</p>
      <p><strong>Travelers:</strong> ${travelers}</p>
      <p><strong>Check In:</strong> ${sanitizeHtml(checkInDate.toISOString())}</p>
      <p><strong>Check Out:</strong> ${sanitizeHtml(checkOutDate.toISOString())}</p>
    `

    const mailStatus = await sendLeadMail({
      subject: `Instant Plan Request - ${name}`,
      html,
      replyTo: email || undefined,
    })

    return NextResponse.json({
      success: true,
      leadId: booking.id,
      mailed: mailStatus.delivered,
    })
  } catch (error) {
    console.error('Planner request failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit plan request.' },
      { status: 500 }
    )
  }
}
