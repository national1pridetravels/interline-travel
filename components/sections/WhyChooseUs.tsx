import { FiAward, FiUsers, FiMapPin, FiHeadphones } from 'react-icons/fi'

const features = [
  {
    icon: FiAward,
    title: 'Expert Guidance',
    description: 'Professional tour guides with deep local knowledge'
  },
  {
    icon: FiUsers,
    title: 'Customer First',
    description: '5000+ happy travelers and counting'
  },
  {
    icon: FiMapPin,
    title: 'Best Destinations',
    description: 'Curated experiences at hidden gems'
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    description: 'We are here whenever you need us'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="section-space">
      <div className="section-wrap">
        <div className="section-header-center mb-12">
          <p className="chip-3d mb-4">Why Choose Us</p>
          <h2 className="section-title">Your trusted partner for unforgettable Kashmir experiences</h2>
          <p className="section-copy mx-auto">
            The travel details stay the same. The presentation is now aligned to the same polished
            surface-driven UI system used on the reference site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="surface-3d text-center rounded-[2rem] p-8"
            >
              <div className="icon-orb-3d icon-orb-3d-round mx-auto mb-6 flex h-20 w-20 items-center justify-center shadow-lg">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
