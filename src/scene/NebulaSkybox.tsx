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

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 dir = normalize(vWorldPosition);
    float t = uTime * 0.003;

    // Large-scale nebula structure
    vec3 p1 = dir * 2.0 + vec3(t, t * 0.3, t * 0.7);
    float n1 = fbm(p1) * 0.5 + 0.5;

    vec3 p2 = dir * 3.0 + vec3(t * 0.5, -t * 0.2, t * 0.4);
    float n2 = fbm(p2) * 0.5 + 0.5;

    // Color palette - deep space
    vec3 deepSpace = vec3(0.01, 0.01, 0.03);
    vec3 nebula1 = vec3(0.05, 0.02, 0.15);  // deep purple
    vec3 nebula2 = vec3(0.02, 0.05, 0.2);   // deep blue
    vec3 nebula3 = vec3(0.15, 0.03, 0.08);  // dark crimson
    vec3 warmGlow = vec3(0.12, 0.06, 0.02); // warm distant glow

    vec3 color = deepSpace;
    color = mix(color, nebula1, smoothstep(0.3, 0.7, n1) * 0.6);
    color = mix(color, nebula2, smoothstep(0.4, 0.8, n2) * 0.4);
    color = mix(color, nebula3, smoothstep(0.5, 0.9, n1 * n2) * 0.3);

    // Subtle warm glow in one direction
    float warmDir = dot(dir, normalize(vec3(0.5, 0.3, -0.8)));
    color += warmGlow * smoothstep(0.5, 1.0, warmDir) * 0.3;

    // Very faint stars in skybox
    float starNoise = noise(dir * 500.0);
    float stars = smoothstep(0.97, 1.0, starNoise) * 0.3;
    color += vec3(stars);

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
