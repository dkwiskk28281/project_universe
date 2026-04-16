import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { applyRedshift } from '../utils/cosmology'

/**
 * Infinite Distant Galaxies — always surrounding the camera.
 */

const GALAXY_COUNT = 80
const RADIUS = 3000

const galaxyVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aRotation;
  attribute float aType;
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
    vRotation = aRotation + uTime * 0.002;
    vType = aType;
    vDim = aRedshiftDim;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (600.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 2.0, 40.0);
  }
`

const galaxyFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vRotation;
  varying float vType;
  varying float vDim;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float c = cos(vRotation); float s = sin(vRotation);
    vec2 ruv = vec2(uv.x*c - uv.y*s, uv.x*s + uv.y*c);

    float alpha;
    if (vType < 0.5) {
      float ellipse = length(ruv * vec2(1.0, 1.8));
      alpha = smoothstep(0.5, 0.0, ellipse); alpha *= alpha;
    } else {
      float dist = length(ruv);
      float angle = atan(ruv.y, ruv.x);
      float bulge = smoothstep(0.3, 0.0, dist) * 0.8;
      float spiral = sin(angle * 2.0 + dist * 12.0) * 0.5 + 0.5;
      float arms = spiral * smoothstep(0.5, 0.1, dist) * smoothstep(0.02, 0.08, dist);
      alpha = bulge + arms * 0.3;
      alpha *= smoothstep(0.5, 0.1, dist);
    }
    alpha *= vDim;
    gl_FragColor = vec4(vColor, alpha * 0.85);
  }
`

export function DistantGalaxies() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const initializedRef = useRef(false)

  const buffersRef = useRef({
    positions: new Float32Array(GALAXY_COUNT * 3),
    sizes: new Float32Array(GALAXY_COUNT),
    rotations: new Float32Array(GALAXY_COUNT),
    types: new Float32Array(GALAXY_COUNT),
    colors: new Float32Array(GALAXY_COUNT * 3),
    redshiftDims: new Float32Array(GALAXY_COUNT),
  })

  const b = buffersRef.current

  function initGalaxy(i: number, cx: number, cy: number, cz: number) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const distFactor = Math.random()
    const r = 600 + distFactor * 1400

    b.positions[i * 3] = cx + r * Math.sin(phi) * Math.cos(theta)
    b.positions[i * 3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta)
    b.positions[i * 3 + 2] = cz + r * Math.cos(phi)

    b.sizes[i] = 4 + Math.pow(Math.random(), 1.5) * 18
    b.rotations[i] = Math.random() * Math.PI * 2
    b.types[i] = Math.random() < 0.4 ? 0 : 1

    const z = distFactor * 2.0
    let cr = 0.85, cg = 0.88, cb = 1.0
    ;[cr, cg, cb] = applyRedshift(cr, cg, cb, z)
    b.colors[i * 3] = cr
    b.colors[i * 3 + 1] = cg
    b.colors[i * 3 + 2] = cb
    b.redshiftDims[i] = 1 / Math.pow(1 + z, 1.5)
  }

  useFrame(({ clock, camera }) => {
    if (!materialRef.current || !geoRef.current) return

    const cx = camera.position.x
    const cy = camera.position.y
    const cz = camera.position.z

    if (!initializedRef.current) {
      for (let i = 0; i < GALAXY_COUNT; i++) initGalaxy(i, cx, cy, cz)
      initializedRef.current = true
    }

    let needsUpdate = false
    for (let i = 0; i < GALAXY_COUNT; i++) {
      const dx = b.positions[i * 3] - cx
      const dy = b.positions[i * 3 + 1] - cy
      const dz = b.positions[i * 3 + 2] - cz
      if (dx * dx + dy * dy + dz * dz > RADIUS * RADIUS) {
        initGalaxy(i, cx, cy, cz)
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      geoRef.current.attributes.position.needsUpdate = true
      geoRef.current.attributes.aColor.needsUpdate = true
      geoRef.current.attributes.aRedshiftDim.needsUpdate = true
    }

    materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[b.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[b.sizes, 1]} />
        <bufferAttribute attach="attributes-aRotation" args={[b.rotations, 1]} />
        <bufferAttribute attach="attributes-aType" args={[b.types, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[b.colors, 3]} />
        <bufferAttribute attach="attributes-aRedshiftDim" args={[b.redshiftDims, 1]} />
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
