# Trio Digitals project guide

## Business context

Trio Digitals is a new digital marketing agency founded by three partners. It combines strategy, digital systems, and creative services, initially serving hospitality businesses (especially restaurants) while remaining open to other industries. The brand should feel modern, creative, professional, technically capable, approachable, and confident without exaggeration. The primary site goal is to establish credibility and turn prospective clients into qualified inquiries.

The supplied logo is the primary visual reference: a bold black wordmark on white with vibrant pink, magenta, and orange accents. The play symbol over the O is intentional and part of the logo. A circular crop of the provided screenshot is saved as `public/trio-digitals-logo.png`; use Next.js image optimization when rendering it. Do not invent a replacement logo, business history, team credentials, client work, results, or testimonials. Mark unknown content clearly as a placeholder until verified.

## Design principles

- Build a polished, distinctive, conversion-focused experience with clear information hierarchy.
- Keep the default canvas white and the wordmark treatment black; use pink, magenta, and orange as accent colors.
- Keep content separate from presentation where practical and use reusable components.
- Design responsively from the start. Prefer fluid layouts and readable line lengths.
- Use semantic HTML and accessible interactions, including visible focus states, keyboard access, sufficient contrast, and descriptive labels/alt text.
- Use Next.js image optimization for raster images. Avoid adding dependencies without a concrete need.
- Keep secrets and private configuration out of client-side code.

## Project architecture

- `src/app/`: App Router routes and shared layouts.
- `src/components/`: reusable interface components.
- `src/lib/`: project content, site metadata, and helpers.
- `src/styles/`: shared design tokens or global style extensions when needed.
- `public/`: static assets, including approved brand files.
- Planned routes: home, services, hospitality, portfolio, portfolio case studies, about, and contact.

## Coding conventions

- TypeScript strict mode; prefer explicit data types at module boundaries.
- Use React Server Components by default. Add client components only for browser interaction or state.
- Use `@/` imports for `src/` modules.
- Use Tailwind CSS utilities for component styling; keep shared global rules and brand tokens in `src/app/globals.css`.
- Use Lucide React for interface icons. Use Motion for React only when motion materially improves the experience; respect reduced-motion preferences.
- Keep page-specific content out of generic components. Avoid speculative abstractions.

## Workflow and checks

- Inspect the existing project before making changes and preserve established work.
- Keep changes scoped to the requested task. Do not build unrequested pages or features.
- Before delivery, run the available install, lint, type-check, and production build commands. Report commands that could not run and why.
- For implementation changes, review the diff and resolve issues introduced by the change. Do not claim a check passed unless it ran successfully.
- Never commit secrets, generated build output, or unapproved client claims.
