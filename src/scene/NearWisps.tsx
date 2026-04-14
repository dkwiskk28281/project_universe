import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Near Wisps — close-range nebula gas that drifts past the camera.
 *
 * Creates the feeling of actually being INSIDE the cosmos,
 * not just watching it from outside. Semi-transparent colored
 * planes slowly pass by at close range, creating:
 *   - Depth perception (parallax with distant stars)
 *   - Sense of motion/speed
 *   - Immersive "wow" moments when color fills the screen
 *   - Proof you're moving through a living space
 *
 * Each wisp is a billboard quad with a soft radial gradient shader.
 * They spawn ahead of the camera and drift past.
 */

const WISP_COUNT = 12
const SPAWN_AHEAD = 80  // Spawn this far ahead
const DESPAWN_BEHIND = 40 // Remove when this far behind

const wispVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const wispFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;

  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center);

    // Ultra-soft radial gradient — no hard edges
    float alpha = smoothstep(0.5, 0.0, dist);
    alpha = pow(alpha, 2.5); // Extra soft falloff
    alpha *= uOpacity;

    // Subtle color variation across the wisp
    vec3 color = uColor * (0.8 + 0.4 * (1.0 - dist));

    gl_FragColor = vec4(color, alpha);
  }
`

function hash(n: number): number {
  const x = Math.sin(n) * 43758.5453
  return x - Math.floor(x)
}

interface Wisp {
  mesh: THREE.Mesh
  speed: number // Drift speed relative to camera
  rotSpeed: number
}

export function NearWisps() {
  const groupRef = useRef<THREE.Group>(null)
  const wispsRef = useRef<Wisp[]>([])
  const initRef = useRef(false)
  const seedRef = useRef(0)
  const geoRef = useRef<THREE.PlaneGeometry | null>(null)

  function spawnWisp(cx: number, cy: number, cz: number): Wisp {
    const s = seedRef.current++
    if (!geoRef.current) geoRef.current = new THREE.PlaneGeometry(1, 1)

    // Color — Hubble palette, soft and diverse
    const colorIdx = hash(s)
    let color: THREE.Color
    if (colorIdx < 0.25) color = new THREE.Color(0.15, 0.25, 0.6)      // Blue
    else if (colorIdx < 0.45) color = new THREE.Color(0.1, 0.35, 0.4)  // Teal
    else if (colorIdx < 0.6) color = new THREE.Color(0.3, 0.1, 0.45)   // Purple
    else if (colorIdx < 0.75) color = new THREE.Color(0.4, 0.12, 0.2)  // Rose
    else if (colorIdx < 0.88) color = new THREE.Color(0.35, 0.2, 0.08) // Gold
    else color = new THREE.Color(0.15, 0.1, 0.35)                       // Violet

    const mat = new THREE.ShaderMaterial({
      vertexShader: wispVert,
      fragmentShader: wispFrag,
      uniforms: {
        uColor: { value: color },
        uOpacity: { value: 0.04 + hash(s + 1) * 0.08 }, // Very transparent
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })

    const mesh = new THREE.Mesh(geoRef.current, mat)

    // Size: 10-40 units wide
    const size = 10 + hash(s + 2) * 30
    mesh.scale.set(size, size * (0.5 + hash(s + 3) * 0.5), 1)

    // Position: ahead of camera, offset to sides
    mesh.position.set(
      cx + (hash(s + 4) - 0.5) * 60,
      cy + (hash(s + 5) - 0.5) * 40,
      cz - SPAWN_AHEAD * (0.5 + hash(s + 6) * 0.5)
    )

    // Random rotation
    mesh.rotation.z = hash(s + 7) * Math.PI * 2

    return {
      mesh,
      speed: 0.3 + hash(s + 8) * 0.7, // Relative drift speed
      rotSpeed: (hash(s + 9) - 0.5) * 0.02,
    }
  }

  useFrame(({ camera }) => {
    if (!groupRef.current) return
    const cx = camera.position.x, cy = camera.position.y, cz = camera.position.z

    if (!initRef.current) {
      for (let i = 0; i < WISP_COUNT; i++) {
        const wisp = spawnWisp(cx, cy, cz)
        // Spread initial wisps along the path, not all ahead
        wisp.mesh.position.z = cz - hash(i * 3.7) * SPAWN_AHEAD * 2
        wispsRef.current.push(wisp)
        groupRef.current.add(wisp.mesh)
      }
      initRef.current = true
    }

    for (let i = 0; i < wispsRef.current.length; i++) {
      const wisp = wispsRef.current[i]

      // Billboard: always face camera
      wisp.mesh.lookAt(camera.position)

      // Slow rotation
      wisp.mesh.rotation.z += wisp.rotSpeed

      // Distance-based opacity — fade when very close or very far
      const dz = wisp.mesh.position.z - cz
      const dist = Math.abs(dz)
      const mat = wisp.mesh.material as THREE.ShaderMaterial
      const baseOpacity = mat.uniforms.uOpacity.value

      if (dist < 10) {
        // Very close — fade out smoothly (no pop)
        mat.uniforms.uOpacity.value = baseOpacity * (dist / 10)
      }

      // Respawn if camera has passed it
      if (dz > DESPAWN_BEHIND) {
        // Remove old
        groupRef.current.remove(wisp.mesh)

        // Spawn new ahead
        const newWisp = spawnWisp(cx, cy, cz)
        wispsRef.current[i] = newWisp
        groupRef.current.add(newWisp.mesh)
      }
    }
  })

  return <group ref={groupRef} />
}
