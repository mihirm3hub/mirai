# MIRAI Next Portfolio

Next.js + TypeScript + React Three Fiber scaffold for a cinematic MIRAI portfolio landing page inspired by high-end spatial studio case studies.

This repo keeps the original planning/document structure and replaces the Gatsby scaffold with a modern Next.js stack.

## Stack

- Next.js 15+
- TypeScript
- React Three Fiber
- Drei
- Three.js
- GSAP
- Framer Motion
- Tailwind CSS
- MDX-ready content structure
- Vercel deployment target

## Structure

```txt
docs/
  01_PRD.md
  02_Technical_Architecture.md
  03_Frontend_Specification.md
  04_Feature_Ticket_List.md
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Hero.tsx
    ProjectShowcase.tsx
  data/
    projects.ts
  scenes/
    SpatialHeroScene.tsx
  shaders/
    gradient.frag
public/
  images/
  models/
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run typecheck
npm run build
```

## Notes

The implementation intentionally does not copy proprietary Pluto assets, content, branding, or exact interactions. It recreates the same category of immersive, spatial, scroll-led studio portfolio experience using a Next.js production stack.
