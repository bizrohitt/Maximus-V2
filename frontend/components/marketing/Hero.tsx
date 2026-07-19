'use client'

import { Sparkles, Check } from 'lucide-react'
import DotField from './DotField'
import { EmailCaptureForm } from './EmailCaptureForm'

export function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-[60vh] md:min-h-[85vh] flex items-center"
      style={{ background: 'var(--color-hero-bg)' }}
    >
      {/* DotField background */}
      <div className="absolute inset-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="var(--hero-dot-from)"
          gradientTo="var(--hero-dot-to)"
          glowColor="var(--color-hero-glow)"
        />
      </div>

      {/* Static gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] md:w-[900px] md:h-[700px] bg-secondary/15 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-accent/8 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/10 text-xs sm:text-sm font-medium text-white/80 mb-6 md:mb-8 backdrop-blur-sm">
            <Sparkles size={14} className="text-accent" />
            All-in-one AI workspace
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-4 md:mb-6 tracking-tight">
            Still juggling 5 tools
            <br className="hidden sm:block" />
            <span className="sm:inline block mt-2 sm:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-hover">
              just to create one piece of content?
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
            Maximus puts AI writing, productivity, and SEO tools in one place — so you can create faster without switching tabs.
          </p>

          {/* Email Capture */}
          <div className="mb-6 md:mb-8 px-4 sm:px-0">
            <EmailCaptureForm />
          </div>

          {/* Trust line */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/40">
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-accent" />
              Free forever
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-accent" />
              No credit card
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-accent" />
              Setup in 30 seconds
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
