import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCosmosStore } from '../store'
import { STARS } from '../utils/constants'

const starVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aBrightness;
  attribute float aPhase;
  attribute float aFrequency;
  attribute float aDepthFactor;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vBrightness;

  void main() {
    vec3 pos = position;

    float twinkle = 0.5 + 0.5 * sin(uTime * aFrequency + aPhase);
    vBrightness = aBrightness * (0.6 + 0.4 * twinkle);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 8.0);
  }
`

const starFragmentShader = /* glsl */ `
  varying float vBrightness;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = smoothstep(0.5, 0.1, dist) * vBrightness;

    vec3 warmWhite = vec3(1.0, 0.95, 0.85);
    vec3 coolBlue = vec3(0.7, 0.8, 1.0);
    vec3 color = mix(coolBlue, warmWhite, vBrightness);

    gl_FragColor = vec4(color, alpha);
  }
`

export function StarField() {
  const { qualityPreset } = useCosmosStore()
  const count = qualityPreset.starCount
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, sizes, brightnesses, phases, frequencies, depthFactors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const brightnesses = new Float32Array(count)
    const phases = new Float32Array(count)
    const frequencies = new Float32Array(count)
    const depthFactors = new Float32Array(count)

    let idx = 0
    for (const layer of STARS.layers) {
      const layerCount = Math.floor(count * layer.fraction)
      for (let i = 0; i < layerCount && idx < count; i++, idx++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = STARS.minRadius + Math.random() * (STARS.maxRadius - STARS.minRadius)

        positions[idx * 3] = r * Math.sin(phi) * Math.cos(theta)
        positions[idx * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        positions[idx * 3 + 2] = r * Math.cos(phi)

        sizes[idx] = STARS.minScale + Math.random() * (STARS.maxScale - STARS.minScale)
        brightnesses[idx] = 0.3 + Math.random() * 0.7
        phases[idx] = Math.random() * Math.PI * 2
        frequencies[idx] = 0.5 + Math.random() * 2.0
        depthFactors[idx] = layer.depthFactor
      }
    }

    return { positions, sizes, brightnesses, phases, frequencies, depthFactors }
  }, [count])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[brightnesses, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aFrequency" args={[frequencies, 1]} />
        <bufferAttribute attach="attributes-aDepthFactor" args={[depthFactors, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
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
