import type { Metadata } from 'next'
import { Target, Users, Zap, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Maximus — our mission to give creators access to powerful, affordable AI tools for building their online business.',
  alternates: { canonical: '/about' },
}

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We believe every creator deserves access to powerful, affordable tools for building their online business.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Built by creators, for creators. We listen to our users and build what they actually need.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We leverage cutting-edge AI technology to solve real problems for modern content creators.',
  },
  {
    icon: Heart,
    title: 'Quality',
    description: 'Every feature is crafted with attention to detail, ensuring a delightful user experience.',
  },
]

const stats = [
  { value: '10K+', label: 'Active users' },
  { value: '500K+', label: 'AI generations' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9', label: 'Average rating' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-6">About Maximus</h1>
            <p className="text-base md:text-xl text-text-secondary leading-relaxed">
              Maximus was founded with a simple mission: give creators the tools they need to succeed — without the complexity or high costs of traditional platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 md:mb-6">Our Story</h2>
              <div className="space-y-4 text-sm md:text-base text-text-secondary leading-relaxed">
                <p>
                  We started Maximus because we were frustrated with the fragmented landscape of content tools. Every creator was juggling 5+ subscriptions just to manage their workflow.
                </p>
                <p>
                  Our goal was to build a single platform that combines AI-powered content generation, SEO optimization, and digital product sales — all in one beautiful, easy-to-use interface.
                </p>
                <p>
                  Today, over 10,000 creators trust Maximus to power their content workflow, and we&apos;re just getting started.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="p-4 md:p-6 rounded-2xl bg-primary border border-border text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">{value}</div>
                  <div className="text-xs md:text-sm text-text-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">Our Values</h2>
            <p className="text-base md:text-lg text-text-secondary">
              The principles that guide everything we build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-5 md:p-6 rounded-2xl border border-border">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-3 md:mb-4">
                  <Icon size={20} className="md:hidden text-secondary" />
                  <Icon size={24} className="hidden md:block text-secondary" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join our community</h2>
          <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8">
            Start using Maximus today and see why creators love us.
          </p>
          <a
            href="/ai-tools"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-primary text-secondary font-semibold hover:bg-primary-hover transition-colors text-sm md:text-base"
          >
            Try AI Tools Free
          </a>
        </div>
      </section>
    </>
  )
}
