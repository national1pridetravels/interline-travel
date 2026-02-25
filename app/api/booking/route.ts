import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const booking = await prisma.booking.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        package: body.package,
        travelers: Number(body.travelers),
        checkIn: new Date(body.checkIn),
        checkOut: body.checkOut ? new Date(body.checkOut) : null,
      },
    })

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, message: 'Booking failed' },
      { status: 500 }
    )
  }
}
