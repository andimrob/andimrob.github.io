# Test Coverage Analysis

## Current State

### Infrastructure

The project has testing tooling **installed but largely unused**:

| Tool                        | Installed | Actively Used |
| --------------------------- | --------- | ------------- |
| Vitest 4.x                  | Yes       | Storybook only |
| Playwright                  | Yes       | No standalone tests |
| @vitest/coverage-v8         | Yes       | No            |
| @storybook/addon-vitest     | Yes       | Yes (1 story) |
| @storybook/addon-a11y       | Yes       | Not exercised in tests |

### Existing Tests

- **1 Storybook story file**: `src/components/Header.stories.tsx` with 3 variants (Default, WithScrollSections, DarkMode)
- **0 unit test files** (no `.test.ts` / `.test.tsx` / `.spec.ts` files)
- **0 integration test files**
- **0 end-to-end test files**

### CI Pipeline Gap

The GitHub Actions workflow (`main.yml`) runs `format:check`, `lint`, `typecheck`, and `build` — but **does not run any tests**. There is also no `test` script defined in `package.json`.

---

## Coverage Gaps by Category

### 1. Pure Utility Functions (Highest Priority)

These have **zero tests** and are the easiest to cover since they're pure functions with no DOM or React dependencies:

| File | Function | What It Does | Complexity |
|------|----------|-------------|------------|
| `src/xray/highlight.ts` | `esc()` | HTML-escapes `&`, `<`, `>` characters | Low |
| `src/xray/highlight.ts` | `highlight()` | Applies syntax-highlighting rules via regex to source code strings | High |
| `src/xray/highlight.ts` | `compact()` (private) | Strips comments and collapses whitespace | Medium |

**Why this matters:** `highlight()` combines regex rules, string slicing, and HTML generation — a prime candidate for edge-case bugs (empty strings, overlapping regex groups, unterminated strings in input, etc.).

### 2. Custom React Hooks (High Priority)

Six hooks with complex stateful/timer/DOM logic and zero test coverage:

| Hook | Key Behaviors to Test |
|------|----------------------|
| `useTypewriter` | Typing animation timing, cursor visibility lifecycle, cleanup on unmount |
| `useTheme` | localStorage persistence, system preference detection, toggle between light/dark, `matchMedia` listener cleanup |
| `useActiveSection` | Scroll position -> active section mapping, handles missing DOM elements |
| `usePrismFlip` | Flip counter logic, quip cycling/wrapping, auto-rotate-back timer, confetti/coin triggers at specific counts, mobile idle hints |
| `useRevealOnScroll` | IntersectionObserver fires `visible` once, disconnects after first intersection |
| `useMagneticTilt` | Tilt math within attract range, reset when out of range or disabled |

**Why this matters:** `usePrismFlip` is the most complex piece of logic in the codebase. It manages flip counts, quip index cycling, audio playback triggers, conditional confetti vs. coin effects, auto-rotate-back timers, and mobile idle animation. This is where regressions are most likely.

### 3. Component Rendering (Medium Priority)

Only `Header` has a Storybook story. The following components have no render tests:

- `Hero` — Contains the typewriter effect and social links
- `About`, `Experience`, `Projects` — Content sections with reveal animations
- `Footer` — Static content
- `CursorGlow` — Custom cursor effect
- `XRayOverlay` — Complex lens effect with scroll sync
- `SectionHeading`, `RevealSection` — Reusable wrappers

### 4. Integration / Interaction Tests (Medium Priority)

No tests exist for user interaction flows:

- Clicking the Header nav bar triggers the prism flip animation
- Theme toggle persists across page reloads
- X-ray mode activates on pressing `x` and deactivates on pressing `x` again
- Navigation links scroll to correct sections and update active state
- Confetti fires on 5th flip, audio plays on 10th flip

### 5. Accessibility (Lower Priority but Valuable)

`@storybook/addon-a11y` is installed but not exercised in automated tests:

- `aria-label` correctness on the theme toggle button (changes based on current theme)
- Social links have proper `aria-label` attributes
- Keyboard navigation through nav links
- Color contrast in both light and dark themes

---

## Proposed Improvements

### Phase 1: Foundation

1. **Add a `test` script to `package.json`** so `pnpm test` works
2. **Add a Vitest unit test project** alongside the existing Storybook project in `vite.config.ts`
3. **Add `pnpm run test` to the CI pipeline** in `main.yml`
4. **Enable coverage reporting** via `@vitest/coverage-v8` (already installed)

### Phase 2: Unit Tests for Pure Functions

Target files:
- `src/xray/highlight.test.ts` — Test `esc()`, `highlight()`, and regex rule correctness
  - Empty string input
  - Strings with `&`, `<`, `>` characters
  - JS code with keywords, strings, numbers, dot-access
  - Overlapping/adjacent matches
  - Multiline input after compaction

### Phase 3: Hook Tests

Target files:
- `src/hooks/useTypewriter.test.ts` — Fake timers to verify typing progression and cursor behavior
- `src/hooks/useTheme.test.ts` — Mock `localStorage` and `matchMedia` to verify toggle and persistence
- `src/hooks/useActiveSection.test.ts` — Mock `getBoundingClientRect` and scroll events
- `src/hooks/usePrismFlip.test.ts` — Verify flip count logic, quip index cycling, timer cleanup
- `src/hooks/useRevealOnScroll.test.ts` — Mock IntersectionObserver
- `src/hooks/useMagneticTilt.test.ts` — Verify transform math at various distances

### Phase 4: Component Stories and Interaction Tests

- Add Storybook stories for `Hero`, `Footer`, `About`, `Experience`, `Projects`
- Add play functions to existing `Header` stories to test click interactions
- Add a11y assertions via `@storybook/addon-a11y` in story-level `play` functions

### Phase 5: E2E Smoke Tests

Playwright is already installed — add a minimal smoke test:
- Page loads without console errors
- X-ray mode toggles with the `x` key
- Theme toggle switches classes on `<html>`
- All nav links resolve to visible sections
