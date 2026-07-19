'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Bot, User } from 'lucide-react'
import { CopyButton } from './CopyButton'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function ChatTool({ generate }: { generate: (prompt: string) => Promise<string> }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)
    const reply = await generate(userMsg)
    setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-primary rounded-2xl border border-border overflow-hidden">
        <div className="h-[400px] overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-text-muted">Ask me anything — I&apos;m here to help.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-secondary" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-secondary text-white' : 'bg-gray-50 border border-border text-text-primary'}`}>
                  {msg.content}
                </div>
                {msg.role === 'assistant' && (
                  <div className="mt-1.5 flex justify-end">
                    <CopyButton text={msg.content} />
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-secondary" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-gray-50 border border-border">
                <Loader2 size={16} className="animate-spin text-text-muted" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-gray-50 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-secondary text-white hover:bg-secondary-hover transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
