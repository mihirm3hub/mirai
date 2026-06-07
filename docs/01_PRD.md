# Product Requirements Document — Mirai Spatial Portfolio Landing Page

## 1. Product summary

Mirai needs a high-impact studio/portfolio landing page that positions Mihir and Mirai as credible builders in XR, computer vision, simulation, 3D reconstruction and agentic systems. The site should feel spatial-first like the Pluto case study, but it must not clone Pluto visually or reuse their copy/assets. The correct approach is to reproduce the product strategy: progressive enhancement from 2D to 3D to XR, award-level interaction craft, and project storytelling that converts recruiters, founders and studio collaborators.

## 2. Reference case study takeaways

Source: 14islands Pluto case study, accessed 2026-06-05.

Key observed patterns:

- Spatial-first brand and case-study storytelling.
- 2D experience for regular screens, 3D/XR reveal for capable devices.
- Progressive enhancement across mobile, desktop, AR and VR.
- Stack: React, Next.js, Three.js/R3F, WebGL, GLSL shaders, WebXR.
- Strong project-context blocks: industry, awards, technologies, testimonial, more work, CTA.

## 3. Product goals

### Primary goal

Convert the portfolio from a passive CV supplement into an interactive proof-of-skill landing page.

### Secondary goals

- Present Mirai as a studio, not just a personal portfolio.
- Showcase system-design thinking through project architecture, not only screenshots.
- Make XR/CV/3D work immediately understandable to non-technical visitors.
- Support recruitment and client discovery with clear CTAs.
- Build a codebase that can grow into a full studio site.

## 4. Non-goals

- Do not copy Pluto’s exact layout, copy, assets, motion or brand system.
- Do not overbuild CMS, auth, dashboards or backend services in v1.
- Do not make WebXR mandatory; it is an enhancement, not the baseline.
- Do not let visual effects damage performance or readability.

## 5. Target users

### Recruiter / hiring manager

Needs to understand credibility in 30 seconds. Wants clear projects, outcomes, stack and role relevance.

### Founder / studio lead

Needs to see taste, speed, delivery and ability to build unusual technical experiences.

### Technical evaluator

Needs architecture, source links, demos, constraints, implementation decisions and trade-offs.

### Non-technical collaborator

Needs plain-language explanations of what was built and why it matters.

## 6. Positioning

Mirai is a spatial computing and applied AI studio building interactive systems at the edge of XR, computer vision, simulation and agents.

Tone: cinematic, technical, direct, premium, experimental, but not vague.

## 7. Core user journeys

### Journey A — recruiter skim

1. Land on hero.
2. Understand positioning.
3. Scroll to featured projects.
4. Open a project card/case study.
5. See stack, role, measurable impact and links.
6. Contact or download CV.

### Journey B — technical evaluator

1. Land on hero.
2. Inspect selected project.
3. Review architecture block, pipeline diagram and constraints.
4. Visit GitHub/demo.
5. Contact for interview/collaboration.

### Journey C — XR-curious visitor

1. Land on 2D page.
2. See 3D canvas hero if capable.
3. Optionally enter WebXR mode on supported devices.
4. Explore project objects/anchors in spatial mode.

## 8. Information architecture

### v1 single-page structure

1. Hero
   - Brand mark
   - One-line positioning
   - 3D object/canvas background
   - CTAs: Explore Work, Contact

2. Spatial manifesto
   - Short explanation of Mirai’s focus
   - 2D → 3D → XR progressive-enhancement claim

3. Featured projects
   - Marvel × JimJam WebAR inference
   - NBV-Bench / 3D reconstruction benchmark
   - AgentCorp / agentic AI security simulation

4. Studio capabilities
   - XR/WebAR/WebXR
   - Computer vision inference
   - 3D reconstruction/simulation
   - Agentic workflow prototypes

5. Process section
   - Research
   - Prototype
   - Optimise
   - Ship

6. Technical credibility strip
   - Next.js, React, R3F, Three.js, GLSL, WebXR, ONNX, Open3D

7. Contact CTA
   - Email
   - LinkedIn
   - GitHub
   - CV link

### v2 extensions

- Dedicated case-study pages.
- Blog/journal.
- Studio service pages.
- WebXR object gallery.
- CMS/MDX content system.

## 9. Functional requirements

### FR-001 Hero section

The site shall display a high-impact hero with Mirai positioning, primary CTA and animated 3D scene.

Acceptance criteria:

- Hero loads with readable text before 3D scene completes.
- Canvas is decorative and does not block navigation.
- Reduced-motion users receive static fallback.

### FR-002 Project cards

The site shall show selected projects with category, summary, stack and outcome.

Acceptance criteria:

- Minimum three project cards.
- Cards work without TypeScript-heavy effects.
- Each card can later link to a case-study page.

### FR-003 Progressive enhancement

The site shall detect capability and progressively enable enhanced 3D/WebXR features.

Acceptance criteria:

- Baseline: plain HTML/CSS content works.
- Enhanced: WebGL scene loads when supported.
- XR: WebXR entry CTA appears only when supported.

### FR-004 Performance safety

The site shall cap expensive visuals and preserve scroll performance.

Acceptance criteria:

- Use lazy loading for heavy assets.
- Use compressed GLB models.
- Avoid blocking main content render.
- Respect `prefers-reduced-motion`.

### FR-005 Contact conversion

The site shall provide clear contact and credibility links.

Acceptance criteria:

- Email CTA visible in final section.
- GitHub/LinkedIn/CV links available from navigation or footer.

## 10. Content requirements

Each featured project should include:

- Problem
- Role
- Stack
- System architecture
- Constraints
- Trade-offs
- Outcome
- Link/demo/repo

## 11. UX requirements

- Premium but readable.
- Mobile-first layout.
- 3D enhances brand, not distracts from project proof.
- Avoid generic startup buzzwords.
- Use real project names and outcomes.

## 12. Performance requirements

- Initial page usable under 2.5s on good 4G.
- Hero text should render before WebGL.
- Target Lighthouse Performance 85+ after asset optimisation.
- Bundle budget warning at 250KB JS excluding 3D chunks.
- GLB hero asset target under 1.5MB compressed.

## 13. Accessibility requirements

- Semantic HTML sections.
- Keyboard navigable CTAs.
- Canvas marked decorative unless interactive.
- Reduced-motion fallback.
- Contrast target WCAG AA for text.

## 14. Analytics requirements

Track:

- CTA clicks.
- Project card clicks.
- WebXR support detected.
- WebXR enter attempt.
- External link clicks.

No invasive analytics in v1.

## 15. Risks

| Risk | Impact | Mitigation |
|---|---:|---|
| Over-copying Pluto | High | Use as strategic reference only; define own visual language. |
| Next.js ecosystem friction | Medium | Keep plugins minimal; pin versions after first successful build. |
| WebGL performance issues | High | Lazy-load scenes; static fallbacks; reduced-motion support. |
| Weak content | High | Prioritise project proof and measurable outcomes over visuals. |

## 16. Success metrics

- Recruiter can understand user’s positioning within 30 seconds.
- At least three strong project cards available at launch.
- Build deploys cleanly on Netlify/Vercel-style static hosting.
- Lighthouse Accessibility 90+.
- First project case study ready for v1.1.

## 17. Launch scope

### MVP

- Single-page Next.js site.
- 3D hero scene.
- Project grid.
- Capabilities/process sections.
- Contact CTA.
- Responsive styling.
- Static content data model.

### Post-MVP

- Case-study pages.
- MDX project content.
- WebXR mode.
- Shader-driven transitions.
- CMS integration.
