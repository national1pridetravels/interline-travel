type GoogleReviewEntry = {
  reviewerName: string
  reviewerAvatar: string
  reviewerProfileUrl: string
  publishedAt: string
  rating: number
  reviewText: string
  reviewUrl: string
}

export type GoogleReviewShowcase = {
  averageRating: number
  reviewCount: number
  googleProfileUrl: string
  testimonials: GoogleReviewEntry[]
  mediaImages: string[]
  mediaVideos: string[]
}

const GOOGLE_PROFILE_URL = 'https://share.google/6BfY7KkKb4osS9nRW'
const GOOGLE_MAPS_PLACE_URL = 'https://maps.app.goo.gl/ie72UnW2wjqkn81u8'
const SEARCH_QUERY = 'national pride tour and travel srinagar'
const MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SEARCH_QUERY
)}`

const GOOGLE_REVIEW_FEED_URL =
  'https://www.google.com/maps/preview/review/listentitiesreviews?authuser=0&hl=en&gl=in&pb=!1m2!1y17143214129722784018!2y7527626134537459069!2m2!1i0!2i20!3e1!4m5!3b1!4b1!5b1!6b1!7b1!5m2!1slive!7e81'

const FALLBACK_TESTIMONIALS: GoogleReviewEntry[] = [
  {
    reviewerName: 'Waseem Patni',
    reviewerAvatar:
      'https://lh3.googleusercontent.com/a/ACg8ocIHg7t9hDlHqN86vzstgDBRkR1tuJZNZqk9o_JBvx7nTeZVUg=s120-c-rp-mo-br100',
    reviewerProfileUrl: 'https://www.google.com/maps/contrib/112782486449249443139?hl=en-GB',
    publishedAt: '3 months ago',
    rating: 5,
    reviewText:
      'Excellent service and arrangements. Team members stayed available throughout and took great care of comfort at every step.',
    reviewUrl: GOOGLE_PROFILE_URL,
  },
  {
    reviewerName: 'Tahir Maqbool',
    reviewerAvatar:
      'https://lh3.googleusercontent.com/a/ACg8ocLrTfw0mQmZTfuu3xhraEqCJ7qgQsaG25bMWj-RUrY_QxTsDA=s120-c-rp-mo-br100',
    reviewerProfileUrl: 'https://www.google.com/maps/contrib/105048994661177116959?hl=en-GB',
    publishedAt: 'a month ago',
    rating: 5,
    reviewText: 'Best service in Jammu and Kashmir. Recommended for smooth trip planning.',
    reviewUrl: GOOGLE_PROFILE_URL,
  },
  {
    reviewerName: 'Muntazir Sheikh',
    reviewerAvatar:
      'https://lh3.googleusercontent.com/a/ACg8ocIHt6Vl9-Y5pbPEAIrlKo8Js6F8_Gb8q9UqEkH_JwFfZCJjFQ=s120-c-rp-mo-br100',
    reviewerProfileUrl: 'https://www.google.com/maps/contrib/108154743466297061681?hl=en-GB',
    publishedAt: '9 months ago',
    rating: 5,
    reviewText:
      'Epic Kashmir experience with breathtaking scenery and memorable arrangements. Would definitely recommend.',
    reviewUrl: GOOGLE_PROFILE_URL,
  },
]

const FALLBACK_MEDIA_IMAGES = [
  'https://lh3.googleusercontent.com/geougc/AF1QipNQRKRlFyG88VRq4R8eEqFBjCLbA_lM05vCaJxm=h400-no',
  'https://lh3.googleusercontent.com/gps-cs-s/AHVAweqc9Ucbc3KKF64DSGGzcWGzx3tY-9-h7hpGYxWoM4UPzb6WYPJrKZ0uZmFucFfLQWpUYZjniQDoUxV-vRdB6h7PWPXujhaz36dXYY_C2JkEBnNnm-p1F4KUJplehPY94KXw8v5T2YcnjeMi=w408-h408-k-no',
]

const FALLBACK_SHOWCASE: GoogleReviewShowcase = {
  averageRating: 5,
  reviewCount: 24,
  googleProfileUrl: GOOGLE_PROFILE_URL,
  testimonials: FALLBACK_TESTIMONIALS,
  mediaImages: FALLBACK_MEDIA_IMAGES,
  mediaVideos: [],
}

const FETCH_HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  accept: 'text/html,application/json;q=0.9,*/*;q=0.8',
}

function parseXssiJson(raw: string): unknown[] | null {
  const sanitized = raw.replace(/^\)\]\}'\n?/, '').trim()
  if (!sanitized) return null

  try {
    const parsed = JSON.parse(sanitized)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

function walkStrings(value: unknown, sink: string[]) {
  if (typeof value === 'string') {
    sink.push(value)
    return
  }

  if (Array.isArray(value)) {
    for (const entry of value) walkStrings(entry, sink)
    return
  }

  if (value && typeof value === 'object') {
    for (const entry of Object.values(value)) walkStrings(entry, sink)
  }
}

function unique(values: string[]) {
  return [...new Set(values)]
}

function cleanReviewText(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

function normalizeMediaImage(url: string) {
  let normalized = url.trim()

  if (normalized.includes('w86-h86')) {
    normalized = normalized.replace('w86-h86', 'w1600-h1200')
  }

  if (normalized.endsWith('=h400-no')) {
    normalized = normalized.replace('=h400-no', '=w1600-h1200-k-no')
  }

  return normalized
}

function normalizeEscapedUrl(value: string) {
  return value
    .replace(/\\u0026/g, '&')
    .replace(/\\u003d/g, '=')
    .replace(/\\u003a/g, ':')
    .replace(/\\u002f/g, '/')
    .replace(/\\\\x2f/g, '/')
    .replace(/\\x2f/g, '/')
    .trim()
}

function extractUrlsFromString(value: string) {
  const decoded = normalizeEscapedUrl(value)
  const directMatches = decoded.match(/https:\/\/[^"'<>\\\s)]+/g) ?? []
  const escapedMatches = value.match(/https:\\\/\\\/[^"'<>\\\s)]+/g) ?? []
  return [...directMatches, ...escapedMatches.map(normalizeEscapedUrl)]
}

function decodeRepeated(value: string) {
  let current = value
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const decoded = decodeURIComponent(current)
      if (decoded === current) break
      current = decoded
    } catch {
      break
    }
  }
  return current
}

function extractMediaFromHtml(rawHtml: string) {
  const candidates = unique([
    ...(rawHtml.match(/https:%252F%252F[^\s"'<>!\\]+/g) ?? []),
    ...(rawHtml.match(/https:%2F%2F[^\s"'<>!\\]+/g) ?? []),
    ...(rawHtml.match(/https:\/\/[^\s"'<>\\]+/g) ?? []),
    ...(rawHtml.match(/https:\\\/\\\/[^\s"'<>\\]+/g) ?? []),
    ...(rawHtml.match(/https:\\\\x2f\\\\x2f[^\s"'<>\\]+/g) ?? []),
  ])

  const decodedUrls = unique(
    candidates.map((value) => normalizeEscapedUrl(decodeRepeated(value))).filter((value) =>
      value.startsWith('https://')
    )
  )

  const imageUrls = unique(
    decodedUrls
      .filter((candidate) => candidate.includes('googleusercontent.com'))
      .filter((candidate) => !candidate.includes('/a/'))
      .filter((candidate) => !candidate.includes('/a-/'))
      .filter((candidate) => !candidate.includes('maps.gstatic.com'))
      .map(normalizeMediaImage)
  )

  const videoUrls = unique(
    decodedUrls.filter(
      (candidate) =>
        candidate.includes('googlevideo.com') ||
        candidate.includes('.mp4') ||
        candidate.includes('.webm')
    )
  )

  return { images: imageUrls, videos: videoUrls }
}

function findFirstMatchingString(value: unknown, matcher: (candidate: string) => boolean) {
  const strings: string[] = []
  walkStrings(value, strings)
  return strings.find(matcher)
}

function parseReviewEntries(payload: unknown[] | null): GoogleReviewEntry[] {
  const rows = payload?.[2]
  if (!Array.isArray(rows)) return []

  const reviews: GoogleReviewEntry[] = []

  for (const row of rows) {
    if (!Array.isArray(row)) continue

    const reviewerName = typeof row?.[0]?.[1] === 'string' ? row[0][1].trim() : ''
    const reviewerAvatar = typeof row?.[0]?.[2] === 'string' ? row[0][2].trim() : ''
    const reviewerProfileUrl = typeof row?.[0]?.[0] === 'string' ? row[0][0].trim() : ''
    const publishedAt = typeof row?.[1] === 'string' ? row[1].trim() : ''
    const reviewText = typeof row?.[3] === 'string' ? cleanReviewText(row[3]) : ''
    const rating = Number(row?.[4] || 0)
    const reviewUrl =
      findFirstMatchingString(
        row,
        (candidate) =>
          candidate.startsWith('https://www.google.com/maps/reviews/data=') ||
          candidate.startsWith('https://www.google.com/maps/reviews/data\\u003d')
      ) || GOOGLE_PROFILE_URL

    if (!reviewerName || !reviewText || !Number.isFinite(rating) || rating <= 0) continue

    reviews.push({
      reviewerName,
      reviewerAvatar,
      reviewerProfileUrl,
      publishedAt,
      rating: Math.min(5, Math.max(1, Math.round(rating))),
      reviewText,
      reviewUrl: reviewUrl.replace(/\\u003d/g, '='),
    })
  }

  return reviews
}

function extractMedia(payload: unknown[] | null) {
  if (!payload) return { images: [] as string[], videos: [] as string[] }

  const strings: string[] = []
  walkStrings(payload, strings)

  const allUrls = unique(
    strings.flatMap((candidate) => {
      if (candidate.startsWith('https://')) return [candidate]
      return extractUrlsFromString(candidate)
    })
  )

  const imageUrls = unique(
    allUrls
      .filter((candidate) => candidate.includes('googleusercontent.com'))
      .filter((candidate) => !candidate.includes('/a/'))
      .filter((candidate) => !candidate.includes('/a-/'))
      .filter((candidate) => !candidate.includes('s40-c-k-mo/photo.jpg'))
      .filter((candidate) => !candidate.includes('s44-p-k-no-ns-nd/photo.jpg'))
      .filter((candidate) => !candidate.includes('maps.gstatic.com'))
      .filter((candidate) => !candidate.includes('/maps/'))
      .map(normalizeMediaImage)
  )

  const videoUrls = unique(
    allUrls.filter(
      (candidate) =>
        candidate.includes('googlevideo.com') ||
        candidate.includes('.mp4') ||
        candidate.includes('.webm')
    )
  )

  return { images: imageUrls, videos: videoUrls }
}

async function fetchText(url: string) {
  const response = await fetch(url, {
    headers: FETCH_HEADERS,
    next: { revalidate: 60 * 60 * 6 },
  })

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`)
  }

  return response.text()
}

