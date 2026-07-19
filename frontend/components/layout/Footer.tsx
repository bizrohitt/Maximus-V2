'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

const productLinks = [
  { label: 'AI Tools', href: '/ai-tools' },
  { label: 'Blog', href: '/blog' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Directories', href: '/directories' },
  { label: 'Mini Courses', href: '/mini-courses' },
  { label: 'Resources I Use', href: '/resources' },
  { label: 'Newsletter', href: '/newsletter' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Affiliate Program', href: '/affiliate' },
  { label: 'Contact', href: '/contact' },
  { label: 'Business Inquiries', href: '/contact-business' },
]

const legalLinks = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
]

export function Footer() {
  return (
    <footer className="bg-[var(--color-hero-bg)] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-y-10 text-sm">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center overflow-hidden group">
              <span className="text-white font-bold text-lg leading-none block group-hover:rotate-360 transition-all duration-600">
                M
              </span>
            </div>
            <span className="font-semibold text-xl text-white">Maximus</span>
          </Link>
          <p className="text-white/50">
            Modern tools for content, AI, and growth.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Product</h4>
          <div className="space-y-2">
            {productLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="block text-white/50 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Company</h4>
          <div className="space-y-2">
            {companyLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="block text-white/50 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Legal</h4>
          <div className="space-y-2">
            {legalLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="block text-white/50 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Threads">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.34-.776-.963-1.394-1.813-1.79-.128 2.754-1.19 5.072-3.744 5.072-.037 0-.075 0-.112-.002-2.084-.105-3.644-1.266-3.762-3.126-.074-1.17.476-2.256 1.535-3.016.916-.658 2.115-1.023 3.443-1.063.598-.018 1.193-.024 1.766-.017l.006-.11c.03-1.064-.086-1.91-.35-2.55-.46-1.115-1.326-1.675-2.536-1.675h-.07c-1.09.008-1.914.338-2.494.992l-1.43-1.49c.86-.97 2.08-1.517 3.634-1.56h.1c2.184 0 3.83.964 4.85 2.843.855 1.554 1.266 3.583 1.228 6.034l-.006.11v.056c.133.59.2.997.2 1.214 0 2.86-.682 5.305-3.184 5.305-.037 0-.075 0-.112-.002-1.732-.105-3.074-.878-3.89-2.307-.43-.757-.642-1.673-.616-2.643.056-2.1 1.772-3.668 3.946-3.668.073 0 .146.002.218.005l.018.001c1.45.036 2.557.535 3.278 1.472.52.678.846 1.567.968 2.643.506.18.877.48 1.094.887.347.647.383 1.557-.006 2.523-.75 1.853-2.57 3.108-5.126 3.271-.074.004-.148.006-.222.006z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
          <span>© {new Date().getFullYear()} Maximus. All rights reserved. Designed by Maximus with <Heart size={14} className="inline-block cursor-default text-red-500" style={{ filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.4))', transition: 'filter 0.3s ease' }} onMouseEnter={(e) => { (e.target as HTMLElement).style.filter = 'drop-shadow(0 0 12px rgba(239,68,68,1)) drop-shadow(0 0 24px rgba(239,68,68,0.8))' }} onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = 'drop-shadow(0 0 4px rgba(239,68,68,0.4))' }} /></span>
        </div>
      </div>
    </footer>
  )
}
