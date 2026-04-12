import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { type PerspectiveCamera } from 'three'
import { smoothNoise } from '../utils/noise'
import { CAMERA } from '../utils/constants'

export function CameraRig() {
  const seedRef = useRef(Math.random() * 1000)

  useFrame(({ camera, clock }) => {
    const cam = camera as PerspectiveCamera
    const t = clock.getElapsedTime()
    const s = seedRef.current

    const px = smoothNoise(t / CAMERA.driftPeriod, 1, s) * CAMERA.driftAmplitude
    const py = smoothNoise(t / CAMERA.driftPeriod, 1, s + 100) * CAMERA.driftAmplitude
    const pz = smoothNoise(t / CAMERA.driftPeriod, 1, s + 200) * CAMERA.driftAmplitude

    cam.position.set(px, py, pz)

    const rx = smoothNoise(t / CAMERA.rotationPeriod, 1, s + 300) * CAMERA.rotationAmplitude
    const ry = smoothNoise(t / CAMERA.rotationPeriod, 1, s + 400) * CAMERA.rotationAmplitude

    cam.rotation.set(rx, ry, 0)
  })

  return null
}
