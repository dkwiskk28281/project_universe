import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCosmosStore } from '../store'
import { STARS } from '../utils/constants'
import { applyRedshift } from '../utils/cosmology'

/**
 * Infinite Star Field — stars are always centered around the camera.
 *
 * Instead of a fixed sphere, positions are generated relative to
 * camera position. Each frame, positions are offset so stars
 * "wrap around" — creating an infinite universe effect.
 *
 * H-R diagram brightness: spectral class determines luminosity.
 *   O/B: 100-10000× solar luminosity (rare, brilliant)
 *   A/F: 5-50× solar
 *   G: 1× solar (Sun-like)
 *   K/M: 0.01-0.5× solar (dim, numerous)
 */

// H-R luminosity multipliers per spectral class (log scale, normalized)
const HR_LUMINOSITY = [3.0, 2.2, 1.5, 1.1, 1.0, 0.5, 0.2] // O, B, A, F, G, K, M

function pickSpectralClass(): number {
  const r = Math.random()
  let sum = 0
  for (let i = 0; i < STARS.spectralWeights.length; i++) {
    sum += STARS.spectralWeights[i]
    if (r < sum) return i
  }
  return STARS.spectralWeights.length - 1
}

// Seeded random for deterministic star properties
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const starVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aBrightness;
  attribute float aPhase;
  attribute float aFrequency;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec3 uCameraPos;

  varying float vBrightness;
  varying vec3 vColor;

  void main() {
    float twinkle = 0.5 + 0.5 * sin(uTime * aFrequency + aPhase);
    vBrightness = aBrightness * (0.6 + 0.4 * twinkle);
    vColor = aColor;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 10.0);
  }
`

const starFragmentShader = /* glsl */ `
  varying float vBrightness;
  varying vec3 vColor;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);

    // Core glow
    float core = smoothstep(0.5, 0.05, dist);
    core = pow(core, 1.5);

    // Diffraction spikes for bright stars (telescope cross pattern)
    float spikes = 0.0;
    if (vBrightness > 0.6) {
      float spikeStrength = (vBrightness - 0.6) * 2.5;
      // 4-pointed cross
      float sx = smoothstep(0.03, 0.0, abs(c.y)) * smoothstep(0.5, 0.1, abs(c.x));
      float sy = smoothstep(0.03, 0.0, abs(c.x)) * smoothstep(0.5, 0.1, abs(c.y));
      spikes = (sx + sy) * spikeStrength * 0.4;
    }

    float alpha = (core + spikes) * vBrightness;
    vec3 color = mix(vColor, vec3(1.0), core * 0.4);

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`

export function StarField() {
  const { qualityPreset } = useCosmosStore()
  const count = qualityPreset.starCount
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const prevCenterRef = useRef(new THREE.Vector3())
  const initializedRef = useRef(false)

  // Pre-allocate buffers
  const buffersRef = useRef<{
    positions: Float32Array
    sizes: Float32Array
    brightnesses: Float32Array
    phases: Float32Array
    frequencies: Float32Array
    colors: Float32Array
  } | null>(null)

  if (!buffersRef.current) {
    buffersRef.current = {
      positions: new Float32Array(count * 3),
      sizes: new Float32Array(count),
      brightnesses: new Float32Array(count),
      phases: new Float32Array(count),
      frequencies: new Float32Array(count),
      colors: new Float32Array(count * 3),
    }
  }

  const b = buffersRef.current
  const RADIUS = 1200 // Star sphere radius around camera
  const WRAP = RADIUS * 2 // Wrap distance

  function initStar(idx: number, cx: number, cy: number, cz: number) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 100 + Math.random() * RADIUS

    b.positions[idx * 3] = cx + r * Math.sin(phi) * Math.cos(theta)
    b.positions[idx * 3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta)
    b.positions[idx * 3 + 2] = cz + r * Math.cos(phi)

    const spectralIdx = pickSpectralClass()
    const hrLum = HR_LUMINOSITY[spectralIdx]

    b.sizes[idx] = (STARS.minScale + Math.random() * STARS.maxScale) * hrLum
    b.brightnesses[idx] = (0.2 + Math.random() * 0.5) * hrLum
    b.phases[idx] = Math.random() * Math.PI * 2
    b.frequencies[idx] = 0.3 + Math.random() * 2.5

    const c = STARS.spectralColors[spectralIdx]
    let cr = c[0] + (Math.random() - 0.5) * 0.05
    let cg = c[1] + (Math.random() - 0.5) * 0.05
    let cb = c[2] + (Math.random() - 0.5) * 0.05

    const normalizedDist = r / RADIUS
    const z = normalizedDist * 0.3
    ;[cr, cg, cb] = applyRedshift(cr, cg, cb, z)

    b.colors[idx * 3] = cr
    b.colors[idx * 3 + 1] = cg
    b.colors[idx * 3 + 2] = cb
  }

  useFrame(({ clock, camera }) => {
    if (!materialRef.current || !geoRef.current) return

    const cx = camera.position.x
    const cy = camera.position.y
    const cz = camera.position.z

    // Initialize all stars around camera on first frame
    if (!initializedRef.current) {
      for (let i = 0; i < count; i++) {
        initStar(i, cx, cy, cz)
      }
      initializedRef.current = true
      prevCenterRef.current.set(cx, cy, cz)
    }

    // Wrap stars that are too far from camera
    let needsUpdate = false
    for (let i = 0; i < count; i++) {
      const dx = b.positions[i * 3] - cx
      const dy = b.positions[i * 3 + 1] - cy
      const dz = b.positions[i * 3 + 2] - cz
      const distSq = dx * dx + dy * dy + dz * dz

      if (distSq > RADIUS * RADIUS) {
        // Star too far — respawn it ahead of camera
        initStar(i, cx, cy, cz)
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      geoRef.current.attributes.position.needsUpdate = true
      geoRef.current.attributes.aSize.needsUpdate = true
      geoRef.current.attributes.aBrightness.needsUpdate = true
      geoRef.current.attributes.aColor.needsUpdate = true
    }

    materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    materialRef.current.uniforms.uCameraPos.value.set(cx, cy, cz)
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[b.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[b.sizes, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[b.brightnesses, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[b.phases, 1]} />
        <bufferAttribute attach="attributes-aFrequency" args={[b.frequencies, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[b.colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uCameraPos: { value: new THREE.Vector3() },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
