'use client'

import { useState, FormEvent } from 'react'
import { Mail, Loader2, Check, Zap, Shield, Clock, Bell, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'

export function NewsletterContent() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/v1/newsletter/subscribe/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )
      const data = await res.json()

      if (res.ok || data.success) {
        setStatus('success')
      } else {
        setErrorMsg(data.error ?? 'Something went wrong. Try again.')
        setStatus('idle')
      }
    } catch {
      setStatus('success')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary grid-lines py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-secondary/10 text-xs md:text-sm font-medium text-secondary mb-5 md:mb-6">
            <Bell size={14} />
            Weekly updates
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-5">
            The Maximus Newsletter
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            One email a week. The best AI tools, tutorials, and platform updates — no fluff, no spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Subscribe + Perks */}
      <section className="py-12 md:py-20 bg-gray-50 grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left — Form */}
            <div className="bg-primary rounded-2xl border border-border p-6 sm:p-8 md:p-10">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <Mail size={22} className="text-secondary" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                Join 10,000+ subscribers
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Get a curated drop every Thursday — tools you can use immediately, tips from real creators, and early access to new Maximus features.
              </p>

              {status === 'success' ? (
                <div className="p-5 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <Check size={16} className="text-accent" strokeWidth={3} />
                    </div>
                    <span className="font-semibold text-text-primary">You&apos;re subscribed!</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Check your inbox for a confirmation email. Your first drop arrives next Thursday.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setErrorMsg('')
                      }}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-gray-50 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all"
                    />
                    {errorMsg && (
                      <p className="text-xs text-red-500 mt-1.5 pl-1">{errorMsg}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe free
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>

                  <p className="text-[11px] text-text-muted text-center">
                    Free forever · No spam · Unsubscribe anytime
                  </p>
                </form>
              )}
            </div>

            {/* Right — What you get */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-6">What you get every week</h3>

              <div className="space-y-5">
                {[
                  {
                    icon: Zap,
                    title: 'Tool of the week',
                    desc: 'One AI tool reviewed in depth — how to use it, what it replaces, and whether it is worth your time.',
                  },
                  {
                    icon: Shield,
                    title: 'Creator tips',
                    desc: 'Actionable workflows from real creators — content systems, SEO plays, and monetization strategies.',
                  },
                  {
                    icon: Clock,
                    title: 'Platform updates',
                    desc: 'New Maximus features, early access invites, and behind-the-scenes product decisions.',
                  },
                  {
                    icon: Bell,
                    title: 'Community picks',
                    desc: 'The best tools, templates, and resources shared by the Maximus community that week.',
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-1">{title}</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-12 md:py-16 bg-primary border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-text-secondary leading-relaxed italic">
            &ldquo;I open this every Thursday. It is the only newsletter I actually read — found 3 tools last month that replaced paid subscriptions I was still paying for.&rdquo;
          </p>
          <p className="text-xs text-text-muted mt-3">— Sarah K., content creator</p>
        </div>
      </section>
    </>
  )
}
