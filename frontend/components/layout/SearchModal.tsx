'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, X, FileText, Wrench, BookOpen, FolderOpen, Download, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  title: string
  href: string
  description: string
  icon: typeof Search
  category: string
}

const searchIndex: SearchResult[] = [
  // Pages
  { title: 'Home', href: '/', description: 'Maximus homepage', icon: ArrowRight, category: 'Pages' },
  { title: 'AI Tools', href: '/ai-tools', description: 'Free AI content generation tools', icon: Wrench, category: 'Pages' },
  { title: 'Blog', href: '/blog', description: 'Tutorials, reviews, and strategies', icon: BookOpen, category: 'Pages' },
  { title: 'About', href: '/about', description: 'Learn about Maximus', icon: FileText, category: 'Pages' },
  { title: 'Contact', href: '/contact', description: 'Get in touch with our team', icon: FileText, category: 'Pages' },
  { title: 'Newsletter', href: '/newsletter', description: 'Weekly AI tools and tips', icon: FileText, category: 'Pages' },
  { title: 'Downloads', href: '/downloads', description: 'Free digital products and tools', icon: Download, category: 'Pages' },
  { title: 'Directories', href: '/directories', description: 'Curated lists of the best tools', icon: FolderOpen, category: 'Pages' },
  { title: 'Affiliate Program', href: '/affiliate', description: 'Earn recurring commissions', icon: FileText, category: 'Pages' },

  // AI Tools — Writing
  { title: 'SEO Title Generator', href: '/ai-tools/seo-title-generator', description: 'Generate compelling SEO titles optimized for search', icon: Wrench, category: 'AI Tools' },
  { title: 'Meta Description Writer', href: '/ai-tools/meta-description-writer', description: 'Create perfect meta descriptions that improve CTR', icon: Wrench, category: 'AI Tools' },
  { title: 'Blog Intro Generator', href: '/ai-tools/blog-intro-generator', description: 'Hook readers with AI-crafted introductions', icon: Wrench, category: 'AI Tools' },
  { title: 'Content Outline Builder', href: '/ai-tools/content-outline-builder', description: 'Build structured content outlines for articles', icon: Wrench, category: 'AI Tools' },
  // AI Tools — Productivity
  { title: 'AI PDF Reader', href: '/ai-tools/ai-pdf-reader', description: 'Summarize and chat with any PDF document', icon: Wrench, category: 'AI Tools' },
  { title: 'AI Search', href: '/ai-tools/ai-search', description: 'Search the web with AI-powered answers', icon: Wrench, category: 'AI Tools' },
  { title: 'AI Assistant', href: '/ai-tools/ai-assistant', description: 'Your personal AI helper for writing and coding', icon: Wrench, category: 'AI Tools' },

  // Blog Posts
  { title: '20 Best Free AI Tools for Content Creators in 2026', href: '/blog/best-free-ai-tools-2026', description: 'Curated list of powerful free AI tools', icon: BookOpen, category: 'Blog' },
  { title: 'How to Start a Faceless YouTube Channel with AI', href: '/blog/faceless-youtube-channel-guide', description: 'Build a YouTube channel without showing your face', icon: BookOpen, category: 'Blog' },
  { title: 'The 30-Minute SEO Content Workflow', href: '/blog/seo-content-workflow', description: 'Research, write, and optimize SEO content quickly', icon: BookOpen, category: 'Blog' },
  { title: 'Mastering AI Image Generation Prompts', href: '/blog/ai-image-generation-prompts', description: 'Prompt patterns that deliver consistent results', icon: BookOpen, category: 'Blog' },
  { title: '5 Ways to Monetize Content Using AI', href: '/blog/monetize-content-with-ai', description: 'Monetization strategies for small audiences', icon: BookOpen, category: 'Blog' },
  { title: 'Maximus Product Update: June 2026', href: '/blog/maximus-product-update-june', description: 'New features and improvements this month', icon: BookOpen, category: 'Blog' },

  // Directories
  { title: 'Best SEO Tools 2025', href: '/directories/best-seo-tools-2025', description: '42 curated SEO platforms and tools', icon: FolderOpen, category: 'Directories' },
  { title: 'AI Writing & Content Tools', href: '/directories/ai-writing-tools', description: '38 AI-powered writing assistants', icon: FolderOpen, category: 'Directories' },
  { title: 'Email Marketing Platforms', href: '/directories/email-marketing-platforms', description: '27 email service providers compared', icon: FolderOpen, category: 'Directories' },
  { title: 'SaaS Analytics & Tracking', href: '/directories/saas-analytics-tools', description: '19 analytics platforms for product intelligence', icon: FolderOpen, category: 'Directories' },
  { title: 'No-Code & Low-Code Platforms', href: '/directories/no-code-tools', description: '31 platforms to build without code', icon: FolderOpen, category: 'Directories' },
  { title: 'Landing Page Builders', href: '/directories/landing-page-builders', description: '22 conversion-optimised landing page tools', icon: FolderOpen, category: 'Directories' },

  // Legal
  { title: 'Terms & Conditions', href: '/terms', description: 'Rules governing platform use', icon: FileText, category: 'Legal' },
  { title: 'Privacy Policy', href: '/privacy', description: 'How we collect and protect your data', icon: FileText, category: 'Legal' },
  { title: 'Affiliate Disclosure', href: '/affiliate-disclosure', description: 'How we earn commissions', icon: FileText, category: 'Legal' },
]

