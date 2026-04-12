import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { applyRedshift } from '../utils/cosmology'

/**
 * Distant Galaxies — fuzzy luminous sprites scattered across deep space.
 *
 * Each galaxy has a procedural shape (elliptical or spiral-like),
 * colored by its redshift (distance). Closer galaxies appear bluish-white,
 * distant ones shift to orange-red — exactly as in real Hubble deep fields.
 *
 * ~80 galaxies, each rendered as a point sprite with a custom fragment shader.
 */

const GALAXY_COUNT = 80

const galaxyVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aRotation;
  attribute float aType; // 0 = elliptical, 1 = spiral
  attribute vec3 aColor;
  attribute float aRedshiftDim;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vRotation;
  varying float vType;
  varying float vDim;

  void main() {
    vColor = aColor;
    vRotation = aRotation + uTime * 0.002; // Imperceptible rotation
    vType = aType;
    vDim = aRedshiftDim;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (600.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 24.0);
  }
`

const galaxyFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vRotation;
  varying float vType;
  varying float vDim;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;

    // Rotate UV
    float c = cos(vRotation);
    float s = sin(vRotation);
    vec2 ruv = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);

    float alpha;

    if (vType < 0.5) {
      // Elliptical galaxy — smooth ellipse
      float ellipse = length(ruv * vec2(1.0, 1.8));
      alpha = smoothstep(0.5, 0.0, ellipse);
      alpha *= alpha; // Soft falloff
    } else {
      // Spiral-like galaxy — center + arms hint
      float dist = length(ruv);
      float angle = atan(ruv.y, ruv.x);

      // Central bulge
      float bulge = smoothstep(0.3, 0.0, dist) * 0.8;

      // Spiral arm suggestion (simplified log-spiral)
      float spiral = sin(angle * 2.0 + dist * 12.0) * 0.5 + 0.5;
      float arms = spiral * smoothstep(0.5, 0.1, dist) * smoothstep(0.02, 0.08, dist);

      alpha = bulge + arms * 0.3;
      alpha *= smoothstep(0.5, 0.1, dist); // Overall falloff
    }

    // Apply redshift dimming
    alpha *= vDim;

    gl_FragColor = vec4(vColor, alpha * 0.6);
  }
`

export function DistantGalaxies() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const data = useMemo(() => {
    const positions = new Float32Array(GALAXY_COUNT * 3)
    const sizes = new Float32Array(GALAXY_COUNT)
    const rotations = new Float32Array(GALAXY_COUNT)
    const types = new Float32Array(GALAXY_COUNT)
    const colors = new Float32Array(GALAXY_COUNT * 3)
    const redshiftDims = new Float32Array(GALAXY_COUNT)

    for (let i = 0; i < GALAXY_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      // Place galaxies far out, with distance distribution
      const distanceFactor = Math.random() // 0 = near, 1 = far
      const r = 1500 + distanceFactor * 2500

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Bigger galaxies are rarer (inverse size-frequency)
      sizes[i] = 2 + Math.pow(Math.random(), 2) * 12
      rotations[i] = Math.random() * Math.PI * 2

      // 40% elliptical, 60% spiral (roughly matching real universe)
      types[i] = Math.random() < 0.4 ? 0 : 1

      // Redshift based on distance
      const z = distanceFactor * 2.0

      // Base color: bluish-white for young/nearby galaxies
      let cr = 0.85, cg = 0.88, cb = 1.0
      // Apply cosmological redshift
      ;[cr, cg, cb] = applyRedshift(cr, cg, cb, z)
      colors[i * 3] = cr
      colors[i * 3 + 1] = cg
      colors[i * 3 + 2] = cb

      // Dimming with distance (Tolman surface brightness)
      // In expanding universe: brightness ∝ 1/(1+z)⁴
      // Simplified for visual beauty:
      redshiftDims[i] = 1 / Math.pow(1 + z, 1.5)
    }

    return { positions, sizes, rotations, types, colors, redshiftDims }
  }, [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        <bufferAttribute attach="attributes-aRotation" args={[data.rotations, 1]} />
        <bufferAttribute attach="attributes-aType" args={[data.types, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
        <bufferAttribute attach="attributes-aRedshiftDim" args={[data.redshiftDims, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={galaxyVertexShader}
        fragmentShader={galaxyFragmentShader}
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
