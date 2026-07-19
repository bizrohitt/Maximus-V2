'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Download, FolderOpen, Mail, BookOpen, Star } from 'lucide-react'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-text-primary hover:bg-gray-100 transition-colors"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-primary border-b border-border shadow-lg z-50 px-6 py-6 space-y-1">
          <Link href="/" className="block py-3 text-sm font-medium text-text-primary border-b border-border hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/ai-tools" className="block py-3 text-sm font-medium text-text-primary border-b border-border hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
            AI Tools
          </Link>
          <Link href="/blog" className="block py-3 text-sm font-medium text-text-primary border-b border-border hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
            Blog
          </Link>

          {/* Resources Submenu */}
          <div>
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className="flex items-center justify-between w-full py-3 text-sm font-medium text-text-primary border-b border-border hover:opacity-70 transition-opacity"
            >
              Resources
              <ChevronDown size={14} className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {resourcesOpen && (
              <div className="pl-4 pb-2">
                <Link href="/downloads" className="flex items-center gap-3 py-3 text-sm text-text-primary hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
                  <Download size={14} className="text-blue-600" />
                  Downloads
                </Link>
                <Link href="/directories" className="flex items-center gap-3 py-3 text-sm text-text-primary hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
                  <FolderOpen size={14} className="text-green-600" />
                  Directories
                </Link>
                <Link href="/mini-courses" className="flex items-center gap-3 py-3 text-sm text-text-primary hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
                  <BookOpen size={14} className="text-orange-600" />
                  Mini Courses
                </Link>
                <Link href="/resources" className="flex items-center gap-3 py-3 text-sm text-text-primary hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
                  <Star size={14} className="text-amber-600" />
                  Resources I Use
                </Link>
                <Link href="/newsletter" className="flex items-center gap-3 py-3 text-sm text-text-primary hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
                  <Mail size={14} className="text-purple-600" />
                  Newsletter
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="block py-3 text-sm font-medium text-text-primary border-b border-border hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/contact-business" className="block py-3 text-sm font-medium text-text-primary border-b border-border hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
            Business
          </Link>
          <Link href="/contact" className="block py-3 text-sm font-medium text-text-primary hover:opacity-70 transition-opacity" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </div>
  )
}
