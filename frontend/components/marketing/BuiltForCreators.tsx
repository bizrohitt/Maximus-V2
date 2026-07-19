import { Layers, Zap, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button/Button'

const benefits = [
  {
    icon: Layers,
    title: 'All-in-one workspace',
    description: 'No more juggling 10 tabs. Writing, SEO, and productivity tools in one place.',
  },
  {
    icon: Zap,
    title: 'Instant results',
    description: 'Generate titles, outlines, and content in seconds — not hours.',
  },
  {
    icon: Clock,
    title: 'Save 10+ hours weekly',
    description: 'Automate repetitive content tasks and focus on what matters.',
  },
]

export function BuiltForCreators() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left — Visual */}
          <div className="relative">
            {/* Floating tool cards */}
            <div className="relative w-full aspect-[4/3] max-w-lg mx-auto">
              {/* Background glow */}
              <div className="absolute inset-0 bg-[var(--color-hero-bg)] rounded-3xl opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-3xl" />

              {/* Floating cards */}
              <div className="absolute top-6 left-6 right-6 p-4 bg-primary rounded-xl shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <span className="text-secondary font-bold text-sm">SEO</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 bg-gray-200 rounded-full w-3/4 mb-1" />
                    <div className="h-2 bg-gray-100 rounded-full w-1/2" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 bg-secondary/20 rounded-full w-full" />
                  <div className="h-1.5 bg-secondary/15 rounded-full w-4/5" />
                  <div className="h-1.5 bg-secondary/10 rounded-full w-3/5" />
                </div>
              </div>

              <div className="absolute bottom-6 left-10 right-10 p-4 bg-primary rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <span className="text-secondary font-bold text-sm">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 bg-gray-200 rounded-full w-full mb-1" />
                    <div className="h-2 bg-gray-100 rounded-full w-2/3" />
                  </div>
                </div>
              </div>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center shadow-lg">
                  <Zap size={28} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-xs font-medium text-secondary mb-4">
              <Layers size={12} />
              Why Maximus
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 md:mb-5">
              Stop switching between tools.
              <br />
              <span className="text-secondary">Start creating.</span>
            </h2>

            <p className="text-base md:text-lg text-text-secondary mb-6 md:mb-8 leading-relaxed">
              Most creators waste hours jumping between writing apps, SEO tools, and dashboards. Maximus puts everything you need in one fast, clean workspace.
            </p>

            <div className="space-y-4 md:space-y-5 mb-8">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-0.5">{title}</h3>
                    <p className="text-sm text-text-secondary">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/ai-tools">
              <Button size="lg">
                Explore AI Tools
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
