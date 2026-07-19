import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { categories, getToolsByCategory } from '@/lib/tools-data'

export const metadata: Metadata = {
  title: 'AI Tools',
  description: 'Free AI tools for writing and productivity — no account required. Generate blog posts, headlines, emails, and more.',
  keywords: ['free AI tools', 'AI writing tools', 'AI productivity tools', 'AI content creation'],
  alternates: { canonical: '/ai-tools' },
  openGraph: {
    title: 'Free AI Tools for Writing & Productivity | Maximus',
    description: 'Free AI tools for writing and productivity — no account required.',
    type: 'website',
  },
}

export default function AIToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-secondary/10 text-xs md:text-sm font-medium text-secondary mb-4 md:mb-6">
              <Sparkles size={14} />
              7 tools — completely free, no account required
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-6">
              AI Content Tools
            </h1>
            <p className="text-base md:text-xl text-text-secondary">
              Everything you need to create, optimize, and publish content — powered by AI, free forever.
            </p>
          </div>
        </div>
      </section>

      {/* Tool categories */}
      {categories.map((category) => {
        const categoryTools = getToolsByCategory(category.slug)
        if (categoryTools.length === 0) return null

        return (
          <section
            key={category.slug}
            className="py-10 md:py-14 border-t border-border"
            style={{ backgroundColor: category.slug === 'writing' ? 'var(--color-gray-50)' : 'var(--color-primary)' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary">{category.title}</h2>
                  <p className="text-sm text-text-secondary">{category.description}</p>
                </div>
              </div>

              {/* Tools grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {categoryTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/ai-tools/${tool.slug}`}
                    className="group relative p-5 md:p-6 rounded-2xl border border-border bg-primary hover:shadow-lg transition-all duration-300"
                    style={{ ['--tool-color' as string]: tool.color }}
                  >
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: tool.bg }}
                    >
                      <span className="text-lg font-bold" style={{ color: tool.color }}>
                        {tool.title.charAt(0)}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-semibold text-text-primary mb-1 group-hover:text-secondary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary group-hover:gap-2.5 transition-all">
                      Try free <ArrowRight size={14} />
                    </span>

                    {/* Hover accent line */}
                    <div
                      className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: tool.color }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Bottom CTA */}
      <section className="py-12 md:py-16 bg-primary border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-5">
            <Zap size={22} className="text-secondary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            All tools. One place. Always free.
          </h2>
          <p className="text-sm md:text-base text-text-secondary mb-6 md:mb-8">
            No sign-ups, no watermarks. Just open a tool and start creating.
          </p>
          <Button size="lg" disabled>
            Coming soon — Maximus Pro
          </Button>
        </div>
      </section>
    </>
  )
}
