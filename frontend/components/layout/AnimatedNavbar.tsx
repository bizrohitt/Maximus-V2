'use client'

import { useState, useEffect, useRef, Children, cloneElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Download, FolderOpen, Zap, Palette, Mail, BookOpen, Star, Home, Sparkles, PenTool, Info, Briefcase } from 'lucide-react'
import { useTheme } from '@/components/theme/ThemeProvider'
import { SearchModal } from './SearchModal'
import { GooeyNav } from './GooeyNav'

function GlowingLogo({ scrolled }: { scrolled: boolean }) {
  const { palette } = useTheme()
  const glowColor = palette === 'gold' ? 'rgba(201, 149, 61,' : 'rgba(59, 179, 128,'
  const [initialSpin, setInitialSpin] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setInitialSpin(false), 700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center relative overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        boxShadow: scrolled
          ? `0 0 20px ${glowColor} 0.3), 0 0 40px ${glowColor} 0.1)`
          : `0 0 0px ${glowColor} 0)`,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1) rotate(5deg)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1) rotate(0deg)' }}
      onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.95)' }}
      onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1) rotate(5deg)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent animate-spin-slow" />
      <span
        className="text-white font-bold text-lg leading-none relative z-10 transition-transform duration-600 ease-in-out"
        style={{ transform: initialSpin ? 'rotate(360deg)' : 'rotate(0deg)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(360deg)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg)' }}
      >
        M
      </span>
    </div>
  )
}

/* ── Bouncy scale nav item ── */
function BouncyNavItem({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link href={href} className="relative px-4 py-2.5 rounded-xl block">
      {active && (
        <div className="absolute inset-0 bg-secondary/10 rounded-xl transition-all duration-300" />
      )}

      <span
        className="relative z-10 text-sm font-medium block transition-all duration-200 ease-out"
        style={{ color: active ? 'var(--color-secondary)' : '#374151' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.12) translateY(-2px)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-secondary)' }}
        onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)'; (e.currentTarget as HTMLElement).style.color = '#374151' } }}
      >
        {label}
      </span>
    </Link>
  )
}

