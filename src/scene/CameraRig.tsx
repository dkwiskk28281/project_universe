import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { type PerspectiveCamera } from 'three'
import { smoothNoise } from '../utils/noise'
import { CAMERA } from '../utils/constants'

/**
 * Camera Rig — Continuous space travel with organic drift.
 *
 * The camera slowly travels forward through space while
 * gently drifting and rotating, creating the feeling of
 * floating through the cosmos on an endless journey.
 */
export function CameraRig() {
  const seedRef = useRef(Math.random() * 1000)

  useFrame(({ camera, clock }) => {
    const cam = camera as PerspectiveCamera
    const t = clock.getElapsedTime()
    const s = seedRef.current

    // Continuous forward travel — slowly moving through space
    const travelZ = -t * CAMERA.travelSpeed
    const travelX = smoothNoise(t / 300, 1, s + 500) * 40
    const travelY = smoothNoise(t / 400, 1, s + 600) * 20

    // Organic drift layered on top of travel
    const driftX = smoothNoise(t / CAMERA.driftPeriod, 1, s) * CAMERA.driftAmplitude
    const driftY = smoothNoise(t / CAMERA.driftPeriod, 1, s + 100) * CAMERA.driftAmplitude
    const driftZ = smoothNoise(t / CAMERA.driftPeriod, 1, s + 200) * CAMERA.driftAmplitude

    cam.position.set(
      travelX + driftX,
      travelY + driftY,
      travelZ + driftZ
    )

    // Gentle rotation — look around while traveling
    const rx = smoothNoise(t / CAMERA.rotationPeriod, 1, s + 300) * CAMERA.rotationAmplitude
    const ry = smoothNoise(t / CAMERA.rotationPeriod, 1, s + 400) * CAMERA.rotationAmplitude
    // Subtle roll for that zero-gravity feeling
    const rz = smoothNoise(t / 250, 1, s + 500) * 0.03

    cam.rotation.set(rx, ry, rz)
  })

  return null
}
