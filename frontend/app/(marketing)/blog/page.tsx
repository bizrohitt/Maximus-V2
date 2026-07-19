import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tutorials, AI tool reviews, and strategies for content creators — the Maximus blog.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — AI Tool Reviews & Creator Tips | Maximus',
    description: 'Tutorials, AI tool reviews, and strategies for content creators.',
    type: 'website',
  },
}

const posts = [
  {
    slug: 'best-free-ai-tools-2026',
    title: '20 Best Free AI Tools for Content Creators in 2026',
    excerpt: 'A curated list of the most powerful free AI tools for writing and productivity — all tested by our team.',
    category: 'AI Tools',
    readTime: '8 min',
    date: 'July 5, 2026',
  },
  {
    slug: 'faceless-youtube-channel-guide',
    title: 'How to Start a Faceless YouTube Channel with AI',
    excerpt: 'Step-by-step guide to building a YouTube channel without showing your face — from niche selection to AI scripting, voice, and visuals.',
    category: 'Creator Guide',
    readTime: '12 min',
    date: 'July 1, 2026',
  },
  {
    slug: 'seo-content-workflow',
    title: 'The 30-Minute SEO Content Workflow That Actually Works',
    excerpt: 'A repeatable workflow for researching, writing, and optimizing SEO content in under 30 minutes using AI-assisted tools.',
    category: 'SEO',
    readTime: '6 min',
    date: 'June 28, 2026',
  },
  {
    slug: 'ai-image-generation-prompts',
    title: 'Mastering AI Image Generation: Prompt Patterns That Deliver',
    excerpt: 'Learn the prompt structures that produce consistent, high-quality AI images — from photorealistic portraits to product mockups.',
    category: 'AI Tools',
    readTime: '10 min',
    date: 'June 22, 2026',
  },
  {
    slug: 'monetize-content-with-ai',
    title: '5 Ways to Monetize Content Using AI (Without a Big Audience)',
    excerpt: 'You do not need millions of followers. These monetization strategies work with small, engaged audiences and AI-powered workflows.',
    category: 'Monetization',
    readTime: '7 min',
    date: 'June 18, 2026',
  },
  {
    slug: 'maximus-product-update-june',
    title: 'Maximus Product Update: What We Shipped in June 2026',
    excerpt: 'New AI tools, improved performance, and community features — a full rundown of everything that launched this month.',
    category: 'Updates',
    readTime: '4 min',
    date: 'June 15, 2026',
  },
]

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-secondary/10 text-xs md:text-sm font-medium text-secondary mb-5 md:mb-6">
            <Tag size={14} />
            Blog
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-5">
            Learn, build, grow
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Tutorials, AI tool reviews, and proven strategies from real creators. One new post every week.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-12 md:py-20 bg-gray-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-primary rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-secondary/20 transition-all duration-300"
              >
                {/* Placeholder thumbnail */}
                <div className="aspect-[16/9] bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-secondary/20">{post.title.charAt(0)}</span>
                </div>

                <div className="p-5 md:p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[11px] font-semibold">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-text-muted">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base md:text-lg font-semibold text-text-primary leading-snug mb-2 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-secondary group-hover:gap-2 transition-all">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-primary border-t border-border">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-3">
            Never miss a post
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Get new tutorials and tool reviews delivered to your inbox every Thursday.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-white text-sm font-semibold hover:bg-secondary-hover transition-colors"
          >
            Subscribe to the newsletter
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
