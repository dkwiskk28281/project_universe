import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const skyboxVertexShader = /* glsl */ `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const skyboxFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorldPosition;

  vec3 hash33(vec3 p) {
    p = vec3(
      dot(p, vec3(127.1, 311.7, 74.7)),
      dot(p, vec3(269.5, 183.3, 246.1)),
      dot(p, vec3(113.5, 271.9, 124.6))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(dot(hash33(i), f),
              dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
          mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)),
              dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
      mix(mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)),
              dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
          mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)),
              dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z);
  }

  float fbm(vec3 p, int octaves) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 7; i++) {
      if (i >= octaves) break;
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 dir = normalize(vWorldPosition);
    float t = uTime * 0.002;

    // ----- Large-scale nebula structure (emission nebulae) -----
    vec3 p1 = dir * 2.0 + vec3(t, t * 0.3, t * 0.7);
    float n1 = fbm(p1, 6) * 0.5 + 0.5;

    vec3 p2 = dir * 3.0 + vec3(t * 0.5, -t * 0.2, t * 0.4);
    float n2 = fbm(p2, 5) * 0.5 + 0.5;

    // Secondary turbulence for fine detail
    vec3 p3 = dir * 5.0 + vec3(-t * 0.3, t * 0.6, -t * 0.15);
    float n3 = fbm(p3, 5) * 0.5 + 0.5;

    // ----- Dust lanes (dark absorption) -----
    vec3 dustP = dir * 4.0 + vec3(t * 0.1, -t * 0.05, t * 0.15);
    float dust = fbm(dustP, 5) * 0.5 + 0.5;
    float dustMask = smoothstep(0.45, 0.65, dust) * 0.7;

    // ----- Color palette -----
    vec3 deepSpace = vec3(0.008, 0.008, 0.025);
    vec3 nebulaPurple = vec3(0.06, 0.02, 0.18);
    vec3 nebulaBlue = vec3(0.02, 0.06, 0.22);
    vec3 nebulaCrimson = vec3(0.18, 0.03, 0.08);
    vec3 nebulaGold = vec3(0.15, 0.08, 0.02);
    vec3 nebulaTeal = vec3(0.02, 0.1, 0.12);
    vec3 warmGlow = vec3(0.14, 0.07, 0.02);

    // ----- Build color -----
    vec3 color = deepSpace;

    // Emission regions — multiple overlapping nebulae
    color = mix(color, nebulaPurple, smoothstep(0.3, 0.7, n1) * 0.6);
    color = mix(color, nebulaBlue, smoothstep(0.4, 0.8, n2) * 0.5);
    color = mix(color, nebulaCrimson, smoothstep(0.5, 0.9, n1 * n2) * 0.35);
    color = mix(color, nebulaGold, smoothstep(0.55, 0.85, n3) * 0.25);
    color = mix(color, nebulaTeal, smoothstep(0.6, 0.9, n2 * n3) * 0.2);

    // Fine-scale bright wisps (like Hubble images)
    float wisps = smoothstep(0.6, 0.95, n1 * n3);
    color += vec3(0.04, 0.03, 0.06) * wisps;

    // Apply dust lanes — darken regions
    color *= (1.0 - dustMask);

    // Subtle warm glow from one direction (distant galactic core)
    float warmDir = dot(dir, normalize(vec3(0.5, 0.3, -0.8)));
    color += warmGlow * smoothstep(0.4, 1.0, warmDir) * 0.35;

    // Secondary cool glow from opposite side
    float coolDir = dot(dir, normalize(vec3(-0.7, -0.2, 0.5)));
    color += vec3(0.02, 0.04, 0.08) * smoothstep(0.5, 1.0, coolDir) * 0.25;

    // ----- Milky Way diffuse glow along galactic plane -----
    // Galactic plane normal (must match cosmology.ts GALACTIC_NORMAL)
    vec3 galNormal = normalize(vec3(0.22, 0.87, 0.44));
    float galB = asin(dot(dir, galNormal)); // galactic latitude
    // Thin disk: σ ≈ 0.12 rad, thick disk: σ ≈ 0.4 rad
    float milkyThin = exp(-galB * galB / (2.0 * 0.012));
    float milkyThick = 0.3 * exp(-galB * galB / (2.0 * 0.08));
    float milkyWay = milkyThin + milkyThick;
    // Warm unresolved starlight color
    color += vec3(0.035, 0.028, 0.02) * milkyWay;
    // Galactic core (brighter in one direction along the plane)
    vec3 galCenter = normalize(cross(galNormal, vec3(0.0, 0.0, 1.0)));
    float coreDir = dot(dir, galCenter);
    color += vec3(0.04, 0.025, 0.01) * milkyWay * smoothstep(0.3, 1.0, coreDir);

    // ----- Cosmic Microwave Background -----
    // The faintest "warmth" everywhere — 2.725K thermal radiation
    // Visible as an extremely subtle uniform warm tint
    color += vec3(0.003, 0.002, 0.001);

    // Very faint stars embedded in skybox
    float starNoise = noise(dir * 500.0);
    float stars = smoothstep(0.97, 1.0, starNoise) * 0.3;
    color += vec3(stars);

    // Dimmer star layer
    float starNoise2 = noise(dir * 800.0 + vec3(42.0));
    float stars2 = smoothstep(0.96, 1.0, starNoise2) * 0.15;
    color += vec3(stars2 * 0.9, stars2 * 0.85, stars2);

    gl_FragColor = vec4(color, 1.0);
  }
`

export function NebulaSkybox() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh scale={[5000, 5000, 5000]}>
      <sphereGeometry args={[1, 64, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={skyboxVertexShader}
        fragmentShader={skyboxFragmentShader}
        uniforms={{
          uTime: { value: 0 },
        }}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}
