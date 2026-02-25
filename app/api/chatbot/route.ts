// app/api/chatbot/route.ts
import { NextResponse } from 'next/server'

const travelResponses = {
  'kashmir': 'Discover Kashmir\'s beauty with our packages starting from Srinagar, Gulmarg, Pahalgam, and Sonmarg.',
  'booking': 'Visit our booking page or call +91-XXXXXXXXX to reserve your Kashmir tour.',
  'price': 'Contact us for best rates on Kashmir packages. Prices vary by season and package.',
  'default': 'National Pride Travels offers the best Kashmir tour packages. How can we help?'
}

export async function POST(request: Request) {
  const { message } = await request.json()
  
  const lowerMsg = message.toLowerCase()
  let response = travelResponses.default
  
  if (lowerMsg.includes('kashmir')) response = travelResponses.kashmir
  if (lowerMsg.includes('book')) response = travelResponses.booking
  if (lowerMsg.includes('price')) response = travelResponses.price
  
  return NextResponse.json({ 
    reply: response,
    source: 'nationalpride'
  })
}
