'use client'

import { useState, useEffect } from 'react'
import { Mail, Users, AlertCircle } from 'lucide-react'
import { getLeadForms, getLeadSubmissions, type LeadForm, type LeadSubmission } from '@/lib/admin-api'

export default function MarketingPage() {
  const [forms, setForms] = useState<LeadForm[]>([])
  const [submissions, setSubmissions] = useState<LeadSubmission[]>([])
  const [formCount, setFormCount] = useState(0)
  const [submissionCount, setSubmissionCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [f, s] = await Promise.allSettled([getLeadForms(), getLeadSubmissions()])
        if (f.status === 'fulfilled') {
          setForms(f.value.items || [])
          setFormCount(f.value.total || 0)
        }
        if (s.status === 'fulfilled') {
          setSubmissions(s.value.items || [])
          setSubmissionCount(s.value.total || 0)
        }
      } catch {
        setError('Could not load marketing data from API')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Marketing</h1>
        <p className="text-gray-400 text-sm mt-1">Manage lead forms, submissions, and campaigns</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
          <div className="text-2xl font-bold text-white">{formCount}</div>
          <div className="text-xs text-gray-500 mt-1">Lead Forms</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
          <div className="text-2xl font-bold text-white">{submissionCount.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Total Submissions</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#1A1D24] p-5">
          <div className="text-2xl font-bold text-white">{forms.filter(f => f.is_active).length}</div>
          <div className="text-xs text-gray-500 mt-1">Active Forms</div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="font-semibold text-white">Lead Forms</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Title</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500 text-sm">Loading...</td></tr>
            ) : forms.length > 0 ? forms.map((f) => (
              <tr key={f.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white">{f.name}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{f.title}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${f.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'}`}>
                    {f.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500 text-sm">No forms found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#1A1D24] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="font-semibold text-white">Recent Submissions</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Email</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500 text-sm">Loading...</td></tr>
            ) : submissions.length > 0 ? submissions.slice(0, 10).map((s) => (
              <tr key={s.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white">{s.name || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{s.email}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{new Date(s.created_at).toLocaleDateString()}</td>
              </tr>
            )) : (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500 text-sm">No submissions yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
