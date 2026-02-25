import { NextResponse } from 'next/server'

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || ''
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || ''
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || ''

async function sendWhatsAppReply(to: string, message: string) {
  if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
    console.warn('WhatsApp API credentials are missing. Incoming message could not be auto-replied.')
    return false
  }

  const response = await fetch(`https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: {
        body: message,
      },
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    console.error('WhatsApp reply failed:', response.status, body)
    return false
  }

  return true
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token && token === VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ success: false, message: 'Verification failed' }, { status: 403 })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      entry?: Array<{
        changes?: Array<{
          value?: {
            messages?: Array<{
              from?: string
              text?: { body?: string }
            }>
          }
        }>
      }>
    }

    const messages =
      body.entry?.flatMap((entry) =>
        entry.changes?.flatMap((change) => change.value?.messages || []) || []
      ) || []

    for (const incomingMessage of messages) {
      const sender = incomingMessage.from
      const text = incomingMessage.text?.body || ''
      if (!sender) {
        continue
      }

      const lower = text.toLowerCase()
      let reply =
        'Thank you for contacting National Pride Travels. Our team has received your message and will respond shortly.'

      if (lower.includes('package') || lower.includes('plan')) {
        reply =
          'Please share your travel dates, number of travelers, and destination preferences. Our Kashmir expert will send a tailored package.'
      } else if (lower.includes('price') || lower.includes('cost')) {
        reply =
          'Pricing depends on season, hotel category, and route. Share your dates and traveler count for an exact quote.'
      } else if (lower.includes('booking')) {
        reply =
          'Great. Please share your name, travel dates, and destination. Our booking desk will call you shortly to confirm.'
      }

      await sendWhatsAppReply(sender, reply)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('WhatsApp webhook handling failed:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
