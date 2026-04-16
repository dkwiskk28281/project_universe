/**
 * Cosmology Mathematics Module
 *
 * Models the fundamental physics of our COSMOS universe,
 * scaled to human-meaningful timescales.
 *
 * Real universe → COSMOS mapping:
 *   Hubble time (~14 Gyr) → ~60 days
 *   Observable universe radius → link expiry horizon
 *   Speed of light → signal propagation rate
 */

// ─── Hubble Expansion ───────────────────────────────────────
// In a de Sitter (dark-energy dominated) universe:
//   scale factor a(t) = exp(H × t)
//   co-moving distance d(t) = d₀ × a(t) = d₀ × exp(H × t)
//   recession velocity v(t) = H × d(t)
//
// Our Hubble constant is tuned so that the "observable horizon"
// is crossed at roughly 50-60 days, making communication
// gradually impossible — just like the real universe.

/** Hubble constant in our cosmos (per second) */
export const H_COSMOS = 2.31e-6  // ≈ 12 / (60 days in seconds)

/** Speed of light in our cosmos (cosmic units per second) */
export const C_COSMOS = 1 / 60   // Tuned so initial delay ≈ 60 seconds

/** Initial co-moving distance at encounter (cosmic units) */
export const D_INITIAL = 1.0

/**
 * Co-moving distance between two souls after encounter.
 * Grows exponentially due to cosmic expansion.
 *
 * d(t) = d₀ × exp(H × t)
 */
export function comovingDistance(secondsSinceEncounter: number): number {
  return D_INITIAL * Math.exp(H_COSMOS * secondsSinceEncounter)
}

/**
 * Signal travel time (delay) from one soul to another.
 * As the universe expands, signals take longer to cross the growing distance.
 *
 * delay = d(t) / c = (d₀/c) × exp(H × t)
 *
 * At t=0:      ~60 seconds
 * At t=1 day:  ~73 seconds
 * At t=1 week: ~4 minutes
 * At t=1 month: ~6.7 hours
 * At t=45 days: ~5.6 days (effectively unreachable)
 */
export function signalDelay(secondsSinceEncounter: number): number {
  return (D_INITIAL / C_COSMOS) * Math.exp(H_COSMOS * secondsSinceEncounter)
}

/**
 * Signal strength after traveling through expanding space.
 * Follows inverse-distance law (softer than inverse-square for playability).
 * In real physics this would be 1/d², but we use 1/d for better UX.
 *
 * strength = exp(-H × t) = 1 / d(t)
 *
 * At t=0:       1.0 (full strength)
 * At t=1 day:   0.82
 * At t=1 week:  0.25
 * At t=2 weeks: 0.06
 * At t=1 month: 0.0025 (barely perceptible)
 */
export function signalStrength(secondsSinceEncounter: number): number {
  return Math.exp(-H_COSMOS * secondsSinceEncounter)
}

/**
 * Whether the observable horizon has been crossed.
 * Beyond this point, recession velocity exceeds c — no signal can ever arrive.
 *
 * Horizon condition: H × d(t) > c
 *   → H × d₀ × exp(H×t) > c
 *   → exp(H×t) > c / (H × d₀)
 *   → t > ln(c/(H×d₀)) / H
 *
 * With our constants: t_horizon ≈ ln(1/(60 × 2.31e-6 × 1)) / 2.31e-6
 *                                ≈ ln(7215) / 2.31e-6
 *                                ≈ 8.884 / 2.31e-6
 *                                ≈ 3,845,000 seconds ≈ 44.5 days
 */
export function isHorizonCrossed(secondsSinceEncounter: number): boolean {
  const recessVelocity = H_COSMOS * comovingDistance(secondsSinceEncounter)
  return recessVelocity >= C_COSMOS
}

/** Time in seconds until horizon crossing from encounter moment */
export const HORIZON_TIME_SECONDS = Math.log(C_COSMOS / (H_COSMOS * D_INITIAL)) / H_COSMOS

// ─── Redshift ────────────────────────────────────────────────
// Cosmological redshift: z = a(t_observe) / a(t_emit) - 1
// For our purposes, distance maps to redshift:
//   z ∝ d (Hubble's law approximation for nearby objects)

