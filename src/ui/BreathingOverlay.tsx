/**
 * Breathing Overlay — Resonance Frequency Breathing Guide
 *
 * The single most effective non-pharmacological stress intervention.
 *
 * A barely-perceptible visual pulse at 0.1 Hz (10-second cycle = 6 breaths/min)
 * synchronizes the user's breathing to their cardiovascular resonance frequency.
 *
 * Science:
 *   - Lehrer & Gevirtz 2014 (Applied Psychophysiology and Biofeedback):
 *     0.1 Hz breathing maximizes HRV, activates baroreflex
 *   - Zaccaro et al. 2018 (Frontiers in Human Neuroscience):
 *     Slow breathing (< 10/min) shifts autonomic balance toward parasympathetic
 *   - Stellar et al. 2015 (Emotion):
 *     Awe reduces IL-6 inflammatory cytokines
 *
 * Implementation:
 *   - Vignette darkness oscillates at 0.1 Hz (10s period)
 *   - Inhale (5s): vignette lightens slightly (expansion feeling)
 *   - Exhale (5s): vignette deepens (contraction, safety)
 *   - The oscillation is SUBLIMINAL — just barely noticeable
 *   - User's breathing entrains without conscious effort
 *
 * The cycle uses a sinusoidal wave (not square) for smooth,
 * natural-feeling transitions that match diaphragmatic breathing.
 */

import { useEffect, useRef, useState } from 'react'

export function BreathingOverlay() {
  const ref = useRef<HTMLDivElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    let running = true

    const animate = () => {
      if (!running || !ref.current) return

      const t = performance.now() / 1000

      // 0.1 Hz = 10-second cycle
      // sin wave: 0 to 1 over 5 seconds (inhale), 1 to 0 over 5 seconds (exhale)
      const breathPhase = Math.sin(t * Math.PI * 0.2) // 0.2 = 2π × 0.1 / (2π) ... actually we want period=10s
      // sin(2π × 0.1 × t) = sin(0.628 × t) → period = 10s ✓
      const breath = Math.sin(t * 0.6283185307)

      // Map to vignette opacity: very subtle range
      // Inhale (breath > 0): vignette lightens (0.03 → 0)
      // Exhale (breath < 0): vignette deepens (0.03 → 0.06)
      const vignetteOpacity = 0.03 - breath * 0.03

      // Also very subtly shift the vignette inward during exhale
      // This creates a gentle "embrace" feeling
      const spread = 45 + breath * 5 // 40% to 50% spread

      ref.current.style.background = `radial-gradient(ellipse ${spread}% ${spread}% at center, transparent 0%, rgba(0,0,0,${vignetteOpacity.toFixed(4)}) 100%)`

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
      }}
    />
  )
}
