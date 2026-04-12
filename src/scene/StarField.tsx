import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCosmosStore } from '../store'
import { STARS } from '../utils/constants'
import { applyRedshift } from '../utils/cosmology'

// Pick a spectral class index based on weighted distribution
function pickSpectralClass(): number {
  const r = Math.random()
  let sum = 0
  for (let i = 0; i < STARS.spectralWeights.length; i++) {
    sum += STARS.spectralWeights[i]
    if (r < sum) return i
  }
  return STARS.spectralWeights.length - 1
}

const starVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aBrightness;
  attribute float aPhase;
  attribute float aFrequency;
  attribute float aDepthFactor;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vBrightness;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;

    float twinkle = 0.5 + 0.5 * sin(uTime * aFrequency + aPhase);
    vBrightness = aBrightness * (0.6 + 0.4 * twinkle);
    vColor = aColor;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 8.0);
  }
`

const starFragmentShader = /* glsl */ `
  varying float vBrightness;
  varying vec3 vColor;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = smoothstep(0.5, 0.1, dist) * vBrightness;

    // Brighten towards center — whiter at peak brightness
    vec3 color = mix(vColor, vec3(1.0), vBrightness * 0.3);

    gl_FragColor = vec4(color, alpha);
  }
`

export function StarField() {
  const { qualityPreset } = useCosmosStore()
  const count = qualityPreset.starCount
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, sizes, brightnesses, phases, frequencies, depthFactors, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const brightnesses = new Float32Array(count)
    const phases = new Float32Array(count)
    const frequencies = new Float32Array(count)
    const depthFactors = new Float32Array(count)
    const colors = new Float32Array(count * 3)

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
        frequencies[idx] = 0.3 + Math.random() * 2.5
        depthFactors[idx] = layer.depthFactor

        // Spectral class color
        const spectralIdx = pickSpectralClass()
        const c = STARS.spectralColors[spectralIdx]
        // Add slight random variation to make each star unique
        let cr = c[0] + (Math.random() - 0.5) * 0.05
        let cg = c[1] + (Math.random() - 0.5) * 0.05
        let cb = c[2] + (Math.random() - 0.5) * 0.05

        // Cosmological redshift: distant stars shift toward red
        const normalizedDist = (r - STARS.minRadius) / (STARS.maxRadius - STARS.minRadius)
        const z = normalizedDist * 0.4 // Mild redshift for nearby stars
        ;[cr, cg, cb] = applyRedshift(cr, cg, cb, z)

        colors[idx * 3] = cr
        colors[idx * 3 + 1] = cg
        colors[idx * 3 + 2] = cb

        // Hotter (bluer) stars tend to be brighter and larger
        if (spectralIdx <= 2) {
          sizes[idx] *= 1.3 + Math.random() * 0.5
          brightnesses[idx] = Math.min(1, brightnesses[idx] * 1.4)
        }
        // Cooler (redder) stars tend to be dimmer
        if (spectralIdx >= 5) {
          sizes[idx] *= 0.6 + Math.random() * 0.3
          brightnesses[idx] *= 0.6 + Math.random() * 0.3
        }
      }
    }

    return { positions, sizes, brightnesses, phases, frequencies, depthFactors, colors }
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
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
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
