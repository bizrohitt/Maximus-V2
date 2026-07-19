export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-2">Content</h3>
          <p className="text-sm text-gray-600">Manage your blog and SEO content.</p>
        </div>
        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-2">Tools</h3>
          <p className="text-sm text-gray-600">Access your AI-powered tools.</p>
        </div>
        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-2">Analytics</h3>
          <p className="text-sm text-gray-600">Track performance and leads.</p>
        </div>
      </div>
    </div>
  )
}