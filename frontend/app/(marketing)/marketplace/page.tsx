/**
 * PluginMarketplacePage
 * Design Tokens: --color-secondary, --color-accent, --color-text-primary, --color-text-secondary,
 *                --color-bg-subtle, --color-bg-base, --color-border, --radius-2xl
 * Alpine.js: No | Dark Mode: Yes | Responsive: Mobile-first
 */
import Link from 'next/link'
import type { Metadata } from 'next'
import { Puzzle, Star, ArrowRight, Download, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Plugin Marketplace',
  description: 'Browse and install plugins to extend Maximus — AI-powered addons for content creators.',
  alternates: { canonical: '/marketplace' },
}

const plugins = [
  {
    id: '1',
    name: 'SEO Booster',
    author: 'Maximus Labs',
    desc: 'Automatically audit and optimise every blog post with AI-powered SEO recommendations and score tracking.',
    price: 29,
    rating: 4.9,
    installs: 1820,
    category: 'SEO',
    badge: 'Official',
  },
  {
    id: '2',
    name: 'Social Share Pro',
    author: 'PixelForge',
    desc: 'Add one-click social sharing buttons to any page with built-in UTM tagging and share count analytics.',
    price: 0,
    rating: 4.7,
    installs: 3200,
    category: 'Marketing',
    badge: 'Free',
  },
  {
    id: '3',
    name: 'AI Image Generator',
    author: 'NeuralCraft',
    desc: 'Generate on-brand featured images and social graphics directly from your content editor using local Stable Diffusion.',
    price: 49,
    rating: 4.8,
    installs: 940,
    category: 'AI',
    badge: null,
  },
  {
    id: '4',
    name: 'Advanced Analytics',
    author: 'DataLayer',
    desc: 'Replace basic page view tracking with funnel analysis, cohort reports, and revenue attribution dashboards.',
    price: 39,
    rating: 4.6,
    installs: 760,
    category: 'Analytics',
    badge: null,
  },
  {
    id: '5',
    name: 'Lead Magnet Forms',
    author: 'ConvertKit Studio',
    desc: 'Build high-converting opt-in forms with A/B testing, conditional logic, and Mailchimp/Kit integrations.',
    price: 19,
    rating: 4.8,
    installs: 1450,
    category: 'Marketing',
    badge: null,
  },
  {
    id: '6',
    name: 'Code Syntax Highlighter',
    author: 'DevBlocks',
    desc: 'Beautiful syntax highlighting for 100+ languages in your blog posts, with copy button and line numbering.',
    price: 0,
    rating: 4.9,
    installs: 2870,
    category: 'Content',
    badge: 'Free',
  },
]

const badgeStyle = (badge: string | null) => {
  if (badge === 'Official') return { bg: 'var(--color-secondary)', text: 'var(--color-white)' }
  if (badge === 'Free') return { bg: 'var(--color-accent)', text: 'var(--color-white)' }
  return null
}

export default function MarketplacePage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-secondary)' }}
            >
              <Puzzle size={12} />
              Extend Maximus
            </div>
            <h1
              className="text-5xl font-bold mb-4 leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Plugin Marketplace
            </h1>
            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
              One-click plugins to supercharge your Maximus platform — built by the
              community and verified by us.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold border transition-colors hover:opacity-80 flex-shrink-0"
            style={{
              borderColor: 'var(--color-secondary)',
              color: 'var(--color-secondary)',
            }}
          >
            Submit Your Plugin
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div
          className="rounded-2xl border px-6 py-4 flex flex-wrap gap-6 items-center"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}
        >
          {[
            { icon: Shield, label: 'All plugins reviewed for security' },
            { icon: Download, label: 'One-click install from admin' },
            { icon: Star, label: 'Community-rated & reviewed' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <Icon size={15} style={{ color: 'var(--color-secondary)' }} />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* Plugins Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plugins.map((plugin) => {
            const bs = badgeStyle(plugin.badge)
            return (
              <div
                key={plugin.id}
                className="rounded-2xl border flex flex-col overflow-hidden transition-shadow hover:shadow-md"
                style={{
                  backgroundColor: 'var(--color-bg-base)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="p-6 flex flex-col flex-1 gap-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {plugin.name}
                        </h3>
                        {bs && (
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: bs.bg, color: bs.text }}
                          >
                            {plugin.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        by {plugin.author}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div
                        className="text-lg font-bold"
                        style={{ color: plugin.price === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)' }}
                      >
                        {plugin.price === 0 ? 'Free' : `$${plugin.price}`}
                      </div>
                      <div className="flex items-center gap-1 text-xs justify-end" style={{ color: 'var(--color-text-muted)' }}>
                        <Star size={11} fill="#FBBF24" color="#FBBF24" />
                        {plugin.rating}
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-sm flex-1 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {plugin.desc}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {plugin.installs.toLocaleString()} installs
                    </span>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-colors hover:opacity-80"
                      style={{
                        borderColor: 'var(--color-secondary)',
                        color: 'var(--color-secondary)',
                      }}
                    >
                      <Download size={13} />
                      Install
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
