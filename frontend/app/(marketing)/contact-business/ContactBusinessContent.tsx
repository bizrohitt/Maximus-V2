'use client'

import { useState } from 'react'
import { Briefcase, CheckCircle, Handshake, Mail, Send, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'

const inquiryTypes = [
  { value: 'business', label: 'Business Partnership' },
  { value: 'collaboration', label: 'Content Collaboration' },
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'promotion', label: 'Promotion / Shoutout' },
  { value: 'other', label: 'Other' },
]

export function ContactBusinessContent() {
  const [submitted, setSubmitted] = useState(false)
  const [inquiryType, setInquiryType] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-secondary/10 text-xs md:text-sm font-medium text-secondary mb-4 md:mb-6">
              <Briefcase size={14} />
              Business &amp; Collaboration
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-5">
              Let&apos;s work together
            </h1>
            <p className="text-base md:text-xl text-text-secondary leading-relaxed">
              Whether you&apos;re a brand, agency, creator, or startup — we&apos;re open to partnerships, collaborations, sponsorships, and promotions that align with our audience.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            {/* Form */}
            <div className="md:col-span-3 p-5 md:p-8 rounded-2xl border border-border bg-primary">
              {submitted ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={24} className="text-accent" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2">Inquiry submitted!</h3>
                  <p className="text-sm md:text-base text-text-secondary max-w-sm mx-auto">
                    Thanks for reaching out. We&apos;ll review your inquiry and get back to you within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Your name" placeholder="Jane Smith" required />
                    <Input label="Email" type="email" placeholder="jane@brand.com" required />
                  </div>
                  <Input label="Company / Brand" placeholder="Acme Inc." required />

                  {/* Inquiry type */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Inquiry type</label>
                    <div className="flex flex-wrap gap-2">
                      {inquiryTypes.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setInquiryType(t.value)}
                          className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                            inquiryType === t.value
                              ? 'bg-secondary text-white border-secondary'
                              : 'bg-primary border-border text-text-secondary hover:border-secondary/40'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Input label="Budget range (optional)" placeholder="$1,000 – $5,000" />

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us about your project, goals, and how we can work together..."
                      className="w-full px-3 md:px-4 py-2.5 text-sm rounded-xl border border-border bg-primary text-text-primary placeholder:text-text-muted focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send inquiry
                    <Send size={14} />
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2 space-y-6">
              {/* What we offer */}
              <div className="p-5 md:p-6 rounded-2xl bg-primary border border-border">
                <h3 className="font-semibold text-text-primary mb-4">What we offer</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Sparkles, text: 'Sponsored content & reviews' },
                    { icon: Handshake, text: 'Brand partnerships & ambassadorships' },
                    { icon: Briefcase, text: 'Affiliate & revenue share deals' },
                    { icon: Mail, text: 'Newsletter sponsorships & shoutouts' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={15} className="text-secondary" />
                      </div>
                      <span className="text-sm text-text-secondary pt-1">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response time */}
              <div className="p-5 md:p-6 rounded-2xl bg-gray-100">
                <h4 className="font-semibold text-text-primary mb-2 text-sm">Response time</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  We typically respond within 48 hours. For urgent partnership opportunities, mention &ldquo;URGENT&rdquo; in your message.
                </p>
              </div>

              {/* Quick link */}
              <div className="p-5 md:p-6 rounded-2xl bg-gray-100">
                <h4 className="font-semibold text-text-primary mb-2 text-sm">General questions?</h4>
                <p className="text-xs text-text-secondary leading-relaxed mb-3">
                  For support, feedback, or general inquiries — use our general contact page.
                </p>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-secondary hover:underline"
                >
                  Go to general contact →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
