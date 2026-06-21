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
- Netlify deployment target

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
    about/page.tsx
    projects/page.tsx
    globals.css
  components/
    sections/
    three/
    ui/
  data/
    profile.ts
    projects.ts
public/
  fonts/
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

## Netlify Auto Deploy

This repo now includes:

- `netlify.toml` with the Netlify build command and Node 22 runtime
- `.github/workflows/netlify-deploy.yml` to deploy automatically on every push to `main`

### One-time setup

1. Create or open the site in Netlify.
2. In Netlify, copy the site ID from `Site configuration > General`.
3. In Netlify, create a personal access token.
4. In GitHub, add these repository secrets:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`
5. Push changes to `main`.

The workflow will install dependencies, run `npm run typecheck`, and then run a production Netlify deploy from GitHub Actions.

If you want Netlify branch deploys or preview deploys as well, that should be done by linking the GitHub repo in the Netlify dashboard in addition to this production workflow.

## Notes

The implementation intentionally does not copy proprietary Pluto assets, content, branding, or exact interactions. It recreates the same category of immersive, spatial, scroll-led studio portfolio experience using a Next.js production stack.
