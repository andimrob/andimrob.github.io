# Visual Redesign Tasks

**Branch**: `feat/visual-redesign`
**Aesthetic**: "Arcade Cabinet Meets Editorial"

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
- [ ] Write tests for Sidebar: renders name, tagline, nav links with correct hrefs, social links
- [ ] Create `src/components/Sidebar.tsx` — extract identity content from Hero
- [ ] Restructure `App.tsx` to flex layout: `<div className="lg:flex"><Sidebar /><main>...</main></div>`
- [ ] Sidebar: sticky on desktop (`lg:sticky lg:top-0 lg:h-screen lg:w-1/2`), normal flow on mobile
- [ ] Sidebar contains: typewriter name (h1), tagline, nav anchor links with active indicator, social links, nametag sticker
- [ ] Nav links use `useActiveSection` for active state
- [ ] Right panel stays in normal document flow (NOT a separate scroll container)
- [ ] Update `RevealSection.tsx` max-w for half-width content area
- [ ] Remove/simplify `Hero.tsx` (content moved to Sidebar)
- [ ] Verify scroll-dependent features still work (useActiveSection, CursorGlow, X-Ray)
- [ ] Update Hero.stories.tsx or create Sidebar.stories.tsx
- [ ] `pnpm test` — all tests pass
- [ ] `pnpm lint && pnpm typecheck` — clean

## Phase 3: Background Atmosphere & Visual Depth
- [ ] Add CSS custom properties: `--color-surface-dark: #0a0a0f`, `--color-surface-light: #faf9f7`
- [ ] Update `index.html` body: `bg-surface-light dark:bg-surface-dark`
- [ ] Add noise texture overlay via `body::before` (SVG data URI, `opacity: 0.03`, `pointer-events: none`)
- [ ] Add dark mode aurora glow spots via `main::before` (indigo, cyan, purple radial gradients)
- [ ] Add `.glass-card` utility class (subtle bg, border, backdrop-blur, dark mode glow shadow)
- [ ] Light mode: warm off-white base, subtle warm shadows on cards
- [ ] `pnpm lint && pnpm typecheck` — clean

## Phase 4: Experience Section Redesign
- [ ] Replace plain `bg-gray-50 dark:bg-gray-900` cards with `.glass-card` containers
- [ ] Add color-tinted left border per category (from existing `categoryColors`)
- [ ] Add hover effect: `hover:scale-[1.02]` + border glow transition
- [ ] Add category icon/emoji alongside heading
- [ ] Add stagger animation classes (`.stagger-child` with index-based `animationDelay`)
- [ ] Unit test: categories render with correct labels and badges
- [ ] Test stagger delay values
- [ ] `pnpm test` — pass

## Phase 5: Projects Section
- [ ] Create `src/data/projects.ts` — typed project data (`title`, `description`, `tech[]`, `links[]`)
- [ ] Write TDD tests: renders project titles, descriptions, tech badges, links
- [ ] Build project cards with glass-card styling, tech badges, external link indicators
- [ ] Add hover effects: lift, border glow, scale
- [ ] Add stagger animation classes
- [ ] Create Projects.stories.tsx (update existing)
- [ ] `pnpm test` — pass

## Phase 6: About Copy Rewrite
- [ ] Replace placeholder paragraphs with personality-forward copy
- [ ] Visual check in Storybook

## Phase 7: Staggered Reveal Animations
- [ ] Add `@keyframes fadeSlideUp` (opacity 0→1, translateY 16px→0) in `src/index.css`
- [ ] Add `.reveal.revealed .stagger-child` rule (animation triggered only on reveal)
- [ ] Apply `.stagger-child` + index-based `animationDelay` to Experience skill cards
- [ ] Apply `.stagger-child` + index-based `animationDelay` to Project cards
- [ ] Add hover micro-interactions: `hover:scale-[1.02] transition-all duration-200`

## Phase 8: Enhanced Dark Mode Polish
- [ ] Glass-card dark mode: color-tinted box-shadow (indigo glow at low opacity)
- [ ] SectionHeading underline: subtle blur glow behind it in dark mode
- [ ] Skill badges on hover: colored shadow matching category color
- [ ] Active nav link in Sidebar: subtle glow indicator
- [ ] Final contrast and accessibility audit (WCAG AA)

---

## Final Verification
- [ ] `pnpm test` — all unit tests pass
- [ ] `pnpm lint && pnpm typecheck` — no lint/type errors
- [ ] `pnpm build` — production build succeeds
- [ ] Visual verification: fonts, split-screen, dark mode, all interactive features
- [ ] All interactive features preserved: prism flip, typewriter, cursor glow, X-Ray, confetti, sound

## Dependency Order
```
Phase 1 (Fonts) → Phase 2 (Layout) → Phase 3 (Atmosphere)
                                   ↘ Phase 4 (Experience)
                                   ↘ Phase 5 (Projects)
                                   ↘ Phase 6 (About)
                                   → Phase 7 (Stagger) — after 4+5
                                   → Phase 8 (Dark Polish) — final pass
```
