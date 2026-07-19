'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MobileNav } from './MobileNav'
import { ChevronDown, Download, FolderOpen, Mail, BookOpen, Star } from 'lucide-react'
import { SearchModal } from './SearchModal'

export function Header() {
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <div className="sticky top-0 z-sticky">
      {/* Main Header */}
      <header className="bg-primary/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center overflow-hidden group">
              <span className="text-white font-bold text-base leading-none block group-hover:rotate-360 transition-all duration-600">
                M
              </span>
            </div>
            <span className="font-semibold text-xl text-text-primary">Maximus</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link href="/" className="px-3 py-2 rounded-lg text-text-primary hover:bg-gray-100 transition-colors">
              Home
            </Link>
            <Link href="/ai-tools" className="px-3 py-2 rounded-lg text-text-primary hover:bg-gray-100 transition-colors">
              AI Tools
            </Link>
            <Link href="/blog" className="px-3 py-2 rounded-lg text-text-primary hover:bg-gray-100 transition-colors">
              Blog
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-text-primary hover:bg-gray-100 transition-colors">
                Resources
                <ChevronDown size={14} className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              {resourcesOpen && (
                <div className="absolute top-full left-0 w-60 py-2 rounded-xl border border-border bg-primary shadow-xl mt-1">
                  <Link href="/downloads" className="flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Download size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Downloads</div>
                      <div className="text-xs text-text-muted">Digital products &amp; tools</div>
                    </div>
                  </Link>
                  <Link href="/directories" className="flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                      <FolderOpen size={16} className="text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Directories</div>
                      <div className="text-xs text-text-muted">Curated resource lists</div>
                    </div>
                  </Link>
                  <Link href="/mini-courses" className="flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                      <BookOpen size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium">Mini Courses</div>
                      <div className="text-xs text-text-muted">Free AI learning</div>
                    </div>
                  </Link>
                  <Link href="/resources" className="flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Star size={16} className="text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium">Resources I Use</div>
                      <div className="text-xs text-text-muted">Tools &amp; recommendations</div>
                    </div>
                  </Link>
                  <Link href="/newsletter" className="flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                      <Mail size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Newsletter</div>
                      <div className="text-xs text-text-muted">Weekly AI tools &amp; tips</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="px-3 py-2 rounded-lg text-text-primary hover:bg-gray-100 transition-colors">
              About
            </Link>
            <Link href="/contact-business" className="px-3 py-2 rounded-lg text-text-primary hover:bg-gray-100 transition-colors">
              Business
            </Link>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <SearchModal />
          </div>

          {/* Mobile Nav */}
          <MobileNav />
        </div>
      </header>
    </div>
  )
}
