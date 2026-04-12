import { createNoise2D, createNoise3D } from 'simplex-noise'

const seed = Math.random()
const noise2D = createNoise2D(() => seed)
const noise3D = createNoise3D(() => seed)

export function simplex2D(x: number, y: number): number {
  return noise2D(x, y)
}

export function simplex3D(x: number, y: number, z: number): number {
  return noise3D(x, y, z)
}

export function fbm2D(x: number, y: number, octaves = 4, lacunarity = 2, gain = 0.5): number {
  let value = 0
  let amplitude = 1
  let frequency = 1
  let maxValue = 0

  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency)
    maxValue += amplitude
    amplitude *= gain
    frequency *= lacunarity
  }

  return value / maxValue
}

export function smoothNoise(time: number, frequency: number, offset = 0): number {
  return noise2D(time * frequency, offset)
}
