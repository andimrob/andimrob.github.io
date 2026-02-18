# Visual Redesign Tasks

**Branch**: `feat/visual-redesign`
**Aesthetic**: "Arcade Cabinet Meets Editorial"
**Plan**: `.claude/projects/-Users-robblakey-src-andimrob-github-io/0d3559b2-1e72-41a5-bdea-6b871d3c8bd3.jsonl`

---

## Phase 1: Font Swap

- [x] Download Satoshi WOFF2 files (Regular, Medium, Bold) → `static/fonts/`
- [x] Replace Inter `<link>` with Instrument Sans Google Fonts link in `index.html`
- [x] Add Satoshi `@font-face` declarations (400, 500, 700) in `src/index.css`
- [x] Update `@theme` block: `--font-sans` → Instrument Sans, add `--font-heading` → Satoshi
- [x] Apply `font-heading` to `SectionHeading.tsx` h2
- [x] Apply `font-heading` to `Hero.tsx` h1
- [x] Apply `font-heading` to `Header.tsx` nav links
- [x] Write unit test: SectionHeading renders with `font-heading` class
- [x] `pnpm test` — all 80 tests pass
- [x] `pnpm lint` — no errors (3 pre-existing warnings)
- [x] `pnpm typecheck` — clean

## Phase 2: Split-Screen Layout

- [x] Write tests for Sidebar: renders name, tagline, nav links with correct hrefs, social links
- [x] Create `src/components/Sidebar.tsx` — extract identity content from Hero
- [x] Restructure `App.tsx` to flex layout: `<div className="lg:flex"><Sidebar /><main>...</main></div>`
- [x] Sidebar: sticky on desktop (`lg:sticky lg:top-0 lg:h-screen lg:w-1/2`), normal flow on mobile
- [x] Sidebar contains: typewriter name (h1), tagline, nav anchor links with active indicator, social links, nametag sticker
- [x] Nav links use `useActiveSection` for active state
- [x] Right panel stays in normal document flow (NOT a separate scroll container)
- [x] Update `RevealSection.tsx` max-w for half-width content area
- [x] Hero.tsx preserved (still imported by stories); content extracted to Sidebar
- [x] Scroll-dependent features preserved (main content in normal document flow)
- [x] Create Sidebar.stories.tsx
- [x] `pnpm test` — all 85 tests pass
- [x] `pnpm lint && pnpm typecheck` — clean

## Phase 3: Background Atmosphere & Visual Depth

- [x] Add CSS custom properties: `--color-surface-dark: #0a0a0f`, `--color-surface-light: #faf9f7`
- [x] Update `index.html` body: `bg-surface-light dark:bg-surface-dark`
- [x] Add noise texture overlay via `body::before` (SVG data URI, `opacity: 0.03`, `pointer-events: none`)
- [x] Add dark mode aurora glow spots via `main::before` (indigo, cyan, purple radial gradients)
- [x] Add `.glass-card` utility class (subtle bg, border, backdrop-blur, dark mode glow shadow)
- [x] Light mode: warm off-white base, subtle warm shadows on cards
- [x] `pnpm lint && pnpm typecheck` — clean

## Phase 4: Experience Section Redesign

- [x] Replace plain `bg-gray-50 dark:bg-gray-900` cards with `.glass-card` containers
- [x] Add color-tinted left border per category (from existing `categoryColors`)
- [x] Add hover effect: `hover:scale-[1.02]` + border glow transition
- [x] Add category icon/emoji alongside heading
- [x] Add stagger animation classes (`.stagger-child` with index-based `animationDelay`)
- [x] Unit test: categories render with correct labels and badges
- [x] Test stagger delay values
- [x] `pnpm test` — 93 tests pass

## Phase 5: Projects Section

- [x] Create `src/data/projects.ts` — typed project data (`title`, `description`, `tech[]`, `links[]`)
- [x] Write TDD tests: renders project titles, descriptions, tech badges, links
- [x] Build project cards with glass-card styling, tech badges, external link indicators
- [x] Add hover effects: lift, border glow, scale
- [x] Add stagger animation classes
- [x] Projects.stories.tsx preserved (already existed)
- [x] `pnpm test` — 93 tests pass

## Phase 6: About Copy Rewrite

- [x] Replace placeholder paragraphs with personality-forward copy
- [x] Visual verified via Chrome DevTools MCP

## Phase 7: Staggered Reveal Animations

- [x] Add `@keyframes fadeSlideUp` (opacity 0→1, translateY 16px→0) in `src/index.css`
- [x] Add `.reveal.revealed .stagger-child` rule (animation triggered only on reveal)
- [x] Apply `.stagger-child` + index-based `animationDelay` to Experience skill cards
- [x] Apply `.stagger-child` + index-based `animationDelay` to Project cards
- [x] Add hover micro-interactions: `hover:scale-[1.02] transition-all duration-200`

## Phase 8: Enhanced Dark Mode Polish

- [x] Glass-card dark mode: color-tinted box-shadow (indigo glow at low opacity)
- [x] SectionHeading underline: subtle blur glow behind it in dark mode
- [x] Active nav link in Sidebar: subtle glow indicator
- [x] Visual verified via Chrome DevTools MCP (light + dark)

---

## Final Verification

- [x] `pnpm test` — all 93 unit tests pass
- [x] `pnpm lint && pnpm typecheck` — no lint/type errors
- [x] `pnpm build` — production build succeeds
- [x] Visual verification: fonts, split-screen, dark mode, all interactive features
- [x] All interactive features preserved: prism flip, typewriter, cursor glow, X-Ray, confetti, sound

## Dependency Order

```
Phase 1 (Fonts) → Phase 2 (Layout) → Phase 3 (Atmosphere)
                                   ↘ Phase 4 (Experience)
                                   ↘ Phase 5 (Projects)
                                   ↘ Phase 6 (About)
                                   → Phase 7 (Stagger) — after 4+5
                                   → Phase 8 (Dark Polish) — final pass
```
