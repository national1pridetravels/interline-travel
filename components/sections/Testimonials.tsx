import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    rating: 5,
    text: 'Amazing experience! The team took care of everything. Kashmir is truly paradise on earth.',
  },
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
    text: 'Best honeymoon package ever! Beautiful destinations and wonderful hospitality.',
  },
  {
    name: 'Amit Patel',
    location: 'Ahmedabad',
    rating: 5,
    text: 'Professional service and great value for money. Highly recommended for family trips.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="section-wrap">
        <div className="text-center mb-16">
          <h2 className="headline-main font-semibold mb-3">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-slate-600">
            Real experiences from real customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={`${testimonial.name}-${testimonial.location}`}
              className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_14px_34px_rgba(15,35,58,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,35,58,0.2)]"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-6 italic leading-relaxed text-slate-700">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
