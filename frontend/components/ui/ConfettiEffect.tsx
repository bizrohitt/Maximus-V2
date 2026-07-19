'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  gravity: number
  opacity: number
  shape: 'rect' | 'circle'
}

const COLORS = ['#A165DB', '#3BB380', '#E67E22', '#3B82F6', '#3ECF8E', '#F59E0B', '#EF4444', '#8B5CF6']

export function ConfettiEffect({ active, onComplete }: { active: boolean; onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 150

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 30,
        vy: -Math.random() * 20 - 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.3,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      })
    }

    let frame = 0
    const maxFrames = 180

    const animate = () => {
      if (frame >= maxFrames) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        onComplete?.()
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.vy += p.gravity
        p.y += p.vy
        p.vx *= 0.99
        p.rotation += p.rotationSpeed
        p.opacity = Math.max(0, 1 - frame / maxFrames)

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      frame++
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [active, onComplete])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[999] pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
