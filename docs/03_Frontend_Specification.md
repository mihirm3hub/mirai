# Frontend Specification Document — Mirai Spatial Portfolio

## 1. Creative direction

The site should feel like a premium spatial computing lab: dark, cinematic, precise, experimental. It should borrow the strategic structure of the Pluto case study — spatial identity, progressive enhancement, technical credibility — but develop a distinct Mirai visual language.

Do not copy Pluto’s exact visual composition. Build a Mirai-native system around orbital geometry, reconstruction grids, scanlines, field-of-view cones and modular project cards.

## 2. Design principles

1. Content before spectacle.
2. 3D should clarify the brand, not delay the page.
3. Every section must prove capability.
4. Mobile experience must feel intentional, not downgraded.
5. Use progressive enhancement honestly: 2D first, 3D second, XR third.

## 3. Visual system

### Palette

```css
--bg: #08080b;
--panel: #111119;
--text: #f4f2eb;
--muted: #9f9ca8;
--line: rgba(255,255,255,0.12);
--accent: #a7ffcf;
--accent-2: #a7b7ff;
```

### Typography

- Primary: Inter or system sans.
- Hero: oversized, compressed spacing, tight line height.
- Body: readable, plain, technical.
- Kicker labels: uppercase, tracked, small.

### Shape language

- Orbital rings.
- Wireframe geometry.
- FOV cones.
- Reconstruction point clouds.
- Rounded cards with glass-like borders.
- Horizontal technical strips/marquees.

## 4. Page layout specification

### Section 1 — Hero

Purpose: establish Mirai as a spatial systems portfolio/studio.

Content:

- Kicker: `Mirai / Spatial systems portfolio`
- H1: `Built for the spatial web.`
- Paragraph: one sentence explaining XR, CV, simulation and agents.
- CTA: `Explore work`, `Contact`
- Background: low-poly animated 3D object/wireframe.

Interaction:

- Subtle object float/parallax.
- No forced scroll hijacking.
- Canvas decorative unless XR mode is enabled.

Fallback:

- Static gradient/poster if WebGL unavailable.

### Section 2 — Manifesto / capability frame

Purpose: explain the 2D → 3D → XR approach.

Content blocks:

- `2D baseline`: fast, accessible, readable.
- `3D enhancement`: WebGL scenes and project objects.
- `XR optional`: immersive mode on supported devices.

### Section 3 — Featured projects

Purpose: make the portfolio concrete.

Cards:

- Marvel × JimJam WebAR Inference Pipeline
- NBV-Bench
- AgentCorp

Each card:

- Category
- Title
- 2-line summary
- Tags
- Future link to case study

Visual treatment:

- Large cards, not tiny thumbnails.
- Each card may use a 3D motif or poster.
- Hover: border glow and slight transform only.

### Section 4 — Studio capabilities

Purpose: sell Mirai as a studio.

Capabilities:

- WebXR / WebAR
- Computer vision on web/mobile
- 3D reconstruction and simulation
- Agentic workflow prototypes
- Technical storytelling

### Section 5 — Process

Purpose: show maturity.

Flow:

`Research → Prototype → Optimise → Ship`

Each step should include a practical sentence.

### Section 6 — Technical strip

Purpose: recruiter/technical keyword scan.

Content:

`Next.js / React / Three.js / R3F / WebGL / GLSL / WebXR / ONNX / Open3D / Unity / PlayCanvas`

### Section 7 — Contact CTA

Purpose: conversion.

Content:

- `Let’s build spatial products that survive real users.`
- Email CTA
- LinkedIn/GitHub links
- CV link

## 5. Responsive behaviour

### Desktop

- Hero full viewport.
- 12-column grid.
- Project cards span 4 columns.
- Canvas fills viewport.

### Tablet

- Project cards span 6 or 12 columns depending width.
- Canvas simplified.
- Reduce giant type slightly.

### Mobile

- Hero remains dramatic but readable.
- Cards single column.
- Disable expensive effects.
- Keep CTA visible before first scroll if possible.

## 6. Motion specification

### Allowed motion

- Slow floating 3D object.
- Subtle hover transitions.
- Marquee strip, optional and low speed.
- Section fade-in, only if it does not harm accessibility.

### Avoid

- Scroll hijacking.
- Motion tied to every pixel of scroll.
- Heavy post-processing.
- Infinite animations on mobile if battery/performance suffers.

### Reduced motion

When `prefers-reduced-motion: reduce`:

- Disable CSS animation.
- Stop marquee.
- Render static 3D/poster fallback.

## 7. Component specification

### Layout

Wraps global page structure and imports global CSS.

### Hero

Composes copy, CTA and `SpatialHeroScene`.

### SpatialHeroScene

R3F canvas scene. MVP uses procedural geometry. Production can replace it with GLB object.

### ProjectGrid

Maps project data to cards.

### ProjectCard

Future extraction from ProjectGrid when cards need hover states, media and case-study links.

### XRLaunchButton

Future component. Hidden unless WebXR is supported.

## 8. Accessibility specification

- Canvas must be `aria-hidden` unless interactive.
- H1 must be real text, not image/canvas.
- CTAs must be keyboard focusable.
- Visible focus states required.
- Text contrast must meet WCAG AA.
- Motion reduction must be respected.

## 9. Content style guide

Use clear proof-oriented writing.

Good:

- `Reduced mobile inference load by moving ONNX inference into a capped Web Worker loop.`

Bad:

- `Leveraged cutting-edge AI to create immersive next-gen engagement.`

Each project must answer:

- What problem did it solve?
- What did you personally build?
- What constraints existed?
- What changed because of your work?

## 10. Frontend build sequence

1. Build static layout.
2. Add project data and cards.
3. Add hero R3F scene.
4. Add capability/process sections.
5. Add responsive polish.
6. Add performance fallbacks.
7. Add WebXR detection after MVP.

## 11. Quality bar

The site is ready when:

- It looks premium without relying on huge assets.
- It explains the work clearly.
- It loads fast enough on mobile.
- It can be shown to recruiters without explanation.
- It feels like Mirai, not a copied Pluto skin.
