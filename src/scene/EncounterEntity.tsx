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
  const distance = 40
  const height = (seed * 7.3 % 1 - 0.5) * 20

  const start = new THREE.Vector3(
    Math.cos(angle) * distance,
    height,
    Math.sin(angle) * distance
  )

  const end = new THREE.Vector3(
    Math.cos(angle + Math.PI) * distance,
    height + (seed * 3.7 % 1 - 0.5) * 10,
    Math.sin(angle + Math.PI) * distance
  )

  const cp1 = new THREE.Vector3(
    start.x * 0.3 + (seed * 5.1 % 1 - 0.5) * 15,
    start.y + (seed * 2.3 % 1 - 0.5) * 8,
    start.z * 0.3 + (seed * 4.7 % 1 - 0.5) * 15
  )

  const cp2 = new THREE.Vector3(
    end.x * 0.3 + (seed * 6.3 % 1 - 0.5) * 15,
    end.y + (seed * 8.1 % 1 - 0.5) * 8,
    end.z * 0.3 + (seed * 3.3 % 1 - 0.5) * 15
  )

  return [start, cp1, cp2, end]
}

export function EncounterEntity() {
  const encounterActive = useCosmosStore((s) => s.encounterActive)
  const setEncounterActive = useCosmosStore((s) => s.setEncounterActive)
  const setEncounterProgress = useCosmosStore((s) => s.setEncounterProgress)

  const meshRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const haloMaterialRef = useRef<THREE.ShaderMaterial>(null)
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
      uCoreColor: { value: new THREE.Color(1, 0.95, 0.9) },
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

    // Fade in/out
    let opacity = 1
    if (progress < ENCOUNTER.fadeInFraction) {
      opacity = smoothstep(0, ENCOUNTER.fadeInFraction, progress)
    } else if (progress > 1 - ENCOUNTER.fadeOutFraction) {
      opacity = smoothstep(1, 1 - ENCOUNTER.fadeOutFraction, progress)
    }

    // Update shader uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
      materialRef.current.uniforms.uOpacity.value = opacity
    }
    if (haloMaterialRef.current) {
      haloMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime()
      haloMaterialRef.current.uniforms.uOpacity.value = opacity * 0.4
    }

    // Scale pulse
    const scale = 0.3 + 0.05 * Math.sin(clock.getElapsedTime() * 2)
    meshRef.current.scale.setScalar(scale)
    if (haloRef.current) haloRef.current.scale.setScalar(scale * 4)

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
      {/* Core */}
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
      {/* Outer halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <shaderMaterial
          ref={haloMaterialRef}
          vertexShader={encounterVertexShader}
          fragmentShader={encounterFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uCoreColor: { value: new THREE.Color(0.5, 0.6, 1.0) },
            uHaloColor: { value: new THREE.Color(0.3, 0.4, 0.9) },
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
