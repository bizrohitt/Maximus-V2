'use client'

import { useState, useEffect, FormEvent } from 'react'
import { X, Loader2, Zap, Shield, Clock, Gift, PartyPopper } from 'lucide-react'

const STORAGE_KEY = 'maximus-gift-rain'
const COOLDOWN_MS = 0

function isInCooldown(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const ts = JSON.parse(raw).ts ?? 0
    return Date.now() - ts < COOLDOWN_MS
  } catch { return false }
}

export function GiftPopupCTA() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (isInCooldown()) return
    setTimeout(() => setOpen(true), 2000)
  }, [])

  const dismiss = () => setOpen(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) { setErrorMsg('Please enter a valid email.'); return }
    setStatus('loading'); setErrorMsg('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/v1/newsletter/subscribe/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok || data.success) setStatus('success')
      else { setErrorMsg(data.error ?? 'Something went wrong. Try again.'); setStatus('idle') }
    } catch { setStatus('success') }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={dismiss} />

      <div className="relative w-full max-w-[440px] bg-primary grid-lines rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        <button onClick={dismiss} className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
          <X size={18} className="text-text-muted" />
        </button>

        {status === 'success' ? (
          <div className="px-8 py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5 animate-pop-in">
              <PartyPopper size={28} className="text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Congratulations!</h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Your free AI Toolkit is on its way!</p>
            <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10 mb-5">
              <div className="flex items-center gap-3 mb-2">
                <Gift size={18} className="text-secondary" />
                <span className="text-sm font-semibold text-text-primary">Free AI Toolkit</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Check your inbox at <strong>{email}</strong> — your download link, prompt library, and bonus resources will arrive within 2 minutes.
              </p>
            </div>
            <p className="text-xs text-text-muted mb-4">Check spam/promotions if you don&apos;t see it. Add us to your contacts for future updates.</p>
            <button onClick={dismiss} className="text-sm font-medium text-secondary hover:text-secondary-hover transition-colors">Got it, close this</button>
          </div>
        ) : (
          <div className="px-7 pt-7 pb-8 sm:px-8 sm:pt-8 sm:pb-9">
            <div className="animate-fade-slide-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-xs font-medium text-secondary mb-4" style={{ animationDelay: '150ms' }}>
              <Gift size={12} />
              Free download inside
            </div>
            <h2 className="animate-fade-slide-up text-[22px] sm:text-2xl font-bold text-text-primary leading-tight mb-1.5" style={{ animationDelay: '200ms' }}>
              Get the free AI Toolkit
            </h2>
            <p className="animate-fade-slide-up text-sm text-text-secondary leading-relaxed mb-5" style={{ animationDelay: '250ms' }}>
              The same tools 10,000+ creators use to write, design, and ship content — plus our exclusive prompt library and setup guides.
            </p>
            <div className="animate-fade-slide-up p-4 rounded-xl bg-gray-50 border border-border mb-6" style={{ animationDelay: '300ms' }}>
              <p className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-3">What&apos;s inside:</p>
              <ul className="space-y-2.5">
                {[
                  { icon: Zap, text: '7 AI tools — unlimited use, zero cost' },
                  { icon: Gift, text: '50+ battle-tested prompts (copy-paste ready)' },
                  { icon: Shield, text: 'Step-by-step setup guide for each tool' },
                  { icon: Clock, text: 'Working in 30 seconds' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={12} className="text-secondary" />
                    </div>
                    <span className="text-sm text-text-primary leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="animate-fade-slide-up space-y-3" style={{ animationDelay: '350ms' }}>
              <input
                type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrorMsg('') }}
                placeholder="Enter your email to get instant access" required
                className="w-full px-4 py-3.5 rounded-xl border border-border bg-gray-50 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all"
              />
              {errorMsg && <p className="text-xs text-red-500 -mt-1 pl-1">{errorMsg}</p>}
              <button type="submit" disabled={status === 'loading'} className="w-full py-3.5 rounded-xl bg-secondary text-white text-sm font-semibold hover:bg-secondary-hover transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer">
                {status === 'loading' ? (<><Loader2 size={16} className="animate-spin" />Sending...</>) : (<><Gift size={15} />Send me the free toolkit</>)}
              </button>
            </form>
            <p className="animate-fade-slide-up text-center text-[11px] text-text-muted mt-4" style={{ animationDelay: '400ms' }}>
              Free forever · No spam · Unsubscribe anytime
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
