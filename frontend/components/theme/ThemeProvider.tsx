'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Palette = 'gold' | 'navy' | 'wine' | 'slate' | 'forest' | 'rose' | 'copper' | 'obsidian' | 'purple'

const palettes: Record<Palette, Record<string, string>> = {
  gold: {
    secondary: '#C9953D',
    'secondary-hover': '#B07D2E',
    'hero-bg': '#1A1508',
    'hero-glow': '#C9953D',
    'hero-dot-from': 'rgba(201, 149, 61, 0.35)',
    'hero-dot-to': 'rgba(62, 207, 142, 0.15)',
    'gray-900': '#1A1508',
  },
  navy: {
    secondary: '#1E3A5F',
    'secondary-hover': '#152A47',
    'hero-bg': '#0A0F1A',
    'hero-glow': '#1E3A5F',
    'hero-dot-from': 'rgba(30, 58, 95, 0.35)',
    'hero-dot-to': 'rgba(62, 207, 142, 0.15)',
    'gray-900': '#0A0F1A',
  },
  wine: {
    secondary: '#7B2D3B',
    'secondary-hover': '#62222E',
    'hero-bg': '#14080A',
    'hero-glow': '#7B2D3B',
    'hero-dot-from': 'rgba(123, 45, 59, 0.35)',
    'hero-dot-to': 'rgba(62, 207, 142, 0.15)',
    'gray-900': '#14080A',
  },
  slate: {
    secondary: '#2D3748',
    'secondary-hover': '#1E2533',
    'hero-bg': '#090A0D',
    'hero-glow': '#2D3748',
    'hero-dot-from': 'rgba(45, 55, 72, 0.35)',
    'hero-dot-to': 'rgba(62, 207, 142, 0.15)',
    'gray-900': '#090A0D',
  },
  forest: {
    secondary: '#2D6A4F',
    'secondary-hover': '#1E4D38',
    'hero-bg': '#0A140F',
    'hero-glow': '#2D6A4F',
    'hero-dot-from': 'rgba(45, 106, 79, 0.35)',
    'hero-dot-to': 'rgba(62, 207, 142, 0.15)',
    'gray-900': '#0A140F',
  },
  rose: {
    secondary: '#9B4D6E',
    'secondary-hover': '#7D3957',
    'hero-bg': '#180A10',
    'hero-glow': '#9B4D6E',
    'hero-dot-from': 'rgba(155, 77, 110, 0.35)',
    'hero-dot-to': 'rgba(62, 207, 142, 0.15)',
    'gray-900': '#180A10',
  },
  copper: {
    secondary: '#C4703A',
    'secondary-hover': '#A85D2C',
    'hero-bg': '#1A0E06',
    'hero-glow': '#C4703A',
    'hero-dot-from': 'rgba(196, 112, 58, 0.35)',
    'hero-dot-to': 'rgba(62, 207, 142, 0.15)',
    'gray-900': '#1A0E06',
  },
  obsidian: {
    secondary: '#1A1A2E',
    'secondary-hover': '#0E0E1A',
    'hero-bg': '#050508',
    'hero-glow': '#1A1A2E',
    'hero-dot-from': 'rgba(26, 26, 46, 0.35)',
    'hero-dot-to': 'rgba(62, 207, 142, 0.15)',
    'gray-900': '#050508',
  },
  purple: {
    secondary: '#A165DB',
    'secondary-hover': '#8A4FC0',
    'hero-bg': '#150B1F',
    'hero-glow': '#A165DB',
    'hero-dot-from': 'rgba(161, 101, 219, 0.35)',
    'hero-dot-to': 'rgba(62, 207, 142, 0.15)',
    'gray-900': '#150B1F',
  },
}

interface ThemeContextType {
  palette: Palette
  togglePalette: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  palette: 'gold',
  togglePalette: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [palette, setPalette] = useState<Palette>('gold')

  useEffect(() => {
    const saved = localStorage.getItem('maximus-palette') as Palette | null
    if (saved && (saved === 'gold' || saved === 'navy' || saved === 'wine' || saved === 'slate' || saved === 'forest' || saved === 'rose' || saved === 'copper' || saved === 'obsidian' || saved === 'purple')) {
      setPalette(saved)
    }
  }, [])

  useEffect(() => {
    const colors = palettes[palette]
    if (!colors) return
    const root = document.documentElement
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-secondary-hover', colors['secondary-hover'])
    root.style.setProperty('--color-hero-bg', colors['hero-bg'])
    root.style.setProperty('--color-hero-glow', colors['hero-glow'])
    root.style.setProperty('--hero-dot-from', colors['hero-dot-from'])
    root.style.setProperty('--hero-dot-to', colors['hero-dot-to'])
    root.style.setProperty('--color-gray-900', colors['gray-900'])
    localStorage.setItem('maximus-palette', palette)

    // Update favicon via canvas — ThemeProvider owns it, no Next.js metadata
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 32
      canvas.height = 32
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 32, 32)
        grad.addColorStop(0, colors.secondary)
        grad.addColorStop(1, colors['secondary-hover'])
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.roundRect(0, 0, 32, 32, 6)
        ctx.fill()
        ctx.fillStyle = 'white'
        ctx.font = 'bold 18px system-ui'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('M', 16, 18)
        // Create or replace favicon link — unique data URL prevents cache
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null
        if (!link) {
          link = document.createElement('link')
          link.rel = 'icon'
          document.head.appendChild(link)
        }
        link.href = canvas.toDataURL('image/png')
      }
    } catch {}
  }, [palette])

  const togglePalette = () => {
    setPalette((prev) => {
      if (prev === 'gold') return 'navy'
      if (prev === 'navy') return 'wine'
      if (prev === 'wine') return 'slate'
      if (prev === 'slate') return 'forest'
      if (prev === 'forest') return 'rose'
      if (prev === 'rose') return 'copper'
      if (prev === 'copper') return 'obsidian'
      if (prev === 'obsidian') return 'purple'
      return 'gold'
    })
  }

  return (
    <ThemeContext.Provider value={{ palette, togglePalette }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
