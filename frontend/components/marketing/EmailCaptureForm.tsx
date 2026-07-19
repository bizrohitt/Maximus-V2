'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, CheckCircle2, Gift } from 'lucide-react'

export function EmailCaptureForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1500)
  }

  if (status === 'success') {
    return (
      <div className="inline-flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-accent/10 border border-accent/20">
        <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
          <Gift size={28} className="text-accent" />
        </div>
        <div className="text-center">
          <p className="text-white font-semibold text-lg mb-1">You&apos;re in!</p>
          <p className="text-white/60 text-sm">Check your inbox for the free gift.</p>
        </div>
      </div>
    )
  }

  const showLabel = !focused && !email

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-lg mx-auto rounded-xl overflow-hidden">
      <div className="relative flex-1">
        <span
          className={`absolute left-5 top-1/2 -translate-y-1/2 text-sm pointer-events-none transition-all duration-200 ${
            showLabel ? 'opacity-100' : 'opacity-0'
          } text-gray-500`}
        >
          Enter your email to claim your gift
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required
          className={`w-full px-5 py-4 rounded-xl sm:rounded-r-none bg-white text-gray-900 text-sm focus:outline-none transition-all duration-300 ${
            email
              ? 'ring-2 ring-secondary/60 shadow-[0_0_12px_rgba(181,48,10,0.3)]'
              : 'ring-1 ring-gray-200 focus:ring-2 focus:ring-secondary/50'
          }`}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl sm:rounded-l-none bg-secondary text-white font-semibold text-sm hover:bg-secondary-hover transition-colors disabled:opacity-60 cursor-pointer"
      >
        {status === 'loading' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            Get Free Access
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  )
}
