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
    <section className="py-20">
      <div className="section-wrap">
        <div className="text-center mb-16">
          <h2 className="headline-main font-semibold mb-3">
            Why Choose Us
          </h2>
          <p className="text-lg text-slate-600">
            Your trusted partner for unforgettable Kashmir experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_14px_34px_rgba(15,35,58,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,35,58,0.2)]"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 shadow-lg">
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
