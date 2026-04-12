import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Infinite Celestial Bodies — physically accurate planets, gas giants,
 * nebula clouds, and binary stars with smooth distance-based fade.
 *
 * Physics modeled:
 *   - Rayleigh atmospheric scattering (limb brightening)
 *   - Procedural surface features (FBM noise terrain/bands)
 *   - Day/night terminator from directional starlight
 *   - Gas giant zonal bands (differential rotation)
 *   - Ring particle density (Cassini-like gaps)
 *   - Distance fade: objects smoothly materialize from deep space
 */

const BODY_COUNT = 20
const SPAWN_RADIUS = 500
const DESPAWN_RADIUS = 550
const FADE_START = 400
const FADE_IN_DIST = 120
const MIN_SPAWN_DIST = 150 // Never spawn closer than this

function hash(n: number): number {
  const x = Math.sin(n) * 43758.5453
  return x - Math.floor(x)
}

// ─── Planet shader: surface + atmosphere ───────────────────

const planetVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const planetFrag = /* glsl */ `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uAtmo;
  uniform float uTime;
  uniform float uAlpha;
  uniform float uSurfaceType; // 0=rocky, 1=gas, 2=ice, 3=earth

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  // Simplex-like noise for surface detail
  vec3 hash33(vec3 p) {
    p = vec3(dot(p,vec3(127.1,311.7,74.7)),
             dot(p,vec3(269.5,183.3,246.1)),
             dot(p,vec3(113.5,271.9,124.6)));
    return -1.0+2.0*fract(sin(p)*43758.5453);
  }
  float noise(vec3 p) {
    vec3 i=floor(p); vec3 f=fract(p); vec3 u=f*f*(3.0-2.0*f);
    return mix(mix(mix(dot(hash33(i),f),
      dot(hash33(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
      mix(dot(hash33(i+vec3(0,1,0)),f-vec3(0,1,0)),
      dot(hash33(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
      mix(mix(dot(hash33(i+vec3(0,0,1)),f-vec3(0,0,1)),
      dot(hash33(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
      mix(dot(hash33(i+vec3(0,1,1)),f-vec3(0,1,1)),
      dot(hash33(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);
  }
  float fbm(vec3 p) {
    float v=0.0, a=0.5;
    for(int i=0;i<4;i++){v+=a*noise(p);p*=2.0;a*=0.5;}
    return v;
  }

  void main() {
    // Starlight direction
    vec3 lightDir = normalize(vec3(0.6, 0.4, 0.8));
    float NdotL = dot(vWorldNormal, lightDir);
    float diffuse = max(NdotL, 0.0);
    float ambient = 0.06;

    // Night side subtle glow (city lights / volcanic for rocky, storms for gas)
    float nightGlow = max(-NdotL - 0.2, 0.0) * 0.15;

    // Surface detail based on type
    vec3 surfaceColor;
    vec3 p = vec3(vUv * 8.0, uTime * 0.005);

    if (uSurfaceType < 0.5) {
      // Rocky: craters and terrain
      float terrain = fbm(p * 3.0) * 0.5 + 0.5;
      float craters = smoothstep(0.55, 0.5, noise(p * 6.0)) * 0.3;
      surfaceColor = mix(uColor1, uColor2, terrain) - vec3(craters);
    } else if (uSurfaceType < 1.5) {
      // Gas giant: zonal bands with turbulence
      float lat = vUv.y;
      float bands = sin(lat * 30.0 + fbm(vec3(lat * 5.0, uTime * 0.01, 0.0)) * 2.0) * 0.5 + 0.5;
      float storms = fbm(vec3(vUv * 12.0, uTime * 0.008)) * 0.3;
      surfaceColor = mix(uColor1, uColor2, bands + storms);
      // Great spot
      float spotDist = length(vUv - vec2(0.3, 0.45));
      float spot = smoothstep(0.08, 0.04, spotDist);
      surfaceColor = mix(surfaceColor, uColor1 * 1.3, spot * 0.5);
    } else if (uSurfaceType < 2.5) {
      // Ice giant: smooth with subtle bands
      float bands = sin(vUv.y * 15.0) * 0.15 + 0.5;
      float swirl = fbm(vec3(vUv * 6.0, uTime * 0.003)) * 0.2;
      surfaceColor = mix(uColor1, uColor2, bands + swirl);
    } else {
      // Earth-like: continents and oceans
      float continents = fbm(p * 2.0);
      float land = smoothstep(-0.05, 0.05, continents);
      vec3 ocean = uColor2;
      vec3 landColor = uColor1;
      surfaceColor = mix(ocean, landColor, land);
      // Polar caps
      float polar = smoothstep(0.85, 0.95, abs(vUv.y - 0.5) * 2.0);
      surfaceColor = mix(surfaceColor, vec3(0.9, 0.92, 0.95), polar);
    }

    // Rayleigh atmospheric scattering approximation
    // Limb brightening: atmosphere is thicker at edges
    float fresnel = 1.0 - max(dot(vNormal, vViewDir), 0.0);
    float atmosphere = pow(fresnel, 2.5);

    // Atmospheric color (Rayleigh: shorter wavelengths scatter more)
    vec3 atmoColor = uAtmo * atmosphere * 2.0;

    // Terminator softening (atmosphere scatters light around the edge)
    float terminator = smoothstep(-0.15, 0.3, NdotL);

    vec3 color = surfaceColor * (ambient + diffuse * terminator * 0.9) + atmoColor;
    color += surfaceColor * nightGlow * (1.0 - terminator);

    gl_FragColor = vec4(color, uAlpha);
  }
`

