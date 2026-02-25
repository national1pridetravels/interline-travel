// app/api/itinerary-ai/route.ts
import { NextResponse } from 'next/server'

const kashmirItinerary = {
  day1: 'Arrival in Srinagar. Mughal Gardens tour. Houseboat stay.',
  day2: 'Pahalgam sightseeing. Betaab Valley, Aru Valley.',
  day3: 'Gulmarg gondola ride. Snow activities.',
  day4: 'Sonmarg excursion. Return to Srinagar.'
}

export async function POST(request: Request) {
  const { packageName, days } = await request.json()
  
  // Mock AI itinerary generation
  const itinerary = {
    package: packageName || 'Kashmir Delight',
    duration: days || 4,
    details: kashmirItinerary,
    highlights: ['Houseboat', 'Gondola', 'Valleys']
  }
  
  return NextResponse.json({ itinerary })
}
