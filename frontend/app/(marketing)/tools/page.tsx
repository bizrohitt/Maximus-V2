/**
 * ToolsPage (overview/hub)
 * Design Tokens: --color-secondary, --color-accent, --color-text-primary, --color-text-secondary,
 *                --color-bg-subtle, --color-bg-base, --color-border, --radius-2xl
 * Alpine.js: No | Dark Mode: Yes | Responsive: Mobile-first
 */
import Link from 'next/link'
import type { Metadata } from 'next'
import { Wrench, ArrowRight, Search, FileText, Wand2, BarChart3, Globe, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Free browser-based tools for creators — text utilities, generators, and productivity apps. No account required.',
  alternates: { canonical: '/tools' },
}

const toolCategories = [
  {
    icon: Search,
    name: 'SEO Tools',
    desc: 'Keyword research, rank tracking, on-page audit, and SERP analysis tools.',
    href: '/ai-tools',
    count: 8,
  },
  {
    icon: Wand2,
    name: 'AI Content Generation',
    desc: 'Generate titles, descriptions, outlines, and full articles with AI.',
    href: '/ai-tools',
    count: 6,
  },
  {
    icon: FileText,
    name: 'Content Planning',
    desc: 'Content calendars, topic cluster builders, and editorial workflow tools.',
    href: '/resources',
    count: 4,
  },
  {
    icon: BarChart3,
    name: 'Analytics & Reporting',
    desc: 'Track page performance, revenue, and user engagement from one place.',
    href: '/ai-tools',
    count: 5,
  },
  {
    icon: Globe,
    name: 'Directories',
    desc: 'Curated lists of tools, platforms, and resources for marketers.',
    href: '/directories',
    count: 6,
  },
  {
    icon: Mail,
    name: 'Email & Marketing',
    desc: 'Campaign tools, lead capture forms, and automated email sequences.',
    href: '/contact',
    count: 3,
  },
]

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: 'var(--color-bg-muted)', color: 'var(--color-secondary)' }}
          >
            <Wrench size={12} />
            All tools
          </div>
          <h1
            className="text-5xl font-bold mb-4 leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Maximus Tools
          </h1>
          <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
            Every tool you need to create content, grow your audience, and monetise your
            knowledge — in one platform.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.name}
                href={tool.href}
                className="block rounded-2xl border p-6 transition-shadow hover:shadow-md group"
                style={{
                  backgroundColor: 'var(--color-bg-base)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-bg-muted)' }}
                  >
                    <Icon size={20} style={{ color: 'var(--color-secondary)' }} />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {tool.name}
                    </h3>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {tool.count} tools
                    </span>
                  </div>
                </div>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {tool.desc}
                </p>

                <div
                  className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  Explore
                  <ArrowRight size={14} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section
        className="border-t py-14 text-center"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}
      >
        <div className="max-w-xl mx-auto px-6">
          <h3
            className="text-2xl font-semibold mb-3"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Start with AI Tools — free
          </h3>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            No account required. Try our AI content generation tools right now.
          </p>
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            Try AI Tools Free
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  )
}
