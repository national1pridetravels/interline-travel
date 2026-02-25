import { NextResponse } from 'next/server'
import { sanitizeHtml, sendLeadMail } from '@/lib/lead-mail'

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  destination?: string
  message?: string
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload
    const name = (payload.name || '').trim()
    const email = (payload.email || '').trim().toLowerCase()
    const phone = (payload.phone || '').trim()
    const destination = (payload.destination || '').trim()
    const message = (payload.message || '').trim()

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill all required fields.' },
        { status: 400 }
      )
    }

    const mailStatus = await sendLeadMail({
      subject: `Contact Inquiry - ${name}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${sanitizeHtml(name)}</p>
        <p><strong>Email:</strong> ${sanitizeHtml(email)}</p>
        <p><strong>Phone:</strong> ${sanitizeHtml(phone)}</p>
        <p><strong>Destination Interest:</strong> ${sanitizeHtml(destination || 'Not specified')}</p>
        <p><strong>Message:</strong><br/>${sanitizeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
      replyTo: email,
    })

    return NextResponse.json({
      success: true,
      mailed: mailStatus.delivered,
    })
  } catch (error) {
    console.error('Contact inquiry failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send inquiry.' },
      { status: 500 }
    )
  }
}