// ─── Ring shader with gaps ─────────────────────────────────

const ringVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const ringFrag = /* glsl */ `
  uniform vec3 uRingColor;
  uniform float uAlpha;

  varying vec2 vUv;

  void main() {
    float r = length(vUv - 0.5) * 2.0;

    // Main ring structure
    float ring = smoothstep(0.5, 0.55, r) * smoothstep(1.0, 0.95, r);

    // Ring density bands (like Saturn's A, B, C rings)
    float bands = 1.0;
    bands *= smoothstep(0.0, 0.02, abs(r - 0.72)); // Cassini division
    bands *= smoothstep(0.0, 0.01, abs(r - 0.63)); // Encke gap
    bands *= 0.5 + 0.5 * sin(r * 80.0); // Fine structure
    bands = mix(0.3, 1.0, bands);

    float alpha = ring * bands * 0.45 * uAlpha;
    gl_FragColor = vec4(uRingColor * (0.7 + bands * 0.3), alpha);
  }
`

// ─── Nebula cloud shader ───────────────────────────────────

const cloudVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const cloudFrag = /* glsl */ `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uAlpha;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vWorldPos;

  vec3 hash33(vec3 p) {
    p = vec3(dot(p,vec3(127.1,311.7,74.7)),
             dot(p,vec3(269.5,183.3,246.1)),
             dot(p,vec3(113.5,271.9,124.6)));
    return -1.0+2.0*fract(sin(p)*43758.5453);
  }
  float noise(vec3 p) {
    vec3 i=floor(p);vec3 f=fract(p);vec3 u=f*f*(3.0-2.0*f);
    return mix(mix(mix(dot(hash33(i),f),
      dot(hash33(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
      mix(dot(hash33(i+vec3(0,1,0)),f-vec3(0,1,0)),
      dot(hash33(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
      mix(mix(dot(hash33(i+vec3(0,0,1)),f-vec3(0,0,1)),
      dot(hash33(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
      mix(dot(hash33(i+vec3(0,1,1)),f-vec3(0,1,1)),
      dot(hash33(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);
  }
  float fbm(vec3 p) {
    float v=0.0,a=0.5;
    for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=0.5;}
    return v;
  }

  void main() {
    vec3 p = vWorldPos * 0.015 + uTime * 0.003;
    float n1 = fbm(p) * 0.5 + 0.5;
    float n2 = fbm(p * 1.5 + 10.0) * 0.5 + 0.5;

    // Volumetric-looking density
    float density = n1 * n2;
    density = smoothstep(0.15, 0.6, density);

    // Edge glow (Fresnel)
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0,0,1))), 1.5);

    vec3 color = mix(uColor1, uColor2, n1);
    // Internal emission glow
    color += uColor2 * density * 0.3;

    float alpha = (density * 0.5 + fresnel * 0.3) * uAlpha;
    gl_FragColor = vec4(color, alpha);
  }
`

// ─── Body types and spawning ───────────────────────────────

interface Body {
  type: 'planet' | 'gas-giant' | 'binary' | 'cloud'
  surfaceType: number // 0=rocky, 1=gas, 2=ice, 3=earth
  position: THREE.Vector3
  scale: number
  color1: THREE.Color
  color2: THREE.Color
  atmosphere: THREE.Color
  ringColor?: THREE.Color
  spawnDist: number // distance from camera at spawn time (for fade-in)
  active: boolean
}

