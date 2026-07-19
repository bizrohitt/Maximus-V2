import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: 'var(--color-bg-subtle)' }}
    >
      <div className="w-full max-w-md text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: 'var(--color-bg-muted)' }}
        >
          <Lock size={28} style={{ color: 'var(--color-secondary)' }} />
        </div>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Coming Soon
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          Authentication is not available yet. Check back soon.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-secondary)' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
