'use client'

import { useState, useEffect } from 'react'
import { Users, Search, Mail, Shield, Ban, ChevronLeft, ChevronRight } from 'lucide-react'
import { getUsers, updateUser, deleteUser, type AdminUser } from '@/lib/admin-api'

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)
    getUsers(page, search).then((res) => {
      setUsers(res.items)
      setTotalPages(res.total_pages)
      setTotal(res.total)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [page, search])

  const handleDeactivate = async (id: string | number) => {
    if (!confirm('Deactivate this user?')) return
    await deleteUser(id)
    setUsers(prev => prev.map(u => u.id === id ? { ...u, is_active: false } : u))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-gray-400 text-sm mt-1">{total} registered users</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search users..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#1A1D24] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50"
        />
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No users found</div>
      ) : (
        <>
          <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">User</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Joined</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#A165DB]/20 flex items-center justify-center">
                          <span className="text-[#A165DB] text-xs font-bold">
                            {user.email?.slice(0, 2).toUpperCase() || '??'}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{user.username || 'No username'}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        user.is_active !== false
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-red-500/15 text-red-400'
                      }`}>
                        {user.is_active !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <a href={`mailto:${user.email}`} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors" title="Email">
                          <Mail size={14} />
                        </a>
                        {user.is_active !== false && (
                          <button onClick={() => handleDeactivate(user.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Deactivate">
                            <Ban size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white disabled:opacity-40">
                  <ChevronLeft size={14} />
                </button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white disabled:opacity-40">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
