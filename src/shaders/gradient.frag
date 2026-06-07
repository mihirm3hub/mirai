precision mediump float;
uniform float uTime;
varying vec2 vUv;
void main() {
  vec2 p = vUv - 0.5;
  float glow = 0.35 / length(p + 0.08 * sin(uTime));
  gl_FragColor = vec4(vec3(glow * 0.15, glow * 0.25, glow * 0.2), 1.0);
}
