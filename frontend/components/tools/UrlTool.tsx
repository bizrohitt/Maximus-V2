'use client'

import { useState } from 'react'
import { Globe, Loader2, Check, AlertTriangle, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { CopyButton } from './CopyButton'

interface Metric {
  label: string
  value: string
  status?: 'good' | 'warn' | 'bad'
}

interface Props {
  endpoint: string
  placeholder?: string
}

export function UrlTool({ endpoint, placeholder = 'https://example.com' }: Props) {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyze = async () => {
    if (!url.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/v1/${endpoint}/`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) }
      )
      const data = await res.json()
      if (data.success) setResult(data)
      else setError(data.error ?? 'Something went wrong')
    } catch {
      setError('Failed to connect. Is the server running?')
    } finally {
      setLoading(false)
    }
  }

  const metrics = (): Metric[] => {
    if (!result) return []
    const m: Metric[] = []
    if (result.score !== undefined) {
      const s = Number(result.score)
      m.push({ label: 'Score', value: `${s}/100`, status: s >= 80 ? 'good' : s >= 50 ? 'warn' : 'bad' })
    }
    if (result.load_time !== undefined) {
      const t = Number(result.load_time)
      m.push({ label: 'Load Time', value: `${t}s`, status: t < 2 ? 'good' : t < 5 ? 'warn' : 'bad' })
    }
    if (result.total_requests !== undefined) {
      m.push({ label: 'Total Requests', value: String(result.total_requests) })
    }
    if (result.page_size_kb !== undefined) {
      m.push({ label: 'Page Size', value: `${result.page_size_kb} KB` })
    }
    if (result.page_title !== undefined) {
      m.push({ label: 'Page Title', value: String(result.page_title) })
    }
    return m
  }

  const recommendations = (): string[] => {
    if (!result?.recommendations || !Array.isArray(result.recommendations)) return []
    return result.recommendations as string[]
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-primary rounded-2xl border border-border p-5 md:p-8">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Enter a URL to analyze
        </label>
        <div className="flex gap-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="flex-1 border border-border rounded-xl px-4 py-3 text-sm text-text-primary bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
            onKeyDown={(e) => { if (e.key === 'Enter') analyze() }}
          />
          <Button onClick={analyze} disabled={loading || !url.trim()} loading={loading}>
            <Globe size={14} />
            Analyze
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        {result && (
          <div className="mt-6 space-y-4">
            {metrics().length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {metrics().map((m) => (
                  <div key={m.label} className="p-3 rounded-xl border border-border bg-gray-50">
                    <p className="text-xs text-text-muted mb-1">{m.label}</p>
                    <p className={`text-sm font-semibold ${
                      m.status === 'good' ? 'text-green-600'
                      : m.status === 'warn' ? 'text-amber-600'
                      : m.status === 'bad' ? 'text-red-600'
                      : 'text-text-primary'
                    }`}>{m.value}</p>
                  </div>
                ))}
              </div>
            )}

            {recommendations().length > 0 && (
              <div className="rounded-xl border border-border bg-gray-50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={14} className="text-amber-500" />
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Recommendations</p>
                </div>
                <ul className="space-y-2">
                  {recommendations().map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                      <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={String(result.url ?? url)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-secondary hover:underline"
            >
              <ExternalLink size={14} />
              Visit {String(result.url ?? url)}
            </a>
          </div>
        )}

        {loading && (
          <div className="mt-6 rounded-xl border border-border bg-gray-50 p-4 md:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Loader2 size={14} className="animate-spin text-yellow-500" />
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Analyzing...</p>
            </div>
            <p className="text-sm text-text-muted">Fetching and analyzing the page...</p>
          </div>
        )}
      </div>
    </div>
  )
}
