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

    const html = `
      <h2>New Booking Request</h2>
      <p><strong>Booking ID:</strong> ${sanitizeHtml(booking.id)}</p>
      <p><strong>Name:</strong> ${sanitizeHtml(name)}</p>
      <p><strong>Email:</strong> ${sanitizeHtml(email)}</p>
      <p><strong>Phone:</strong> ${sanitizeHtml(phone)}</p>
      <p><strong>Package:</strong> ${sanitizeHtml(packageName)}</p>
      <p><strong>Travelers:</strong> ${travelers}</p>
      <p><strong>Check In:</strong> ${sanitizeHtml(checkInDate.toISOString())}</p>
      <p><strong>Check Out:</strong> ${sanitizeHtml(checkOutDate?.toISOString() || 'Not selected')}</p>
    `

    const mailStatus = await sendLeadMail({
      subject: `New Booking Lead - ${name}`,
      html,
      replyTo: email,
    })

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      mailed: mailStatus.delivered,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, message: 'Booking failed' },
      { status: 500 }
    )
  }
}