async function fetchRichMapsPayload() {
  const html = await fetchText(MAPS_SEARCH_URL)
  const linkMatch = html.match(/<link href="([^"]*tbm=map[^"]*)" as="fetch"/)
  if (!linkMatch?.[1]) return null

  const richUrl = `https://www.google.com${linkMatch[1].replace(/&amp;/g, '&')}`
  const richRaw = await fetchText(richUrl)
  return parseXssiJson(richRaw)
}

export async function getGoogleReviewShowcase(): Promise<GoogleReviewShowcase> {
  try {
    const [reviewRaw, richPayload, placeHtml] = await Promise.all([
      fetchText(GOOGLE_REVIEW_FEED_URL),
      fetchRichMapsPayload(),
      fetchText(GOOGLE_MAPS_PLACE_URL),
    ])

    const reviewPayload = parseXssiJson(reviewRaw)
    const testimonials = parseReviewEntries(reviewPayload)
    const reviewMedia = extractMedia(reviewPayload)
    const richMedia = extractMedia(richPayload)
    const placeMedia = extractMediaFromHtml(placeHtml)

    const mediaImages = unique([
      ...placeMedia.images,
      ...richMedia.images,
      ...reviewMedia.images,
      ...FALLBACK_MEDIA_IMAGES,
    ])
    const mediaVideos = unique([...placeMedia.videos, ...richMedia.videos, ...reviewMedia.videos])

    const activeTestimonials =
      testimonials.length > 0 ? testimonials.slice(0, 9) : FALLBACK_TESTIMONIALS

    const averageRating =
      activeTestimonials.length > 0
        ? Number(
            (
              activeTestimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) /
              activeTestimonials.length
            ).toFixed(1)
          )
        : FALLBACK_SHOWCASE.averageRating

    return {
      averageRating,
      reviewCount: testimonials.length || FALLBACK_SHOWCASE.reviewCount,
      googleProfileUrl: GOOGLE_PROFILE_URL,
      testimonials: activeTestimonials,
      mediaImages: mediaImages.length ? mediaImages : FALLBACK_SHOWCASE.mediaImages,
      mediaVideos,
    }
  } catch {
    return FALLBACK_SHOWCASE
  }
}
