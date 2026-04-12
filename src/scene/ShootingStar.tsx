import { useRef, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SHOOTING_STAR } from '../utils/constants'
import { useCosmosStore } from '../store'
import { randomRange } from '../utils/mathHelpers'

interface Meteor {
  start: THREE.Vector3
  direction: THREE.Vector3
  speed: number
  startTime: number
  duration: number
  brightness: number
}

export function ShootingStar() {
  const { qualityPreset } = useCosmosStore()
  const trailLength = qualityPreset.shootingStarTrailLength
  const meshRef = useRef<THREE.Line>(null)
  const [meteor, setMeteor] = useState<Meteor | null>(null)
  const nextTimeRef = useRef(performance.now() / 1000 + randomRange(SHOOTING_STAR.minIntervalSeconds, SHOOTING_STAR.maxIntervalSeconds))

  const spawnMeteor = useCallback((time: number) => {
    // Pick a random point on the sky sphere
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 400
    const start = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    )

    // Direction: slightly randomized, mostly tangent to the sphere
    const tangent = new THREE.Vector3(
      -Math.sin(theta) + (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.4,
      Math.cos(theta) + (Math.random() - 0.5) * 0.3
    ).normalize()

    setMeteor({
      start,
      direction: tangent,
      speed: SHOOTING_STAR.speed * (0.8 + Math.random() * 0.4),
      startTime: time,
      duration: SHOOTING_STAR.durationSeconds * (0.7 + Math.random() * 0.6),
      brightness: 0.4 + Math.random() * 0.6,
    })
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Schedule next meteor
    if (!meteor && t > nextTimeRef.current) {
      spawnMeteor(t)
      nextTimeRef.current = t + randomRange(SHOOTING_STAR.minIntervalSeconds, SHOOTING_STAR.maxIntervalSeconds)
    }

    // Animate current meteor
    if (meteor && meshRef.current) {
      const elapsed = t - meteor.startTime
      const progress = elapsed / meteor.duration

      if (progress >= 1) {
        setMeteor(null)
        return
      }

      const geo = meshRef.current.geometry
      const positions = geo.getAttribute('position')
      if (!positions) return

      const headPos = meteor.start.clone().addScaledVector(
        meteor.direction,
        elapsed * meteor.speed
      )

      // Build trail behind head
      for (let i = 0; i < trailLength; i++) {
        const trailFraction = i / trailLength
        const trailPos = headPos.clone().addScaledVector(
          meteor.direction,
          -trailFraction * meteor.speed * 0.08
        )
        positions.setXYZ(i, trailPos.x, trailPos.y, trailPos.z)
      }
      positions.needsUpdate = true

      // Update colors — bright head fading to nothing
      const colors = geo.getAttribute('color')
      if (colors) {
        // Fade in and out over lifetime
        let lifeFade = 1
        if (progress < 0.1) lifeFade = progress / 0.1
        else if (progress > 0.7) lifeFade = (1 - progress) / 0.3

        for (let i = 0; i < trailLength; i++) {
          const trailFade = 1 - i / trailLength
          const intensity = meteor.brightness * trailFade * trailFade * lifeFade
          colors.setXYZ(i, intensity, intensity * 0.95, intensity * 0.85)
        }
        colors.needsUpdate = true
      }
    }
  })

  // Pre-allocate geometry
  const posArray = new Float32Array(trailLength * 3)
  const colArray = new Float32Array(trailLength * 3)

  return (
    <line ref={meshRef as any}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posArray, 3]} />
        <bufferAttribute attach="attributes-color" args={[colArray, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        linewidth={1}
      />
    </line>
  )
}
