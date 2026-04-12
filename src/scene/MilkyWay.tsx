import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCosmosStore } from '../store'
import { GALACTIC_NORMAL, galacticLatitude, galacticDensity } from '../utils/cosmology'

/**
 * The Milky Way — a dense luminous band of stars along the galactic plane.
 *
 * Uses rejection sampling to cluster stars around the galactic plane
 * following a Gaussian distribution (thin disk + thick disk model).
 * Additional large diffuse "cloud" particles simulate unresolved starlight.
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
    // Very subtle twinkle
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

    // Milky Way stars are dimmer, more uniform warm white
    vec3 color = mix(vColor, vec3(1.0, 0.98, 0.95), 0.3);

    gl_FragColor = vec4(color, alpha);
  }
`

// Diffuse unresolved starlight glow along the galactic plane
const glowVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aOpacity;

  uniform float uPixelRatio;

  varying float vOpacity;

  void main() {
    vOpacity = aOpacity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (400.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 2.0, 40.0);
  }
`

const glowFragmentShader = /* glsl */ `
  varying float vOpacity;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    // Very soft, wide glow
    float alpha = smoothstep(0.5, 0.0, dist) * vOpacity;
    alpha *= alpha; // Extra softness

    vec3 color = vec3(0.95, 0.9, 0.82); // Warm unresolved starlight
    gl_FragColor = vec4(color, alpha);
  }
`

function generateGalacticStar(): [number, number, number] {
  // Rejection sampling: generate random direction, accept based on galactic density
  while (true) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const dx = Math.sin(phi) * Math.cos(theta)
    const dy = Math.sin(phi) * Math.sin(theta)
    const dz = Math.cos(phi)

    const b = galacticLatitude(dx, dy, dz)
    const density = galacticDensity(b)

    if (Math.random() < density) {
      return [dx, dy, dz]
    }
  }
}

export function MilkyWay() {
  const { qualityPreset } = useCosmosStore()
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Dense star count scales with quality
  const starCount = qualityPreset.starCount // Same as main star field
  const glowCount = Math.floor(starCount * 0.03) // 3% as glow particles

  const starData = useMemo(() => {
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    const brightnesses = new Float32Array(starCount)
    const phases = new Float32Array(starCount)
    const colors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const [dx, dy, dz] = generateGalacticStar()
      const r = 600 + Math.random() * 1400

      positions[i * 3] = dx * r
      positions[i * 3 + 1] = dy * r
      positions[i * 3 + 2] = dz * r

      // Milky Way stars are generally dimmer (unresolved)
      sizes[i] = 0.1 + Math.random() * 0.5
      brightnesses[i] = 0.15 + Math.random() * 0.35
      phases[i] = Math.random() * Math.PI * 2

      // Warm white to pale yellow (old stellar population in the galactic plane)
      const warmth = Math.random()
      colors[i * 3] = 0.9 + warmth * 0.1
      colors[i * 3 + 1] = 0.85 + warmth * 0.1
      colors[i * 3 + 2] = 0.75 + warmth * 0.15
    }

    return { positions, sizes, brightnesses, phases, colors }
  }, [starCount])

  const glowData = useMemo(() => {
    const positions = new Float32Array(glowCount * 3)
    const sizes = new Float32Array(glowCount)
    const opacities = new Float32Array(glowCount)

    for (let i = 0; i < glowCount; i++) {
      const [dx, dy, dz] = generateGalacticStar()
      const r = 700 + Math.random() * 1000

      positions[i * 3] = dx * r
      positions[i * 3 + 1] = dy * r
      positions[i * 3 + 2] = dz * r

      sizes[i] = 3 + Math.random() * 8
      opacities[i] = 0.01 + Math.random() * 0.03
    }

    return { positions, sizes, opacities }
  }, [glowCount])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <group>
      {/* Dense galactic stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starData.positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[starData.sizes, 1]} />
          <bufferAttribute attach="attributes-aBrightness" args={[starData.brightnesses, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[starData.phases, 1]} />
          <bufferAttribute attach="attributes-aColor" args={[starData.colors, 3]} />
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

      {/* Diffuse glow — unresolved starlight */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[glowData.positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[glowData.sizes, 1]} />
          <bufferAttribute attach="attributes-aOpacity" args={[glowData.opacities, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={{
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
