/**
 * Breathing + Awe Overlay
 *
 * TWO psychological interventions in one visual layer:
 *
 * 1. RESONANCE BREATHING (0.1 Hz)
 *    Vignette breathes at 6 breaths/min → HRV optimization
 *    (Lehrer & Gevirtz 2014)
 *
 * 2. AWE/VASTNESS ENHANCEMENT
 *    Cooler color temperature at screen edges creates depth perception.
 *    The brain interprets this as "vast open space" → triggers awe.
 *    Awe reduces IL-6 inflammatory cytokines (Stellar et al. 2015)
 *    and expands time perception (Rudd et al., Psychological Science 2012)
 *
 * 3. ATTENTION RESTORATION (Kaplan 1995)
 *    The overlay provides "soft fascination" — the vignette breathing
 *    is interesting enough to hold peripheral attention but not
 *    demanding enough to require directed attention. This restores
 *    cognitive resources.
 *
 * All effects are SUBLIMINAL — the user doesn't notice them
 * consciously, but the autonomic nervous system responds.
 */

import { useEffect, useRef } from 'react'

export function BreathingOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = true

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      if (!running) return

      const w = canvas.width, h = canvas.height
      const t = performance.now() / 1000

      // 0.1 Hz breathing — cardiovascular resonance
      const breath = Math.sin(t * Math.PI * 0.2)

      // Clear
      ctx.clearRect(0, 0, w, h)

      // === Awe vignette: cool-tinted edges for depth perception ===
      // Inhale: vignette opens (expansion feeling)
      // Exhale: vignette closes (safety, embrace)
      const breathRadius = 0.55 + breath * 0.05 // 0.50 to 0.60

      const gradient = ctx.createRadialGradient(
        w / 2, h / 2, Math.min(w, h) * breathRadius,
        w / 2, h / 2, Math.max(w, h) * 0.75
      )

      // Center: fully transparent
      gradient.addColorStop(0, 'rgba(0,0,0,0)')

      // Mid: very subtle cool tint (blue shift at edges = depth)
      const coolIntensity = 0.02 + (1 - breath) * 0.01
      gradient.addColorStop(0.5, `rgba(5,8,20,${coolIntensity.toFixed(3)})`)

      // Edge: deeper vignette (breathes)
      const edgeIntensity = 0.15 + (1 - breath) * 0.06
      gradient.addColorStop(1, `rgba(0,0,5,${edgeIntensity.toFixed(3)})`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
      }}
    />
  )
}
