'use client'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Something went wrong</h2>
        <p className="text-text-secondary mb-4">{error.message}</p>
        <button onClick={reset} className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-hover transition-colors">
          Try again
        </button>
      </div>
    </div>
  )
}
