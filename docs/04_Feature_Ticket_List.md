# Feature Ticket List — Mirai Spatial Portfolio

## Epic 1 — Repository and build foundation

### TICKET-001 — Create Next.js project scaffold

**Type:** Engineering  
**Priority:** P0  
**Description:** Set up Next.js, React, package scripts, source folders and base page.

**Acceptance criteria:**

- `npm run develop` starts local dev server.
- `npm run build` completes.
- Repo includes README and `.gitignore`.

### TICKET-002 — Add CI build workflow

**Type:** DevOps  
**Priority:** P1  
**Description:** Add GitHub Actions workflow to install dependencies and build site.

**Acceptance criteria:**

- Workflow runs on push and pull request.
- Build failure blocks merge.

## Epic 2 — Design system and layout

### TICKET-003 — Define global CSS tokens

**Type:** Frontend  
**Priority:** P0  
**Description:** Implement colour, typography, spacing and layout tokens.

**Acceptance criteria:**

- Tokens defined in `src/styles/global.css`.
- Body background/text styles applied globally.
- Mobile base styles included.

### TICKET-004 — Implement responsive section system

**Type:** Frontend  
**Priority:** P0  
**Description:** Create reusable section/grid layout classes.

**Acceptance criteria:**

- 12-column desktop grid works.
- Cards collapse to single column on mobile.
- Section spacing is consistent.

## Epic 3 — Hero experience

### TICKET-005 — Build hero copy and CTA

**Type:** Frontend/Content  
**Priority:** P0  
**Description:** Add hero positioning, paragraph and primary CTA.

**Acceptance criteria:**

- H1 is visible before WebGL loads.
- CTA links to work section.
- Hero works on mobile.

### TICKET-006 — Build R3F hero scene

**Type:** Frontend/3D  
**Priority:** P0  
**Description:** Add lightweight WebGL hero scene using React Three Fiber.

**Acceptance criteria:**

- Scene renders procedural geometry.
- Scene does not block text render.
- DPR capped for performance.

### TICKET-007 — Add reduced-motion fallback

**Type:** Accessibility/Frontend  
**Priority:** P0  
**Description:** Respect `prefers-reduced-motion` and reduce/disable animation.

**Acceptance criteria:**

- CSS animations disabled under reduced motion.
- 3D scene has static or minimal-motion mode.

## Epic 4 — Project showcase

### TICKET-008 — Create project data model

**Type:** Content Architecture  
**Priority:** P0  
**Description:** Add structured project data for featured projects.

**Acceptance criteria:**

- Project data stored in `src/data/projects.js`.
- Each project includes title, slug, category, summary and tags.

### TICKET-009 — Build project grid

**Type:** Frontend  
**Priority:** P0  
**Description:** Render featured project cards from project data.

**Acceptance criteria:**

- Minimum three project cards render.
- Cards are responsive.
- Cards include category, title, summary and tags.

### TICKET-010 — Add project card hover/focus states

**Type:** UI/Accessibility  
**Priority:** P1  
**Description:** Add subtle interaction states without hurting accessibility.

**Acceptance criteria:**

- Hover and focus visible.
- No motion-heavy effects on mobile.

## Epic 5 — Content sections

### TICKET-011 — Add spatial manifesto section

**Type:** Frontend/Content  
**Priority:** P1  
**Description:** Explain 2D baseline, 3D enhancement and XR optional path.

**Acceptance criteria:**

- Three clear content blocks.
- Non-technical visitor can understand the concept.

### TICKET-012 — Add studio capabilities section

**Type:** Frontend/Content  
**Priority:** P1  
**Description:** Show Mirai capabilities with practical descriptions.

**Acceptance criteria:**

- Includes XR, CV, simulation/3D and agents.
- Copy avoids generic buzzwords.

### TICKET-013 — Add process section

**Type:** Frontend/Content  
**Priority:** P2  
**Description:** Add Research → Prototype → Optimise → Ship section.

**Acceptance criteria:**

- Four-step process visible.
- Each step has one practical sentence.

### TICKET-014 — Add final contact CTA

**Type:** Frontend/Conversion  
**Priority:** P0  
**Description:** Add email/contact CTA and social links.

**Acceptance criteria:**

- Email link works.
- LinkedIn/GitHub/CV placeholders ready.

## Epic 6 — WebXR progressive enhancement

### TICKET-015 — Add WebXR capability detection

**Type:** Frontend/XR  
**Priority:** P2  
**Description:** Detect whether WebXR immersive session is supported.

**Acceptance criteria:**

- No errors on unsupported browsers.
- XR CTA only appears when support is detected.

### TICKET-016 — Prototype XR project gallery

**Type:** Frontend/XR  
**Priority:** P3  
**Description:** Create optional immersive gallery scene for project objects.

**Acceptance criteria:**

- User can enter/exit XR mode on supported devices.
- Non-XR visitors are unaffected.

## Epic 7 — Performance and quality

### TICKET-017 — Add asset optimisation workflow

**Type:** Performance  
**Priority:** P1  
**Description:** Define GLB/image compression and naming rules.

**Acceptance criteria:**

- Asset guidelines documented.
- Hero model target under 1.5MB.

### TICKET-018 — Lighthouse pass

**Type:** QA  
**Priority:** P0  
**Description:** Run Lighthouse and fix major issues.

**Acceptance criteria:**

- Performance 85+ target.
- Accessibility 90+ target.
- No obvious SEO metadata gaps.

### TICKET-019 — Responsive QA

**Type:** QA  
**Priority:** P0  
**Description:** Test mobile, tablet and desktop layouts.

**Acceptance criteria:**

- No horizontal overflow.
- Hero readable on mobile.
- Cards stack correctly.

## Epic 8 — Case-study expansion

### TICKET-020 — Add MDX case-study template

**Type:** Frontend/Content Platform  
**Priority:** P2  
**Description:** Create template for future project case studies.

**Acceptance criteria:**

- MDX pages can be generated from content files.
- Template supports problem, role, stack, architecture and outcome.

### TICKET-021 — Write Marvel × JimJam case study

**Type:** Content  
**Priority:** P1  
**Description:** Convert the project into a recruiter-ready case study.

**Acceptance criteria:**

- Explains system design clearly.
- Includes constraints and measurable impact.

## Suggested build order

1. TICKET-001, 003, 004
2. TICKET-005, 006, 008, 009
3. TICKET-014, 018, 019
4. TICKET-011, 012, 013
5. TICKET-007, 010, 017
6. TICKET-020, 021
7. TICKET-015, 016

## MVP definition of done

- Single-page Next.js site builds.
- Hero and project grid complete.
- Contact CTA present.
- Mobile responsive.
- Reduced-motion handled.
- Docs complete.
- Ready for first visual design pass and asset replacement.
