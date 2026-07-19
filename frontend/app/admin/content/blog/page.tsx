'use client'

import { useState, useEffect } from 'react'
import { FileText, Plus, Search, Eye, Edit3, Trash2, AlertCircle } from 'lucide-react'
import { getBlogPosts } from '@/lib/admin-api'

interface BlogPost {
  id: number
  title: string
  slug: string
  first_published_at: string
  url_path: string
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const data = await getBlogPosts()
        setPosts(data)
      } catch {
        setError('Could not load posts from API')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your blog content via Wagtail CMS</p>
        </div>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/cms/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-secondary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          New Post (Wagtail)
        </a>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#1A1D24] text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-secondary)]/50"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Title</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Published</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Slug</th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">Loading...</td></tr>
            ) : filtered.length > 0 ? filtered.map((post) => (
              <tr key={post.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-gray-500" />
                    <span className="text-sm text-white">{post.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {post.first_published_at ? new Date(post.first_published_at).toLocaleDateString() : '—'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{post.slug}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={post.url_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Eye size={14} />
                    </a>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">No posts found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