/* ── Resources dropdown ── */
function ResourcesDropdown({ open, onOpenChange, resourceLinks, scrolled }: {
  open: boolean
  onOpenChange: (v: boolean) => void
  resourceLinks: Array<{ label: string; href: string; icon: any }>
  scrolled: boolean
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <span
        className="relative px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-secondary transition-all duration-200 ease-out inline-flex items-center gap-1.5 cursor-pointer"
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.12) translateY(-2px)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)' }}
      >
        <span className="inline-flex animate-wiggle">
          <FolderOpen size={15} />
        </span>
        Resources
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown size={14} />
        </span>
      </span>

      {open && (
        <div className="absolute top-full left-0 w-64 py-3 rounded-2xl border border-border bg-primary shadow-2xl mt-2 overflow-hidden animate-fade-in">
          {resourceLinks.map(({ label, href, icon: Icon }, index) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-4 px-5 py-3.5 text-sm text-text-primary hover:bg-gray-50 transition-all"
            >
              <div
                className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(-15deg) scale(1.2)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) scale(1)' }}
              >
                <Icon size={18} className="text-secondary" />
              </div>
              <div>
                <div className="font-medium group-hover:text-secondary transition-colors">{label}</div>
                <div className="text-xs text-text-muted mt-0.5">Browse {label.toLowerCase()}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function AnimatedNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const pathname = usePathname()
  const { palette, togglePalette } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setResourcesOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'AI Tools', href: '/ai-tools', icon: Sparkles },
    { label: 'Blog', href: '/blog', icon: PenTool },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Business', href: '/contact-business', icon: Briefcase },
  ]

  const resourceLinks = [
    { label: 'Downloads', href: '/downloads', icon: Download },
    { label: 'Directories', href: '/directories', icon: FolderOpen },
    { label: 'Mini Courses', href: '/mini-courses', icon: BookOpen },
    { label: 'Resources I Use', href: '/resources', icon: Star },
    { label: 'Newsletter', href: '/newsletter', icon: Mail },
  ]

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-10 ${scrolled ? 'px-4 sm:px-6 lg:px-8' : ''}`}
        style={{ animation: 'slideDown 0.4s ease-out' }}
      >
        <nav
          className={`
            relative flex items-center justify-between
            px-5 sm:px-8 w-full
            transition-all duration-400
            ${scrolled
              ? 'max-w-[800px] rounded-2xl h-[52px] bg-white/95 border-2 border-black'
              : 'max-w-full rounded-none h-[72px] bg-white/90'
            }
          `}
        >
          {/* Logo */}
          {!scrolled && (
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 relative z-10">
              <GlowingLogo scrolled={scrolled} />
              <span
                className="font-bold text-text-primary tracking-tight text-xl"
              >
                Maximus
              </span>
            </Link>
          )}

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-1 ${scrolled ? 'flex-1 justify-center' : 'border border-black rounded-2xl px-2 py-1'}`}>
            <GooeyNav items={navLinks} activeHref={pathname} scrolled={scrolled} />

            <ResourcesDropdown
              open={resourcesOpen}
              onOpenChange={setResourcesOpen}
              resourceLinks={resourceLinks}
              scrolled={scrolled}
            />
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {!scrolled && <SearchModal />}

            {/* Palette toggle */}
            <button
              onClick={togglePalette}
              className="p-2.5 rounded-xl border border-border bg-gray-50 hover:bg-gray-100 transition-colors"
              title={`Switch to ${palette === 'gold' ? 'navy' : palette === 'navy' ? 'wine' : palette === 'wine' ? 'slate' : palette === 'slate' ? 'forest' : palette === 'forest' ? 'rose' : palette === 'rose' ? 'copper' : palette === 'copper' ? 'obsidian' : palette === 'obsidian' ? 'purple' : 'gold'} palette`}
            >
              <span className={`transition-transform duration-300 ${palette !== 'gold' ? 'rotate-180' : ''}`}>
                <Palette size={16} className="text-gray-500" />
              </span>
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl text-text-primary hover:bg-gray-100 transition-colors relative z-10"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[320px] max-w-[85vw] bg-primary shadow-2xl overflow-hidden animate-slide-right">
            <div className="absolute top-0 left-0 bottom-0 w-1">
              <div className="h-full w-full bg-gradient-to-b from-[var(--color-secondary)] to-[var(--color-secondary)] animate-gradient-flow" />
            </div>

            <div className="flex flex-col h-full pt-24 px-8 pb-8">
              <div className="flex-1 space-y-2">
                {navLinks.map(({ label, href, icon: Icon }, index) => (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      block py-4 text-xl font-medium border-b border-gray-100 transition-all relative
                      ${pathname === href ? 'text-secondary' : 'text-gray-700 hover:text-secondary'}
                    `}
                  >
                    <span className="flex items-center gap-3">
                      {pathname === href && (
                        <div className="w-1 h-7 bg-secondary rounded-full" />
                      )}
                      {Icon && (
                        <span
                          className="inline-flex transition-transform duration-400"
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(-12deg) scale(1.2)' }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) scale(1)' }}
                        >
                          <Icon size={22} />
                        </span>
                      )}
                      {label}
                    </span>
                  </Link>
                ))}

                {/* Resources */}
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className="flex items-center justify-between w-full py-4 text-xl font-medium text-gray-700 border-b border-gray-100"
                >
                  <span className="flex items-center gap-3">
                    <span className={`inline-flex animate-wiggle ${resourcesOpen ? 'rotate-180' : ''}`} style={{ transition: 'transform 0.4s' }}>
                      <FolderOpen size={22} />
                    </span>
                    Resources
                  </span>
                  <ChevronDown size={20} className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>

                {resourcesOpen && (
                  <div className="pl-6 py-3 space-y-2 animate-fade-in">
                    {resourceLinks.map(({ label, href, icon: Icon }, index) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-4 py-3 text-base text-gray-700 hover:text-secondary transition-colors"
                      >
                        <div
                          className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center"
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(-15deg) scale(1.2)' }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) scale(1)' }}
                        >
                          <Icon size={18} className="text-secondary" />
                        </div>
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-28" />
    </>
  )
}