export default function MyPlugins() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">My Plugins</h1>
      
      <div className="border rounded-2xl p-8 text-center">
        <p className="text-gray-600">You haven&apos;t installed any plugins yet.</p>
        <a href="/marketplace" className="inline-block mt-4 text-[var(--color-accent)] font-medium">
          Browse Marketplace →
        </a>
      </div>
    </div>
  )
}