function spawnBody(cx: number, cy: number, cz: number, seed: number): Body {
  const angle = hash(seed) * Math.PI * 2
  const elevation = (hash(seed + 1) - 0.5) * 120
  // Spawn at medium-far distance — never too close
  const dist = MIN_SPAWN_DIST + hash(seed + 2) * (SPAWN_RADIUS - MIN_SPAWN_DIST)
  const offsetZ = (hash(seed + 3) - 0.5) * SPAWN_RADIUS

  const position = new THREE.Vector3(
    cx + Math.cos(angle) * dist,
    cy + elevation,
    cz + offsetZ
  )

  const typeRoll = hash(seed + 4)
  let type: Body['type']
  let surfaceType = 0
  if (typeRoll < 0.15) { type = 'planet'; surfaceType = 0 } // rocky
  else if (typeRoll < 0.25) { type = 'planet'; surfaceType = 2 } // ice
  else if (typeRoll < 0.32) { type = 'planet'; surfaceType = 3 } // earth-like (rare!)
  else if (typeRoll < 0.50) { type = 'gas-giant'; surfaceType = 1 }
  else if (typeRoll < 0.58) { type = 'binary'; surfaceType = 0 }
  else { type = 'cloud'; surfaceType = 0 }

  const cs = hash(seed + 5)
  let color1: THREE.Color, color2: THREE.Color, atmosphere: THREE.Color
  let ringColor: THREE.Color | undefined
  let scale: number

  switch (type) {
    case 'planet':
      scale = 0.5 + hash(seed + 6) * 1.5
      if (surfaceType === 0) { // rocky
        color1 = new THREE.Color(0.35 + cs * 0.15, 0.2, 0.1)
        color2 = new THREE.Color(0.45, 0.25 + cs * 0.1, 0.15)
        atmosphere = new THREE.Color(0.5, 0.3, 0.2)
      } else if (surfaceType === 2) { // ice
        color1 = new THREE.Color(0.15, 0.25 + cs * 0.1, 0.5 + cs * 0.1)
        color2 = new THREE.Color(0.1, 0.2, 0.45)
        atmosphere = new THREE.Color(0.3, 0.5, 0.9)
      } else { // earth-like
        scale = 0.5 + hash(seed + 6) * 1.0
        color1 = new THREE.Color(0.12, 0.35, 0.15)
        color2 = new THREE.Color(0.08, 0.15, 0.45)
        atmosphere = new THREE.Color(0.35, 0.55, 1.0)
      }
      break
    case 'gas-giant':
      scale = 1.5 + hash(seed + 6) * 3
      color1 = new THREE.Color(0.55 + cs * 0.1, 0.4, 0.25)
      color2 = new THREE.Color(0.45, 0.3, 0.18)
      atmosphere = new THREE.Color(0.35, 0.45, 0.65)
      ringColor = new THREE.Color(0.65, 0.55, 0.45)
      break
    case 'binary':
      scale = 0.4 + hash(seed + 6) * 0.8
      color1 = new THREE.Color(0.85, 0.88, 1.0)
      color2 = new THREE.Color(1.0, 0.85, 0.65)
      atmosphere = new THREE.Color(0.5, 0.6, 1.0)
      surfaceType = 1 // render like gas (smooth)
      break
    default: // cloud
      scale = 5 + hash(seed + 6) * 10
      const h = hash(seed + 7)
      color1 = h < 0.33
        ? new THREE.Color(0.08, 0.04, 0.2)
        : h < 0.66
        ? new THREE.Color(0.04, 0.08, 0.25)
        : new THREE.Color(0.2, 0.04, 0.06)
      color2 = new THREE.Color(color1.r * 2, color1.g * 2, color1.b * 2)
      atmosphere = color1
      break
  }

  return {
    type, surfaceType, position, scale,
    color1, color2, atmosphere, ringColor,
    spawnDist: position.distanceTo(new THREE.Vector3(cx, cy, cz)),
    active: true,
  }
}

// ─── Component ─────────────────────────────────────────────

