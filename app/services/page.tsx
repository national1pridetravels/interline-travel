import { FiStar, FiClock, FiMapPin } from 'react-icons/fi'

const activities = [
  {
    id: 1,
    title: 'Shikara Ride',
    location: 'Ghat 17, Hotel Pride Continental, Boulevard Road, Rainawari, Srinagar',
    price: 770,
    duration: '1 hour',
    rating: 5,
    reviews: 6,
    featured: true,
  },
  {
    id: 2,
    title: 'Gulmarg Gondola Ride Phase-1',
    location: 'Gulmarg',
    price: 2100,
    duration: null,
    rating: 5,
    reviews: 1,
    featured: false,
  },
  {
    id: 3,
    title: 'ATV Ride in Gulmarg',
    location: 'Gulmarg',
    price: 1000,
    duration: '15 mins',
    rating: 5,
    reviews: 1,
    featured: false,
  },
  {
    id: 4,
    title: 'Kashmir Heritage Tour',
    location: 'Srinagar, Jammu and Kashmir',
    price: 2500,
    duration: '7hr+',
    rating: 5,
    reviews: 5,
    featured: false,
  },
  {
    id: 5,
    title: 'Camping',
    location: 'Naranaag, Kangan',
    price: 1000,
    originalPrice: 1200,
    duration: null,
    rating: 5,
    reviews: 5,
    featured: false,
    discount: 200,
  },
  {
    id: 6,
    title: 'Pony ride in Kashmir',
    location: 'Pahalgam, Jammu and Kashmir',
    price: 3700,
    duration: '2 hours',
    rating: 5,
    reviews: 5,
    featured: false,
  },
  {
    id: 7,
    title: 'Great Lakes Trek',
    location: 'Sonamarg, Jammu and Kashmir',
    price: 16000,
    duration: null,
    rating: 5,
    reviews: 4,
    featured: false,
  },
  {
    id: 8,
    title: 'Ski Course',
    location: 'Highlands Park, Gulmarg',
    price: 3700,
    duration: '7 Hours',
    rating: 5,
    reviews: 6,
    featured: false,
  },
  {
    id: 9,
    title: 'Hot Air Balloon',
    location: 'Zabarwan Park, Srinagar',
    price: 1500,
    duration: null,
    rating: 5,
    reviews: 5,
    featured: false,
  },
  {
    id: 10,
    title: 'Paragliding',
    location: 'Astanmarg, Jammu and Kashmir',
    price: 4000,
    duration: '3 hr',
    rating: 5,
    reviews: 5,
    featured: false,
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Activities in Kashmir
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Experience the best of Kashmir with our curated adventure activities and tours
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">{activities.length} activities found</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Activity Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500">
                  {activity.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold p-6 text-center">
                    {activity.title}
                  </div>
                </div>

                {/* Activity Details */}
                <div className="p-6">
                  <div className="flex items-start gap-2 text-gray-500 text-sm mb-3">
                    <FiMapPin className="mt-1 flex-shrink-0" size={16} />
                    <span className="line-clamp-2">{activity.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {activity.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="font-semibold text-gray-900">{activity.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({activity.reviews} Reviews)</span>
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      {activity.discount && (
                        <p className="text-sm text-gray-400 line-through">
                          ₹{activity.originalPrice?.toLocaleString()}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mb-1">From</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{activity.price.toLocaleString()}
                      </p>
                    </div>
                    {activity.duration && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FiClock size={16} />
                        <span>{activity.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Other Services in Kashmir
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Cab Services</h3>
              <ul className="space-y-3 text-gray-600">
                <li>Etios Cab Service</li>
                <li>Swift Dzire Cab Service</li>
                <li>Innova Cab Service</li>
                <li>Innova Crysta Service</li>
                <li>Tavera Cab Service</li>
                <li>Fortuner Cab Service</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Bike Rental</h3>
              <ul className="space-y-3 text-gray-600">
                <li>Royal Enfield 350 Classic</li>
                <li>Royal Enfield 500</li>
                <li>Royal Enfield Himalayan</li>
                <li>Scooty on rent</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Activities</h3>
              <ul className="space-y-3 text-gray-600">
                <li>Shikara Booking</li>
                <li>Hot Air Balloon</li>
                <li>Gulmarg Ski Packages</li>
                <li>ATV Ride</li>
                <li>Paragliding</li>
                <li>Great Lakes Trek</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
