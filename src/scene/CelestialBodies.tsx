import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Infinite Celestial Bodies — planets, gas giants with rings,
 * binary stars, and nebula clouds that continuously spawn
 * around the camera as you travel through space.
 */

const BODY_COUNT = 50
const SPAWN_RADIUS = 500
const DESPAWN_RADIUS = 600

// Seeded hash for deterministic procedural generation
function hash(n: number): number {
  const x = Math.sin(n) * 43758.5453
  return x - Math.floor(x)
}

// Planet surface shader
const planetVert = /* glsl */ `
  varying vec3 vNormal; varying vec3 vViewDir; varying vec2 vUv;
  void main() {
    vUv = uv; vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const planetFrag = /* glsl */ `
  uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uAtmo; uniform float uTime;
  varying vec3 vNormal; varying vec3 vViewDir; varying vec2 vUv;
  void main() {
    vec3 ld = normalize(vec3(0.5, 0.3, 1.0));
    float diff = max(dot(vNormal, ld), 0.0);
    float bands = sin(vUv.y * 20.0 + uTime * 0.02) * 0.5 + 0.5;
    vec3 surf = mix(uColor1, uColor2, bands);
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.0);
    vec3 color = surf * (0.08 + diff * 0.8) + uAtmo * fresnel * 1.5;
    gl_FragColor = vec4(color, 1.0);
  }
`

// Ring shader
const ringVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const ringFrag = /* glsl */ `
  uniform vec3 uRingColor;
  varying vec2 vUv;
  void main() {
    float r = length(vUv - 0.5) * 2.0;
    // Ring bands
    float ring = smoothstep(0.55, 0.6, r) * smoothstep(1.0, 0.95, r);
    float bands = sin(r * 60.0) * 0.3 + 0.7;
    float alpha = ring * bands * 0.5;
    gl_FragColor = vec4(uRingColor, alpha);
  }
`

// Cloud shader
const cloudVert = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const cloudFrag = /* glsl */ `
  uniform vec3 uColor1; uniform vec3 uColor2; uniform float uOpacity;
  varying vec3 vNormal;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0,0,1))), 2.0);
    vec3 color = mix(uColor1, uColor2, fresnel);
    float alpha = (0.4 + fresnel * 0.6) * uOpacity;
    gl_FragColor = vec4(color, alpha);
  }
