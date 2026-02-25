import { NextResponse } from 'next/server'
import { getDestinations, getPackages, type PackageItem } from '@/lib/content/store'
import type { Destination } from '@/lib/destinations'

type ChatSuggestion = {
  label: string
  href: string
}

type ChatResponse = {
  reply: string
  suggestions?: ChatSuggestion[]
}

type ChatHistoryMessage = {
  role?: 'user' | 'bot'
  text?: string
}

type SeasonKey = 'winter' | 'spring' | 'summer' | 'autumn' | 'all-season'
type ThemeKey = 'honeymoon' | 'family' | 'adventure' | 'group' | 'trekking'

const supportPhoneText = '+91-9906469903'
const supportPhoneHref = 'tel:+919906469903'

const seasonAliases: Record<SeasonKey, string[]> = {
  winter: ['winter', 'snow', 'december', 'january', 'february'],
  spring: ['spring', 'march', 'april', 'blossom', 'tulip'],
  summer: ['summer', 'may', 'june', 'july', 'august'],
  autumn: ['autumn', 'fall', 'september', 'october', 'november', 'chinar'],
  'all-season': ['all season', 'all-season', 'any season'],
}

const seasonLabel: Record<SeasonKey, string> = {
  winter: 'Winter',
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Autumn',
  'all-season': 'All Season',
}

