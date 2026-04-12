import { useRef, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { randomRange } from '../utils/mathHelpers'

/**
 * Supernova — an extremely rare, brilliant explosion in the sky.
 *
 * Real frequency: ~1-2 per century in a galaxy.
 * Our frequency: ~once every 7-14 days (scaled for engagement).
 *
 * Phases:
 *   1. Sudden brightening (0-2s) — point of light appears and surges
 *   2. Peak brilliance (2-5s) — outshines everything nearby
 *   3. Expansion (5-15s) — expands slightly, changes color
 *   4. Slow fade (15-40s) — fades to a glowing remnant, then nothing
 */

const MIN_INTERVAL = 7 * 86400  // 7 days minimum
const MAX_INTERVAL = 14 * 86400 // 14 days maximum
const DEMO_MIN = 90    // Rarer — not startling
const DEMO_MAX = 240   // 4 minutes max
const DURATION = 50    // 50 seconds — slower, gentler

interface SupernovaState {
  position: THREE.Vector3
  startTime: number
}

const supernovaVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const supernovaFragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform float uPhase; // 0-1 lifecycle
  uniform vec3 uColor;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float fresnel = 1.0 - dot(vNormal, vViewDir);
    fresnel = pow(fresnel, 2.0);

    // Core brightness — inverse of distance from center
    float coreDist = length(vNormal - vViewDir);
    float core = smoothstep(1.5, 0.0, coreDist);

    float intensity = (core * 2.0 + fresnel * 0.5) * uOpacity;
    gl_FragColor = vec4(uColor * intensity, clamp(intensity, 0.0, 1.0));
  }
`

export function Supernova() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const [event, setEvent] = useState<SupernovaState | null>(null)

  // Demo mode: shorter intervals; production would use MIN/MAX_INTERVAL
  const nextTimeRef = useRef(performance.now() / 1000 + randomRange(DEMO_MIN, DEMO_MAX))

  const spawn = useCallback((time: number) => {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 800 + Math.random() * 1200

    setEvent({
      position: new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ),
      startTime: time,
    })
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (!event && t > nextTimeRef.current) {
      spawn(t)
      nextTimeRef.current = t + randomRange(DEMO_MIN, DEMO_MAX)
    }

    if (event && meshRef.current && materialRef.current) {
      const elapsed = t - event.startTime
      const phase = elapsed / DURATION

      if (phase >= 1) {
        setEvent(null)
        return
      }

      meshRef.current.position.copy(event.position)

      // Scale phases
      let scale: number
      let opacity: number
      let r: number, g: number, b: number

      if (phase < 0.05) {
        // Phase 1: Sudden brightening
        const p = phase / 0.05
        scale = 0.1 + p * 0.5
        opacity = p * p * 1.5
        r = 0.9; g = 0.95; b = 1.0 // Blue-white surge
      } else if (phase < 0.125) {
        // Phase 2: Peak brilliance
        const p = (phase - 0.05) / 0.075
        scale = 0.6 + p * 0.8
        opacity = 1.5
        r = 1.0; g = 1.0; b = 0.95 // Brilliant white
      } else if (phase < 0.375) {
        // Phase 3: Expansion, color shifts warm
        const p = (phase - 0.125) / 0.25
        scale = 1.4 + p * 1.0
        opacity = 1.5 * (1 - p * 0.4)
        r = 1.0; g = 0.9 - p * 0.2; b = 0.7 - p * 0.4 // Shifting to warm
      } else {
        // Phase 4: Long slow fade
        const p = (phase - 0.375) / 0.625
        scale = 2.4 + p * 0.5
        opacity = 0.9 * Math.pow(1 - p, 2)
        r = 1.0; g = 0.6; b = 0.2 // Orange-red remnant fading
      }

      meshRef.current.scale.setScalar(scale)
      materialRef.current.uniforms.uOpacity.value = opacity
      materialRef.current.uniforms.uPhase.value = phase
      materialRef.current.uniforms.uColor.value.set(r, g, b)
    }
  })

  if (!event) return null

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 24, 24]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={supernovaVertexShader}
        fragmentShader={supernovaFragmentShader}
        uniforms={{
          uOpacity: { value: 0 },
          uPhase: { value: 0 },
          uColor: { value: new THREE.Color(1, 1, 1) },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