export function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const lower = query.toLowerCase()
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower)
    )
  }, [query])

  // Group results by category
  const grouped = useMemo(() => {
    const map = new Map<string, SearchResult[]>()
    results.forEach((r) => {
      const arr = map.get(r.category) || []
      arr.push(r)
      map.set(r.category, arr)
    })
    return map
  }, [results])

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      setOpen(false)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  // Scroll selected into view
  useEffect(() => {
    const el = document.getElementById(`search-result-${selectedIndex}`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-gray-50 text-sm text-text-muted hover:bg-gray-100 hover:scale-[1.03] active:scale-[0.97] transition-all duration-150"
      >
        <Search size={15} />
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-primary border border-border text-[10px] font-medium text-text-muted">
          ⌘K
        </kbd>
      </button>

      {/* Modal */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[310] w-full max-w-lg animate-scale-in">
            <div className="bg-primary rounded-2xl shadow-2xl border border-border overflow-hidden mx-4">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 border-b border-border">
                <Search size={18} className="text-text-muted flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, tools, posts..."
                  className="flex-1 py-4 text-sm text-text-primary placeholder:text-text-muted bg-transparent outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <X size={16} className="text-text-muted" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {!query.trim() ? (
                  <div className="py-10 text-center">
                    <Search size={20} className="text-text-muted/40 mx-auto mb-2" />
                    <p className="text-sm text-text-muted">Start typing to search...</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-sm text-text-muted">No results for &ldquo;{query}&rdquo;</p>
                  </div>
                ) : (
                  Array.from(grouped.entries()).map(([category, items]) => (
                    <div key={category} className="mb-2">
                      <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                        {category}
                      </p>
                      {items.map((item) => {
                        const globalIndex = results.indexOf(item)
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href + item.title}
                            id={`search-result-${globalIndex}`}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                              globalIndex === selectedIndex
                                ? 'bg-secondary/10 text-secondary'
                                : 'text-text-primary hover:bg-gray-50'
                            }`}
                          >
                            <Icon size={16} className="flex-shrink-0 opacity-60" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{item.title}</div>
                              <div className="text-xs text-text-muted truncate">{item.description}</div>
                            </div>
                            <ArrowRight size={14} className="flex-shrink-0 opacity-40" />
                          </Link>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-5 py-2.5 border-t border-border text-[11px] text-text-muted">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-border font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-border font-mono">↵</kbd>
                  open
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-border font-mono">esc</kbd>
                  close
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
