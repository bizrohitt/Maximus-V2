'use client'

import { useState } from 'react'

export default function AIDashboard() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const generateContent = async () => {
    setLoading(true)
    // In production, call your API endpoint
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    })
    const data = await response.json()
    setResult(data.content || 'Error generating content')
    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">AI Studio</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What would you like the AI to generate?"
            className="w-full h-40 border rounded-xl p-4 resize-y"
          />
          <button 
            onClick={generateContent}
            disabled={loading}
            className="mt-4 bg-[var(--color-accent)] text-white px-8 py-3 rounded-xl font-medium disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>

        <div className="border rounded-xl p-6 bg-gray-50 min-h-[200px]">
          <h3 className="font-semibold mb-3">Result</h3>
          {result ? (
            <div className="prose text-sm whitespace-pre-wrap">{result}</div>
          ) : (
            <p className="text-gray-500 text-sm">AI output will appear here...</p>
          )}
        </div>
      </div>
    </div>
  )
}