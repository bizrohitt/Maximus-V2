import Link from 'next/link'
import {
  ArrowRight, Sparkles, Search, FileText, ShoppingCart,
  BarChart3, Shield, Zap, Star,
} from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { Card } from '@/components/ui/Card/Card'
import { Hero } from '@/components/marketing/Hero'
import { QuickActions } from '@/components/marketing/QuickActions'
import { LogoTicker } from '@/components/marketing/LogoTicker'
import { BuiltForCreators } from '@/components/marketing/BuiltForCreators'
import { EmailCTA } from '@/components/marketing/EmailCTA'
import { FAQ } from '@/components/marketing/FAQ'

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

const steps = [
  {
    step: '01',
    title: 'Browse AI Tools',
    description: 'Explore our curated directory of the best free AI tools for writing and productivity.',
  },
  {
    step: '02',
    title: 'Use Free Tools',
    description: 'Access our built-in AI chat, writing assistants, and productivity utilities — all free.',
  },
  {
    step: '03',
    title: 'Grow Faster',
    description: 'Follow our guides and workflows to 10x your content creation and SEO results.',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActions />
      <LogoTicker />

      {/* Features */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-base md:text-lg text-text-secondary">
              Powerful tools designed for modern content creators and businesses.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map(({ icon: Icon, title, description, color, bg }) => (
              <Card key={title} hover className="group">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={20} className="md:hidden" style={{ color }} />
                  <Icon size={24} className="hidden md:block" style={{ color }} />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How it works
            </h2>
            <p className="text-base md:text-lg text-text-secondary">
              Get started in three simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary text-white font-bold text-base md:text-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                  {step}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm md:text-base text-text-secondary">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BuiltForCreators />

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Loved by creators worldwide
            </h2>
            <p className="text-base md:text-lg text-text-secondary">
              See what our users have to say about Maximus.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map(({ name, role, content, rating }) => (
              <div key={name} className="p-5 md:p-6 rounded-2xl border border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#FBBF24" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-text-secondary mb-4 md:mb-6 leading-relaxed">&ldquo;{content}&rdquo;</p>
                <div>
                  <div className="font-semibold text-text-primary">{name}</div>
                  <div className="text-sm text-text-muted">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmailCTA />

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-[var(--color-hero-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-base md:text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Join thousands of creators using Maximus to find, use, and master the best AI tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/ai-tools" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-[var(--color-hero-bg)] hover:bg-primary-hover">
                Browse AI Tools
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/20 text-white hover:bg-primary/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  )
}