/**
 * Cosmological redshift for an object at a given distance.
 * Returns z value (0 = no shift, 1 = doubled wavelength, etc.)
 *
 * For stars: shifts blue → white → yellow → orange → red
 * For galaxies: more distant = redder
 */
export function redshift(normalizedDistance: number): number {
  // z grows linearly with distance in the nearby universe
  // normalizedDistance: 0 (close) to 1 (at horizon)
  return normalizedDistance * 2.0
}

/**
 * Apply redshift to an RGB color.
 * Shifts the spectrum toward red as z increases.
 *
 * Simplified model:
 *   z=0: original color
 *   z=0.5: warm shift
 *   z=1: orange-red
 *   z>1.5: deep red, dimming
 */
export function applyRedshift(r: number, g: number, b: number, z: number): [number, number, number] {
  if (z <= 0) return [r, g, b]

  // Shift blue light toward red
  const warmth = Math.min(z, 2) / 2 // 0 to 1
  const dimming = z > 1 ? Math.exp(-(z - 1) * 0.5) : 1

  const rOut = (r + warmth * 0.3) * dimming
  const gOut = (g * (1 - warmth * 0.4)) * dimming
  const bOut = (b * (1 - warmth * 0.7)) * dimming

  return [Math.min(1, rOut), Math.max(0, gOut), Math.max(0, bOut)]
}

// ─── Galactic Plane ──────────────────────────────────────────
// The Milky Way as seen from inside is a band of light.
// We model it as a great circle with a Gaussian thickness.

/** Galactic plane normal vector (tilted for visual interest) */
export const GALACTIC_NORMAL = [0.22, 0.87, 0.44] as const

/**
 * Angular distance from the galactic plane in radians.
 * |b| = arcsin(dot(direction, galacticNormal))
 */
export function galacticLatitude(dx: number, dy: number, dz: number): number {
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz)
  if (len === 0) return 0
  return Math.asin(
    (dx * GALACTIC_NORMAL[0] + dy * GALACTIC_NORMAL[1] + dz * GALACTIC_NORMAL[2]) / len
  )
}

/**
 * Gaussian probability of a star being at galactic latitude b.
 * σ ≈ 0.15 radians (~8.6°) — thin disk component
 * Plus a wider thick disk at σ ≈ 0.5 radians
 */
export function galacticDensity(b: number): number {
  const thinDisk = Math.exp(-(b * b) / (2 * 0.15 * 0.15))
  const thickDisk = 0.15 * Math.exp(-(b * b) / (2 * 0.5 * 0.5))
  return thinDisk + thickDisk
}

// ─── Signal Degradation ──────────────────────────────────────

/**
 * Degrade a message string based on signal strength.
 * Weaker signals lose characters to noise.
 *
 * strength 1.0: perfect message
 * strength 0.5: some characters replaced with noise
 * strength 0.1: mostly noise, few readable characters
 * strength <0.01: completely unreadable
 */
export function degradeMessage(text: string, strength: number): string {
  if (strength >= 0.95) return text
  if (strength < 0.01) return '\u00b7'.repeat(text.length)

  const chars = text.split('')
  return chars.map((ch) => {
    if (ch === ' ') return ' '
    // Each character has a probability of surviving proportional to strength
    if (Math.random() < strength) return ch
    // Replace with noise character
    const noise = ['\u00b7', '\u2022', '\u2219', '\u00b0', '\u2013']
    return noise[Math.floor(Math.random() * noise.length)]
  }).join('')
}

/**
 * Format signal delay as human-readable string
 */
export function formatDelay(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)}h`
  return `${(seconds / 86400).toFixed(1)}d`
}

/**
 * Format distance with appropriate unit
 */
export function formatDistance(cosmicUnits: number): string {
  if (cosmicUnits < 10) return `${cosmicUnits.toFixed(1)} CU`
  if (cosmicUnits < 1000) return `${Math.round(cosmicUnits)} CU`
  if (cosmicUnits < 1e6) return `${(cosmicUnits / 1000).toFixed(1)}k CU`
  return `${(cosmicUnits / 1e6).toFixed(1)}M CU`
}
