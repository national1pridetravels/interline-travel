import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { sanitizeHtml, sendLeadMail } from '@/lib/lead-mail'

type BookingPayload = {
  name?: string
  email?: string
  phone?: string
  package?: string
  travelers?: number | string
  checkIn?: string
  checkOut?: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingPayload
    const name = (body.name || '').trim()
    const email = (body.email || '').trim().toLowerCase()
    const phone = (body.phone || '').trim()
    const packageName = (body.package || 'Kashmir Tour Booking').trim()
    const travelers = Number(body.travelers || 1)
    const checkInValue = (body.checkIn || '').trim()
    const checkOutValue = (body.checkOut || '').trim()

    if (!name || !email || !phone || !checkInValue || Number.isNaN(travelers) || travelers < 1) {
      return NextResponse.json(
        { success: false, message: 'Please fill all required booking fields.' },
        { status: 400 }
      )
    }

    const checkInDate = new Date(checkInValue)
    const checkOutDate = checkOutValue ? new Date(checkOutValue) : null
    if (Number.isNaN(checkInDate.getTime()) || (checkOutDate && Number.isNaN(checkOutDate.getTime()))) {
      return NextResponse.json(
        { success: false, message: 'Invalid travel dates.' },
        { status: 400 }
      )
    }

    let bookingId = `booking-${Date.now()}`
    let saved = false

    try {
      const booking = await prisma.booking.create({
        data: {
          name,
          email,
          phone,
          package: packageName,
          travelers,
          checkIn: checkInDate,
          checkOut: checkOutDate,
        },
      })
      bookingId = booking.id
      saved = true
    } catch (databaseError) {
      console.error('Booking DB write failed, using email fallback:', databaseError)
    }

    const html = `
      <h2>New Booking Request</h2>
      <p><strong>Booking ID:</strong> ${sanitizeHtml(bookingId)}</p>
      <p><strong>Stored In DB:</strong> ${saved ? 'Yes' : 'No (email fallback)'}</p>
      <p><strong>Name:</strong> ${sanitizeHtml(name)}</p>
      <p><strong>Email:</strong> ${sanitizeHtml(email)}</p>
      <p><strong>Phone:</strong> ${sanitizeHtml(phone)}</p>
      <p><strong>Package:</strong> ${sanitizeHtml(packageName)}</p>
      <p><strong>Travelers:</strong> ${travelers}</p>
      <p><strong>Check In:</strong> ${sanitizeHtml(checkInDate.toISOString())}</p>
      <p><strong>Check Out:</strong> ${sanitizeHtml(checkOutDate?.toISOString() || 'Not selected')}</p>
    `

    let mailStatus: { delivered: boolean; reason?: string } = { delivered: false }
    try {
      mailStatus = await sendLeadMail({
        subject: `New Booking Lead - ${name}`,
        html,
        replyTo: email,
      })
    } catch (mailError) {
      console.error('Booking lead email failed:', mailError)
    }

    if (!saved && !mailStatus.delivered) {
      console.error('Booking request accepted with log-only fallback', {
        bookingId,
        name,
        email,
        phone,
        package: packageName,
        travelers,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate?.toISOString() || null,
      })
    }

    return NextResponse.json({
      success: true,
      bookingId,
      saved,
      mailed: mailStatus.delivered,
      queued: !saved && !mailStatus.delivered,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, message: 'Booking failed' },
      { status: 500 }
    )
  }
}
