# Pantrẽ — Aesthetic Direction

## Tone: Editorial Luxury + Organic Warmth

---

## 1. Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `warm` | `#faf8f4` | Page background — warm paper, not cold white |
| `white` | `#ffffff` | Card surfaces, elevated elements only |
| `g-800` | `#212529` | Primary text, headlines |
| `g-500` | `#495057` | Body text, descriptions |
| `g-400` | `#868e96` | Tertiary text, timestamps, meta |
| `g-150` | `#e9ecef` | Borders, dividers — barely there |
| `brand` | `#1a9e5f` | Life, freshness, active states, organic elements ONLY |
| `brand-light` | `#e8f8f0` | Subtle brand tint backgrounds |
| `brand-medium` | `#b8ecd4` | Hover states, progress bars |
| `brand-dark` | `#137a48` | Brand text on light backgrounds |
| `black` | `#111110` | Primary buttons, strong actions — NEVER green for CTAs |
| `rs-orange` | `#e85c2a` | Root Soulutions Level Up card ONLY — never elsewhere |
| `dark-surface` | `#0a0a0a` | Immersive sections (cooking assistant, demo showcase) |

### Radius
- Cards: `16px` — soft but structured
- Buttons: `14px` — pill-adjacent, not fully round
- Inputs: `12px` — matches button energy
- Demo container: `24px` — premium, gallery-like
- Phone mockups: `32px` — device-realistic

### Shadows
Style: **soft/layered** — luxury feel
- `sm`: `0 2px 8px rgba(0,0,0,0.04)` — cards at rest
- `md`: `0 8px 24px rgba(0,0,0,0.08)` — elevated cards, hover
- `lg`: `0 20px 40px rgba(0,0,0,0.10)` — demo showcase, hero elements
- `2xl`: `0 32px 64px rgba(0,0,0,0.12)` — floating phone mockups

---

## 2. Typography System

### Fonts
- **Display:** Instrument Serif Italic — headlines, section titles, brand moments
- **Body:** Plus Jakarta Sans — everything else

### Scale
| Role | Size | Weight | Font | Letter-spacing |
|------|------|--------|------|---------------|
| Display | 56-72px | 400 | Instrument Serif Italic | -0.02em |
| H1 | 40-48px | 400 | Instrument Serif Italic | -0.01em |
| H2 | 32-40px | 400 | Instrument Serif Italic | -0.01em |
| H3 | 20-24px | 700 | Plus Jakarta Sans | 0 |
| Body | 16-18px | 400 | Plus Jakarta Sans | 0 |
| Small | 14px | 500 | Plus Jakarta Sans | 0 |
| Micro | 12px | 600 | Plus Jakarta Sans | 0.02em |

### Rules
- Instrument Serif is ALWAYS italic — never upright
- Plus Jakarta Sans bold (700-800) for UI labels and buttons only
- Never bold the serif — its weight IS its personality
- Line-height: display 1.1, headings 1.2, body 1.6

---

## 3. Color Psychology

### Brand Green (#1a9e5f)
- USE: ingredient chips, active nav, progress indicators, the generative canvas, organic/living elements
- NEVER: buttons, CTAs, links, error states
- Communicates: freshness, life, natural, verdant, "this is alive"

### Black (#111110)
- USE: primary CTA buttons, strong headlines
- NEVER: large background fills on main page (only in immersive sections)
- Communicates: confidence, premium, "this is serious"

### Warm (#faf8f4)
- USE: page background everywhere
- NEVER: inside cards (those are white)
- Communicates: warmth, paper, cookbook, approachable

---

## 4. Motion Language

### Enter
- **Default:** fade + slide up (20px), 600ms, ease-out
- **Staggered lists:** 80ms delay between items
- **Hero elements:** sequential cascade with increasing delays (0.1s, 0.2s, 0.3s)

### Exit
- **Default:** fade out, 300ms — faster than enter (don't linger)

### Hover
- **Cards:** border color shifts to brand-medium, shadow elevates to `md`, 200ms
- **Buttons:** subtle scale(0.98) + darker bg, 150ms
- **Links:** no underline animation — just color shift

### Loading
- **Skeleton:** warm-toned pulse, not gray — matches page bg
- **Spinner:** never. Use progress indicators or skeleton states.

### Transitions
- **Page/section:** crossfade 400ms with subtle y-shift
- **Demo slides:** scale(0.95→1) + opacity, 600ms, custom ease [0.22, 1, 0.36, 1]
- **Labels:** y-shift (8px) + fade, 400ms

### Duration Scale
- Quick: 150ms (hover, micro-interactions)
- Normal: 300ms (state changes, toggles)
- Slow: 600ms (page transitions, reveals)
- Dramatic: 800ms+ (hero entrance, demo slides)

### Easing
- **Default:** `ease-out` or `cubic-bezier(0.22, 1, 0.36, 1)` — quick start, graceful land
- **Spring:** for playful moments only (bouncing badges, success states)
- **NEVER:** linear (feels robotic), ease-in (feels sluggish)

---

## 5. Component Personality

### Buttons
Feel like pressing a key on a premium keyboard — satisfying, definitive. Black with white text, 14px radius. Scale down slightly on press (active:scale-[0.98]). Never green. The button says "I'm ready" — the green says "this is alive." Different jobs.

### Cards
Feel like recipe cards in a beautiful cookbook — clean white, generous padding, soft shadow. On hover they lift slightly and their border warms to brand-medium. Content breathes inside them — never cramped.

### The Demo Showcase
Feels like peering into a kitchen at night through a window — dark, warm, alive. The generative canvas moves slowly underneath, like heat shimmer. The app mockups float above it, proof that something real is being built. This is the emotional center of the page.

### The Waitlist Form
Feels effortless — one field, one button. The input has generous padding, the button is confident black. On success, the button transforms (not a separate state — the button itself celebrates). No redirect, no modal.

---

## 6. Anti-Patterns (Pantrẽ NEVER does these)

1. **Never uses green for buttons or CTAs** — green is organic life, not commercial action
2. **Never uses stock food photography** — mockups or generative art only until real product exists
3. **Never uses more than 2 fonts** — Instrument Serif + Plus Jakarta Sans, period
4. **Never animates without purpose** — every motion guides the eye or reveals information
5. **Never puts text over the generative canvas without sufficient contrast** — dark overlay or text-shadow required