const themeKeywords: Record<ThemeKey, string[]> = {
  honeymoon: ['honeymoon', 'romantic', 'couple', 'newlywed'],
  family: ['family', 'kids', 'child', 'parents'],
  adventure: ['adventure', 'thrill', 'activity', 'rafting', 'skiing'],
  group: ['group', 'friends', 'corporate', 'team'],
  trekking: ['trek', 'trekking', 'hike', 'mountain trail'],
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function hasPhrase(text: string, phrase: string) {
  const normalizedPhrase = normalizeText(phrase)
  if (!normalizedPhrase) {
    return false
  }
  return ` ${text} `.includes(` ${normalizedPhrase} `)
}

function includesAny(text: string, candidates: string[]) {
  return candidates.some((candidate) => hasPhrase(text, candidate) || text.includes(normalizeText(candidate)))
}

function tokenizeQuery(value: string) {
  return normalizeText(value)
    .split(' ')
    .map((part) => part.trim())
    .filter((part) => part.length > 2)
}

function normalizeSeasonTag(value: string) {
  return normalizeText(value).replace(/\s+/g, '-')
}

function parsePriceValue(priceFrom: string) {
  const numeric = Number(priceFrom.replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return Number.MAX_SAFE_INTEGER
  }
  return numeric
}

function isAllSeasonPackage(entry: PackageItem) {
  const season = normalizeSeasonTag(entry.season || '')
  const tags = entry.tags.map((tag) => normalizeSeasonTag(tag))
  return season === 'all-season' || tags.includes('all-season')
}

function matchesSeason(entry: PackageItem, season: SeasonKey) {
  if (season === 'all-season') {
    return true
  }

  const seasonTag = normalizeSeasonTag(entry.season || '')
  const tags = entry.tags.map((tag) => normalizeSeasonTag(tag))

  return seasonTag === season || tags.includes(season) || isAllSeasonPackage(entry)
}

function detectSeason(message: string): SeasonKey | null {
  for (const [season, words] of Object.entries(seasonAliases) as [SeasonKey, string[]][]) {
    if (words.some((word) => hasPhrase(message, word))) {
      return season
    }
  }
  return null
}

function detectTheme(message: string): ThemeKey | null {
  for (const [theme, words] of Object.entries(themeKeywords) as [ThemeKey, string[]][]) {
    if (words.some((word) => hasPhrase(message, word) || message.includes(word))) {
      return theme
    }
  }
  return null
}

function findDestination(message: string, destinations: Destination[]) {
  let best: { destination: Destination; score: number } | null = null

  for (const destination of destinations) {
    const normalizedName = normalizeText(destination.name)
    const normalizedSlug = normalizeText(destination.slug.replace(/-/g, ' '))
    let score = 0

    if (hasPhrase(message, normalizedName)) {
      score += 8
    }

    if (hasPhrase(message, normalizedSlug)) {
      score += 6
    }

    const nameTokens = normalizedName.split(' ').filter((token) => token.length >= 4)
    for (const token of nameTokens) {
      if (hasPhrase(message, token)) {
        score += 1
      }
    }

    if (!best || score > best.score) {
      best = { destination, score }
    }
  }

  if (!best || best.score < 2) {
    return null
  }

  return best.destination
}

function matchesTheme(entry: PackageItem, theme: ThemeKey) {
  const corpus = normalizeText(
    `${entry.title} ${entry.summary} ${entry.idealFor} ${entry.tags.join(' ')}`
  )
  const words = themeKeywords[theme]
  return words.some((word) => hasPhrase(corpus, word) || corpus.includes(word))
}

function dedupePackages(packages: PackageItem[]) {
  const seen = new Set<string>()
  const list: PackageItem[] = []

  for (const entry of packages) {
    if (seen.has(entry.slug)) {
      continue
    }
    seen.add(entry.slug)
    list.push(entry)
  }

  return list
}

function dedupeSuggestions(suggestions: ChatSuggestion[]) {
  const seen = new Set<string>()
  return suggestions.filter((suggestion) => {
    if (seen.has(suggestion.href)) {
      return false
    }
    seen.add(suggestion.href)
    return true
  })
}

function sortByPrice(packages: PackageItem[], direction: 'asc' | 'desc' = 'asc') {
  const sorted = [...packages].sort((a, b) => {
    const delta = parsePriceValue(a.priceFrom) - parsePriceValue(b.priceFrom)
    if (delta !== 0) {
      return direction === 'asc' ? delta : -delta
    }
    return a.title.localeCompare(b.title)
  })

  return sorted
}

function formatPackageLines(packages: PackageItem[], limit = 3) {
  return packages
    .slice(0, limit)
    .map(
      (entry, index) =>
        `${index + 1}. ${entry.title} | ${entry.duration} | From ${entry.priceFrom}`
    )
    .join('\n')
}

function packageSuggestions(packages: PackageItem[], limit = 3) {
  return packages.slice(0, limit).map((entry) => ({
    label: entry.title,
    href: `/packages/${entry.slug}`,
  }))
}

function destinationSuggestions(destinations: Destination[], limit = 2) {
  return destinations.slice(0, limit).map((entry) => ({
    label: entry.name,
    href: `/destinations/${entry.slug}`,
  }))
}

function destinationPackages(packages: PackageItem[], destination: Destination) {
  const destinationName = normalizeText(destination.name)
  const destinationSlug = normalizeText(destination.slug.replace(/-/g, ' '))

  return dedupePackages(
    packages.filter((entry) => {
      const corpus = normalizeText(
        `${entry.title} ${entry.slug.replace(/-/g, ' ')} ${entry.summary} ${entry.tags.join(' ')}`
      )
      return (
        hasPhrase(corpus, destinationName) ||
        hasPhrase(corpus, destinationSlug) ||
        hasPhrase(corpus, normalizeSeasonTag(destination.season))
      )
    })
  )
}

function scorePackages(
  packages: PackageItem[],
  query: string,
  destination: Destination | null,
  season: SeasonKey | null,
  theme: ThemeKey | null
) {
  const terms = tokenizeQuery(query)

  const scored = packages.map((entry) => {
    const corpus = normalizeText(
      `${entry.title} ${entry.slug.replace(/-/g, ' ')} ${entry.summary} ${entry.idealFor} ${entry.tags.join(
        ' '
      )} ${entry.season || ''}`
    )
    let score = 0

    for (const term of terms) {
      if (hasPhrase(corpus, term) || corpus.includes(term)) {
        score += 1
      }
    }

    if (destination) {
      const destinationName = normalizeText(destination.name)
      const destinationSlug = normalizeText(destination.slug.replace(/-/g, ' '))
      if (hasPhrase(corpus, destinationName) || hasPhrase(corpus, destinationSlug)) {
        score += 6
      }
    }

    if (season && matchesSeason(entry, season)) {
      score += 4
    }

    if (theme && matchesTheme(entry, theme)) {
      score += 5
    }

    return { entry, score }
  })

  const filtered = scored.filter((item) => item.score > 0)
  filtered.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }
    return parsePriceValue(a.entry.priceFrom) - parsePriceValue(b.entry.priceFrom)
  })

  return filtered.map((item) => item.entry)
}

function inferContextualMessage(message: string, history: ChatHistoryMessage[]) {
  const normalized = normalizeText(message)
  const followUp = ['price', 'pricing', 'cost', 'budget', 'package', 'packages', 'plan', 'itinerary']
  const isShortFollowUp = tokenizeQuery(normalized).length <= 3 && includesAny(normalized, followUp)

  if (!isShortFollowUp || history.length === 0) {
    return message
  }

  const previousUser = [...history]
    .reverse()
    .find(
      (item) => item.role === 'user' && item.text && normalizeText(item.text) !== normalized
    )

  if (!previousUser?.text) {
    return message
  }

  return `${previousUser.text} ${message}`
}

