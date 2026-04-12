varying vec3 vPosition;
varying vec3 vWorldDir;

void main() {
  vPosition = position;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldDir = worldPos.xyz - cameraPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
