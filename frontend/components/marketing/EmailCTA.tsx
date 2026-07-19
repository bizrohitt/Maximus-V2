'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'

export function EmailCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="relative py-16 md:py-24 bg-primary grid-lines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Stay in the loop
          </h2>
          <p className="text-base md:text-lg text-text-secondary mb-8">
            Get the latest updates on new features, AI tools, and platform improvements. No spam, ever.
          </p>

          {submitted ? (
            <div className="p-4 sm:p-6 rounded-2xl bg-accent/10 text-accent-hover font-medium">
              Thanks for subscribing! Check your inbox to confirm.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="w-full sm:w-auto">
                Subscribe
                <Send size={14} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
