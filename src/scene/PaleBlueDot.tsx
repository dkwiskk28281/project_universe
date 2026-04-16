import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { randomRange } from '../utils/mathHelpers'

/**
 * Pale Blue Dot — The emotional climax of the Cosmos experience.
 *
 * Very rarely (every 5-10 minutes), a tiny blue-green dot appears
 * in the distance. It's Earth — seen from the depths of space.
 *
 * "Look again at that dot. That's here. That's home. That's us."
 *   — Carl Sagan, 1994
 *
 * The dot slowly drifts across the field of view over 30 seconds,
 * then fades. It's small, fragile, and heartbreakingly beautiful.
 *
 * This moment is designed to trigger the deepest awe response.
 */

const MIN_INTERVAL = 300 // 5 minutes minimum
const MAX_INTERVAL = 600 // 10 minutes maximum
const DURATION = 35 // seconds visible

export function PaleBlueDot() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [active, setActive] = useState(false)
  const startTimeRef = useRef(0)
  const nextTimeRef = useRef(60 + Math.random() * 120) // First one at 1-3 minutes
  const posRef = useRef(new THREE.Vector3())

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()

    if (!active) {
      if (t > nextTimeRef.current) {
        // Spawn Earth ahead and to the side
        const angle = randomRange(-0.4, 0.4)
        const elevation = randomRange(-0.2, 0.2)
        const dist = 150

        posRef.current.set(
          camera.position.x + Math.sin(angle) * dist,
          camera.position.y + elevation * dist,
          camera.position.z - Math.cos(angle) * dist
        )

        startTimeRef.current = t
        setActive(true)
        nextTimeRef.current = t + randomRange(MIN_INTERVAL, MAX_INTERVAL)
      }
      return
    }

    const elapsed = t - startTimeRef.current
    const progress = elapsed / DURATION

    if (progress >= 1) {
      setActive(false)
      return
    }

    if (!meshRef.current || !glowRef.current) return

    meshRef.current.position.copy(posRef.current)
    glowRef.current.position.copy(posRef.current)

    // Fade in/out
    let opacity: number
    if (progress < 0.15) opacity = progress / 0.15
    else if (progress > 0.8) opacity = (1 - progress) / 0.2
    else opacity = 1

    // The dot itself — tiny, blue-green
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = opacity
    meshRef.current.scale.setScalar(0.15)

    // Soft glow around it
    const glowMat = glowRef.current.material as THREE.MeshBasicMaterial
    glowMat.opacity = opacity * 0.15
    glowRef.current.scale.setScalar(1.5)
  })

  if (!active) return null

  return (
    <group>
      {/* The dot — Earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={new THREE.Color(0.3, 0.5, 0.8)}
          transparent
          depthWrite={false}
        />
      </mesh>
      {/* Gentle glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial
          color={new THREE.Color(0.4, 0.6, 1.0)}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
