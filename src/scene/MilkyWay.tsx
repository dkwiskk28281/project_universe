import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCosmosStore } from '../store'
import { galacticLatitude, galacticDensity } from '../utils/cosmology'

/**
 * Infinite Milky Way — galactic plane stars that follow the camera.
 * Uses rejection sampling + camera-relative wrapping.
 */

const milkyWayVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aBrightness;
  attribute float aPhase;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vBrightness;
  varying vec3 vColor;

  void main() {
    float twinkle = 0.8 + 0.2 * sin(uTime * 0.5 + aPhase);
    vBrightness = aBrightness * twinkle;
    vColor = aColor;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (200.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.3, 4.0);
  }
`

const milkyWayFragmentShader = /* glsl */ `
  varying float vBrightness;
  varying vec3 vColor;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = smoothstep(0.5, 0.05, dist) * vBrightness;
    vec3 color = mix(vColor, vec3(1.0, 0.98, 0.95), 0.3);
    gl_FragColor = vec4(color, alpha);
  }
`

function generateGalacticDir(): [number, number, number] {
  while (true) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const dx = Math.sin(phi) * Math.cos(theta)
    const dy = Math.sin(phi) * Math.sin(theta)
    const dz = Math.cos(phi)
    const b = galacticLatitude(dx, dy, dz)
    if (Math.random() < galacticDensity(b)) return [dx, dy, dz]
  }
}

export function MilkyWay() {
  const { qualityPreset } = useCosmosStore()
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const initializedRef = useRef(false)
  const count = qualityPreset.starCount
  const RADIUS = 1200

  const buffersRef = useRef<{
    positions: Float32Array
    sizes: Float32Array
    brightnesses: Float32Array
    phases: Float32Array
    colors: Float32Array
  } | null>(null)

  if (!buffersRef.current) {
    buffersRef.current = {
      positions: new Float32Array(count * 3),
      sizes: new Float32Array(count),
      brightnesses: new Float32Array(count),
      phases: new Float32Array(count),
      colors: new Float32Array(count * 3),
    }
  }

  const b = buffersRef.current

  function initStar(idx: number, cx: number, cy: number, cz: number) {
    const [dx, dy, dz] = generateGalacticDir()
    const r = 100 + Math.random() * RADIUS

    b.positions[idx * 3] = cx + dx * r
    b.positions[idx * 3 + 1] = cy + dy * r
    b.positions[idx * 3 + 2] = cz + dz * r

    b.sizes[idx] = 0.1 + Math.random() * 0.5
    b.brightnesses[idx] = 0.15 + Math.random() * 0.35
    b.phases[idx] = Math.random() * Math.PI * 2

    const warmth = Math.random()
    b.colors[idx * 3] = 0.9 + warmth * 0.1
    b.colors[idx * 3 + 1] = 0.85 + warmth * 0.1
    b.colors[idx * 3 + 2] = 0.75 + warmth * 0.15
  }

  useFrame(({ clock, camera }) => {
    if (!materialRef.current || !geoRef.current) return

    const cx = camera.position.x
    const cy = camera.position.y
    const cz = camera.position.z

    if (!initializedRef.current) {
      for (let i = 0; i < count; i++) initStar(i, cx, cy, cz)
      initializedRef.current = true
    }

    let needsUpdate = false
    for (let i = 0; i < count; i++) {
      const dx = b.positions[i * 3] - cx
      const dy = b.positions[i * 3 + 1] - cy
      const dz = b.positions[i * 3 + 2] - cz
      if (dx * dx + dy * dy + dz * dz > RADIUS * RADIUS) {
        initStar(i, cx, cy, cz)
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      geoRef.current.attributes.position.needsUpdate = true
    }

    materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[b.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[b.sizes, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[b.brightnesses, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[b.phases, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[b.colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={milkyWayVertexShader}
        fragmentShader={milkyWayFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
