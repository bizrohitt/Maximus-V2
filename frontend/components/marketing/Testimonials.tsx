import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Content Strategist',
    content: 'Maximus has completely transformed our content workflow. The AI tools save us hours every week.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'SEO Consultant',
    content: 'The SEO optimization features are incredibly powerful. Our organic traffic increased by 40% in just two months.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Digital Product Creator',
    content: 'Selling digital products has never been easier. The integrated checkout and analytics are top-notch.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Loved by creators worldwide
          </h2>
          <p className="text-lg text-text-secondary">
            See what our users have to say about Maximus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, content, rating }) => (
            <div
              key={name}
              className="p-6 rounded-2xl border border-border bg-primary"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#FBBF24" className="text-yellow-400" />
                ))}
              </div>
              <p className="text-text-secondary mb-6 leading-relaxed">&ldquo;{content}&rdquo;</p>
              <div>
                <div className="font-semibold text-text-primary">{name}</div>
                <div className="text-sm text-text-muted">{role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
