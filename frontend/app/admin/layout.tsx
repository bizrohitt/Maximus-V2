'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import {
  LayoutDashboard, FileText, ShoppingCart, Sparkles, Megaphone,
  BarChart3, Settings, Users, Globe, ChevronDown,
  LogOut, PanelLeftClose, PanelLeft, Monitor, Shield,
  FolderOpen, Puzzle, Webhook, Building2, CreditCard, Library,
} from 'lucide-react'
import { setToken, clearToken, isLoggedIn, login as apiLogin } from '@/lib/admin-api'

interface NavGroup {
  label: string
  icon: any
  href?: string
  children?: { label: string; href: string }[]
}

const navGroups: NavGroup[] = [
  { label: 'Overview', icon: LayoutDashboard, href: '/admin' },
  {
    label: 'Content', icon: FileText,
    children: [
      { label: 'Blog Posts', href: '/admin/content/blog' },
    ],
  },
  {
    label: 'Commerce', icon: ShoppingCart,
    children: [
      { label: 'Overview', href: '/admin/commerce' },
      { label: 'Orders', href: '/admin/commerce/orders' },
      { label: 'Coupons', href: '/admin/commerce/coupons' },
    ],
  },
  {
    label: 'AI Tools', icon: Sparkles,
    children: [
      { label: 'Tools Manager', href: '/admin/ai-tools' },
      { label: 'Prompt Templates', href: '/admin/ai-tools/prompts' },
      { label: 'Usage Analytics', href: '/admin/ai-tools/analytics' },
    ],
  },
  {
    label: 'Marketing', icon: Megaphone,
    children: [
      { label: 'Overview', href: '/admin/marketing' },
      { label: 'Campaigns', href: '/admin/marketing/campaigns' },
      { label: 'Popups & Banners', href: '/admin/marketing/popups' },
    ],
  },
  { label: 'Advertising', icon: Monitor, href: '/admin/advertising' },
  { label: 'Users', icon: Users, href: '/admin/users' },
  { label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { label: 'Directories', icon: Globe, href: '/admin/directories' },
  { label: 'Resources', icon: Library, href: '/admin/resources' },
  { label: 'Site Settings', icon: Settings, href: '/admin/settings' },
  {
    label: 'Extensions', icon: Puzzle,
    children: [
      { label: 'Plugins', href: '/admin/plugins' },
      { label: 'Webhooks', href: '/admin/webhooks' },
    ],
  },
  {
    label: 'Billing', icon: CreditCard,
    children: [
      { label: 'Subscriptions', href: '/admin/subscriptions' },
      { label: 'Tenants', href: '/admin/tenants' },
    ],
  },
  {
    label: 'System', icon: Shield,
    children: [
      { label: 'Overview', href: '/admin/system' },
      { label: 'Activity Logs', href: '/admin/system/activity' },
      { label: 'API Keys', href: '/admin/system/api-keys' },
      { label: 'Backups', href: '/admin/system/backups' },
    ],
  },
]

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await apiLogin(email, password)
      setToken(token)
      window.location.href = '/admin'
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#A165DB] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="text-xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your platform</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#1A1D24] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50"
              placeholder="admin@maximus.dev"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#1A1D24] text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#A165DB]/50"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#A165DB] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [openGroups, setOpenGroups] = useState<string[]>(() => {
    if (!pathname) return []
    const active: string[] = []
    navGroups.forEach((g) => {
      if (g.children?.some((c) => pathname.startsWith(c.href))) {
        active.push(g.label)
      }
    })
    return active
  })

  useEffect(() => {
    setAuthed(isLoggedIn())
  }, [])

  useEffect(() => {
    if (authed === false && pathname !== '/admin/login') {
      router.replace('/admin/login')
    }
  }, [authed, pathname, router])

  if (authed === null) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  if (!authed || pathname === '/admin/login') {
    if (pathname === '/admin/login') {
      return <LoginPage />
    }
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center">
        <div className="text-gray-400 text-sm">Redirecting...</div>
      </div>
    )
  }

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

  return (
    <div className="flex min-h-screen bg-[#0F1117]">
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col border-r border-white/10 bg-[#16181D] transition-all duration-300 overflow-y-auto ${
          collapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#A165DB] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          {!collapsed && <span className="text-white font-semibold text-sm">Admin Panel</span>}
        </div>
<nav className="flex-1 py-3 px-2 space-y-0.5">
            {navGroups.map((group) => {
              const isActive = pathname
                ? group.href
                  ? pathname === group.href
                  : group.children?.some((c) => pathname.startsWith(c.href)) ?? false
                : false
              const isExpanded = openGroups.includes(group.label)
            if (group.href) {
              return (
                <Link
                  key={group.href}
                  href={group.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#A165DB]/15 text-[#A165DB]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <group.icon size={18} className="flex-shrink-0" />
                  {!collapsed && <span className="flex-1">{group.label}</span>}
                </Link>
              )
            }
            return (
              <div key={group.label}>
                <button
                  onClick={() => toggleGroup(group.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#A165DB]/15 text-[#A165DB]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <group.icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{group.label}</span>
                      <ChevronDown size={14} className={`opacity-50 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>
                {!collapsed && isExpanded && group.children && (
                  <div className="ml-4 pl-3 border-l border-white/10 mt-0.5 space-y-0.5">
{group.children.map((child) => {
                        const childActive = pathname?.startsWith(child.href)
                        return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                            childActive
                              ? 'bg-[#A165DB]/10 text-[#A165DB] font-medium'
                              : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                          }`}
                        >
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
        <div className="p-3 border-t border-white/10 flex-shrink-0">
          <button
            onClick={() => { clearToken(); window.location.href = '/admin/login' }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all w-full"
          >
            <LogOut size={18} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-[72px]' : 'ml-64'}`}>
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#16181D]/80 backdrop-blur-xl">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#A165DB]/20 flex items-center justify-center">
              <span className="text-[#A165DB] text-xs font-bold">YT</span>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
