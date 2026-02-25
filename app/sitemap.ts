import type { MetadataRoute } from 'next'
import { getDestinations, getPackages } from '@/lib/content/store'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: absoluteUrl('/packages'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: absoluteUrl('/destinations'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ]

  const [destinations, packages] = await Promise.all([
    getDestinations().catch(() => []),
    getPackages().catch(() => []),
  ])

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: absoluteUrl(`/destinations/${destination.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: absoluteUrl(`/packages/${pkg.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticRoutes, ...destinationRoutes, ...packageRoutes]
}
