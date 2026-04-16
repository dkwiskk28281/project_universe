import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Celestial Bodies — distant glowing objects in deep space.
 *
 * NOT opaque spheres. Everything is rendered as soft, luminous
 * points with gentle glow halos — the way celestial objects
 * actually appear from vast distances in space.
 *
 * Types:
 *   - Distant planets: tiny bright dots with colored atmosphere halo
 *   - Nebula wisps: soft, transparent volumetric patches
 *   - Star clusters: tight groups of warm points
 *
 * All objects are SMALL and DISTANT — nothing fills the screen.
 * They drift past like distant scenery, creating depth and wonder.
 */

const OBJECT_COUNT = 30
const RADIUS = 600
const DESPAWN = 700

function hash(n: number): number {
  const x = Math.sin(n) * 43758.5453
  return x - Math.floor(x)
}

// Soft glowing point sprite shader
const glowVert = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aGlow;

  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vGlow;

  void main() {
    vColor = aColor;
    vGlow = aGlow;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (300.0 / -mv.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 30.0);
  }
`

const glowFrag = /* glsl */ `
  varying vec3 vColor;
  varying float vGlow;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);

    // Soft core
    float core = smoothstep(0.5, 0.0, d);
    core = pow(core, 2.0); // Extra soft

    // Diffuse halo
    float halo = smoothstep(0.5, 0.05, d) * 0.3;

    float alpha = (core + halo * vGlow) * 0.8;
    vec3 color = mix(vColor, vec3(1.0), core * 0.5);

    gl_FragColor = vec4(color, alpha);
  }
`

// Nebula wisp shader — transparent volumetric patch
const wispVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const wispFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPos;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  void main() {
    float n = noise(vPos * 2.0 + uTime * 0.01);
    float n2 = noise(vPos * 4.0 - uTime * 0.005);

    float density = n * n2;
    density = smoothstep(0.1, 0.5, density);

    float edge = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    edge = pow(edge, 1.5);

    float alpha = density * 0.15 * uOpacity + edge * 0.05 * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`

interface CelestialObj {
  type: 'glow' | 'wisp'
  px: number; py: number; pz: number
  size: number
  cr: number; cg: number; cb: number
  glow: number
}

function spawnObject(cx: number, cy: number, cz: number, seed: number): CelestialObj {
  const theta = hash(seed) * Math.PI * 2
  const phi = Math.acos(2 * hash(seed + 1) - 1)
  const dist = 200 + hash(seed + 2) * 400
  const type = hash(seed + 3) > 0.35 ? 'glow' as const : 'wisp' as const

  const px = cx + Math.sin(phi) * Math.cos(theta) * dist
  const py = cy + Math.sin(phi) * Math.sin(theta) * dist * 0.5
  const pz = cz + Math.cos(phi) * dist

  let cr: number, cg: number, cb: number, size: number, glow: number

  if (type === 'glow') {
    const colorType = hash(seed + 4)
    if (colorType < 0.3) {
      // Warm planet glow
      cr = 0.9; cg = 0.6; cb = 0.3; size = 1 + hash(seed + 5) * 2
    } else if (colorType < 0.5) {
      // Blue ice world
      cr = 0.3; cg = 0.5; cb = 0.9; size = 0.8 + hash(seed + 5) * 1.5
    } else if (colorType < 0.7) {
      // Star cluster - warm white
      cr = 1.0; cg = 0.95; cb = 0.85; size = 1.5 + hash(seed + 5) * 3
    } else {
      // Distant galaxy glow
      cr = 0.7; cg = 0.7; cb = 1.0; size = 2 + hash(seed + 5) * 4
    }
    glow = 0.5 + hash(seed + 6) * 0.5
  } else {
    // Nebula wisp colors — Hubble palette diversity
    const h = hash(seed + 4)
    if (h < 0.25) {
      cr = 0.08; cg = 0.15; cb = 0.4   // OIII blue
    } else if (h < 0.45) {
      cr = 0.04; cg = 0.25; cb = 0.3   // Teal
    } else if (h < 0.65) {
      cr = 0.18; cg = 0.06; cb = 0.3   // Purple
    } else if (h < 0.8) {
      cr = 0.2; cg = 0.06; cb = 0.1    // Hα rose
    } else {
      cr = 0.15; cg = 0.1; cb = 0.03   // Gold nebula
    }
    size = 8 + hash(seed + 5) * 20
    glow = 0
  }

  return { type, px, py, pz, size, cr, cg, cb, glow }
}

