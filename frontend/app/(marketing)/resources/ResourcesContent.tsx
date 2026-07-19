'use client'

import Link from 'next/link'
import { ExternalLink, Star, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'

interface Resource {
  name: string
  description: string
  category: string
  url: string
  tag?: string
}

const resourceSections = [
  {
    title: 'AI & Writing',
    description: 'The AI tools I use daily for content creation.',
    color: 'bg-blue-50 text-blue-600',
    resources: [
      { name: 'ChatGPT', description: 'My go-to for brainstorming, drafting, and editing content.', category: 'AI Assistant', url: 'https://chat.openai.com', tag: 'Essential' },
      { name: 'Claude', description: 'Great for long-form writing, analysis, and nuanced tasks.', category: 'AI Assistant', url: 'https://claude.ai' },
      { name: 'Jasper', description: 'Marketing-focused AI copywriting for ads and campaigns.', category: 'Copywriting', url: 'https://jasper.ai' },
    ] as Resource[],
  },
  {
    title: 'Design & Media',
    description: 'Visual content and media creation tools.',
    color: 'bg-purple-50 text-purple-600',
    resources: [
      { name: 'Canva', description: 'Quick graphics, thumbnails, and social media templates.', category: 'Design', url: 'https://canva.com', tag: 'Essential' },
    ] as Resource[],
  },
  {
    title: 'SEO & Analytics',
    description: 'Tools for search optimization and tracking performance.',
    color: 'bg-green-50 text-green-600',
    resources: [
      { name: 'Ahrefs', description: 'Keyword research, backlink analysis, and competitor tracking.', category: 'SEO', url: 'https://ahrefs.com', tag: 'Essential' },
      { name: 'Google Analytics', description: 'Traffic analysis, user behavior, and conversion tracking.', category: 'Analytics', url: 'https://analytics.google.com' },
      { name: 'Ubersuggest', description: 'Budget-friendly keyword research and SEO auditing.', category: 'SEO', url: 'https://neilpatel.com/ubersuggest' },
    ] as Resource[],
  },
  {
    title: 'Productivity & Business',
    description: 'Tools for running the business side of things.',
    color: 'bg-amber-50 text-amber-600',
    resources: [
      { name: 'Notion', description: 'Project management, documentation, and content calendars.', category: 'Productivity', url: 'https://notion.so', tag: 'Essential' },
      { name: 'ConvertKit', description: 'Email marketing and newsletter management for creators.', category: 'Email', url: 'https://convertkit.com' },
      { name: 'Stripe', description: 'Payment processing for digital products and subscriptions.', category: 'Payments', url: 'https://stripe.com' },
    ] as Resource[],
  },
  {
    title: 'Hosting & Infrastructure',
    description: 'Where I host and deploy everything.',
    color: 'bg-red-50 text-red-600',
    resources: [
      { name: 'Vercel', description: 'Frontend hosting with instant deployments and edge functions.', category: 'Hosting', url: 'https://vercel.com', tag: 'Essential' },
      { name: 'Coolify', description: 'Self-hosted PaaS for backend services and databases.', category: 'DevOps', url: 'https://coolify.io' },
      { name: 'Cloudflare', description: 'CDN, DNS, and security for all my domains.', category: 'Infrastructure', url: 'https://cloudflare.com' },
    ] as Resource[],
  },
]

export function ResourcesContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-secondary/10 text-xs md:text-sm font-medium text-secondary mb-4 md:mb-6">
              <Wrench size={14} />
              Tools &amp; recommendations
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-5">
              Resources I use
            </h1>
            <p className="text-base md:text-xl text-text-secondary leading-relaxed">
              Every tool, platform, and service I personally use to run Maximus and create content — no affiliate BS, just honest picks.
            </p>
          </div>
        </div>
      </section>

      {/* Resource sections */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 md:space-y-14">
          {resourceSections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className={`w-2 h-8 rounded-full ${section.color.split(' ')[0]}`} />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary">{section.title}</h2>
                  <p className="text-sm text-text-secondary">{section.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {section.resources.map((r) => (
                  <a
                    key={r.name}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-5 rounded-2xl border border-border bg-primary hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-text-primary group-hover:text-secondary transition-colors">
                        {r.name}
                      </h3>
                      <ExternalLink size={14} className="text-text-muted flex-shrink-0 mt-1 group-hover:text-secondary transition-colors" />
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3">
                      {r.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted">{r.category}</span>
                      {r.tag && (
                        <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                          <Star size={10} fill="currentColor" />
                          {r.tag}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-primary border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Want recommendations for your stack?
          </h2>
          <p className="text-sm md:text-base text-text-secondary mb-6 md:mb-8">
            Drop me a message with your use case and I&apos;ll point you to the right tools.
          </p>
          <Link href="/contact-business">
            <Button size="lg">
              Get in touch
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
