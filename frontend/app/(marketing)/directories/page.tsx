import Link from 'next/link'
import type { Metadata } from 'next'
import { ExternalLink, ArrowRight, Layers } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'

export const metadata: Metadata = {
  title: 'Directories',
  description: 'Curated directories of the best AI tools, SEO resources, and creator platforms — updated regularly.',
  alternates: { canonical: '/directories' },
}

const directories = [
  {
    slug: 'best-seo-tools-2025',
    title: 'Best SEO Tools 2025',
    description: 'Curated list of the most powerful SEO platforms, keyword tools, rank trackers, and backlink analysers.',
    count: 42,
    category: 'SEO',
    featured: true,
  },
  {
    slug: 'ai-writing-tools',
    title: 'AI Writing & Content Tools',
    description: 'The definitive directory of AI-powered writing assistants, content generators, and copywriting tools.',
    count: 38,
    category: 'AI',
  },
  {
    slug: 'email-marketing-platforms',
    title: 'Email Marketing Platforms',
    description: 'Compare the top email service providers for newsletters, drip campaigns, and marketing automation.',
    count: 27,
    category: 'Marketing',
  },
  {
    slug: 'saas-analytics-tools',
    title: 'SaaS Analytics & Tracking',
    description: 'Open-source and commercial analytics platforms for product intelligence.',
    count: 19,
    category: 'Analytics',
  },
  {
    slug: 'no-code-tools',
    title: 'No-Code & Low-Code Platforms',
    description: 'Build websites, apps, and automations without writing code.',
    count: 31,
    category: 'Development',
  },
  {
    slug: 'landing-page-builders',
    title: 'Landing Page Builders',
    description: 'Conversion-optimised landing page tools for marketers and SaaS startups.',
    count: 22,
    category: 'Design',
  },
]

export default function DirectoriesPage() {
  const featured = directories.find((d) => d.featured)
  const allDirectories = directories.filter((d) => !d.featured)

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-gray-100 text-xs md:text-sm font-medium text-text-secondary mb-4 md:mb-6">
            <Layers size={14} className="text-secondary" />
            Curated &amp; maintained
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">Directories</h1>
          <p className="text-base md:text-xl text-text-secondary max-w-2xl">
            Curated lists of the best tools, platforms, and resources — hand-picked and regularly updated.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="bg-primary pb-8 md:pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link
              href={`/directories/${featured.slug}`}
              className="block rounded-2xl md:rounded-3xl bg-secondary p-6 md:p-10 transition-shadow hover:shadow-lg"
            >
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wide">
                Featured Directory
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-3">{featured.title}</h2>
              <p className="text-white/80 text-base md:text-lg max-w-xl">{featured.description}</p>
              <div className="mt-4 md:mt-6 flex items-center gap-2 text-white font-medium text-sm md:text-base">
                Explore {featured.count} tools
                <ArrowRight size={18} />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Directories */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-6 md:mb-8">All Directories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {allDirectories.map((dir) => (
              <Link
                key={dir.slug}
                href={`/directories/${dir.slug}`}
                className="block rounded-2xl border border-border bg-primary p-5 md:p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-text-muted">
                    {dir.category}
                  </span>
                  <ExternalLink size={15} className="opacity-0 group-hover:opacity-50 transition-opacity text-text-muted" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-2">{dir.title}</h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-4">{dir.description}</p>
                <div className="text-sm font-medium text-secondary flex items-center gap-1">
                  {dir.count} listings
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Submit CTA */}
      <section className="py-10 md:py-14 bg-primary border-t border-border">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-3">Want to get listed?</h3>
          <p className="text-sm md:text-base text-text-secondary mb-6">
            Submit your tool or resource for review. Free listings available for all approved submissions.
          </p>
          <Link href="/contact">
            <Button>
              Submit a Listing
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
