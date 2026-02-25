import { destinationList, type Destination } from '@/lib/destinations'

export type AdminPackageSeed = {
  slug: string
  title: string
  duration: string
  priceFrom: string
  image: string
  season: string
  tags: string[]
  summary: string
  idealFor: string
  includes: string[]
}

export const defaultFeaturedDestinationSlugs = [
  'srinagar',
  'gulmarg',
  'pahalgam',
  'sonmarg',
  'tulip-garden',
  'gurez',
]

export const defaultHighlightDestinationSlugs = [
  'doodhpathri',
  'gurez',
  'patnitop',
  'vaishno-devi',
  'katra',
]

const curatedPackageSeeds: AdminPackageSeed[] = [
  {
    slug: 'mesmerizing-kashmir-holiday',
    title: 'Mesmerizing Kashmir Holiday',
    duration: '5D4N',
    priceFrom: '₹26,300',
    image: '/images/hero/hero-1.webp',
    season: 'all-season',
    tags: ['family', 'adventure', 'hill-station'],
    summary: 'A balanced Kashmir tour covering Srinagar, Gulmarg, and Pahalgam.',
    idealFor: 'Family and Couples',
    includes: ['Hotel stays', 'Local transfers', 'Sightseeing support'],
  },
  {
    slug: 'beautiful-kashmir-tour',
    title: 'Beautiful Kashmir Tour',
    duration: '6D5N',
    priceFrom: '₹16,900',
    image: '/images/hero/hero-2.webp',
    season: 'all-season',
    tags: ['family', 'honeymoon', 'hill-station'],
    summary: 'A scenic itinerary with city, valley, and mountain highlights.',
    idealFor: 'Family, Couples, First-time visitors',
    includes: ['Accommodation', 'Daily assistance', 'Private cab options'],
  },
  {
    slug: 'kashmir-adventure-trekking',
    title: 'Kashmir Adventure & Trekking',
    duration: '5D4N',
    priceFrom: '₹25,500',
    image: '/images/hero/hero-3.webp',
    season: 'all-season',
    tags: ['adventure', 'trekking', 'group'],
    summary: 'An activity-first plan including trekking and outdoor experiences.',
    idealFor: 'Adventure travelers',
    includes: ['Activity planning', 'Ground support', 'Custom add-ons'],
  },
  {
    slug: 'ultimate-kashmir-experience',
    title: 'Ultimate Kashmir Experience',
    duration: '7D6N',
    priceFrom: '₹24,200',
    image: '/images/hero/hero-4.webp',
    season: 'all-season',
    tags: ['family', 'group', 'hill-station'],
    summary: 'A comprehensive Kashmir circuit with expanded sightseeing.',
    idealFor: 'Groups and families',
    includes: ['Multi-city itinerary', 'Hotel support', 'Transfer assistance'],
  },
  {
    slug: 'winter-kashmir-snow-escape',
    title: 'Winter Kashmir Snow Escape',
    duration: '6D5N',
    priceFrom: '₹29,800',
    image: '/images/highlights/gulmarg.png',
    season: 'winter',
    tags: ['seasonal', 'winter', 'adventure', 'honeymoon'],
    summary:
      'A winter-focused Kashmir plan with Gulmarg snow experiences, warm stays, and weather-ready transfers.',
    idealFor: 'Snow lovers, couples, and adventure travelers',
    includes: [
      'Gulmarg winter sightseeing',
      'Snow activity planning support',
      'Heated stay recommendations',
      'Airport and local transfer support',
    ],
  },
  {
    slug: 'spring-kashmir-blossom-trail',
    title: 'Spring Kashmir Blossom Trail',
    duration: '5D4N',
    priceFrom: '₹21,900',
    image: '/images/highlights/dal-lake.png',
    season: 'spring',
    tags: ['seasonal', 'spring', 'family', 'honeymoon'],
    summary:
      'A spring itinerary for tulip and garden season across Srinagar and nearby valleys with easy-paced sightseeing.',
    idealFor: 'Families and honeymoon couples',
    includes: [
      'Tulip and Mughal garden visits',
      'Dal Lake and old city sightseeing',
      'Comfort-focused hotel options',
      'Local transfer assistance',
    ],
  },
  {
    slug: 'summer-kashmir-valley-retreat',
    title: 'Summer Kashmir Valley Retreat',
    duration: '6D5N',
    priceFrom: '₹24,600',
    image: '/images/highlights/sonmarg.png',
    season: 'summer',
    tags: ['seasonal', 'summer', 'family', 'group', 'trekking'],
    summary:
      'A summer escape covering cool valley routes, meadows, and lake experiences when plains are at peak heat.',
    idealFor: 'Family vacations and groups',
    includes: [
      'Valley circuit planning',
      'Day-wise sightseeing support',
      'Family-friendly stay options',
      'Ground transport coordination',
    ],
  },
  {
    slug: 'autumn-kashmir-chinar-colors',
    title: 'Autumn Kashmir Chinar Colors',
    duration: '5D4N',
    priceFrom: '₹22,400',
    image: '/images/highlights/pahalgam.png',
    season: 'autumn',
    tags: ['seasonal', 'autumn', 'family', 'group'],
    summary:
      'An autumn itinerary focused on chinar colors, crisp weather, and scenic drives through Srinagar and Pahalgam.',
    idealFor: 'Photographers, couples, and leisure travelers',
    includes: [
      'Chinar-season sightseeing routes',
      'Photo-friendly location planning',
      'Premium and standard stay choices',
      'Private cab options',
    ],
  },
]

const seasonDurationByTag: Record<string, string> = {
  winter: '6D5N',
  spring: '5D4N',
  summer: '6D5N',
  autumn: '5D4N',
  'all-season': '4D3N+',
}

const seasonPriceByTag: Record<string, string> = {
  winter: '₹29,800',
  spring: '₹21,900',
  summer: '₹24,600',
  autumn: '₹22,400',
  'all-season': '₹19,900',
}

export function seasonTagFromLabel(season: string) {
  return season.toLowerCase().replace(/\s+/g, '-')
}

export function buildDestinationPackageSeeds(
  destinations: Destination[]
): AdminPackageSeed[] {
  return destinations.map((destination) => {
    const seasonTag = seasonTagFromLabel(destination.season)

    return {
      slug: destination.slug,
      title: `${destination.name} Tour Package`,
      duration: seasonDurationByTag[seasonTag] || '5D4N',
      priceFrom: seasonPriceByTag[seasonTag] || 'On Request',
      image: destination.heroImage,
      season: seasonTag,
      tags: [
        'seasonal',
        seasonTag,
        destination.category === 'Sacred Trails' ? 'group' : 'adventure',
      ],
      summary: destination.description,
      idealFor: destination.idealFor,
      includes: [
        `${destination.name} sightseeing planning`,
        'Hotel stay options by budget',
        'Cab and transfer support',
        'Custom itinerary with local guidance',
      ],
    }
  })
}

export const defaultPackageSeeds = [
  ...curatedPackageSeeds,
  ...buildDestinationPackageSeeds(destinationList),
]

export const defaultSiteConfig = {
  brandName: 'National Pride Travels',
  brandTagline: 'Time to travel with us',
  phone: '+91 99064 69903',
  heroEyebrow: 'KASHMIR CURATED JOURNEYS',
  heroTitle: 'Discover the Paradise on Earth',
  heroSubtitle:
    'Slow mornings on Dal Lake, alpine adventures in Gulmarg, and handcrafted itineraries that feel premium from day one.',
}
