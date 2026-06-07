# Technical Architecture Document — Mirai Spatial Portfolio

## 1. Architecture overview

The website is a static-first Next.js React application with optional client-side 3D and WebXR enhancements. The architecture prioritises fast content delivery, SEO, accessibility and controlled visual complexity.

Core principle: content must work without WebGL; WebGL and WebXR are additive layers.

## 2. Reference stack

The reference Pluto case study lists React, Next.js, Three.js/R3F, WebGL, GLSL shaders and WebXR. This project uses the same broad stack but applies it to Mirai’s own brand, project structure and interaction model.

## 3. System context

```text
Visitor Browser
  ├── Static HTML/CSS from Next.js build
  ├── React hydration
  ├── Lazy WebGL/R3F scenes
  ├── Optional WebXR session
  └── External links: GitHub, LinkedIn, email, demos

Build System
  ├── Next.js
  ├── React components
  ├── Static project data
  ├── Images/models/shaders
  └── CI build pipeline
```

## 4. Rendering strategy

### Static layer

- Next.js pre-builds page HTML.
- Main copy, project cards and CTAs are server-rendered/static.
- SEO metadata is generated via Next.js Head API.

### Client enhancement layer

- React hydrates interactive UI.
- R3F canvas loads after the hero content is available.
- Heavy scenes are split into separate components.

### XR layer

- WebXR support checked via `navigator.xr` and `isSessionSupported`.
- XR CTA rendered only if supported.
- Non-XR devices continue with 2D/3D web experience.

## 5. Technology choices

| Area | Choice | Reason |
|---|---|---|
| Framework | Next.js | Matches reference stack; static-first portfolio use case. |
| UI | React | Component-driven UI and ecosystem compatibility. |
| 3D | Three.js + R3F | Declarative WebGL scene management. |
| Helpers | Drei | Faster camera, controls, environment and utility primitives. |
| Shaders | GLSL | Custom premium visual identity. |
| Content | Static JS then MDX | Simple MVP; easy migration to MDX case studies. |
| Hosting | Netlify or Vercel static deployment | Simple CDN delivery. |
| CI | GitHub Actions | Build verification on push/PR. |

## 6. Next.js structure

```text
src/app/page.tsx          Main landing page
src/components/              UI components
src/scenes/                  R3F/WebGL scenes
src/shaders/                 GLSL shader files
src/data/projects.js         MVP content source
src/styles/global.css        Tokens and global layout
public/models/               GLB/GLTF assets
public/images/               Images and posters
```

## 7. Component architecture

```text
Layout
  ├── Hero
  │   └── SpatialHeroScene
  ├── Marquee / credibility strip
  ├── ProjectGrid
  │   └── ProjectCard[]
  ├── CapabilitiesSection
  ├── ProcessSection
  └── ContactCTA
```

## 8. Data model

### Project

```ts
type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  featured: boolean;
  problem?: string;
  role?: string;
  architecture?: string;
  outcome?: string;
  repoUrl?: string;
  demoUrl?: string;
};
```

MVP uses `src/data/projects.js`. v2 should move to MDX files with frontmatter.

## 9. Progressive enhancement architecture

```text
Capability detection
  ├── No JS: static content
  ├── JS only: interactive cards/nav
  ├── WebGL: 3D hero scene
  └── WebXR: optional immersive project gallery
```

Implementation rules:

- Never hide core content behind canvas.
- Never require XR to navigate.
- Defer heavy imports.
- Provide poster fallback for 3D sections.

## 10. WebXR module design

Future module:

```text
src/xr/
  detectXR.js
  XRLaunchButton.tsx
  ProjectGalleryXR.tsx
  interactions/
```

Responsibilities:

- Check support.
- Request immersive-vr or immersive-ar session.
- Render simplified scene graph.
- Exit safely and return user to page.

## 11. Asset pipeline

### 3D assets

- Source format: Blender `.blend`.
- Runtime format: `.glb`.
- Optimise with gltf-transform.
- Use Draco or Meshopt compression where appropriate.
- Texture target: WebP/KTX2 for production.

### Images

- Use Next.js image pipeline for raster images.
- Use AVIF/WebP where possible.
- Provide poster images for every heavy 3D section.

## 12. Performance architecture

### Controls

- Lazy-load 3D scenes.
- Use `dpr={[1, 1.5]}` for R3F canvas.
- Avoid post-processing in MVP.
- Use low-poly hero object first.
- Avoid loading all project models on homepage.

### Budgets

| Budget | Target |
|---|---:|
| Initial JS excluding 3D chunks | <250KB warning |
| Hero GLB | <1.5MB |
| Largest image | <300KB |
| Lighthouse Performance | 85+ |
| Lighthouse Accessibility | 90+ |

## 13. Security and privacy

- No auth in MVP.
- No secret environment variables required.
- External links use safe attributes if opening new tabs.
- Analytics should be privacy-light.
- Contact form avoided in MVP; email link only.

## 14. SEO architecture

- Static HTML from Next.js.
- Page title and meta description via Head API.
- Open Graph image in `public/images/og.png`.
- Semantic heading hierarchy.
- Project pages in v2 should generate structured metadata.

## 15. Deployment architecture

### CI

- Install dependencies.
- Build Next.js site.
- Fail on build errors.

### Hosting

Recommended:

- Netlify for Next.js familiarity and static hosting.
- Vercel also viable for static output.

Build command:

```bash
npm run build
```

Output directory:

```bash
public
```

## 16. Testing strategy

### MVP

- Build test via CI.
- Manual responsive testing.
- Lighthouse test.
- Keyboard navigation check.
- Reduced-motion check.

### v2

- Component tests for content rendering.
- Visual regression for key sections.
- Playwright smoke tests.

## 17. Known technical trade-offs

### Next.js in 2026

Next.js still works and matches the requested stack, but it has less market momentum than Next.js. For this brief, Next.js is acceptable because the reference stack matters and the product is static-first. If the project grows into a studio platform with APIs, dashboards or dynamic personalization, migrate to Next.js later.

### WebXR support

WebXR availability varies by browser/device. Treat it as an enhancement only.

### 3D aesthetics vs conversion

The site wins only if projects are understandable. Do not let shaders and motion bury the evidence.
