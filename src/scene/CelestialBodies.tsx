import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Celestial Bodies — Visible planets, gas giants, and nebula clouds
 * scattered through space that you actually fly past.
 *
 * These are placed at various distances so as the camera travels
 * through space, you periodically see beautiful celestial objects
 * drift past — creating the sense of a living universe.
 */

// --- Gas cloud / small nebula patches ---
const cloudVertexShader = /* glsl */ `
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const cloudFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uOpacity;

  varying vec3 vWorldPos;
  varying vec3 vNormal;

  vec3 hash33(vec3 p) {
    p = vec3(dot(p, vec3(127.1,311.7,74.7)),
             dot(p, vec3(269.5,183.3,246.1)),
             dot(p, vec3(113.5,271.9,124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p);
    vec3 u = f*f*(3.0-2.0*f);
    return mix(mix(mix(dot(hash33(i),f),
      dot(hash33(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
      mix(dot(hash33(i+vec3(0,1,0)),f-vec3(0,1,0)),
      dot(hash33(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
      mix(mix(dot(hash33(i+vec3(0,0,1)),f-vec3(0,0,1)),
      dot(hash33(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
      mix(dot(hash33(i+vec3(0,1,1)),f-vec3(0,1,1)),
      dot(hash33(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);
  }

  void main() {
    vec3 p = vWorldPos * 0.02 + uTime * 0.005;
    float n = noise(p) * 0.5 + 0.5;
    float n2 = noise(p * 2.0 + 10.0) * 0.5 + 0.5;

    vec3 color = mix(uColor1, uColor2, n);

    // Fresnel edge glow
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0,0,1))), 2.0);

    float alpha = (n * 0.6 + fresnel * 0.4) * uOpacity * n2;
    gl_FragColor = vec4(color, alpha);
  }
`

// Planet surface shader
const planetVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`

const planetFragmentShader = /* glsl */ `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uAtmosphere;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;

  void main() {
    // Light from a distant star
    vec3 lightDir = normalize(vec3(0.5, 0.3, 1.0));
    float diffuse = max(dot(vNormal, lightDir), 0.0);
    float ambient = 0.08;

    // Surface bands (like gas giant)
    float bands = sin(vUv.y * 20.0 + uTime * 0.02) * 0.5 + 0.5;
    vec3 surface = mix(uColor1, uColor2, bands);

    // Atmospheric rim glow
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.0);
    vec3 atmo = uAtmosphere * fresnel * 1.5;

    vec3 color = surface * (ambient + diffuse * 0.8) + atmo;
    float alpha = 1.0 - fresnel * 0.3; // Slightly transparent at edges

    gl_FragColor = vec4(color, alpha);
  }
`

interface CelestialBody {
  type: 'planet' | 'cloud'
  position: THREE.Vector3
  scale: number
  color1: THREE.Color
  color2: THREE.Color
  atmosphere?: THREE.Color
  seed: number
}

function generateBodies(): CelestialBody[] {
  const bodies: CelestialBody[] = []
  const rng = (s: number) => {
    s = Math.sin(s) * 43758.5453
    return s - Math.floor(s)
  }

  // Generate bodies along the travel path (camera moves in -Z)
  for (let i = 0; i < 40; i++) {
    const seed = i * 7.31
    const isCloud = rng(seed) > 0.4 // 60% clouds, 40% planets

    // Spread objects along the travel path and around it
    const z = -(i * 200 + rng(seed + 1) * 150)
    const x = (rng(seed + 2) - 0.5) * 300
    const y = (rng(seed + 3) - 0.5) * 200

    if (isCloud) {
      // Nebula cloud patches
      const hue = rng(seed + 4)
      let c1: THREE.Color, c2: THREE.Color
      if (hue < 0.3) {
        c1 = new THREE.Color(0.1, 0.05, 0.25) // purple
        c2 = new THREE.Color(0.2, 0.1, 0.4)
      } else if (hue < 0.6) {
        c1 = new THREE.Color(0.05, 0.1, 0.3) // blue
        c2 = new THREE.Color(0.1, 0.15, 0.35)
      } else {
        c1 = new THREE.Color(0.25, 0.05, 0.08) // crimson
        c2 = new THREE.Color(0.3, 0.1, 0.05)
      }

      bodies.push({
        type: 'cloud',
        position: new THREE.Vector3(x, y, z),
        scale: 15 + rng(seed + 5) * 40,
        color1: c1,
        color2: c2,
        seed,
      })
    } else {
      // Planets and gas giants
      const planetType = rng(seed + 6)
      let c1: THREE.Color, c2: THREE.Color, atmo: THREE.Color

      if (planetType < 0.3) {
        // Rocky red/brown planet
        c1 = new THREE.Color(0.4, 0.2, 0.1)
        c2 = new THREE.Color(0.5, 0.25, 0.15)
        atmo = new THREE.Color(0.6, 0.3, 0.2)
      } else if (planetType < 0.6) {
        // Gas giant (Jupiter-like)
        c1 = new THREE.Color(0.6, 0.45, 0.3)
        c2 = new THREE.Color(0.5, 0.35, 0.2)
        atmo = new THREE.Color(0.4, 0.5, 0.7)
      } else if (planetType < 0.85) {
        // Ice giant (Neptune-like)
        c1 = new THREE.Color(0.15, 0.3, 0.6)
        c2 = new THREE.Color(0.1, 0.25, 0.5)
        atmo = new THREE.Color(0.3, 0.5, 0.9)
      } else {
        // Earth-like
        c1 = new THREE.Color(0.1, 0.3, 0.15)
        c2 = new THREE.Color(0.15, 0.25, 0.5)
        atmo = new THREE.Color(0.4, 0.6, 1.0)
      }

      bodies.push({
        type: 'planet',
        position: new THREE.Vector3(x, y, z),
        scale: 1 + rng(seed + 7) * 6,
        color1: c1,
        color2: c2,
        atmosphere: atmo,
        seed,
      })
    }
  }

  return bodies
}

function CloudMesh({ body }: { body: CelestialBody }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh position={body.position} scale={body.scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={cloudVertexShader}
        fragmentShader={cloudFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: body.color1 },
          uColor2: { value: body.color2 },
          uOpacity: { value: 0.15 + Math.random() * 0.15 },
        }}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function PlanetMesh({ body }: { body: CelestialBody }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
    // Slow rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={meshRef} position={body.position} scale={body.scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={planetVertexShader}
        fragmentShader={planetFragmentShader}
        uniforms={{
          uColor1: { value: body.color1 },
          uColor2: { value: body.color2 },
          uAtmosphere: { value: body.atmosphere || new THREE.Color(0.3, 0.4, 0.6) },
          uTime: { value: 0 },
        }}
        transparent
      />
    </mesh>
  )
}

export function CelestialBodies() {
  const bodies = useMemo(() => generateBodies(), [])

  return (
    <group>
      {bodies.map((body, i) =>
        body.type === 'cloud'
          ? <CloudMesh key={i} body={body} />
          : <PlanetMesh key={i} body={body} />
      )}
    </group>
  )
}
