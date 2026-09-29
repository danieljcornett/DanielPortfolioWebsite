import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  DoubleSide,
  ShaderMaterial,
  SRGBColorSpace,
  Vector3,
  type Mesh,
} from 'three'
import type { Rings, Surface } from '../planets'

/** Per-frame updates go through the mesh ref rather than the memoized material. */
export function uniformsOf(mesh: Mesh | null) {
  return mesh ? (mesh.material as ShaderMaterial).uniforms : undefined
}

// Every surface is procedural: no textures to download, and it stays crisp when the camera zooms in.
// The sun sits at the world origin, so each shader lights itself from there.

const noise = /* glsl */ `
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    amplitude *= 0.5;
  }
  return value;
}
`

const sphereVertex = /* glsl */ `
varying vec3 vObjPos;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;

void main() {
  vObjPos = position;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`

const planetFragment = /* glsl */ `
uniform vec3 uColors[4];
uniform vec3 uAtmosphere;
uniform float uAtmosphereStrength;
uniform float uScale;
uniform float uBands;
uniform float uWarp;
uniform float uSea;
uniform float uCaps;
uniform float uSeed;
uniform float uTime;
uniform float uHover;
uniform float uDim;

varying vec3 vObjPos;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;

${noise}

vec3 surface(vec3 p, out float water) {
  water = 0.0;
  float n = fbm(p * uScale + uSeed);
  vec3 color;
#if defined(SURFACE_GAS)
  float swirl = fbm(p * vec3(uScale, uScale * 3.5, uScale) + uSeed + vec3(uTime * 0.012, 0.0, 0.0)) - 0.5;
  float lat = p.y * uBands + swirl * uWarp * 6.0;
  float bandA = 0.5 + 0.5 * sin(lat);
  float bandB = 0.5 + 0.5 * sin(lat * 2.7 + 1.3);
  color = mix(uColors[0], uColors[1], smoothstep(0.15, 0.85, bandA));
  color = mix(color, uColors[2], smoothstep(0.55, 0.95, bandB) * 0.75);
  color = mix(color, uColors[3], smoothstep(0.58, 0.72, n) * 0.55);
#elif defined(SURFACE_TERRESTRIAL)
  water = 1.0 - smoothstep(uSea - 0.005, uSea + 0.005, n);
  vec3 ocean = mix(uColors[0], uColors[1], smoothstep(uSea - 0.16, uSea, n));
  vec3 land = mix(uColors[2], uColors[3], smoothstep(uSea + 0.02, uSea + 0.2, n));
  color = mix(land, ocean, water);
#else
  float detail = fbm(p * uScale * 3.3 + uSeed * 1.7);
  color = mix(uColors[0], uColors[1], smoothstep(0.3, 0.62, n));
  color = mix(color, uColors[2], smoothstep(0.45, 0.72, detail) * 0.85);
  color = mix(color, uColors[3], smoothstep(0.62, 0.8, n * 0.55 + detail * 0.5) * 0.7);
#endif
  float ice = smoothstep(0.74, 0.88, abs(p.y) + (n - 0.5) * 0.4) * uCaps;
  water *= 1.0 - ice;
  return mix(color, vec3(0.92, 0.95, 1.0), ice);
}

void main() {
  float water;
  vec3 albedo = surface(normalize(vObjPos), water);
  vec3 N = normalize(vWorldNormal);
  vec3 L = normalize(-vWorldPos);
  vec3 V = normalize(cameraPosition - vWorldPos);
  float ndl = dot(N, L);
  float light = smoothstep(-0.18, 0.9, ndl);
  // A little fill light keeps the night side's colors readable.
  vec3 color = albedo * (0.1 + 1.3 * light);
  float glint = pow(max(dot(reflect(-L, N), V), 0.0), 48.0) * water * light;
  color += vec3(1.0, 0.92, 0.8) * glint * 0.8;
  float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.6);
  float day = smoothstep(-0.35, 0.45, ndl);
  color += uAtmosphere * fresnel * (uAtmosphereStrength * (0.15 + 0.85 * day) + uHover * 0.7);
  color *= 1.0 - 0.72 * uDim;
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

const cloudFragment = /* glsl */ `
uniform float uSeed;
uniform float uTime;
uniform float uDim;

