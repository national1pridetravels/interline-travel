import { NextResponse } from 'next/server'
import { sanitizeHtml, sendLeadMail } from '@/lib/lead-mail'

type NewsletterPayload = {
  email?: string
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as NewsletterPayload
    const email = (payload.email || '').trim().toLowerCase()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Valid email is required.' },
        { status: 400 }
      )
    }

    const mailStatus = await sendLeadMail({
      subject: 'Newsletter Subscription Lead',
      html: `<p><strong>Subscriber Email:</strong> ${sanitizeHtml(email)}</p>`,
      replyTo: email,
    })

    return NextResponse.json({
      success: true,
      mailed: mailStatus.delivered,
    })
  } catch (error) {
    console.error('Newsletter submission failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe.' },
      { status: 500 }
    )
  }
}
