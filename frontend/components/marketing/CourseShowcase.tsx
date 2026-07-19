import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'

export function CourseShowcase() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Video placeholder */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-video rounded-2xl bg-[var(--color-hero-bg)] overflow-hidden relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-[var(--color-hero-bg)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Play size={20} className="text-white ml-1 md:ml-0 md:w-6 md:h-6" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                <div className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg bg-primary/10 backdrop-blur-sm text-[10px] md:text-xs text-white/80 inline-block">
                  Watch the breakdown
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-xs sm:text-sm font-medium text-secondary mb-4">
              Flagship course
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-4">
              How I&apos;m making $70K+ a month with one faceless AI YouTube channel.
            </h2>

            <p className="text-base md:text-lg text-text-secondary mb-6 md:mb-8 leading-relaxed">
              The full system — niche selection, AI scripting, voice, visuals, monetization, sponsors and the private community. No camera. No face. Built end-to-end with AI.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="p-3 md:p-4 rounded-xl bg-primary border border-border">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">$70K+</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-text-muted">per month</div>
              </div>
              <div className="p-3 md:p-4 rounded-xl bg-primary border border-border">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">1</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-text-muted">faceless channel</div>
              </div>
              <div className="p-3 md:p-4 rounded-xl bg-primary border border-border">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary">AI</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-text-muted">no camera, no face</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Open the Blueprint
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See what&apos;s inside
                <ArrowRight size={14} />
              </Button>
            </div>

            <p className="text-xs text-text-muted mt-4">
              Personal results. Outcomes depend on effort, niche and consistency. No income is guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
