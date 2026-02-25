import Image from 'next/image'
import Link from 'next/link'

const activities = [
  {
    id: 1,
    slug: 'skiing',
    title: 'Skiing and Snowboarding',
    location: 'Gulmarg',
    image: '/assets/activities/skiing-snowboarding.jpg',
    detail: 'Snow slopes with professional-friendly winter routes.',
  },
  {
    id: 2,
    slug: 'dal-lake',
    title: 'Shikara Ride',
    location: 'Dal Lake',
    image: '/assets/activities/shikara-ride.jpg',
    detail: 'Classic lake cruises through floating gardens and markets.',
  },
  {
    id: 3,
    slug: 'trekking',
    title: 'Trekking and Hiking',
    location: 'Sonmarg',
    image: '/assets/activities/trekking-hiking.jpg',
    detail: 'Guided alpine trails with glacier viewpoints.',
  },
  {
    id: 4,
    slug: 'rafting',
    title: 'River Adventure',
    location: 'Lidder Valley',
    image: '/assets/activities/river-rafting.jpg',
    detail: 'Fast-flowing mountain waters and scenic riverbanks.',
  },
  {
    id: 5,
    slug: 'gulmarg',
    title: 'Cable Car Ride',
    location: 'Gulmarg Gondola',
    image: '/assets/activities/cable-car-ride.jpg',
    detail: 'Panoramic gondola ascent to Kashmir’s high-altitude ridges.',
  },
]

export default function AdventureActivities() {
  return (
    <section className="py-20">
      <div className="section-wrap">
        <div className="text-center mb-12">
          <h2 className="headline-main font-semibold mb-3">
            Beyond the Blue
          </h2>
          <p className="text-lg text-slate-600">
            Signature activities with real landscapes and curated support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={activity.slug === 'dal-lake' || activity.slug === 'gulmarg' ? `/destinations/${activity.slug}` : `/packages/${activity.slug}`}
              className="group relative h-[360px] cursor-pointer overflow-hidden rounded-[28px] border border-white/70 bg-white/70 shadow-[0_16px_40px_rgba(15,35,58,0.16)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(15,35,58,0.2)]"
            >
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-900">
                {activity.location}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="mb-2 text-xl font-semibold">{activity.title}</h3>
                <p className="text-sm text-slate-100/90">{activity.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
