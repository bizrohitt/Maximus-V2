'use client'

import { useState, useEffect } from 'react'
import { Megaphone, Users, BarChart3 } from 'lucide-react'
import { getCampaigns, type Campaign } from '@/lib/admin-api'

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCampaigns().then((res) => { setCampaigns(res.items); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Campaigns</h1>
        <p className="text-gray-400 text-sm mt-1">Email marketing and lead campaigns</p>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading campaigns...</div>
      ) : campaigns.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-12">No campaigns yet. Create a lead form in Marketing.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((c) => (
            <div key={c.id} className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#A165DB]/15 flex items-center justify-center">
                  <Megaphone size={16} className="text-[#A165DB]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{c.name}</div>
                  <div className="text-xs text-gray-500 truncate">{c.title}</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mb-3">{c.description || 'No description'}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Users size={12} />
                  <span>{c.submission_count} submissions</span>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  c.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'
                }`}>
                  {c.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
