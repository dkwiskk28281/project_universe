import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCosmosStore } from '../store'
import { ENCOUNTER } from '../utils/constants'
import { smoothstep } from '../utils/mathHelpers'
import encounterVertexShader from './shaders/encounter-glow.vert.glsl'
import encounterFragmentShader from './shaders/encounter-glow.frag.glsl'

function generateBezierPath(seed: number): [THREE.Vector3, THREE.Vector3, THREE.Vector3, THREE.Vector3] {
  const angle = seed * Math.PI * 2
  const distance = 60
  const height = (seed * 7.3 % 1 - 0.5) * 30

  const start = new THREE.Vector3(
    Math.cos(angle) * distance,
    height,
    Math.sin(angle) * distance
  )

  const end = new THREE.Vector3(
    Math.cos(angle + Math.PI * 0.8) * distance,
    height + (seed * 3.7 % 1 - 0.5) * 15,
    Math.sin(angle + Math.PI * 0.8) * distance
  )

  // Control points create a dramatic arc that swoops close to the viewer
  const cp1 = new THREE.Vector3(
    start.x * 0.15 + (seed * 5.1 % 1 - 0.5) * 10,
    start.y + (seed * 2.3 % 1) * 5 + 3,
    start.z * 0.15 + (seed * 4.7 % 1 - 0.5) * 10
  )

  const cp2 = new THREE.Vector3(
    end.x * 0.15 + (seed * 6.3 % 1 - 0.5) * 10,
    end.y + (seed * 8.1 % 1) * 5 + 3,
    end.z * 0.15 + (seed * 3.3 % 1 - 0.5) * 10
  )

  return [start, cp1, cp2, end]
}

export function EncounterEntity() {
  const encounterActive = useCosmosStore((s) => s.encounterActive)
  const setEncounterActive = useCosmosStore((s) => s.setEncounterActive)
  const setEncounterProgress = useCosmosStore((s) => s.setEncounterProgress)

  const meshRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const outerHaloRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const haloMaterialRef = useRef<THREE.ShaderMaterial>(null)
  const outerHaloMaterialRef = useRef<THREE.ShaderMaterial>(null)
  const startTimeRef = useRef(0)
  const pathSeedRef = useRef(Math.random())

  const curve = useMemo(() => {
    const [start, cp1, cp2, end] = generateBezierPath(pathSeedRef.current)
    return new THREE.CubicBezierCurve3(start, cp1, cp2, end)
  }, [encounterActive]) // eslint-disable-line

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uCoreColor: { value: new THREE.Color(1, 0.97, 0.92) },
      uHaloColor: { value: new THREE.Color(0.6, 0.7, 1.0) },
    }),
    []
  )

  useFrame(({ clock }) => {
    if (!encounterActive || !meshRef.current) return

    if (startTimeRef.current === 0) {
      startTimeRef.current = clock.getElapsedTime()
      pathSeedRef.current = Math.random()
    }

    const elapsed = clock.getElapsedTime() - startTimeRef.current
    const duration = ENCOUNTER.durationSeconds
    const progress = Math.min(elapsed / duration, 1)

    setEncounterProgress(progress)

    // Position along bezier
    const point = curve.getPoint(progress)
    meshRef.current.position.copy(point)
    if (haloRef.current) haloRef.current.position.copy(point)
    if (outerHaloRef.current) outerHaloRef.current.position.copy(point)

    // --- Dramatic multi-phase opacity ---
    // Phase 1 (0-25%): Slow ethereal fade in — "is that... something?"
    // Phase 2 (25-50%): Brightening — "it's real"
    // Phase 3 (50-65%): Peak closest approach — maximum brightness
    // Phase 4 (65-100%): Long, melancholic fade out — "goodbye"
    let opacity = 0
    if (progress < ENCOUNTER.fadeInFraction) {
      // Very slow initial appearance
      const t = progress / ENCOUNTER.fadeInFraction
      opacity = t * t * 0.6 // Quadratic ease-in, not fully bright yet
    } else if (progress < 0.5) {
      // Building to peak
      const t = (progress - ENCOUNTER.fadeInFraction) / (0.5 - ENCOUNTER.fadeInFraction)
      opacity = 0.6 + t * 0.4
    } else if (progress < 0.65) {
      // Peak — closest approach
      opacity = 1.0
    } else if (progress < 1 - ENCOUNTER.fadeOutFraction + 0.25) {
      // Beginning to recede
      opacity = smoothstep(1, 1 - ENCOUNTER.fadeOutFraction, progress)
    } else {
      // Final fade
      const t = (progress - (1 - ENCOUNTER.fadeOutFraction + 0.25)) / (ENCOUNTER.fadeOutFraction - 0.25)
      opacity = Math.max(0, (1 - t) * 0.3)
    }

    // Update core shader
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
      materialRef.current.uniforms.uOpacity.value = opacity
    }
    // Inner halo
    if (haloMaterialRef.current) {
      haloMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime()
      haloMaterialRef.current.uniforms.uOpacity.value = opacity * 0.5
    }
    // Outer halo — very diffuse
    if (outerHaloMaterialRef.current) {
      outerHaloMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime()
      outerHaloMaterialRef.current.uniforms.uOpacity.value = opacity * 0.15
    }

    // Scale with gentle breathing pulse
    const breathe = 0.35 + 0.04 * Math.sin(clock.getElapsedTime() * 1.2)
    const closeness = 1 + 0.3 * Math.sin(progress * Math.PI) // Bigger at midpoint
    const coreScale = breathe * closeness
    meshRef.current.scale.setScalar(coreScale)
    if (haloRef.current) haloRef.current.scale.setScalar(coreScale * 5)
    if (outerHaloRef.current) outerHaloRef.current.scale.setScalar(coreScale * 12)

    // End encounter
    if (progress >= 1) {
      startTimeRef.current = 0
      setEncounterActive(false)
      setEncounterProgress(0)
    }
  })

  if (!encounterActive) return null

  return (
    <group>
      {/* Core — bright warm center */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={encounterVertexShader}
          fragmentShader={encounterFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Inner halo — cool blue aura */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <shaderMaterial
          ref={haloMaterialRef}
          vertexShader={encounterVertexShader}
          fragmentShader={encounterFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uCoreColor: { value: new THREE.Color(0.5, 0.65, 1.0) },
            uHaloColor: { value: new THREE.Color(0.3, 0.4, 0.9) },
          }}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Outer halo — vast diffuse presence */}
      <mesh ref={outerHaloRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <shaderMaterial
          ref={outerHaloMaterialRef}
          vertexShader={encounterVertexShader}
          fragmentShader={encounterFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uCoreColor: { value: new THREE.Color(0.3, 0.4, 0.8) },
            uHaloColor: { value: new THREE.Color(0.15, 0.2, 0.5) },
          }}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
