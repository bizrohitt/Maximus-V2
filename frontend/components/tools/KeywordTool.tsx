'use client'

import { useState } from 'react'
import { Sparkles, Loader2, TrendingUp, TrendingDown, Minus, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { CopyButton } from './CopyButton'

function difficultyLabel(score: number): { label: string; color: string; bg: string } {
  if (score < 30) return { label: 'Easy', color: '#059669', bg: '#ECFDF5' }
  if (score < 60) return { label: 'Medium', color: '#D97706', bg: '#FFFBEB' }
  return { label: 'Hard', color: '#DC2626', bg: '#FEF2F2' }
}

export function KeywordTool() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<{ keyword: string; difficulty: number }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const search = async () => {
    if (!keyword.trim()) return
    setLoading(true)
    setError('')
    setResults([])
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/v1/keyword-research/`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ keyword }) }
      )
      const data = await res.json()
      if (data.success) setResults(data.results)
      else setError(data.error ?? 'Something went wrong')
    } catch {
      setError('Failed to connect. Is the server running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-primary rounded-2xl border border-border p-5 md:p-8">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Enter a seed keyword
        </label>
        <div className="flex gap-3">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. seo tips"
            className="flex-1 border border-border rounded-xl px-4 py-3 text-sm text-text-primary bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
            onKeyDown={(e) => { if (e.key === 'Enter') search() }}
          />
          <Button onClick={search} disabled={loading || !keyword.trim()} loading={loading}>
            <Search size={14} />
            Search
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        {results.length > 0 && (
          <div className="mt-6 space-y-2">
            {results.map((r, i) => {
              const d = difficultyLabel(r.difficulty)
              return (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-gray-50 hover:bg-primary transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    {d.label === 'Easy' ? <TrendingDown size={16} className="text-green-500 flex-shrink-0" />
                      : d.label === 'Hard' ? <TrendingUp size={16} className="text-red-500 flex-shrink-0" />
                      : <Minus size={16} className="text-amber-500 flex-shrink-0" />}
                    <span className="text-sm text-text-primary truncate">{r.keyword}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: d.color, backgroundColor: d.bg }}>
                      {d.label} ({r.difficulty})
                    </span>
                    <CopyButton text={r.keyword} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
