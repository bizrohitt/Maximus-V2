import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Page not found</h2>
        <p className="text-text-secondary mb-4">The page you are looking for does not exist.</p>
        <Link href="/" className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-hover transition-colors inline-block">
          Go home
        </Link>
      </div>
    </div>
  )
}
