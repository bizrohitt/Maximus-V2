import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, HelpCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { tools, categories, getToolBySlug, getToolsByCategory } from '@/lib/tools-data'
import { ToolClient } from './ToolClient'
import { ToolFAQ } from './ToolFAQ'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const tool = getToolBySlug(params.slug)
  if (!tool) return {}

  return {
    title: `${tool.title} — Free AI Tool | Maximus`,
    description: tool.description,
    keywords: [tool.title, 'free AI tool', 'AI tool online', 'no signup', tool.category],
    alternates: {
      canonical: `/ai-tools/${params.slug}`,
    },
    openGraph: {
      title: `${tool.title} — Free AI Tool | Maximus`,
      description: tool.description,
      type: 'website',
      url: `/ai-tools/${params.slug}`,
      siteName: 'Maximus',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} — Free AI Tool | Maximus`,
      description: tool.description,
    },
  }
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()

  const relatedTools = getToolsByCategory(tool.categorySlug).filter((t) => t.slug !== tool.slug).slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: tool.title,
                description: tool.description,
                url: `https://maximus.io/ai-tools/${params.slug}`,
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'Web',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
                provider: {
                  '@type': 'Organization',
                  name: 'Maximus',
                  url: 'https://maximus.io',
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://maximus.io' },
                  { '@type': 'ListItem', position: 2, name: 'AI Tools', item: 'https://maximus.io/ai-tools' },
                  { '@type': 'ListItem', position: 3, name: tool.title, item: `https://maximus.io/ai-tools/${params.slug}` },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: tool.faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-primary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/ai-tools" className="hover:text-secondary transition-colors">AI Tools</Link>
            <span>/</span>
            <span className="text-text-primary font-medium">{tool.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ backgroundColor: tool.bg, color: tool.color }}
            >
              {tool.category}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-5">
              {tool.title}
            </h1>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              {tool.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Tool interface */}
      <section className="py-10 md:py-16 bg-gray-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ToolClient tool={tool} />
        </div>
      </section>

      {/* Features + Use Cases */}
      <section className="py-10 md:py-16 bg-primary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Features */}
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-5">What you get</h2>
              <ul className="space-y-3">
                {tool.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-accent" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use cases */}
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-5">Best for</h2>
              <ul className="space-y-3">
                {tool.useCases.map((u) => (
                  <li key={u} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles size={12} className="text-secondary" />
                    </div>
                    <span className="text-sm text-text-secondary">{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-16 bg-gray-50 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
              <HelpCircle size={18} className="text-secondary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-text-primary">
              Frequently asked questions
            </h2>
          </div>
          <ToolFAQ faqs={tool.faqs} />
        </div>
      </section>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="py-10 md:py-16 bg-gray-50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-text-primary mb-6">
              More {tool.category} tools
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {relatedTools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/ai-tools/${t.slug}`}
                  className="group p-5 rounded-2xl border border-border bg-primary hover:shadow-lg hover:border-secondary/20 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: t.bg }}
                  >
                    <span className="text-lg font-bold" style={{ color: t.color }}>
                      {t.title.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1 group-hover:text-secondary transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {t.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-secondary group-hover:gap-2 transition-all">
                    Try it free <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16 bg-primary border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Explore all AI tools
          </h2>
          <p className="text-sm md:text-base text-text-secondary mb-6 md:mb-8">
            7+ free tools for writing and productivity.
          </p>
          <Link href="/ai-tools">
            <Button size="lg">
              Browse all tools
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
