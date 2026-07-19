'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon?: LucideIcon
}

interface GooeyNavProps {
  items: NavItem[]
  activeHref: string | null
  scrolled?: boolean
}

export function GooeyNav({ items, activeHref, scrolled = false }: GooeyNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(
    items.findIndex((item) => item.href === activeHref)
  )
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const idx = items.findIndex((item) => item.href === activeHref)
    if (idx !== -1) setActiveIndex(idx)
  }, [activeHref, items])

  useEffect(() => {
    const updateIndicator = () => {
      const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex
      const el = itemRefs.current[targetIndex]
      const nav = navRef.current
      if (el && nav) {
        const navRect = nav.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()
        setIndicatorStyle({
          left: elRect.left - navRect.left,
          width: elRect.width,
        })
      }
    }
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [hoveredIndex, activeIndex])

  return (
    <div className="relative flex items-center" ref={navRef}>
      {/* Sliding blob indicator */}
      <div className="absolute inset-0" style={{ filter: 'url(#gooey-nav)' }}>
        <div
          className="absolute h-10 rounded-2xl bg-secondary/20 transition-all duration-300 ease-out"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      </div>

      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="gooey-nav">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Nav items */}
      {items.map((item, index) => {
        const isActive = activeIndex === index
        const isHovered = hoveredIndex === index
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => { itemRefs.current[index] = el }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative z-10 px-4 py-2.5 rounded-2xl block group"
          >
            <span
              className="text-sm font-medium whitespace-nowrap inline-flex items-center gap-1.5 transition-all duration-200"
              style={{ color: isActive || isHovered ? 'var(--color-secondary)' : '#6B7280' }}
            >
              {Icon && (
                <span
                  className={`inline-flex transition-all duration-300 ${
                    isHovered ? 'scale-115 -rotate-12' : isActive ? 'scale-110' : ''
                  }`}
                >
                  <Icon size={15} strokeWidth={isActive || isHovered ? 2.5 : 2} />
                </span>
              )}
              {item.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