export function CelestialBodies() {
  const bodiesRef = useRef<Body[]>([])
  const seedRef = useRef(0)
  const initRef = useRef(false)
  const groupRef = useRef<THREE.Group>(null)
  const sphereGeoRef = useRef<THREE.SphereGeometry | null>(null)
  const ringGeoRef = useRef<THREE.RingGeometry | null>(null)

  useFrame(({ camera, clock }) => {
    if (!groupRef.current) return
    const cx = camera.position.x, cy = camera.position.y, cz = camera.position.z
    const t = clock.getElapsedTime()

    if (!initRef.current) {
      sphereGeoRef.current = new THREE.SphereGeometry(1, 32, 32)
      ringGeoRef.current = new THREE.RingGeometry(1.4, 2.6, 48)

      for (let i = 0; i < BODY_COUNT; i++) {
        const body = spawnBody(cx, cy, cz, seedRef.current++)
        bodiesRef.current.push(body)
        buildMesh(body, groupRef.current, sphereGeoRef.current, ringGeoRef.current, t)
      }
      initRef.current = true
    }

    const children = groupRef.current.children
    for (let i = 0; i < bodiesRef.current.length && i < children.length; i++) {
      const body = bodiesRef.current[i]
      const group = children[i] as THREE.Group
      if (!group) continue

      const dx = body.position.x - cx
      const dy = body.position.y - cy
      const dz = body.position.z - cz
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

      // Distance-based fade: smooth fade in/out, no popping
      let alpha = 1
      if (dist > FADE_START) {
        alpha = 1 - (dist - FADE_START) / (DESPAWN_RADIUS - FADE_START)
      }
      // Fade in over FADE_IN_DIST from spawn distance
      const traveled = body.spawnDist - dist
      if (traveled < FADE_IN_DIST && traveled >= 0) {
        alpha = Math.min(alpha, traveled / FADE_IN_DIST)
      }
      alpha = Math.max(0, Math.min(1, alpha))

      // Update alpha uniform on all materials in this group
      group.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
          if (child.material.uniforms.uAlpha) {
            child.material.uniforms.uAlpha.value = alpha
          }
          if (child.material.uniforms.uTime) {
            child.material.uniforms.uTime.value = t
          }
        }
      })

      // Slow rotation for planets
      if (body.type !== 'cloud') {
        group.rotation.y += 0.001
      }

      // Binary star orbital motion — companion orbits primary
      if (body.type === 'binary' && group.children.length > 1) {
        const companion = group.children[1]
        const orbitRadius = 2.5
        const orbitSpeed = 0.3 // radians per second
        companion.position.x = Math.cos(t * orbitSpeed) * orbitRadius
        companion.position.z = Math.sin(t * orbitSpeed) * orbitRadius
        companion.position.y = Math.sin(t * orbitSpeed * 0.5) * 0.5
      }

      // Respawn if too far
      if (dist > DESPAWN_RADIUS) {
        const newBody = spawnBody(cx, cy, cz, seedRef.current++)
        bodiesRef.current[i] = newBody
        // Remove old, build new
        while (group.children.length) group.remove(group.children[0])
        rebuildMeshInto(newBody, group, sphereGeoRef.current!, ringGeoRef.current!, t)
        group.position.copy(newBody.position)
        group.scale.setScalar(newBody.scale)
        group.rotation.set(0, 0, 0)
      }
    }
  })

  return <group ref={groupRef} />
}

function buildMesh(body: Body, parent: THREE.Group, sg: THREE.SphereGeometry, rg: THREE.RingGeometry, time: number) {
  const group = new THREE.Group()
  group.position.copy(body.position)
  group.scale.setScalar(body.scale)
  rebuildMeshInto(body, group, sg, rg, time)
  parent.add(group)
}

function rebuildMeshInto(body: Body, group: THREE.Group, sg: THREE.SphereGeometry, rg: THREE.RingGeometry, time: number) {
  if (body.type === 'cloud') {
    const mat = new THREE.ShaderMaterial({
      vertexShader: cloudVert, fragmentShader: cloudFrag,
      uniforms: {
        uColor1: { value: body.color1 }, uColor2: { value: body.color2 },
        uAlpha: { value: 0 }, uTime: { value: time },
      },
      transparent: true, depthWrite: false,
      side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    })
    group.add(new THREE.Mesh(sg, mat))
  } else {
    const mat = new THREE.ShaderMaterial({
      vertexShader: planetVert, fragmentShader: planetFrag,
      uniforms: {
        uColor1: { value: body.color1 }, uColor2: { value: body.color2 },
        uAtmo: { value: body.atmosphere }, uTime: { value: time },
        uAlpha: { value: 0 }, uSurfaceType: { value: body.surfaceType },
      },
      transparent: true,
    })
    group.add(new THREE.Mesh(sg, mat))

    if (body.type === 'gas-giant' && body.ringColor) {
      const ringMat = new THREE.ShaderMaterial({
        vertexShader: ringVert, fragmentShader: ringFrag,
        uniforms: { uRingColor: { value: body.ringColor }, uAlpha: { value: 0 } },
        transparent: true, depthWrite: false, side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(rg, ringMat)
      ring.rotation.x = Math.PI * 0.3 + (Math.random() - 0.5) * 0.4
      group.add(ring)
    }

    if (body.type === 'binary') {
      const cMat = new THREE.ShaderMaterial({
        vertexShader: planetVert, fragmentShader: planetFrag,
        uniforms: {
          uColor1: { value: body.color2 }, uColor2: { value: body.color1 },
          uAtmo: { value: new THREE.Color(1.0, 0.8, 0.5) },
          uTime: { value: time }, uAlpha: { value: 0 },
          uSurfaceType: { value: 1 },
        },
        transparent: true,
      })
      const companion = new THREE.Mesh(sg, cMat)
      companion.position.set(2.5, 0.3, 0)
      companion.scale.setScalar(0.5 + Math.random() * 0.3)
      group.add(companion)
    }
  }
}