`

interface Body {
  type: 'planet' | 'gas-giant' | 'binary' | 'cloud'
  position: THREE.Vector3
  scale: number
  color1: THREE.Color
  color2: THREE.Color
  atmosphere: THREE.Color
  ringColor?: THREE.Color
  rotation: number
  active: boolean
}

function randomBody(cx: number, cy: number, cz: number, seed: number): Body {
  const angle = hash(seed) * Math.PI * 2
  const elevation = (hash(seed + 1) - 0.5) * 200
  const dist = 80 + hash(seed + 2) * (SPAWN_RADIUS - 80)

  // Place mostly ahead of camera (negative Z is forward)
  const offsetZ = (hash(seed + 3) - 0.3) * SPAWN_RADIUS * 2

  const position = new THREE.Vector3(
    cx + Math.cos(angle) * dist,
    cy + elevation,
    cz + offsetZ
  )

  const typeRoll = hash(seed + 4)
  let type: Body['type']
  if (typeRoll < 0.2) type = 'planet'
  else if (typeRoll < 0.4) type = 'gas-giant'
  else if (typeRoll < 0.5) type = 'binary'
  else type = 'cloud'

  const colorSeed = hash(seed + 5)

  let color1: THREE.Color, color2: THREE.Color, atmosphere: THREE.Color
  let ringColor: THREE.Color | undefined
  let scale: number

  switch (type) {
    case 'planet':
      scale = 1 + hash(seed + 6) * 4
      if (colorSeed < 0.3) {
        color1 = new THREE.Color(0.4, 0.2, 0.1)
        color2 = new THREE.Color(0.5, 0.25, 0.15)
        atmosphere = new THREE.Color(0.6, 0.3, 0.2)
      } else if (colorSeed < 0.7) {
        color1 = new THREE.Color(0.15, 0.3, 0.6)
        color2 = new THREE.Color(0.1, 0.25, 0.5)
        atmosphere = new THREE.Color(0.3, 0.5, 0.9)
      } else {
        color1 = new THREE.Color(0.1, 0.3, 0.15)
        color2 = new THREE.Color(0.15, 0.25, 0.5)
        atmosphere = new THREE.Color(0.4, 0.6, 1.0)
      }
      break
    case 'gas-giant':
      scale = 4 + hash(seed + 6) * 8
      color1 = new THREE.Color(0.6, 0.45, 0.3)
      color2 = new THREE.Color(0.5, 0.35, 0.2)
      atmosphere = new THREE.Color(0.4, 0.5, 0.7)
      ringColor = new THREE.Color(0.7, 0.6, 0.5)
      break
    case 'binary':
      scale = 1.5 + hash(seed + 6) * 2
      color1 = new THREE.Color(0.9, 0.92, 1.0)
      color2 = new THREE.Color(1.0, 0.9, 0.7)
      atmosphere = new THREE.Color(0.6, 0.7, 1.0)
      break
    default: // cloud
      scale = 15 + hash(seed + 6) * 35
      const h = hash(seed + 7)
      color1 = h < 0.33
        ? new THREE.Color(0.1, 0.05, 0.25)
        : h < 0.66
        ? new THREE.Color(0.05, 0.1, 0.3)
        : new THREE.Color(0.25, 0.05, 0.08)
      color2 = new THREE.Color(color1.r * 1.5, color1.g * 1.5, color1.b * 1.5)
      atmosphere = color1
      break
  }

  return { type, position, scale, color1, color2, atmosphere, ringColor, rotation: hash(seed + 8) * Math.PI * 2, active: true }
}

export function CelestialBodies() {
  const bodiesRef = useRef<Body[]>([])
  const seedCounterRef = useRef(0)
  const initializedRef = useRef(false)
  const groupRef = useRef<THREE.Group>(null)

  // Refs for reusable geometries
  const sphereGeo = useRef<THREE.SphereGeometry | null>(null)
  const ringGeo = useRef<THREE.RingGeometry | null>(null)

  useFrame(({ camera, clock }) => {
    if (!groupRef.current) return

    const cx = camera.position.x
    const cy = camera.position.y
    const cz = camera.position.z

    if (!initializedRef.current) {
      if (!sphereGeo.current) sphereGeo.current = new THREE.SphereGeometry(1, 24, 24)
      if (!ringGeo.current) ringGeo.current = new THREE.RingGeometry(1.5, 2.5, 32)

      // Spawn initial bodies
      for (let i = 0; i < BODY_COUNT; i++) {
        const seed = seedCounterRef.current++
        const body = randomBody(cx, cy, cz, seed)
        bodiesRef.current.push(body)
        addBodyToScene(body, groupRef.current, sphereGeo.current, ringGeo.current, clock.getElapsedTime())
      }
      initializedRef.current = true
    }

    // Check and respawn bodies that are too far
    const children = groupRef.current.children
    let childIdx = 0
    for (let i = 0; i < bodiesRef.current.length; i++) {
      const body = bodiesRef.current[i]
      const dx = body.position.x - cx
      const dy = body.position.y - cy
      const dz = body.position.z - cz
      const distSq = dx * dx + dy * dy + dz * dz

      if (distSq > DESPAWN_RADIUS * DESPAWN_RADIUS) {
        // Replace with new body
        const seed = seedCounterRef.current++
        const newBody = randomBody(cx, cy, cz, seed)
        bodiesRef.current[i] = newBody

        // Update scene object
        const meshGroup = children[childIdx] as THREE.Group
        if (meshGroup) {
          meshGroup.position.copy(newBody.position)
          meshGroup.scale.setScalar(newBody.scale)
        }
      }
      childIdx++
    }

    // Rotate planets
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as THREE.Group
      if (child.userData.type === 'planet' || child.userData.type === 'gas-giant' || child.userData.type === 'binary') {
        child.rotation.y += 0.002
      }
    }
  })

  return <group ref={groupRef} />
}

function addBodyToScene(
  body: Body,
  parent: THREE.Group,
  sphereGeo: THREE.SphereGeometry,
  ringGeo: THREE.RingGeometry,
  time: number
) {
  const group = new THREE.Group()
  group.position.copy(body.position)
  group.scale.setScalar(body.scale)
  group.userData.type = body.type

  if (body.type === 'cloud') {
    const mat = new THREE.ShaderMaterial({
      vertexShader: cloudVert,
      fragmentShader: cloudFrag,
      uniforms: {
        uColor1: { value: body.color1 },
        uColor2: { value: body.color2 },
        uOpacity: { value: 0.12 + Math.random() * 0.1 },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
    const mesh = new THREE.Mesh(sphereGeo, mat)
    group.add(mesh)
  } else {
    // Planet/gas-giant/binary
    const mat = new THREE.ShaderMaterial({
      vertexShader: planetVert,
      fragmentShader: planetFrag,
      uniforms: {
        uColor1: { value: body.color1 },
        uColor2: { value: body.color2 },
        uAtmo: { value: body.atmosphere },
        uTime: { value: time },
      },
    })
    const mesh = new THREE.Mesh(sphereGeo, mat)
    group.add(mesh)

    // Add ring for gas giants
    if (body.type === 'gas-giant' && body.ringColor) {
      const ringMat = new THREE.ShaderMaterial({
        vertexShader: ringVert,
        fragmentShader: ringFrag,
        uniforms: { uRingColor: { value: body.ringColor } },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI * 0.35 + (Math.random() - 0.5) * 0.3
      group.add(ring)
    }

    // Binary: add companion star
    if (body.type === 'binary') {
      const companionMat = new THREE.ShaderMaterial({
        vertexShader: planetVert,
        fragmentShader: planetFrag,
        uniforms: {
          uColor1: { value: body.color2 },
          uColor2: { value: body.color1 },
          uAtmo: { value: new THREE.Color(1.0, 0.8, 0.5) },
          uTime: { value: time },
        },
      })
      const companion = new THREE.Mesh(sphereGeo, companionMat)
      companion.position.set(2.5, 0.5, 0)
      companion.scale.setScalar(0.6 + Math.random() * 0.3)
      group.add(companion)
    }
  }

  parent.add(group)
}
