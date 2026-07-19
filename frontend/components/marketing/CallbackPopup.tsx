'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { Gift, X, Loader2, Mail, PartyPopper } from 'lucide-react'
import { ConfettiEffect } from '@/components/ui/ConfettiEffect'

const STORAGE_KEY = 'maximus-callback'
const COOLDOWN_HOURS = 24

function getCooldownEnd(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw).cooldownEnd ?? null
  } catch {
    return null
  }
}

function isSubmitted(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    return JSON.parse(raw).submitted === true
  } catch {
    return false
  }
}

/* ── Sound effects ── */
function playWhoosh() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.setValueAtTime(200, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3)
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.4)
  } catch {}
}

function playPop() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.setValueAtTime(600, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  } catch {}
}

/* ── Modern Minimal Rocket ── */
function RocketIcon({ className, glowing = false }: { className?: string; glowing?: boolean }) {
  return (
    <svg viewBox="0 0 70 100" fill="none" className={className}>
      {/* Nose cone */}
      <path d="M35 0L48 38H22L35 0Z" fill="#E74C3C" />
      <path d="M35 0L41 20H29L35 0Z" fill="#C0392B" opacity="0.25" />

      {/* Body */}
      <rect x="22" y="38" width="26" height="40" rx="3" fill="#FEFEFE" stroke="#E5E5E5" strokeWidth="0.5" />

      {/* Window glow layer */}
      {glowing && (
        <circle cx="35" cy="54" r="10" fill="#3498DB" opacity="0.3">
          <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Window */}
      <circle cx="35" cy="54" r="7" fill="#3498DB" stroke="#2980B9" strokeWidth="1" />
      <circle cx="33" cy="52" r="2.5" fill="white" opacity="0.35" />

      {/* Bottom detail */}
      <rect x="22" y="74" width="26" height="4" rx="2" fill="#EEE" />

      {/* Left fin */}
      <path d="M22 62L12 84L22 80V62Z" fill="#E74C3C" />
      <path d="M22 62L17 72L22 70V62Z" fill="#C0392B" opacity="0.25" />

      {/* Right fin */}
      <path d="M48 62L58 84L48 80V62Z" fill="#E74C3C" />
      <path d="M48 62L53 72L48 70V62Z" fill="#C0392B" opacity="0.25" />
    </svg>
  )
}

/* ── Exhaust Flame ── */
function ExhaustFlame({ active = true }: { active?: boolean }) {
  if (!active) return null
  return (
    <div className="relative w-10 flex flex-col items-center">
      {/* Glow behind */}
      <div className="absolute -inset-4 bg-orange-500/25 rounded-full blur-xl animate-glow-pulse" style={{ animationDuration: '0.2s' }} />

      {/* Main flame — tip at top, base at bottom */}
      <div className="origin-top animate-flame-flicker">
        <svg viewBox="0 0 32 50" fill="none" className="w-7">
          <path d="M16 0C16 0 2 20 2 32C2 40 7 46 16 50C25 46 30 40 30 32C30 20 16 0 16 0Z" fill="#FF4500" />
          <path d="M16 5C16 5 7 23 7 32C7 38 10 43 16 46C22 43 25 38 25 32C25 23 16 5 16 5Z" fill="#FF6B35" />
          <path d="M16 12C16 12 10 27 10 33C10 37 13 40 16 42C19 40 22 37 22 33C22 27 16 12 16 12Z" fill="#FFD93D" />
          <path d="M16 20C16 20 12 30 12 34C12 36 14 39 16 40C18 39 20 36 20 34C20 30 16 20 16 20Z" fill="#FFF9E6" />
        </svg>
      </div>

      {/* Secondary flicker */}
      <div className="absolute top-2 origin-top animate-secondary-flame">
        <svg viewBox="0 0 16 30" fill="none" className="w-3.5">
          <path d="M8 0C8 0 1 12 1 19C1 23 4 27 8 29C12 27 15 23 15 19C15 12 8 0 8 0Z" fill="#FFD93D" opacity="0.7" />
          <path d="M8 7C8 7 4 15 4 19C4 22 6 24 8 25C10 24 12 22 12 19C12 15 8 7 8 7Z" fill="#FFF9E6" opacity="0.8" />
        </svg>
      </div>

      {/* Sparks */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full bg-yellow-300 animate-spark-fly"
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.4s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-out',
            ['--spark-x' as string]: `${(Math.random() - 0.5) * 30}px`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Smoke Cloud ── */
function SmokeCloud({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 rounded-full bg-gradient-to-b from-gray-300 to-gray-400/30 blur-sm animate-smoke-rise"
          style={{
            animationDelay: `${i * 0.12}s`,
            ['--smoke-x' as string]: `${(Math.random() - 0.5) * 30}px`,
            ['--smoke-x-end' as string]: `${(Math.random() - 0.5) * 80}px`,
          }}
        />
      ))}
    </div>
  )
}

type Phase = 'landed' | 'takeoff' | 'airborne' | 'popup' | 'landing'

export function CallbackPopup() {
  const [phase, setPhase] = useState<Phase>('landed')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [showConfetti, setShowConfetti] = useState(false)
  const [showRocket, setShowRocket] = useState(false)

  // Show rocket after 1.5s
  useEffect(() => {
    const timer = setTimeout(() => setShowRocket(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Click handler - takeoff
  const handleRocketClick = () => {
    if (phase !== 'landed') return
    playWhoosh()
    setPhase('takeoff')
  }

  // Takeoff → airborne → popup
  useEffect(() => {
    if (phase === 'takeoff') {
      const timer = setTimeout(() => setPhase('airborne'), 400)
      return () => clearTimeout(timer)
    }
    if (phase === 'airborne') {
      const timer = setTimeout(() => {
        playPop()
        setPhase('popup')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const dismiss = () => {
    setPhase('landing')
    const cooldownEnd = Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, cooldownEnd }))
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cooldownEnd }))
    }
    // After landing animation, go back to landed
    setTimeout(() => setPhase('landed'), 1000)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return

    setStatus('loading')
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/v1/newsletter/subscribe/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'rocket-popup' }),
        }
      )
    } catch {}

    setStatus('success')
    setShowConfetti(true)
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...prev, submitted: true, cooldownEnd: Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000 })
      )
    } catch {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ submitted: true, cooldownEnd: Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000 })
      )
    }
  }

  const closePanel = () => {
    setPhase('landing')
    setStatus('idle')
    setEmail('')
    setTimeout(() => setPhase('landed'), 1000)
  }

  // Determine rocket position
  const getRocketY = () => {
    switch (phase) {
      case 'landed': return 0
      case 'takeoff': return -250
      case 'airborne': return -200
      case 'popup': return -200
      case 'landing': return 0
      default: return 0
    }
  }

  const isFlying = phase === 'takeoff' || phase === 'airborne' || phase === 'popup'
  const showFlames = phase === 'takeoff' || phase === 'airborne' || phase === 'popup'
  const showSmoke = phase === 'takeoff'

  return (
    <>
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* ── Rocket ── */}
      {showRocket && (
        <div
          className="fixed bottom-0 right-6 z-[250] animate-rocket-enter"
          style={{
            ['--rocket-y' as string]: `${getRocketY()}px`,
            animation: phase === 'landing'
              ? 'rocketEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both'
              : undefined,
          }}
        >
          {/* Smoke on takeoff */}
          <SmokeCloud visible={showSmoke} />

          {/* Rocket + Flame in flex column */}
          <div
            className={`flex flex-col items-center ${isFlying ? 'animate-rocket-fly' : 'animate-rocket-idle'} ${phase === 'landed' ? 'cursor-pointer hover:scale-110 active:scale-95 transition-transform' : ''}`}
            onClick={phase === 'landed' ? handleRocketClick : undefined}
          >
            {/* Idle glow */}
            {!isFlying && (
              <div className="absolute -inset-3 bg-red-500/30 rounded-full blur-xl pointer-events-none animate-glow-pulse" />
            )}

            {/* Pulsing ring — draws the eye */}
            {!isFlying && (
              <div
                className="absolute inset-0 border-2 border-red-500 rounded-full pointer-events-none animate-ring-pulse"
                style={{ boxShadow: '0 0 12px 2px rgba(239,68,68,0.6), 0 0 24px 4px rgba(239,68,68,0.3)' }}
              />
            )}

            {/* Notification badge */}
            {!isFlying && (
              <div className="absolute -top-1 -right-1 z-20 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-badge-pulse">
                <span className="text-[10px] font-bold text-white leading-none">1</span>
              </div>
            )}

            {/* Rocket SVG */}
            <RocketIcon className="w-14 h-20 drop-shadow-lg relative z-10" glowing={!isFlying} />

            {/* Exhaust flame — negative margin pulls it up to overlap body bottom */}
            {showFlames && (
              <div className="relative -mt-4 z-0">
                <ExhaustFlame active={true} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Origami popup ── */}
      {phase === 'popup' && (
        <div className="fixed inset-0 z-[280] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={closePanel}
          />

          <div
            className="relative w-full max-w-[440px] animate-origami-in"
            style={{ perspective: 1000 }}
          >
            <div className="bg-primary grid-lines rounded-2xl shadow-2xl border border-border overflow-hidden">

              <button
                onClick={closePanel}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X size={16} className="text-text-muted" />
              </button>

              {status === 'success' ? (
                <div className="px-6 py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5 animate-pop-in" style={{ animationDelay: '0.2s' }}>
                    <PartyPopper size={28} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-1.5">Congratulations!</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    Your free AI Toolkit is on its way!
                  </p>
                  <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10 mb-5 mx-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Gift size={16} className="text-secondary" />
                      <span className="text-sm font-semibold text-text-primary">Free AI Toolkit</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Check your inbox at <strong>{email}</strong> — your download link, prompt library, and bonus resources will arrive within 2 minutes.
                    </p>
                  </div>
                  <button
                    onClick={closePanel}
                    className="text-sm font-medium text-secondary hover:text-secondary-hover transition-colors"
                  >
                    Got it
                  </button>
                </div>
              ) : (
                <div className="px-6 pt-6 pb-7">
                  <div className="mb-5 animate-origami-icon-in">
                    <RocketIcon className="w-12 h-18" />
                  </div>

                  <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[11px] font-semibold uppercase tracking-wide mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Free for a limited time
                    </span>

                    <h3 className="text-xl font-bold text-text-primary leading-snug mb-1.5">
                      Get the free AI Toolkit — instant access
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      50+ battle-tested prompts, step-by-step setup guides, and 7 free AI tools — all delivered to your inbox.
                    </p>

                    <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/5 border border-secondary/10 mb-5">
                      <Gift size={14} className="text-secondary flex-shrink-0" />
                      <p className="text-xs text-text-secondary leading-snug">
                        <strong className="text-text-primary">50+ prompts</strong> for writing, SEO, and content — plus a bonus setup checklist.
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="animate-fade-slide-up space-y-3"
                    style={{ animationDelay: '0.5s' }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-gray-50 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all"
                    />

                    <button
                      type="submit"
                      disabled={status === 'loading' || !email.trim() || !email.includes('@')}
                      className="w-full py-3.5 rounded-xl bg-secondary text-white text-sm font-semibold hover:bg-secondary-hover transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail size={15} />
                          Send me the free toolkit
                        </>
                      )}
                    </button>
                  </form>

                  <p
                    className="animate-fade-slide-up text-center text-[11px] text-text-muted mt-3"
                    style={{ animationDelay: '0.7s' }}
                  >
                    100% free · No spam · Unsubscribe anytime
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
