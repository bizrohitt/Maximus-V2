'use client'

import { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">Contact Us</h1>
          <p className="text-base md:text-xl text-text-secondary max-w-2xl">
            Have a question or want to work together? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Form */}
            <div className="p-5 md:p-8 rounded-2xl border border-border bg-primary">
              {submitted ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Send size={22} className="md:hidden text-accent" />
                    <Send size={24} className="hidden md:block text-accent" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2">Message sent!</h3>
                  <p className="text-sm md:text-base text-text-secondary">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="First name" placeholder="John" required />
                    <Input label="Last name" placeholder="Doe" required />
                  </div>
                  <Input label="Email" type="email" placeholder="you@example.com" required />
                  <Input label="Subject" placeholder="How can we help?" required />
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us more..."
                      className="w-full px-3 md:px-4 py-2.5 text-sm rounded-xl border border-border bg-primary text-text-primary placeholder:text-text-muted focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                    <Send size={14} />
                  </Button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-3 md:mb-4">Get in touch</h3>
                <p className="text-sm md:text-base text-text-secondary">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="md:hidden text-secondary" />
                    <Mail size={18} className="hidden md:block text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary text-sm md:text-base">Email</div>
                    <div className="text-text-secondary text-sm">hello@maximus.dev</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="md:hidden text-secondary" />
                    <MapPin size={18} className="hidden md:block text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary text-sm md:text-base">Location</div>
                    <div className="text-text-secondary text-sm">Remote-first company</div>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6 rounded-2xl bg-gray-100">
                <h4 className="font-semibold text-text-primary mb-2 text-sm md:text-base">Looking for support?</h4>
                <p className="text-xs md:text-sm text-text-secondary">
                  Check our documentation or reach out via email for technical support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
