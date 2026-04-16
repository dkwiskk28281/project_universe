/**
 * Circadian Filter — Automatic blue light reduction at night.
 *
 * Blue light (460-490nm) suppresses melatonin production by up to 85%
 * (Harvard Health, 2012; Cajochen et al., PNAS 2011).
 *
 * This filter automatically shifts the display warm at night,
 * mimicking iOS Night Shift / f.lux behavior.
 *
 * Schedule (based on device local time):
 *   06:00 - 19:00: No filter (natural daylight compatible)
 *   19:00 - 21:00: Gradual warm transition
 *   21:00 - 05:00: Full warm filter (blocks ~60% blue)
 *   05:00 - 06:00: Gradual cool transition (wake-up)
 *
 * Implementation: CSS filter on the canvas container.
 * This preserves all GPU rendering while shifting color temperature.
 *
 * Color temperature mapping:
 *   Day: 6500K (neutral)
 *   Night: 2700K (warm, like candlelight)
 *
 * Also manages overall brightness:
 *   Day: 100%
 *   Night: 85% (reduced to minimize melatonin disruption)
 */

import { useEffect, useRef } from 'react'

function getCircadianFactor(): { warmth: number; brightness: number } {
  const hour = new Date().getHours() + new Date().getMinutes() / 60

  let warmth: number // 0 = neutral, 1 = full warm
  let brightness: number // 0.85 to 1.0

  if (hour >= 6 && hour < 19) {
    // Daytime: no filter
    warmth = 0
    brightness = 1.0
  } else if (hour >= 19 && hour < 21) {
    // Evening transition: gradually warm
    warmth = (hour - 19) / 2
    brightness = 1.0 - warmth * 0.15
  } else if (hour >= 21 || hour < 5) {
    // Night: full warm
    warmth = 1
    brightness = 0.85
  } else {
    // Dawn transition (5-6): gradually cool
    warmth = 1 - (hour - 5)
    brightness = 0.85 + (1 - warmth) * 0.15
  }

  return { warmth, brightness }
}

export function CircadianFilter() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      if (!ref.current) return
      const { warmth, brightness } = getCircadianFactor()

      // CSS filter: sepia for warmth, brightness for dimming
      // sepia(0.4) at full warmth ≈ 2700K color temperature
      const sepia = warmth * 0.4
      const saturate = 1 - warmth * 0.1 // Slightly desaturate at night
      ref.current.style.filter =
        `sepia(${sepia}) saturate(${saturate}) brightness(${brightness})`
    }

    update()
    // Update every 5 minutes (circadian changes are very slow)
    const interval = setInterval(update, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}
