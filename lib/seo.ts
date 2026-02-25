export const siteName = 'National Pride Travels'
export const siteTitle = 'National Pride Travels | Kashmir Tour and Travel Agency'
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://www.nationalpridetravels.com'

export const defaultDescription =
  'National Pride Travels is a registered Kashmir tour and travel agency offering season-wise Kashmir tour packages, private cab plans, hotel bookings, and 24/7 local support.'

export const defaultKeywords = [
  'kashmir tour and travel',
  'kashmir tour packages',
  'best kashmir tour operator',
  'kashmir travel agency',
  'srinagar gulmarg pahalgam tour package',
  'kashmir honeymoon package',
  'kashmir family tour package',
  'kashmir holiday package',
  'tour and travel in kashmir',
  'national pride travels',
]

export const socialProfiles = [
  'https://www.instagram.com/nationalpridetravels?igsh=MWRlNXJ6dGc2YmkzMw%3D%3D',
  'https://www.facebook.com/people/National-pride-travels/61575932940744/?rdid=HCDE53Fqt4Tb5pk9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16j6yFxmq8%2F',
  'https://share.google/wTGk0mGec3I2toC5W',
]

export function absoluteUrl(path = '/') {
  if (!path.startsWith('/')) {
    return `${siteUrl}/${path}`
  }
  return `${siteUrl}${path}`
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: siteName,
  legalName: 'National Pride Tour and Travel',
  url: siteUrl,
  image: absoluteUrl('/images/logo.png'),
  telephone: '+91-9906469903',
  email: 'info@nationalpridetravels.com',
  sameAs: socialProfiles,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Machowa Baghi Mehtab',
    addressLocality: 'Srinagar',
    addressRegion: 'Jammu and Kashmir',
    postalCode: '190015',
    addressCountry: 'IN',
  },
  areaServed: 'Kashmir, India',
  openingHours: 'Mo-Su 00:00-23:59',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: '+91-9906469903',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'WhatsApp support',
      telephone: '+91-9906469903',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  ],
}
