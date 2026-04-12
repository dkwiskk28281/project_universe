precision highp float;

uniform float uTime;
uniform int uSteps;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec3 vPosition;
varying vec3 vWorldDir;

// Hash & noise functions
vec3 hash33(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 74.7)),
    dot(p, vec3(269.5, 183.3, 246.1)),
    dot(p, vec3(113.5, 271.9, 124.6))
  );
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise3D(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(
      mix(dot(hash33(i), f),
          dot(hash33(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
      mix(dot(hash33(i + vec3(0,1,0)), f - vec3(0,1,0)),
          dot(hash33(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x),
      u.y
    ),
    mix(
      mix(dot(hash33(i + vec3(0,0,1)), f - vec3(0,0,1)),
          dot(hash33(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
      mix(dot(hash33(i + vec3(0,1,1)), f - vec3(0,1,1)),
          dot(hash33(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x),
      u.y
    ),
    u.z
  );
}

float fbm(vec3 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < 5; i++) {
    if (i >= octaves) break;
    value += amplitude * noise3D(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return value;
}

void main() {
  vec3 rayDir = normalize(vWorldDir);
  float stepSize = 4.0 / float(uSteps);
  vec3 pos = vPosition;

  float density = 0.0;
  float transmittance = 1.0;
  vec3 accumulated = vec3(0.0);

  float timeOffset = uTime * 0.01;

  for (int i = 0; i < 24; i++) {
    if (i >= uSteps) break;
    if (transmittance < 0.01) break;

    vec3 samplePos = pos + rayDir * float(i) * stepSize;
    vec3 noisePos = samplePos * 0.15 + vec3(timeOffset, timeOffset * 0.7, timeOffset * 0.3);

    float n = fbm(noisePos, 4);
    float d = smoothstep(-0.1, 0.6, n) * 0.08;

    if (d > 0.001) {
      float depthRatio = float(i) / float(uSteps);
      vec3 nebulaColor = mix(uColor1, uColor2, depthRatio);
      nebulaColor = mix(nebulaColor, uColor3, smoothstep(0.3, 0.7, n));

      float scatter = exp(-d * stepSize * 2.0);
      accumulated += transmittance * (1.0 - scatter) * nebulaColor;
      transmittance *= scatter;
    }
  }

  float alpha = 1.0 - transmittance;
  gl_FragColor = vec4(accumulated, alpha * 0.6);
}
