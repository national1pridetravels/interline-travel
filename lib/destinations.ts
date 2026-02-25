export type Destination = {
  slug: string
  name: string
  season: 'Winter' | 'Spring' | 'Summer' | 'Autumn' | 'All Season'
  tagline: string
  shortDescription: string
  description: string
  bestSeason: string
  idealFor: string
  altitude: string
  travelTime: string
  heroImage: string
  category: 'Mountain Escapes' | 'Sacred Trails'
  highlights: string[]
  attractions: string[]
}

export const destinationList: Destination[] = [
  {
    slug: 'srinagar',
    name: 'Srinagar',
    season: 'Autumn',
    tagline: 'Lakeside heritage with timeless houseboats',
    shortDescription:
      'A blend of Mughal gardens, old city charm, and iconic Dal Lake serenity.',
    description:
      'Srinagar is Kashmir at its most graceful. Shikara rides at sunrise, garden boulevards, and floating markets make it ideal for a relaxed yet cultural holiday.',
    bestSeason: 'April to October',
    idealFor: 'Couples, families, culture-first travelers',
    altitude: '1,585 m',
    travelTime: '20 min from Srinagar Airport',
    heroImage: '/assets/destinations/srinagar.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Sunrise shikara on Dal Lake',
      'Mughal gardens circuit',
      'Old city and crafts walk',
    ],
    attractions: ['Dal Lake', 'Nishat Bagh', 'Shalimar Bagh', 'Hazratbal'],
  },
  {
    slug: 'gulmarg',
    name: 'Gulmarg',
    season: 'Winter',
    tagline: 'Alpine meadows, snow sports, and gondola views',
    shortDescription:
      'A premium mountain resort known for winter skiing and summer meadows.',
    description:
      'Gulmarg offers all-season mountain drama, from powder snow experiences to sweeping green valleys. It is one of the strongest adventure hubs in Kashmir.',
    bestSeason: 'Dec-Mar (snow), Apr-Jun (meadows)',
    idealFor: 'Adventure lovers, honeymooners, photographers',
    altitude: '2,650 m',
    travelTime: '1 hr 45 min from Srinagar',
    heroImage: '/assets/destinations/gulmarg.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Gondola phase rides',
      'Ski and snowboard slopes',
      'Meadow walks and mountain cafes',
    ],
    attractions: ['Gulmarg Gondola', 'Kongdoori', 'Apharwat', 'Golf Course'],
  },
  {
    slug: 'pahalgam',
    name: 'Pahalgam',
    season: 'Summer',
    tagline: 'River valleys wrapped in pine forests',
    shortDescription:
      'A calm valley escape with scenic routes, horse trails, and meadow landscapes.',
    description:
      'Pahalgam is best for travelers who want nature without rush. Lidder river views, nearby valleys, and easy day excursions make it highly family-friendly.',
    bestSeason: 'April to October',
    idealFor: 'Families, honeymoon trips, slow travel',
    altitude: '2,200 m',
    travelTime: '2 hr 30 min from Srinagar',
    heroImage: '/assets/destinations/pahalgam.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Lidder riverside stays',
      'Aru and Betaab valley excursions',
      'Leisure horse rides',
    ],
    attractions: ['Aru Valley', 'Betaab Valley', 'Lidder River', 'Chandanwari'],
  },
  {
    slug: 'sonmarg',
    name: 'Sonmarg',
    season: 'Summer',
    tagline: 'Golden meadows and glacier gateways',
    shortDescription:
      'A high-altitude valley popular for alpine scenery and trekking access.',
    description:
      'Sonmarg is dramatic, open, and ideal for travelers chasing mountain-scale vistas. It works well as an adventure extension from Srinagar.',
    bestSeason: 'May to September',
    idealFor: 'Nature seekers, trekkers, road trip travelers',
    altitude: '2,730 m',
    travelTime: '2 hr from Srinagar',
    heroImage: '/assets/destinations/sonmarg.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Thajiwas glacier routes',
      'Scenic drive corridors',
      'Summer meadow photography',
    ],
    attractions: ['Thajiwas Glacier', 'Baltal', 'Sindh Valley', 'Zoji La road'],
  },
  {
    slug: 'dal-lake',
    name: 'Dal Lake',
    season: 'Spring',
    tagline: 'Floating markets and postcard-perfect waters',
    shortDescription:
      'A signature Kashmir experience centered around houseboats and shikaras.',
    description:
      'Dal Lake is the visual identity of Srinagar. It is ideal for calm mornings, waterside stays, and slow scenic moments.',
    bestSeason: 'April to October',
    idealFor: 'Couples, families, short leisure trips',
    altitude: '1,585 m',
    travelTime: '15 min from Srinagar city center',
    heroImage: '/assets/destinations/dal-lake.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Houseboat stay options',
      'Floating vegetable market',
      'Evening shikara rides',
    ],
    attractions: ['Nigeen edge', 'Boulevard Road', 'Floating market', 'Nehru Park'],
  },
  {
    slug: 'gurez',
    name: 'Gurez Valley',
    season: 'Summer',
    tagline: 'Remote mountain beauty away from crowds',
    shortDescription:
      'An offbeat valley known for pristine landscapes and authentic local life.',
    description:
      'Gurez is for travelers who want raw, less-commercial Kashmir. The valley offers a distinct visual character and a strong sense of isolation and calm.',
    bestSeason: 'June to September',
    idealFor: 'Offbeat explorers, photographers, long-stay travelers',
    altitude: '2,400 m',
    travelTime: '6-7 hr from Srinagar',
    heroImage: '/assets/destinations/gurez.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Habba Khatoon viewpoints',
      'Village landscapes and meadows',
      'Clear river valley frames',
    ],
    attractions: ['Dawar', 'Habba Khatoon Peak', 'Kishanganga River', 'Tulail'],
  },
  {
    slug: 'doodhpathri',
    name: 'Doodhpathri',
    season: 'Summer',
    tagline: 'Rolling meadows and crystal streams',
    shortDescription:
      'A refreshing day-trip destination with open grasslands and mountain breeze.',
    description:
      'Doodhpathri is excellent for quick nature escapes from Srinagar. It has broad meadows, picnic spots, and easy scenic walks.',
    bestSeason: 'May to September',
    idealFor: 'Family day trips, relaxed getaways',
    altitude: '2,730 m',
    travelTime: '2 hr from Srinagar',
    heroImage: '/assets/destinations/doodhpathri.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Riverside meadow walks',
      'Picnic-friendly landscapes',
      'Low-effort scenic access',
    ],
    attractions: ['Doodhpathri bowl', 'Tangnar', 'Pine meadows', 'Local streams'],
  },
  {
    slug: 'yusmarg',
    name: 'Yusmarg',
    season: 'Summer',
    tagline: 'Wide alpine meadow known as the meadow of Jesus',
    shortDescription:
      'A quiet green valley with horse trails, stream banks, and forested picnic zones.',
    description:
      'Yusmarg is one of Kashmir\'s most peaceful summer meadows. It is ideal for day tours, slow walks, and low-crowd nature escapes.',
    bestSeason: 'May to September',
    idealFor: 'Families, couples, relaxed nature travelers',
    altitude: '2,396 m',
    travelTime: '1 hr 45 min from Srinagar',
    heroImage: '/assets/destinations/yusmarg.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Open meadow landscapes',
      'Horse ride routes',
      'Forest and stream viewpoints',
    ],
    attractions: ['Nilnag Lake', 'Sang-e-Safed valley', 'Doodh Ganga riverbanks', 'Yusmarg meadows'],
  },
  {
    slug: 'aru-valley',
    name: 'Aru Valley',
    season: 'Summer',
    tagline: 'Pastoral valley and trekking base near Pahalgam',
    shortDescription:
      'A scenic highland village with broad grasslands and summer trekking routes.',
    description:
      'Aru Valley is a top add-on to Pahalgam circuits for travelers who want open mountain views, pony rides, and cool-weather stays.',
    bestSeason: 'May to October',
    idealFor: 'Families, trekkers, photographers',
    altitude: '2,408 m',
    travelTime: '25 min from Pahalgam',
    heroImage: '/assets/destinations/aru-valley.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Meadow-based day outings',
      'Trek starting point access',
      'Summer scenic drives',
    ],
    attractions: ['Aru village', 'Lidder upstream trails', 'Kolahoi access routes', 'Pasture viewpoints'],
  },
  {
    slug: 'betaab-valley',
    name: 'Betaab Valley',
    season: 'Summer',
    tagline: 'Famous cinematic valley with river and pine frames',
    shortDescription:
      'A postcard valley in Pahalgam known for easy access, family views, and riverfront scenery.',
    description:
      'Betaab Valley is among Kashmir\'s most photographed landscapes. It suits soft-adventure stops and short nature sessions during peak summer trips.',
    bestSeason: 'May to October',
    idealFor: 'Families, couples, first-time Kashmir visitors',
    altitude: '2,400 m',
    travelTime: '20 min from Pahalgam',
    heroImage: '/assets/destinations/betaab-valley.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Pine-framed mountain valley views',
      'Family-friendly walk routes',
      'Quick access from Pahalgam',
    ],
    attractions: ['Valley riverside', 'Photo decks', 'Picnic lawns', 'Pahalgam circuit route'],
  },
  {
    slug: 'tulip-garden',
    name: 'Tulip Garden Srinagar',
    season: 'Spring',
    tagline: 'Asia\'s largest tulip garden in full spring bloom',
    shortDescription:
      'A signature spring attraction with colorful floral terraces against Zabarwan hills.',
    description:
      'The Indira Gandhi Memorial Tulip Garden is a peak spring experience in Srinagar and one of the most famous seasonal attractions in Kashmir.',
    bestSeason: 'Late March to April',
    idealFor: 'Spring travelers, families, photographers',
    altitude: '1,730 m',
    travelTime: '20 min from Srinagar city center',
    heroImage: '/assets/destinations/tulip-garden.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Seasonal tulip bloom',
      'Landscape and floral photography',
      'Easy city-side access',
    ],
    attractions: ['Tulip terraces', 'Zabarwan backdrop', 'Boulevard Road', 'Nearby Mughal gardens'],
  },
  {
    slug: 'badamwari',
    name: 'Badamwari',
    season: 'Spring',
    tagline: 'Historic almond blossoms in old Srinagar',
    shortDescription:
      'A spring blossom garden where almond trees turn the slopes into a pink-white canopy.',
    description:
      'Badamwari is a short but high-impact spring stop in Srinagar, ideal for blossom views, photo sessions, and old-city add-on itineraries.',
    bestSeason: 'March to early April',
    idealFor: 'Couples, photographers, spring city tours',
    altitude: '1,620 m',
    travelTime: '20 min from Srinagar city center',
    heroImage: '/assets/destinations/badamwari.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Almond blossom season',
      'Old Srinagar cultural setting',
      'Fast-access spring outing',
    ],
    attractions: ['Badamwari Garden', 'Hari Parbat surroundings', 'Old city lanes', 'View terraces'],
  },
  {
    slug: 'verinag',
    name: 'Verinag',
    season: 'Autumn',
    tagline: 'Historic spring source with chinar-lined symmetry',
    shortDescription:
      'A heritage spring and garden destination known for calm ambience and fall colors.',
    description:
      'Verinag combines Mughal-era water architecture with autumn foliage and a quieter south-Kashmir route experience.',
    bestSeason: 'September to November',
    idealFor: 'Road-trippers, photographers, heritage-focused travelers',
    altitude: '1,876 m',
    travelTime: '2 hr 15 min from Srinagar',
    heroImage: '/assets/destinations/verinag.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Mughal spring architecture',
      'Chinar tones in autumn',
      'Low-crowd scenic environment',
    ],
    attractions: ['Verinag spring', 'Arcade garden', 'Anantnag route viewpoints', 'Nearby villages'],
  },
  {
    slug: 'kokernag',
    name: 'Kokernag',
    season: 'Autumn',
    tagline: 'Botanical gardens, trout streams, and crisp-weather walks',
    shortDescription:
      'A green garden town in south Kashmir that shines in shoulder and autumn seasons.',
    description:
      'Kokernag is known for landscaped gardens and flowing streams, offering a balanced stop for families and scenic-drive itineraries.',
    bestSeason: 'September to November',
    idealFor: 'Families, nature strolls, relaxed itineraries',
    altitude: '2,020 m',
    travelTime: '2 hr 30 min from Srinagar',
    heroImage: '/assets/destinations/kokernag.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Botanical garden landscapes',
      'Streamside walking zones',
      'Pleasant autumn climate',
    ],
    attractions: ['Botanical Garden Kokernag', 'Freshwater channels', 'Anantnag drive circuit', 'Garden viewpoints'],
  },
  {
    slug: 'aharbal',
    name: 'Aharbal Waterfall',
    season: 'Summer',
    tagline: 'The Niagara of Kashmir in full river force',
    shortDescription:
      'A dramatic waterfall destination framed by dense forest and mountain edges.',
    description:
      'Aharbal is one of Kashmir\'s most famous waterfall sites and a strong day-trip option for travelers who want powerful landscape visuals.',
    bestSeason: 'May to October',
    idealFor: 'Nature seekers, photographers, adventure day trips',
    altitude: '2,266 m',
    travelTime: '2 hr 20 min from Srinagar',
    heroImage: '/assets/destinations/aharbal.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'High-volume mountain waterfall',
      'Forest and cliff viewpoints',
      'Popular scenic day trip route',
    ],
    attractions: ['Aharbal Falls viewpoint', 'Veshu River', 'Pine forest stretches', 'Nearby trekking trails'],
  },
  {
    slug: 'vaishno-devi',
    name: 'Vaishno Devi',
    season: 'All Season',
    tagline: 'India’s iconic Himalayan pilgrimage',
    shortDescription:
      'A major spiritual destination accessed via Katra with year-round footfall.',
    description:
      'The Vaishno Devi shrine combines devotion, mountain routes, and robust pilgrimage infrastructure, making it one of the country’s most visited sacred sites.',
    bestSeason: 'Year-round',
    idealFor: 'Pilgrimage, spiritual travel, family groups',
    altitude: '1,585 m (Bhawan route varies)',
    travelTime: 'Base at Katra; trek begins from town',
    heroImage: '/assets/destinations/vaishno-devi.jpg',
    category: 'Sacred Trails',
    highlights: [
      'Sacred cave shrine darshan',
      'Helicopter and trekking access',
      'Full-service pilgrimage base in Katra',
    ],
    attractions: ['Bhawan', 'Ardhkuwari', 'Bhairon Temple', 'Katra base town'],
  },
  {
    slug: 'amarnath',
    name: 'Amarnath',
    season: 'Summer',
    tagline: 'Sacred cave pilgrimage in high Himalayas',
    shortDescription:
      'A seasonal yatra route known for spiritual significance and altitude challenge.',
    description:
      'Amarnath is a high-altitude pilgrimage completed during the yatra window. It requires planning, fitness readiness, and weather-aware scheduling.',
    bestSeason: 'Yatra season (typically summer)',
    idealFor: 'Spiritual travelers with adventure readiness',
    altitude: '3,888 m',
    travelTime: 'Seasonal route via Pahalgam or Baltal',
    heroImage: '/assets/destinations/amarnath.jpg',
    category: 'Sacred Trails',
    highlights: [
      'Holy cave darshan route',
      'High-altitude mountain journey',
      'Guided seasonal operations',
    ],
    attractions: ['Amarnath Cave', 'Baltal route', 'Pahalgam route', 'Panchtarni'],
  },
  {
    slug: 'patnitop',
    name: 'Patnitop',
    season: 'Winter',
    tagline: 'Classic hill station on the Jammu side',
    shortDescription:
      'An easy mountain retreat with viewpoints, pine forests, and winter charm.',
    description:
      'Patnitop is ideal for short breaks, especially for travelers approaching from Jammu. It balances calm weather, viewpoints, and easy local activities.',
    bestSeason: 'Year-round',
    idealFor: 'Families, weekend escapes, road trippers',
    altitude: '2,024 m',
    travelTime: '2.5 hr from Jammu',
    heroImage: '/assets/destinations/patnitop.jpg',
    category: 'Mountain Escapes',
    highlights: [
      'Viewpoint drives and pine trails',
      'Snow scenes in winter',
      'Relaxed family-friendly stays',
    ],
    attractions: ['Nathatop', 'Sanasar', 'Patnitop meadows', 'Skyview zones'],
  },
  {
    slug: 'jammu',
    name: 'Jammu',
    season: 'Winter',
    tagline: 'Gateway city to temples and hills',
    shortDescription:
      'A cultural and logistical hub with historic temples and strong connectivity.',
    description:
      'Jammu works as an anchor city for mixed itineraries combining pilgrimage and leisure. It has excellent onward access to Katra and Kashmir circuits.',
    bestSeason: 'October to March',
    idealFor: 'Culture, temple circuits, transit stays',
    altitude: '327 m',
    travelTime: 'Direct rail and air connectivity',
    heroImage: '/assets/destinations/jammu.jpg',
    category: 'Sacred Trails',
    highlights: [
      'Historic temples and markets',
      'Strong transport connectivity',
      'Good base for multi-stop itineraries',
    ],
    attractions: ['Raghunath Temple', 'Bahu Fort', 'Peer Kho', 'City markets'],
  },
  {
    slug: 'katra',
    name: 'Katra',
    season: 'All Season',
    tagline: 'Pilgrimage base town with mountain views',
    shortDescription:
      'Primary starting point for Vaishno Devi yatra with complete travel facilities.',
    description:
      'Katra is efficient and well structured for pilgrims. It offers hotels, transport support, and route services for a smooth Vaishno Devi journey.',
    bestSeason: 'Year-round',
    idealFor: 'Pilgrims, families, short religious trips',
    altitude: '754 m',
    travelTime: '1 hr from Jammu',
    heroImage: '/assets/destinations/katra.jpg',
    category: 'Sacred Trails',
    highlights: [
      'Yatra logistics and permits',
      'Wide range of stay options',
      'Easy access to shrine route',
    ],
    attractions: ['Banganga', 'Yatra track', 'Market zone', 'Viewpoint decks'],
  },
]

export const destinationMap = destinationList.reduce<Record<string, Destination>>(
  (acc, destination) => {
    acc[destination.slug] = destination
    return acc
  },
  {}
)

export const featuredDestinations = destinationList.filter((destination) =>
  ['srinagar', 'gulmarg', 'pahalgam', 'sonmarg', 'tulip-garden', 'gurez'].includes(
    destination.slug
  )
)
