export const QUALITY_PRESETS = {
  low: {
    starCount: 8000,
    nebulaSteps: 0,
    dpr: [1, 1] as [number, number],
    bloomResolution: 256,
    enableChromaticAberration: false,
    enableNebulaVolume: false,
    shootingStarTrailLength: 20,
  },
  medium: {
    starCount: 15000,
    nebulaSteps: 8,
    dpr: [1, 1.5] as [number, number],
    bloomResolution: 512,
    enableChromaticAberration: false,
    enableNebulaVolume: true,
    shootingStarTrailLength: 40,
  },
  high: {
    starCount: 30000,
    nebulaSteps: 20,
    dpr: [1, 2] as [number, number],
    bloomResolution: 1024,
    enableChromaticAberration: true,
    enableNebulaVolume: true,
    shootingStarTrailLength: 64,
  },
} as const

export type QualityLevel = keyof typeof QUALITY_PRESETS

export const CAMERA = {
  fov: 60,
  near: 0.1,
  far: 10000,
  // Continuous slow travel through space — not just wobble
  driftAmplitude: 25,
  driftPeriod: 200,
  rotationAmplitude: 0.12,
  rotationPeriod: 150,
  // Forward travel speed (cosmic units per second)
  travelSpeed: 3,
}

export const STARS = {
  minRadius: 500,
  maxRadius: 2000,
  minScale: 0.1,
  maxScale: 1.5,
  layers: [
    { depthFactor: 0.3, fraction: 0.1 },
    { depthFactor: 0.6, fraction: 0.3 },
    { depthFactor: 1.0, fraction: 0.6 },
  ],
  // Spectral classes: O(blue) B(blue-white) A(white) F(yellow-white) G(yellow) K(orange) M(red)
  // Weights roughly follow real stellar population (M stars are most common)
  spectralWeights: [0.01, 0.02, 0.05, 0.08, 0.12, 0.22, 0.50],
  spectralColors: [
    [0.6, 0.7, 1.0],   // O - hot blue
    [0.7, 0.8, 1.0],   // B - blue-white
    [0.9, 0.92, 1.0],  // A - white
    [1.0, 0.96, 0.9],  // F - yellow-white
    [1.0, 0.9, 0.7],   // G - yellow (Sun-like)
    [1.0, 0.75, 0.45], // K - orange
    [1.0, 0.55, 0.35], // M - red dwarf
  ],
}

export const SHOOTING_STAR = {
  minIntervalSeconds: 12,
  maxIntervalSeconds: 45,
  durationSeconds: 1.5,
  trailLength: 40,
  speed: 800,
}

export const ENCOUNTER = {
  // ~30 day average — makes encounters feel like miracles
  // Exponential distribution means: P(<1hr) ≈ 0.14%, P(<1day) ≈ 3.3%, P(<1week) ≈ 21%
  averageIntervalSeconds: 2592000, // 30 days
  minCooldownHours: 48,
  // Encounter is longer and more dramatic now
  durationSeconds: 90,
  seekTimeoutMinutes: 30,
  seekCheckIntervalSeconds: 60,
  phantomThreshold: 10,
  // Slower, more dramatic fade
  fadeInFraction: 0.25,
  fadeOutFraction: 0.25,
  // No cap — let the math be real. Could be 5 minutes, could be 60 days.
  maxWaitSeconds: Infinity,
}

export const COSMIC_COMM = {
  // Maximum characters per message (cosmic postcard)
  maxMessageLength: 140,
  // Delay formula: delaySeconds = baseDelay * (1 + (hoursSinceEncounter / 24) ^ exponent)
  baseDelaySeconds: 60,
  delayExponent: 1.5,
  // Frequency link expires after this many days
  linkExpiryDays: 60,
  // Max messages stored per link
  maxMessagesPerLink: 50,
  // How messages appear — materialization time in ms
  materializeDurationMs: 8000,
  // How long messages stay visible before fading
  visibleDurationMs: 30000,
}

export const AUDIO = {
  // All frequencies derived from astrophysics (see DroneLayer.ts)
  // CMB: 56.78 Hz, Anisotropy: 56.99 Hz, Solar p-mode: 113.56 Hz, Grav fifth: 85.17 Hz
  droneFrequencies: [56.78, 56.99, 113.56, 85.17],
  pulsarMinInterval: 15,
  pulsarMaxInterval: 30,
  masterVolume: 1.0,
}
