type LeadMailPayload = {
  subject: string
  html: string
  replyTo?: string
}

const DEFAULT_LEAD_RECIPIENTS = [
  'info@nationalpridetravels.com',
  'nationalpridetravels@gmail.com',
]

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

function getLeadRecipients() {
  const configured =
    process.env.CONTACT_RECEIVER_EMAIL ||
    process.env.CONTACT_RECEIVER_EMAILS ||
    process.env.LEAD_RECEIVER_EMAILS ||
    ''

  const parsed = configured
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

  const combined = [...DEFAULT_LEAD_RECIPIENTS, ...parsed]
  const uniqueRecipients = [...new Set(combined)]
  return uniqueRecipients
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL || 'National Pride Travels <onboarding@resend.dev>'
}

export async function sendLeadMail(payload: LeadMailPayload) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not configured. Lead email was skipped.')
    return {
      delivered: false,
      reason: 'missing_resend_api_key',
    } as const
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getFromAddress(),
      to: getLeadRecipients(),
      subject: payload.subject,
      html: payload.html,
      reply_to: payload.replyTo ? [payload.replyTo] : undefined,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    console.error('Resend API error:', response.status, body)
    return {
      delivered: false,
      reason: 'resend_request_failed',
    } as const
  }

  return {
    delivered: true,
  } as const
}

export function sanitizeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
