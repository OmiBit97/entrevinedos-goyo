export const liquidWineVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const liquidWineFragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScroll;
  uniform float uIntensity;
  uniform vec2 uResolution;

  // Simplex-inspired smooth value noise para ondas de vino y piedra caliza
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p = rot * p * 2.02;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 uv = (vUv - 0.5) * aspect;

    // Influencia fluida del cursor y scroll
    vec2 pointerOffset = (uPointer - 0.5) * 0.45;
    float t = uTime * 0.14 + uScroll * 1.2;

    vec2 q = vec2(
      fbm(uv * 1.8 + vec2(t * 0.35, -t * 0.25) + pointerOffset),
      fbm(uv * 1.8 + vec2(-t * 0.2, t * 0.3) - pointerOffset * 0.5)
    );

    float r = fbm(uv * 2.2 + 2.1 * q + vec2(1.7, 9.2) + 0.12 * t);
    float wave = smoothstep(0.18, 0.86, r);

    // Paleta Ribera del Duero: Noche de Bodega, Burdeos Gran Reserva, Bronce Barrica y Dorado Vendimia
    vec3 cellarDark = vec3(0.078, 0.067, 0.063);    // #141110
    vec3 burgundyDeep = vec3(0.290, 0.082, 0.129);  // #4A1521
    vec3 burgundyGlow = vec3(0.455, 0.125, 0.196);  // #742032
    vec3 barrelGold = vec3(0.773, 0.647, 0.447);    // #C5A572

    vec3 col = mix(cellarDark, burgundyDeep, smoothstep(0.12, 0.62, wave));
    col = mix(col, burgundyGlow, smoothstep(0.55, 0.88, r) * 0.72);

    // Filigrana dorada sutil en crestas de fluido
    float rim = smoothstep(0.68, 0.92, r) * (1.0 - smoothstep(0.92, 1.0, r));
    col += barrelGold * rim * 0.34 * uIntensity;

    // Viñeta suave editorial
    float dist = length(vUv - 0.5);
    col *= 1.0 - smoothstep(0.35, 0.85, dist) * 0.45;

    gl_FragColor = vec4(col, 0.72 * uIntensity);
  }
`;
