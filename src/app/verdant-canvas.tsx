"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  age: number;
  lifespan: number;
  energy: number;
  size: number;
}

// Seeded PRNG (mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Simple noise (value noise with interpolation)
function createNoise(seed: number) {
  const rng = mulberry32(seed);
  const perm = new Uint8Array(512);
  const grad = new Float32Array(512);
  for (let i = 0; i < 256; i++) {
    perm[i] = i;
    grad[i] = rng() * 2 - 1;
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  for (let i = 0; i < 256; i++) {
    perm[i + 256] = perm[i];
    grad[i + 256] = grad[i];
  }

  function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  function lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
  }

  return function noise3d(x: number, y: number, z: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const zf = z - Math.floor(z);
    const u = fade(xf);
    const v = fade(yf);
    const w = fade(zf);

    const a = perm[X] + Y;
    const aa = perm[a] + Z;
    const ab = perm[a + 1] + Z;
    const b = perm[X + 1] + Y;
    const ba = perm[b] + Z;
    const bb = perm[b + 1] + Z;

    return lerp(
      lerp(
        lerp(grad[aa], grad[ba], u),
        lerp(grad[ab], grad[bb], u),
        v
      ),
      lerp(
        lerp(grad[aa + 1], grad[ba + 1], u),
        lerp(grad[ab + 1], grad[bb + 1], u),
        v
      ),
      w
    );
  };
}

export function VerdantCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    // Mobile: reduce particles for performance
    const isMobile = W < 640;
    const PARTICLE_COUNT = isMobile ? 150 : 400;
    const NOISE_SCALE = 0.003;
    const THERMAL_FORCE = 0.8;
    const TURBULENCE = 1.6;
    const TRAIL_ALPHA = 0.04;
    const NOISE_SPEED = 0.0015;

    // 30fps throttle — invisible quality difference for backgrounds, 50% CPU savings
    const FRAME_INTERVAL = 1000 / 30;
    let lastFrameTime = 0;

    const seed = 42;
    const rng = mulberry32(seed);
    const noise = createNoise(seed);
    let zOff = 0;

    function rngRange(min: number, max: number) {
      return min + rng() * (max - min);
    }

    function resetParticle(p: Particle) {
      p.x = rng() * W;
      p.y = rngRange(H * 0.6, H);
      p.prevX = p.x;
      p.prevY = p.y;
      p.vx = 0;
      p.vy = 0;
      p.age = 0;
      p.lifespan = rngRange(80, 200);
      p.energy = rngRange(0.3, 1.0);
      p.size = rngRange(0.4, 1.5);
    }

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = {} as Particle;
      resetParticle(p);
      p.age = Math.floor(rng() * p.lifespan); // stagger initial ages
      p.y = rng() * H; // spread across canvas initially
      p.prevX = p.x;
      p.prevY = p.y;
      particles.push(p);
    }

    // Initial dark fill
    ctx.fillStyle = "rgba(10, 10, 10, 1)";
    ctx.fillRect(0, 0, W, H);

    function animate(timestamp: number) {
      animRef.current = requestAnimationFrame(animate);

      // 30fps throttle
      if (timestamp - lastFrameTime < FRAME_INTERVAL) return;
      lastFrameTime = timestamp;

      // Trail fade
      ctx.fillStyle = `rgba(10, 10, 10, ${TRAIL_ALPHA})`;
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        p.prevX = p.x;
        p.prevY = p.y;

        // Three octave noise field
        const baseAngle =
          (noise(p.x * NOISE_SCALE, p.y * NOISE_SCALE, zOff) + 0.5) *
          Math.PI *
          2 *
          TURBULENCE;
        const turbAngle =
          (noise(p.x * NOISE_SCALE * 3, p.y * NOISE_SCALE * 3, zOff + 100) +
            0.5) *
          Math.PI *
          2 *
          0.5;
        const microAngle =
          (noise(p.x * NOISE_SCALE * 7, p.y * NOISE_SCALE * 7, zOff + 200) +
            0.5) *
          Math.PI *
          2 *
          0.15;

        const flowX =
          Math.cos(baseAngle) * 0.6 +
          Math.cos(turbAngle) * 0.3 +
          Math.cos(microAngle) * 0.1;
        const flowY =
          Math.sin(baseAngle) * 0.6 +
          Math.sin(turbAngle) * 0.3 +
          Math.sin(microAngle) * 0.1;

        // Thermal upward bias
        const thermalBias = (p.y / H) * THERMAL_FORCE;

        p.vx += flowX * 0.4;
        p.vy += flowY * 0.4 - thermalBias * 0.25;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;
        p.age++;

        if (
          p.x < -10 ||
          p.x > W + 10 ||
          p.y < -10 ||
          p.y > H + 10 ||
          p.age > p.lifespan
        ) {
          resetParticle(p);
        }

        // Alpha envelope
        const lifeRatio = p.age / p.lifespan;
        let alpha: number;
        if (lifeRatio < 0.1) alpha = lifeRatio / 0.1;
        else if (lifeRatio > 0.7) alpha = (1 - lifeRatio) / 0.3;
        else alpha = 1;

        const speed = Math.hypot(p.x - p.prevX, p.y - p.prevY);
        const brightness = Math.min(1, Math.max(0.2, speed / 3.5));

        // Color: core green → highlight based on speed/energy
        const r = Math.round(26 + (184 - 26) * brightness * p.energy);
        const g = Math.round(158 + (236 - 158) * brightness * p.energy);
        const b = Math.round(95 + (212 - 95) * brightness * p.energy);
        const a = alpha * p.energy * brightness * 0.7;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.lineWidth = p.size * (0.5 + brightness * 0.5);
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      zOff += NOISE_SPEED;
    }

    animRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
