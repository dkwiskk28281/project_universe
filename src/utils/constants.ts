export const QUALITY_PRESETS = {
  low: {
    starCount: 8000,
    nebulaSteps: 0,
    dpr: [1, 1] as [number, number],
    bloomResolution: 256,
    enableChromaticAberration: false,
    enableNebulaVolume: false,
  },
  medium: {
    starCount: 15000,
    nebulaSteps: 8,
    dpr: [1, 1.5] as [number, number],
    bloomResolution: 512,
    enableChromaticAberration: false,
    enableNebulaVolume: true,
  },
  high: {
    starCount: 30000,
    nebulaSteps: 20,
    dpr: [1, 2] as [number, number],
    bloomResolution: 1024,
    enableChromaticAberration: true,
    enableNebulaVolume: true,
  },
} as const

export type QualityLevel = keyof typeof QUALITY_PRESETS

export const CAMERA = {
  fov: 60,
  near: 0.1,
  far: 10000,
  driftAmplitude: 2,
  driftPeriod: 120,
  rotationAmplitude: 0.03,
  rotationPeriod: 90,
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
}

export const ENCOUNTER = {
  averageIntervalSeconds: 259200, // 3 days
  minCooldownHours: 12,
  durationSeconds: 45,
  seekTimeoutMinutes: 10,
  seekCheckIntervalSeconds: 30,
  phantomThreshold: 10,
  fadeInFraction: 0.2,
  fadeOutFraction: 0.2,
}

export const AUDIO = {
  droneFrequencies: [55, 55.2, 110, 82.5],
  pulsarMinInterval: 15,
  pulsarMaxInterval: 30,
  masterVolume: 0.6,
}
