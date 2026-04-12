precision highp float;

uniform float uTime;
uniform float uOpacity;
uniform vec3 uCoreColor;
uniform vec3 uHaloColor;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec2 vUv;

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
            dot(hash33(i+vec3(1,0,0)), f-vec3(1,0,0)), u.x),
        mix(dot(hash33(i+vec3(0,1,0)), f-vec3(0,1,0)),
            dot(hash33(i+vec3(1,1,0)), f-vec3(1,1,0)), u.x), u.y),
    mix(mix(dot(hash33(i+vec3(0,0,1)), f-vec3(0,0,1)),
            dot(hash33(i+vec3(1,0,1)), f-vec3(1,0,1)), u.x),
        mix(dot(hash33(i+vec3(0,1,1)), f-vec3(0,1,1)),
            dot(hash33(i+vec3(1,1,1)), f-vec3(1,1,1)), u.x), u.y), u.z);
}

void main() {
  // Fresnel for glow falloff
  float fresnel = 1.0 - dot(vNormal, vViewDir);
  fresnel = pow(fresnel, 2.5);

  // Pulsation
  float pulse = 0.85 + 0.15 * sin(uTime * 1.5);

  // Noise distortion on the halo
  vec3 noisePos = vec3(vUv * 4.0, uTime * 0.3);
  float n = noise(noisePos) * 0.3;

  // Core: bright center
  float coreDist = length(vUv - 0.5) * 2.0;
  float core = smoothstep(1.0, 0.0, coreDist) * pulse;

  // Halo: fresnel-based outer glow
  float halo = fresnel * (0.8 + n) * pulse;

  vec3 color = mix(uCoreColor, uHaloColor, fresnel);
  float alpha = (core * 1.5 + halo * 0.8) * uOpacity;

  gl_FragColor = vec4(color * (1.0 + core * 0.5), clamp(alpha, 0.0, 1.0));
}
