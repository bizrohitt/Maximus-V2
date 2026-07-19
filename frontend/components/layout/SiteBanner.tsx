'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

interface Banner {
  id: string
  name: string
  placement: string
  ad_code: string
  is_active: boolean
  priority: number
}

export function SiteBanner() {
  const pathname = usePathname()
  const [banners, setBanners] = useState<Banner[]>([])
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || pathname === '/') return

    const fetchBanners = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/v1/banners/site_banner/`
        )
        const data = await res.json()
        if (data.success && Array.isArray(data.data)) {
          setBanners(data.data)
        }
      } catch {
        // Silently fail — banners are non-critical
      }
    }
    fetchBanners()
  }, [mounted, pathname])

  const dismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id))
  }

  const visible = banners.filter((b) => !dismissed.has(b.id))

  if (pathname === '/' || visible.length === 0) return null

  return (
    <div>
      {visible.map((banner) => (
        <div
          key={banner.id}
          className="overflow-hidden transition-all duration-300 bg-secondary/10 border-b border-border"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div
              className="flex-1 text-sm text-text-primary [&_a]:text-secondary [&_a]:underline [&_a]:underline-offset-2"
              dangerouslySetInnerHTML={{ __html: banner.ad_code }}
            />
            <button
              onClick={() => dismiss(banner.id)}
              className="flex-shrink-0 p-1 rounded-md hover:bg-secondary/10 transition-colors cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X size={14} className="text-text-muted" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
