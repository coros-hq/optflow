import { Color, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, Vector3, WebGLRenderer } from 'three';

// Vanilla port of the PixelCloud React component (domain-warped billow-noise
// clouds, snapped to a chunky pixel grid and posterized into flat steps).

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform float uCount;
uniform vec3 uCloudColor;
uniform vec3 uSkyTopColor;
uniform vec3 uSkyBottomColor;
uniform float uPixelSize;

const mat2 R = mat2(0.80, 0.60, -0.60, 0.80);

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.31, 289.17))) * 26737.367);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * vnoise(p);
    p = R * p * 2.03 + 19.19;
    amp *= 0.5;
  }
  return sum;
}

float billow(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * (1.0 - abs(2.0 * vnoise(p) - 1.0));
    p = R * p * 2.11 + 13.37;
    amp *= 0.5;
  }
  return sum;
}

float cloudDensity(vec2 p, vec2 c, vec2 r, float seed, float t) {
  vec2 q = p - c;

  float ry = q.y > 0.0 ? r.y : r.y * 0.42;
  float env = 1.0 - length(vec2(q.x / r.x, q.y / ry));
  if (env < -0.35) return 0.0;

  vec2 dp = q * (2.4 / r.x) + seed;
  dp += 0.6 * vec2(
    fbm(dp * 1.4 + t * 0.04),
    fbm(dp * 1.4 + 7.7 - t * 0.03)
  );
  float detail = billow(dp * 1.6);

  return env + (detail - 0.62) * 0.62;
}

vec3 shadeCloud(vec3 color, vec3 sky, vec2 p, vec2 c, vec2 r, float seed, float t, float dist) {
  float d = cloudDensity(p, c, r, seed, t);
  d = floor(d / 0.1) * 0.1;
  if (d < 0.02) return color;

  float dUp = cloudDensity(p + vec2(0.0, r.y * 0.55), c, r, seed, t);
  float occl = clamp((dUp - d) * 1.1 + d * 0.55, 0.0, 1.0);
  occl = floor(occl * 3.0) / 3.0;

  vec3 lit = uCloudColor * 1.04;
  vec3 shadow = mix(uCloudColor * 0.60, sky, 0.38);
  vec3 cloudCol = mix(lit, shadow, occl * 0.85);

  float alpha = step(0.02, d);
  cloudCol = mix(cloudCol, sky, dist * 0.35);

  return mix(color, cloudCol, alpha);
}

vec3 cloudPass(vec3 color, vec3 sky, vec2 p, float aspect, float t,
               float spd, float phase, float y, vec2 r, float seed, float dist) {
  float cx = mix(-r.x - 0.25, aspect + r.x + 0.25, fract(t * spd + phase));
  float cy = y + sin(t * 0.05 + phase * 6.2831) * 0.012;
  return shadeCloud(color, sky, p, vec2(cx, cy), r, seed, t, dist);
}

void main() {
  vec2 pixelCoord = floor(gl_FragCoord.xy / uPixelSize) * uPixelSize;
  vec2 uv = pixelCoord / uResolution;

  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime;

  vec3 sky = mix(uSkyBottomColor, uSkyTopColor, uv.y);
  vec3 color = sky;

  color = mix(color, uSkyBottomColor * 1.06, smoothstep(0.35, 0.0, uv.y) * 0.5);

  if (uCount > 5.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.006, 0.10, 0.84, vec2(0.20, 0.10), 43.7, 1.0);
  }
  if (uCount > 4.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.008, 0.62, 0.73, vec2(0.24, 0.12), 71.3, 0.85);
  }
  if (uCount > 3.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.011, 0.33, 0.60, vec2(0.34, 0.16), 17.3, 0.55);
  }
  if (uCount > 2.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.013, 0.80, 0.47, vec2(0.30, 0.15), 29.9, 0.45);
  }
  if (uCount > 1.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.016, 0.05, 0.35, vec2(0.46, 0.20), 91.1, 0.15);
  }
  color = cloudPass(color, sky, p, aspect, t, 0.020, 0.48, 0.20, vec2(0.56, 0.24), 57.2, 0.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

export interface PixelCloudOptions {
  cloudColor?: string;
  skyTopColor?: string;
  skyBottomColor?: string;
  speed?: number;
  count?: number;
  pixelSize?: number;
}

const toVec3 = (hex: string) => {
  // The shader writes straight to the canvas, so feed it plain sRGB values
  // (three.js converts hex to linear by default).
  const c = new Color(hex).convertLinearToSRGB();
  return new Vector3(c.r, c.g, c.b);
};

/** Mounts the animated pixel clouds into `container`. Returns a cleanup function. */
export function initPixelCloud(container: HTMLElement, opts: PixelCloudOptions = {}) {
  const { cloudColor = '#F4F4F1', skyTopColor = '#3876ba', skyBottomColor = '#8cbfe8', speed = 1, count = 6, pixelSize = 6 } = opts;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance', stencil: false, depth: false });
  } catch {
    return () => {}; // no WebGL: the CSS fallback background stays
  }

  const dpr = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(container.offsetWidth * dpr, container.offsetHeight * dpr) },
      uCount: { value: count },
      uCloudColor: { value: toVec3(cloudColor) },
      uSkyTopColor: { value: toVec3(skyTopColor) },
      uSkyBottomColor: { value: toVec3(skyBottomColor) },
      // keep blocks the same on-screen size regardless of device pixel ratio
      uPixelSize: { value: pixelSize * dpr },
    },
  });
  scene.add(new Mesh(geometry, material));

  const render = (t: number) => {
    material.uniforms.uTime.value = t * speed;
    renderer.render(scene, camera);
  };

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(container);

  let resizeTimer = 0;
  const ro = new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w * dpr, h * dpr);
      if (reduceMotion) render(20);
    }, 100);
  });
  ro.observe(container);

  let raf = 0;
  const start = performance.now();
  if (reduceMotion) {
    render(20); // single still frame
  } else {
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (visible) render((performance.now() - start) * 0.001);
    };
    loop();
  }

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(resizeTimer);
    io.disconnect();
    ro.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.domElement.remove();
    renderer.dispose();
  };
}
