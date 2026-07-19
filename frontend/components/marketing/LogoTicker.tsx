'use client'

import { MessageSquare, Image, Video, Music, FileText, Search, Wand2, Bot } from 'lucide-react'

const tools = [
  { name: 'AI Chat', icon: MessageSquare, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'AI Image Generator', icon: Image, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'AI Video Generator', icon: Video, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'AI Music Creator', icon: Music, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'AI PDF Tools', icon: FileText, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'AI Search', icon: Search, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'AI Image Editor', icon: Wand2, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'AI Assistant', icon: Bot, color: 'text-secondary', bg: 'bg-secondary/10' },
]

export function LogoTicker() {
  return (
    <section className="py-12 bg-primary border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm text-text-muted mb-8">Powered by the tools we build</p>

        {/* Ticker */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary to-transparent z-10" />

          {/* Scrolling tools */}
          <div className="flex items-center gap-12 animate-scroll">
            {[...tools, ...tools, ...tools].map((tool, i) => {
              const Icon = tool.icon
              return (
                <div
                  key={`${tool.name}-${i}`}
                  className="flex-shrink-0 flex items-center gap-3 h-12 px-5 rounded-xl bg-gray-50 border border-border hover:border-secondary/30 hover:shadow-sm transition-all cursor-default"
                >
                  <div className={`w-8 h-8 rounded-lg ${tool.bg} flex items-center justify-center`}>
                    <Icon size={16} className={tool.color} />
                  </div>
                  <span className="text-sm font-medium text-text-primary whitespace-nowrap">{tool.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