varying vec3 vObjPos;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;

${noise}

void main() {
  vec3 p = normalize(vObjPos);
  float n = fbm(p * 3.4 + vec3(uSeed, uTime * 0.008, 0.0));
  float cover = smoothstep(0.55, 0.75, n);
  float light = smoothstep(-0.15, 0.8, dot(normalize(vWorldNormal), normalize(-vWorldPos)));
  gl_FragColor = vec4(vec3(0.08 + 1.1 * light) * (1.0 - 0.72 * uDim), cover * 0.8);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

const atmosphereVertex = /* glsl */ `
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vCenter;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vCenter = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`

const atmosphereFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uStrength;
uniform float uHover;
uniform float uLimb;
uniform float uDim;

varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vCenter;

void main() {
  vec3 V = normalize(cameraPosition - vWorldPos);
  // Back faces of a slightly larger shell: brightest at the planet's edge, fading outward.
  float rim = pow(clamp(-dot(normalize(vWorldNormal), V) / uLimb, 0.0, 1.0), 2.0);
  float day = smoothstep(-0.5, 0.6, dot(normalize(vWorldPos - vCenter), normalize(-vCenter)));
  float glow = rim * (uStrength * (0.12 + 0.88 * day) + uHover) * (1.0 - 0.8 * uDim);
  gl_FragColor = vec4(uColor * glow, 1.0);
  #include <colorspace_fragment>
}
`

const ringVertex = /* glsl */ `
varying vec3 vLocal;
varying vec3 vWorldPos;

void main() {
  vLocal = position;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`

const ringFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uInner;
uniform float uOuter;
uniform vec3 uPlanetCenter;
uniform float uPlanetRadius;
uniform float uDim;

varying vec3 vLocal;
varying vec3 vWorldPos;

${noise}

void main() {
  float r = (length(vLocal.xy) - uInner) / (uOuter - uInner);
  float bands = noise(vec3(r * 38.0, 0.5, 0.5)) * 0.6 + noise(vec3(r * 120.0, 4.5, 0.5)) * 0.4;
  float alpha = smoothstep(0.0, 0.05, r) * (1.0 - smoothstep(0.86, 1.0, r));
  alpha *= 0.3 + 0.7 * bands;
  alpha *= 1.0 - 0.85 * (smoothstep(0.55, 0.59, r) - smoothstep(0.63, 0.67, r));

  // The planet's shadow: does a ray from here toward the sun hit the planet?
  vec3 toSun = normalize(-vWorldPos);
  vec3 oc = vWorldPos - uPlanetCenter;
  float b = dot(oc, toSun);
  float h = b * b - (dot(oc, oc) - uPlanetRadius * uPlanetRadius);
  float shadow = step(b, 0.0) * smoothstep(0.0, uPlanetRadius * uPlanetRadius * 0.08, h);

  vec3 color = uColor * (0.5 + 0.65 * bands) * (1.0 - 0.85 * shadow) * (1.0 - 0.72 * uDim);
  gl_FragColor = vec4(color, alpha * 0.9);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

const sunFragment = /* glsl */ `
uniform float uTime;
uniform float uIntensity;

varying vec3 vObjPos;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;

${noise}

void main() {
  vec3 p = normalize(vObjPos);
  float large = fbm(p * 2.2 + vec3(0.0, uTime * 0.04, uTime * 0.03));
  float fine = fbm(p * 7.5 + vec3(uTime * 0.07, -uTime * 0.05, 0.0));
  float heat = clamp(large * 0.65 + fine * 0.55, 0.0, 1.0);
  vec3 color = mix(vec3(1.0, 0.34, 0.05), vec3(1.0, 0.78, 0.4), smoothstep(0.35, 0.72, heat));
  color = mix(color, vec3(1.0, 0.96, 0.86), smoothstep(0.7, 0.92, heat));
  vec3 V = normalize(cameraPosition - vWorldPos);
  float rim = 1.0 - clamp(dot(normalize(vWorldNormal), V), 0.0, 1.0);
  color += vec3(1.0, 0.45, 0.12) * pow(rim, 2.5) * 0.9;
  // Values above 1.0 are what the bloom pass picks up as glow.
  gl_FragColor = vec4(color * uIntensity, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

const nebulaVertex = /* glsl */ `
varying vec3 vColor;

${noise}

void main() {
  // Colored per vertex: the nebula is soft enough that interpolation hides it, and it keeps the
  // full-screen background nearly free to render.
  vec3 d = normalize(position);
  float clouds = fbm(d * 2.1 + vec3(4.1, 0.0, 1.3));
  float wisps = fbm(d * 4.3 + vec3(1.3, 8.2, 2.7));
  float band = exp(-pow(dot(d, normalize(vec3(0.25, 1.0, 0.35))) * 3.2, 2.0));
  vec3 color = vec3(0.002, 0.0025, 0.006);
  color += vec3(0.03, 0.01, 0.05) * smoothstep(0.42, 0.78, clouds);
  color += vec3(0.004, 0.022, 0.034) * smoothstep(0.48, 0.82, wisps);
  color += vec3(0.012, 0.012, 0.02) * band * (0.35 + 0.65 * wisps);
  vColor = color;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const nebulaFragment = /* glsl */ `
varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

export function createPlanetMaterial(surface: Surface) {
  return new ShaderMaterial({
    defines: { [`SURFACE_${surface.type.toUpperCase()}`]: '' },
    uniforms: {
      uColors: { value: surface.colors.map((c) => new Color(c)) },
      uAtmosphere: { value: new Color(surface.atmosphere) },
      uAtmosphereStrength: { value: surface.atmosphereStrength },
      uScale: { value: surface.scale },
      uBands: { value: surface.bands ?? 0 },
      uWarp: { value: surface.warp ?? 0 },
      uSea: { value: surface.sea ?? 0.5 },
      uCaps: { value: surface.caps ?? 0 },
      uSeed: { value: surface.seed },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uDim: { value: 0 },
    },
    vertexShader: sphereVertex,
    fragmentShader: planetFragment,
  })
}

export function createCloudMaterial(seed: number) {
  return new ShaderMaterial({
    uniforms: { uSeed: { value: seed }, uTime: { value: 0 }, uDim: { value: 0 } },
    vertexShader: sphereVertex,
    fragmentShader: cloudFragment,
    transparent: true,
    depthWrite: false,
  })
}

/** `shellScale` is the atmosphere radius as a multiple of the planet radius. */
export function createAtmosphereMaterial(color: string, strength: number, shellScale: number) {
  return new ShaderMaterial({
    uniforms: {
      uColor: { value: new Color(color) },
      uStrength: { value: strength },
      uHover: { value: 0 },
      uLimb: { value: Math.sqrt(1 - 1 / (shellScale * shellScale)) },
      uDim: { value: 0 },
    },
    vertexShader: atmosphereVertex,
    fragmentShader: atmosphereFragment,
    side: BackSide,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
  })
}

export function createRingMaterial(rings: Rings, planetRadius: number) {
  return new ShaderMaterial({
    uniforms: {
      uColor: { value: new Color(rings.color) },
      uInner: { value: rings.inner * planetRadius },
      uOuter: { value: rings.outer * planetRadius },
      uPlanetCenter: { value: new Vector3() },
      uPlanetRadius: { value: planetRadius },
      uDim: { value: 0 },
    },
    vertexShader: ringVertex,
    fragmentShader: ringFragment,
    side: DoubleSide,
    transparent: true,
    depthWrite: false,
  })
}

export function createSunMaterial() {
  return new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uIntensity: { value: 2.4 } },
    vertexShader: sphereVertex,
    fragmentShader: sunFragment,
  })
}

export function createNebulaMaterial() {
  return new ShaderMaterial({
    vertexShader: nebulaVertex,
    fragmentShader: nebulaFragment,
    side: BackSide,
    depthWrite: false,
  })
}

/** Soft radial halo drawn behind the sun, so it glows even before bloom kicks in. */
export function createGlowTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255, 214, 150, 1)')
    gradient.addColorStop(0.18, 'rgba(255, 170, 80, 0.5)')
    gradient.addColorStop(0.45, 'rgba(255, 120, 40, 0.12)')
    gradient.addColorStop(1, 'rgba(255, 90, 20, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}
