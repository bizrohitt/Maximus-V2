import Link from 'next/link'
import { ArrowRight, Download, FolderOpen, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'

const actions = [
  {
    icon: Sparkles,
    title: 'Browse AI Tools',
    description: 'Explore our curated collection of free AI tools for writing and productivity.',
    href: '/ai-tools',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: Download,
    title: 'Use Free Tools',
    description: 'Download browser extensions, utilities, and productivity tools — all free.',
    href: '/downloads',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: FolderOpen,
    title: 'Get PDF Guides',
    description: 'Step-by-step guides and tutorials from real workflows, available as free PDFs.',
    href: '/downloads',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
]

export function QuickActions() {
  return (
    <section className="py-16 md:py-20 bg-primary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">Get started in seconds</h2>
          <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto">Pick a path — everything is free to use.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {actions.map(({ icon: Icon, title, description, href, color, bg }) => (
            <Link key={title} href={href} className="group block">
              <div className="h-full p-6 md:p-7 rounded-2xl border border-border bg-gray-50 hover:bg-primary hover:shadow-lg hover:border-secondary/20 transition-all duration-300">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-semibold text-text-primary mb-2 group-hover:text-secondary transition-colors">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary group-hover:gap-2.5 transition-all">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