function safeHistory(payloadHistory: unknown) {
  if (!Array.isArray(payloadHistory)) {
    return []
  }

  return payloadHistory
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null
      }
      const role = 'role' in item ? item.role : undefined
      const text = 'text' in item ? item.text : undefined

      if ((role !== 'user' && role !== 'bot') || typeof text !== 'string') {
        return null
      }

      return {
        role,
        text: text.trim(),
      } as ChatHistoryMessage
    })
    .filter((entry): entry is ChatHistoryMessage => {
      if (!entry) {
        return false
      }

      return typeof entry.text === 'string' && entry.text.length > 0
    })
    .slice(-8)
}

async function buildChatResponse(rawMessage: string, history: ChatHistoryMessage[]): Promise<ChatResponse> {
  const [destinations, packages] = await Promise.all([getDestinations(), getPackages()])
  const contextualMessage = inferContextualMessage(rawMessage, history)
  const message = normalizeText(contextualMessage)

  const season = detectSeason(message)
  const theme = detectTheme(message)
  const destination = findDestination(message, destinations)

  const wantsPricing = includesAny(message, [
    'price',
    'pricing',
    'cost',
    'budget',
    'rate',
    'charges',
  ])
  const wantsPackages = includesAny(message, [
    'package',
    'packages',
    'tour',
    'itinerary',
    'trip',
    'plan',
  ])
  const wantsContact = includesAny(message, ['expert', 'agent', 'talk', 'call', 'contact'])
  const wantsRegistration = includesAny(message, ['registration', 'gst', 'jkae00005259', 'tax'])
  const wantsGreeting = includesAny(message, ['hello', 'hi', 'hey', 'namaste'])
  const wantsLowBudget = includesAny(message, ['budget', 'cheap', 'affordable', 'low'])
  const wantsLuxury = includesAny(message, ['luxury', 'premium', 'best'])

  if (wantsRegistration) {
    return {
      reply:
        'National Pride Travels registration details:\nDepartment of Tourism Reg No: JKAE00005259\nGSTN: 01AOZPH8135A1Z4A',
      suggestions: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    }
  }

  if (destination) {
    let matching = destinationPackages(packages, destination)

    if (theme) {
      matching = matching.filter((entry) => matchesTheme(entry, theme))
    }
    if (season) {
      matching = matching.filter((entry) => matchesSeason(entry, season))
    }
    if (matching.length === 0) {
      matching = scorePackages(packages, message, destination, season, theme).slice(0, 4)
    }

    const topMatches = dedupePackages(matching)
    const reply =
      topMatches.length > 0
        ? `${destination.name}: ${destination.tagline}\nBest season: ${destination.bestSeason}\nTop matching packages with prices:\n${formatPackageLines(
            topMatches,
            4
          )}`
        : `${destination.name}: ${destination.tagline}\nBest season: ${destination.bestSeason}\nI can prepare a custom quote based on your dates and hotel preference.`

    return {
      reply,
      suggestions: dedupeSuggestions([
        { label: `${destination.name} Guide`, href: `/destinations/${destination.slug}` },
        ...packageSuggestions(topMatches, 2),
        { label: 'Book This Trip', href: '/booking' },
      ]),
    }
  }

  if (theme) {
    let matching = packages.filter((entry) => matchesTheme(entry, theme))
    if (season) {
      matching = matching.filter((entry) => matchesSeason(entry, season))
    }
    if (matching.length === 0) {
      matching = scorePackages(packages, message, null, season, theme).slice(0, 5)
    }

    const sorted = sortByPrice(dedupePackages(matching)).slice(0, 5)
    const label = theme.charAt(0).toUpperCase() + theme.slice(1)
    const focusDestinations = destinations.filter((entry) =>
      includesAny(normalizeText(entry.idealFor), themeKeywords[theme])
    )

    const destinationLine =
      focusDestinations.length > 0
        ? `\nRecommended destinations: ${focusDestinations
            .slice(0, 3)
            .map((entry) => entry.name)
            .join(', ')}`
        : ''

    const reply =
      sorted.length > 0
        ? `Top ${label} options from our website:\n${formatPackageLines(
            sorted,
            4
          )}${destinationLine}`
        : `I can create a ${label.toLowerCase()} itinerary for your dates. Share month, travelers, and budget for an exact proposal.`

    return {
      reply,
      suggestions: dedupeSuggestions([
        { label: `${label} Packages`, href: `/packages?type=${theme}` },
        ...packageSuggestions(sorted, 2),
        ...destinationSuggestions(focusDestinations, 1),
        { label: 'Custom Quote', href: '/booking' },
      ]),
    }
  }

  if (season) {
    const seasonalPackages = sortByPrice(
      dedupePackages(packages.filter((entry) => matchesSeason(entry, season)))
    )

    const seasonalDestinations = destinations.filter((entry) => {
      const destinationSeason = normalizeSeasonTag(entry.season)
      return destinationSeason === season || destinationSeason === 'all-season'
    })

    const reply =
      seasonalPackages.length > 0
        ? `${seasonLabel[season]} travel in Kashmir:\nTop destinations: ${seasonalDestinations
            .slice(0, 4)
            .map((entry) => entry.name)
            .join(', ')}\nAvailable packages with current starting price:\n${formatPackageLines(
            seasonalPackages,
            4
          )}`
        : `${seasonLabel[season]} is a great time for Kashmir. Share travelers and dates for a custom package with current hotel rates.`

    return {
      reply,
      suggestions: dedupeSuggestions([
        { label: `${seasonLabel[season]} Packages`, href: `/packages?type=${season}` },
        ...packageSuggestions(seasonalPackages, 2),
        ...destinationSuggestions(seasonalDestinations, 2),
      ]),
    }
  }

  if (wantsPricing || wantsPackages) {
    const ranked = dedupePackages(scorePackages(packages, message, null, null, null))
    const pool = ranked.length > 0 ? ranked : packages
    const sorted = sortByPrice(pool, wantsLuxury ? 'desc' : 'asc')
    const selected = sorted.slice(0, 5)

    return {
      reply: `Here are current package options from our website:\n${formatPackageLines(
        selected,
        4
      )}`,
      suggestions: dedupeSuggestions([
        { label: 'All Packages', href: '/packages' },
        ...packageSuggestions(selected, 3),
        { label: 'Request Exact Quote', href: '/booking' },
      ]),
    }
  }

  if (wantsContact) {
    return {
      reply: `You can connect with our travel expert at ${supportPhoneText}.\nOr share destination + dates here and I will suggest exact packages with price.`,
      suggestions: [
        { label: 'Call Now', href: supportPhoneHref },
        { label: 'Contact Page', href: '/contact' },
        { label: 'Book Consultation', href: '/booking' },
      ],
    }
  }

  if (wantsGreeting) {
    return {
      reply:
        'Hello. Ask for honeymoon, family, seasonal, destination-wise, or budget packages. I will show actual packages and current starting prices from this website.',
      suggestions: [
        { label: 'Honeymoon With Price', href: '/packages?type=honeymoon' },
        { label: 'Winter Packages', href: '/packages?type=winter' },
        { label: 'All Destinations', href: '/destinations' },
      ],
    }
  }

  const fallbackPackages = scorePackages(packages, message, null, null, null).slice(0, 4)
  if (fallbackPackages.length > 0) {
    return {
      reply: `I found these relevant package options:\n${formatPackageLines(fallbackPackages, 4)}`,
      suggestions: dedupeSuggestions([
        ...packageSuggestions(fallbackPackages, 3),
        { label: 'View All Packages', href: '/packages' },
      ]),
    }
  }

  return {
    reply:
      'Share your destination, travel month, number of travelers, and budget range. I will return exact matching packages with current starting prices.',
    suggestions: [
      { label: 'All Destinations', href: '/destinations' },
      { label: 'Packages By Season', href: '/packages' },
      { label: 'Call Support', href: supportPhoneHref },
    ],
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { message?: string; history?: unknown }
    const message = (payload.message || '').trim()
    const history = safeHistory(payload.history)

    if (!message) {
      return NextResponse.json(
        {
          reply:
            'Please type your query. Example: "Honeymoon package with price", "Winter packages", or "Gulmarg tour cost".',
          suggestions: [
            { label: 'Honeymoon Packages', href: '/packages?type=honeymoon' },
            { label: 'Season Packages', href: '/packages' },
            { label: 'Destinations', href: '/destinations' },
          ],
          source: 'nationalpride',
        },
        { status: 200 }
      )
    }

    const response = await buildChatResponse(message, history)
    return NextResponse.json(
      {
        ...response,
        source: 'nationalpride',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Chatbot failed:', error)
    return NextResponse.json(
      {
        reply:
          'I am temporarily unavailable. Please call +91-9906469903 and our team will assist immediately.',
        suggestions: [{ label: 'Contact Us', href: '/contact' }],
        source: 'nationalpride',
      },
      { status: 200 }
    )
  }
}
