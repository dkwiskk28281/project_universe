import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCosmosStore } from '../store'
import nebulaVertexShader from './shaders/nebula.vert.glsl'
import nebulaFragmentShader from './shaders/nebula.frag.glsl'

export function NebulaVolume() {
  const { qualityPreset } = useCosmosStore()
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSteps: { value: qualityPreset.nebulaSteps },
      uColor1: { value: new THREE.Color(0x0a1040) }, // deep blue-indigo
      uColor2: { value: new THREE.Color(0x1a0838) }, // rich purple
      uColor3: { value: new THREE.Color(0x081828) }, // deep teal-blue
    }),
    [qualityPreset.nebulaSteps]
  )

  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock, camera }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (meshRef.current) {
      meshRef.current.position.copy(camera.position)
    }
  })

  if (!qualityPreset.enableNebulaVolume) return null

  return (
    <mesh ref={meshRef} scale={[80, 80, 80]}>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
