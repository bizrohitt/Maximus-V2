'use client'

import { usePathname } from 'next/navigation'
import { AnimatedNavbar } from '@/components/layout/AnimatedNavbar'
import { UtilityBar } from '@/components/layout/UtilityBar'
import { SiteBanner } from '@/components/layout/SiteBanner'
import { Footer } from '@/components/layout/Footer'
import { GiftPopupCTA } from '@/components/marketing/GiftPopupCTA'
import { CallbackPopup } from '@/components/marketing/CallbackPopup'
import { HoneypotBait } from '@/components/layout/HoneypotBait'

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <UtilityBar />
      <AnimatedNavbar />
      <SiteBanner />
      <main className="flex-1">{children}</main>
      <Footer />
      <GiftPopupCTA />
      <CallbackPopup />
      <HoneypotBait />
    </>
  )
}
