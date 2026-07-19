import { Sparkles, Search, ShoppingCart, BarChart3, Shield, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card/Card'

const features = [
  {
    icon: Sparkles,
    title: 'AI Content Generation',
    description: 'Generate SEO titles, meta descriptions, blog intros, and content outlines in seconds.',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Built-in tools to optimize your content for search engines and improve rankings.',
    color: '#2563EB',
    bg: '#EFF6FF',
  },
  {
    icon: ShoppingCart,
    title: 'Digital Product Sales',
    description: 'Sell downloads, templates, and digital products with integrated payment processing.',
    color: '#059669',
    bg: '#ECFDF5',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track performance, monitor engagement, and understand your audience.',
    color: '#D97706',
    bg: '#FFFBEB',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption and role-based access control.',
    color: '#DC2626',
    bg: '#FEF2F2',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with edge caching and server-side rendering.',
    color: '#A165DB',
    bg: '#FFF7ED',
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-text-secondary">
            Powerful tools designed for modern content creators and businesses.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <Card key={title} hover className="group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: bg }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
