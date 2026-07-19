'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 12000), 120)
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
      if (particlesRef.current.length === 0) {
        initParticles(rect.width, rect.height)
      }
    }

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      const mouse = mouseRef.current
      const particles = particlesRef.current

      ctx.clearRect(0, 0, w, h)

      // Update particles
      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150
          p.vx += (dx / dist) * force * 0.6
          p.vy += (dy / dist) * force * 0.6
        }

        // Damping
        p.vx *= 0.98
        p.vy *= 0.98

        // Base drift
        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02

        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      // Draw connections
      const maxDist = 120
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25
            ctx.strokeStyle = `rgba(161, 101, 219, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw connections to mouse
      if (mouse.x > 0) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.4
            ctx.strokeStyle = `rgba(62, 207, 142, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
            ctx.lineWidth = 0.5
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const distToMouse = Math.sqrt(
          (p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2
        )
        const glow = distToMouse < 150 ? 1 - distToMouse / 150 : 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size + glow * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(161, 101, 219, ${p.opacity + glow * 0.4})`
        ctx.fill()

        if (glow > 0.3) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size + glow * 6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(161, 101, 219, ${glow * 0.15})`
          ctx.fill()
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'auto' }}
    />
  )
}
