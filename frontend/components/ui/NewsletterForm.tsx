'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  if (submitted) {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold text-white">Thanks for subscribing!</p>
        <p className="text-sm text-white/70 mt-1">Check your inbox for a confirmation email.</p>
      </div>
    )
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2"
        style={{
          color: 'var(--color-text-primary)',
          backgroundColor: 'var(--color-bg-base)',
        }}
      />
      <button
        type="submit"
        className="px-8 py-3.5 font-semibold rounded-2xl transition-colors text-sm"
        style={{
          backgroundColor: 'var(--color-bg-base)',
          color: 'var(--color-secondary)',
        }}
      >
        Subscribe
      </button>
    </form>
  )
}