export function CelestialBodies() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const wispGroupRef = useRef<THREE.Group>(null)
  const initRef = useRef(false)
  const seedRef = useRef(0)

  // Pre-allocate glow buffers
  const glowCount = Math.floor(OBJECT_COUNT * 0.65)
  const glowBuf = useMemo(() => ({
    positions: new Float32Array(glowCount * 3),
    sizes: new Float32Array(glowCount),
    colors: new Float32Array(glowCount * 3),
    glows: new Float32Array(glowCount),
    objects: [] as CelestialObj[],
  }), [glowCount])

  const wispObjects = useRef<CelestialObj[]>([])
  const wispGeo = useRef<THREE.SphereGeometry | null>(null)

  function initGlow(idx: number, obj: CelestialObj) {
    glowBuf.positions[idx * 3] = obj.px
    glowBuf.positions[idx * 3 + 1] = obj.py
    glowBuf.positions[idx * 3 + 2] = obj.pz
    glowBuf.sizes[idx] = obj.size
    glowBuf.colors[idx * 3] = obj.cr
    glowBuf.colors[idx * 3 + 1] = obj.cg
    glowBuf.colors[idx * 3 + 2] = obj.cb
    glowBuf.glows[idx] = obj.glow
  }

  useFrame(({ camera, clock }) => {
    const cx = camera.position.x, cy = camera.position.y, cz = camera.position.z
    const t = clock.getElapsedTime()

    if (!initRef.current) {
      if (!wispGeo.current) wispGeo.current = new THREE.SphereGeometry(1, 12, 12)

      let gi = 0
      for (let i = 0; i < OBJECT_COUNT; i++) {
        const obj = spawnObject(cx, cy, cz, seedRef.current++)
        if (obj.type === 'glow' && gi < glowCount) {
          glowBuf.objects.push(obj)
          initGlow(gi++, obj)
        } else if (obj.type === 'wisp') {
          wispObjects.current.push(obj)
          addWisp(obj, wispGroupRef.current!, wispGeo.current!, t)
        }
      }
      initRef.current = true
    }

    // Update glow points — respawn if too far
    let needsUpdate = false
    for (let i = 0; i < glowBuf.objects.length; i++) {
      const obj = glowBuf.objects[i]
      const dx = obj.px - cx, dy = obj.py - cy, dz = obj.pz - cz
      if (dx * dx + dy * dy + dz * dz > DESPAWN * DESPAWN) {
        const newObj = spawnObject(cx, cy, cz, seedRef.current++)
        if (newObj.type === 'glow') {
          glowBuf.objects[i] = newObj
          initGlow(i, newObj)
          needsUpdate = true
        }
      }
    }
    if (needsUpdate && geoRef.current) {
      geoRef.current.attributes.position.needsUpdate = true
      geoRef.current.attributes.aColor.needsUpdate = true
    }

    // Update wisps
    if (wispGroupRef.current) {
      const children = wispGroupRef.current.children
      for (let i = 0; i < wispObjects.current.length && i < children.length; i++) {
        const obj = wispObjects.current[i]
        const dx = obj.px - cx, dy = obj.py - cy, dz = obj.pz - cz
        const distSq = dx * dx + dy * dy + dz * dz

        // Fade based on distance
        const mesh = children[i] as THREE.Mesh
        if (mesh.material instanceof THREE.ShaderMaterial) {
          const fade = distSq > (DESPAWN * 0.8) * (DESPAWN * 0.8)
            ? Math.max(0, 1 - (Math.sqrt(distSq) - DESPAWN * 0.8) / (DESPAWN * 0.2))
            : 1
          mesh.material.uniforms.uOpacity.value = fade
          mesh.material.uniforms.uTime.value = t
        }

        if (distSq > DESPAWN * DESPAWN) {
          const newObj = spawnObject(cx, cy, cz, seedRef.current++)
          if (newObj.type === 'wisp') {
            wispObjects.current[i] = newObj
            mesh.position.set(newObj.px, newObj.py, newObj.pz)
            mesh.scale.setScalar(newObj.size)
          }
        }
      }
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }
  })

  return (
    <group>
      {/* Glowing points — planets, clusters, distant galaxies */}
      <points frustumCulled={false}>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute attach="attributes-position" args={[glowBuf.positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[glowBuf.sizes, 1]} />
          <bufferAttribute attach="attributes-aColor" args={[glowBuf.colors, 3]} />
          <bufferAttribute attach="attributes-aGlow" args={[glowBuf.glows, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={glowVert}
          fragmentShader={glowFrag}
          uniforms={{
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Nebula wisps — soft transparent volumes */}
      <group ref={wispGroupRef} />
    </group>
  )
}

function addWisp(obj: CelestialObj, parent: THREE.Group, geo: THREE.SphereGeometry, time: number) {
  const mat = new THREE.ShaderMaterial({
    vertexShader: wispVert,
    fragmentShader: wispFrag,
    uniforms: {
      uColor: { value: new THREE.Color(obj.cr, obj.cg, obj.cb) },
      uOpacity: { value: 1.0 },
      uTime: { value: time },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(obj.px, obj.py, obj.pz)
  mesh.scale.setScalar(obj.size)
  parent.add(mesh)
}
