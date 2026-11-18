export const terroirParticlesVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aPhase;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.35 + aPhase) * 0.22;
    pos.x += cos(uTime * 0.22 + aPhase * 1.3) * 0.18;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * uPixelRatio * (110.0 / max(-mvPosition.z, 1.0));
    vAlpha = 0.28 + 0.35 * sin(uTime * 0.6 + aPhase);
  }
`;

export const terroirParticlesFragmentShader = /* glsl */ `
  precision mediump float;
  varying float vAlpha;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    float soft = smoothstep(0.5, 0.08, dist);
    vec3 goldDust = vec3(0.773, 0.647, 0.447); // Dorado Vendimia
    gl_FragColor = vec4(goldDust, soft * vAlpha);
  }
`;
