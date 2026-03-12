export type CabCategory = {
  category: string
  range: string
  idealFor: string
  notes: string
}

export type FleetVehicle = {
  name: string
  segment: string
  ratePerDay: string
  fit: string
  seats: string
  transmission: string
  fuel: string
  image: string
  badge?: string
}

export type RouteRate = {
  route: string
  distance: string
  from: string
  to: string
  hatchback: string
  sedan: string
  suv: string
}

export const serviceHighlights = [
  'Skilled local drivers and verified vehicles',
  'Transparent fare guidance with no hidden surprises',
  '24/7 travel desk for route and weather support',
  'Airport pickup, intercity transfer, and day sightseeing plans',
]

// Rates are adapted from public listings on kashmirtourtravel.com/cars.
// Final quotes vary by season, route conditions, and vehicle availability.
export const cabCategoryRanges: CabCategory[] = [
  {
    category: 'All Cars',
    range: 'INR 1,500 - 12,000/day',
    idealFor: 'Flexible trip planning',
    notes: 'From economical cabs to premium long-route vehicles.',
  },
  {
    category: 'Hatchback',
    range: 'INR 1,500 - 2,500/day',
    idealFor: 'Couples and local city travel',
    notes: 'Budget-friendly for short moves and airport transfers.',
  },
  {
    category: 'Sedan',
    range: 'INR 2,500 - 4,000/day',
    idealFor: 'Families and smooth highways',
    notes: 'Comfort-focused rides for Srinagar and nearby circuits.',
  },
  {
    category: 'SUV / MUV',
    range: 'INR 3,500 - 6,000/day',
    idealFor: 'Valley routes and mountain drives',
    notes: 'Preferred for Gulmarg, Sonmarg, and Pahalgam sectors.',
  },
  {
    category: 'Luxury',
    range: 'INR 6,000 - 12,000/day',
    idealFor: 'Premium travel experience',
    notes: 'Ideal for executive travel and curated luxury holidays.',
  },
  {
    category: 'Tempo Traveller',
    range: 'INR 4,500 - 8,000/day',
    idealFor: 'Groups and multi-day tours',
    notes: 'Best for larger families and corporate groups.',
  },
]

export const fleetVehicles: FleetVehicle[] = [
  {
    name: 'Maruti Suzuki Swift',
    segment: 'Hatchback',
    ratePerDay: 'INR 1,800/day',
    fit: 'Best for airport hops and city travel',
    seats: '4 seats',
    transmission: 'Manual',
    fuel: 'Petrol',
    image: '/assets/services/swift-desire.webp',
    badge: 'Most Popular',
  },
  {
    name: 'Maruti Suzuki Ciaz',
    segment: 'Sedan',
    ratePerDay: 'INR 2,800/day',
    fit: 'Comfort rides with luggage space',
    seats: '5 seats',
    transmission: 'Manual',
    fuel: 'Petrol',
    image: '/assets/services/ciaz.webp',
  },
  {
    name: 'Toyota Innova Crysta',
    segment: 'SUV / MUV',
    ratePerDay: 'INR 4,500/day',
    fit: 'Family circuits and long valley routes',
    seats: '7 seats',
    transmission: 'Manual',
    fuel: 'Diesel',
    image: '/assets/services/innova-crysta.webp',
    badge: 'Family Choice',
  },
  {
    name: 'Maruti Suzuki Ertiga',
    segment: 'SUV / MUV',
    ratePerDay: 'INR 3,800/day',
    fit: 'Value-focused group transport',
    seats: '7 seats',
    transmission: 'Manual',
    fuel: 'Petrol',
    image: '/assets/services/ertiga.webp',
  },
  {
    name: 'Toyota Fortuner',
    segment: 'Luxury SUV',
    ratePerDay: 'INR 8,500/day',
    fit: 'Premium touring and executive travel',
    seats: '7 seats',
    transmission: 'Automatic',
    fuel: 'Diesel',
    image: '/assets/services/fortuner.webp',
    badge: 'Luxury',
  },
  {
    name: 'Tempo Traveller',
    segment: 'Group',
    ratePerDay: 'INR 5,500/day',
    fit: 'Large family or corporate movement',
    seats: '12 seats',
    transmission: 'Manual',
    fuel: 'Diesel',
    image: '/assets/services/tempo-traveller.webp',
  },
]

export const routeRates: RouteRate[] = [
  {
    route: 'Airport Transfer',
    distance: '15 km',
    from: 'Srinagar Airport',
    to: 'Dal Lake',
    hatchback: 'INR 800',
    sedan: 'INR 1,000',
    suv: 'INR 1,300',
  },
  {
    route: 'Srinagar to Gulmarg',
    distance: '52 km',
    from: 'Srinagar',
    to: 'Gulmarg',
    hatchback: 'INR 2,500',
    sedan: 'INR 3,000',
    suv: 'INR 3,800',
  },
  {
    route: 'Srinagar to Pahalgam',
    distance: '95 km',
    from: 'Srinagar',
    to: 'Pahalgam',
    hatchback: 'INR 3,500',
    sedan: 'INR 4,200',
    suv: 'INR 5,000',
  },
  {
    route: 'Srinagar to Sonmarg',
    distance: '80 km',
    from: 'Srinagar',
    to: 'Sonmarg',
    hatchback: 'INR 3,200',
    sedan: 'INR 3,800',
    suv: 'INR 4,500',
  },
]

export const cabServiceUseCases = [
  'Airport pickup and drop with baggage support',
  'Hotel-to-hotel and inter-city transfers',
  'Custom sightseeing with waiting and stopovers',
  'Corporate movement and wedding/event transport',
  'Multi-day Kashmir circuits with dedicated driver',
  'Group departures with tempo traveller and support van',
]
