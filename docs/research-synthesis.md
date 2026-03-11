# Landing Page Research Synthesis

## Critical Changes to Make

### 1. Package: `motion` not `framer-motion`
Framer Motion rebranded to **"motion"** in 2025. The `framer-motion` package is deprecated.
- Install: `npm install motion`
- Import: `import { motion, AnimatePresence } from "motion/react"`
- Tree-shakeable, smaller bundle

### 2. LazyMotion for Bundle Size
```tsx
import { LazyMotion, domAnimation, m } from "motion/react"
// domAnimation = ~15KB (covers animate, whileInView, gestures)
// domMax = ~27KB (adds layout, AnimatePresence, drag)
```
Wrap layout in `<LazyMotion features={domAnimation}>`, use `m.div` instead of `motion.div` for ~50% smaller bundle.

### 3. Generative Canvas: Throttle to 30fps
Background animations at 30fps are visually identical to 60fps for ambient effects. Saves 50% CPU.
```js
const interval = 1000 / 30;
if (timestamp - lastTime < interval) return;
```

### 4. Dynamic Import the Canvas
```tsx
const VerdantCanvas = dynamic(() => import("./verdant-canvas"), { ssr: false, loading: () => <div className="bg-[#0a0a0a]" /> })
```
- `ssr: false` — purely decorative, no SSR needed
- Placeholder matches final layout — zero CLS

### 5. prefers-reduced-motion
```tsx
const shouldReduce = useReducedMotion()
// If true: show static gradient, no canvas
```

### 6. Scroll-Triggered Sections
```tsx
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5 }}
>
```
- `viewport.once: true` — animate only first time (no re-trigger on scroll back)
- Stagger children with `staggerChildren: 0.1`

### 7. Image Optimization
- Hero images: `priority` prop (max 1-2)
- Below fold: `placeholder="blur"` + lazy load (default)
- Always set `sizes` for responsive
- `quality={85}` for hero, `quality={75}` for rest

### 8. Thin Client Wrappers
Keep `"use client"` boundary small — animation wrappers only. Pass server-rendered children into client components to preserve SSR/SEO.

### 9. Story-Driven Hero (2026 trend)
Not just a tagline — show problem-to-solution arc. Embedded product demo > static screenshots. Narrative headline. Benefit-driven CTA ("Start cooking smarter" not "Sign up").

### 10. Section Flow (highest-converting pattern)
Benefit headline → Social proof → Pain point → Value props → More social proof → Final CTA

## Performance Approach Rankings

| Approach | Main Thread Cost | Bundle | Visual Ceiling | Verdict |
|----------|-----------------|--------|----------------|---------|
| CSS gradient blobs | Zero | 0KB | Low (gradients only) | Base layer — always use |
| Raw Canvas 2D (30fps) | Low | 0KB | Medium (500 particles) | Good for simple generative |
| OffscreenCanvas Worker | **Zero** | 0KB | Medium-High | **Ideal for production** |
| Raw WebGL shader | Low | 0KB | Unlimited | Best if shader complexity justified |
| p5.js | High | 280KB gz | High | **Prototype only, never ship** |
| Three.js | Medium | 80-120KB gz | Unlimited 3D | Overkill for 2D background |

## Recommendation
1. CSS gradient blobs as atmospheric base (zero cost)
2. Raw Canvas 2D throttled to 30fps for the generative convection (already built)
3. Consider OffscreenCanvas Worker if main thread contention detected
4. Dynamic import with ssr:false to not block first paint
5. `prefers-reduced-motion` fallback to static CSS gradient
