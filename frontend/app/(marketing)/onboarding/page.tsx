/**
 * OnboardingPage
 * Design Tokens: --color-secondary, --color-accent, --color-text-primary, --color-text-secondary,
 *                --color-bg-subtle, --color-bg-base, --color-border, --radius-2xl
 * Alpine.js: No | Dark Mode: Yes | Responsive: Mobile-first
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, ArrowRight, Sparkles, ShoppingBag, Layers, BarChart3 } from 'lucide-react'

const goals = [
  {
    id: 'seo',
    icon: Sparkles,
    title: 'SEO & Content',
    desc: 'Create and optimise content to rank in search engines',
  },
  {
    id: 'downloads',
    icon: ShoppingBag,
    title: 'Sell Digital Products',
    desc: 'Sell templates, guides, and digital resources',
  },
  {
    id: 'directory',
    icon: Layers,
    title: 'Build a Directory',
    desc: 'Create a curated directory of tools or resources',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Track & Grow',
    desc: 'Measure traffic, leads, and revenue with analytics',
  },
]

const TOTAL_STEPS = 3

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [siteName, setSiteName] = useState('')

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    )
  }

  const progress = ((step - 1) / TOTAL_STEPS) * 100

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
      <div className="w-full max-w-lg">

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Step {step} of {TOTAL_STEPS}
            </span>
            <Link
              href="/"
              className="text-xs transition-colors hover:opacity-70"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Skip setup
            </Link>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--color-bg-muted)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: 'var(--color-secondary)' }}
            />
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl border p-8"
          style={{ backgroundColor: 'var(--color-bg-base)', borderColor: 'var(--color-border)' }}
        >

          {/* Step 1: Welcome */}
          {step === 1 && (
            <div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Welcome to Maximus
              </h1>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                Let&apos;s get you set up in just a few steps.
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    What&apos;s your site or project name?
                  </label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="e.g. My SEO Blog"
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)',
                      backgroundColor: 'var(--color-bg-base)',
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!siteName.trim()}
                className="w-full py-3 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <div>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                What&apos;s your main goal?
              </h2>
              <p className="mb-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Select everything that applies — you can change this later.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {goals.map((goal) => {
                  const Icon = goal.icon
                  const selected = selectedGoals.includes(goal.id)
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className="flex items-start gap-3 p-4 rounded-xl border text-left transition-all"
                      style={{
                        borderColor: selected ? 'var(--color-secondary)' : 'var(--color-border)',
                        backgroundColor: selected ? 'var(--color-bg-muted)' : 'var(--color-bg-base)',
                      }}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {selected ? (
                          <CheckCircle2 size={18} style={{ color: 'var(--color-secondary)' }} />
                        ) : (
                          <Circle size={18} style={{ color: 'var(--color-text-muted)' }} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Icon size={14} style={{ color: 'var(--color-secondary)' }} />
                          <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            {goal.title}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {goal.desc}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={selectedGoals.length === 0}
                className="w-full py-3 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 3: Complete */}
          {step === 3 && (
            <div className="text-center py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <CheckCircle2 size={32} className="text-white" />
              </div>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                You&apos;re all set, {siteName}!
              </h2>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                Your Maximus workspace is ready. Let&apos;s start building.
              </p>
              <Link
                href="/ai-tools"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                Start Creating
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
