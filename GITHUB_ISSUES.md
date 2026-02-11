# Proposed GitHub Issues (P0/P1)

One issue per P0/P1 action from `PORTFOLIO_AUDIT.md`.

## P0-1: Fix dependency/build reliability for deterministic installs

**Title**
- P0: Restore deterministic `npm ci` + build reliability

**Description**
- Resolve package manager/tooling mismatch that causes install/build instability.
- Ensure local and CI environments run the same dependency resolution path.
- Document required Node/npm versions and lockfile usage.

**File pointers**
- `package.json`
- `package-lock.json`
- `.npmrc`
- `README.md` (if installation notes are updated)

**Definition of done**
- `npm ci` works from a clean checkout.
- `npm run build` succeeds after clean install.
- CI workflow uses the same install command successfully.

---

## P0-2: Patch external link security and baseline headers

**Title**
- P0: Eliminate tabnabbing vectors and add baseline security headers

**Description**
- Update JavaScript-driven external link opens to include `noopener,noreferrer`.
- Add baseline production hardening headers where hosting supports them.

**File pointers**
- `src/components/ProjectCard.tsx`
- `public/.htaccess`

**Definition of done**
- No `window.open(url, "_blank")` remains without secure feature flags.
- Header configuration added/documented for production deployment.
- Manual validation confirms external opens do not retain `window.opener`.

---

## P0-3: Resolve critical accessibility blockers in interactive controls

**Title**
- P0: Replace clickable non-semantic UI patterns with accessible controls

**Description**
- Replace clickable `<div>` patterns with proper `button`/`a` semantics.
- Ensure all interactive overlays and cards are keyboard accessible.
- Keep visual behavior unchanged.

**File pointers**
- `src/components/ProjectCard.tsx`
- `src/components/BottomNav.tsx`
- `src/scss/scss/_projects.scss`
- `src/scss/scss/_bottom-nav.scss`

**Definition of done**
- No keyboard-inaccessible clickable containers remain in targeted components.
- Interactive controls have appropriate semantic elements and labels.
- Existing click interactions still function.

---

## P0-4: Add minimal CI quality gates

**Title**
- P0: Introduce baseline CI workflow (type-check, lint, build)

**Description**
- Add a GitHub Actions workflow that runs on PR and main branch pushes.
- Gate merges on TypeScript check, lint, and production build.

**File pointers**
- `.github/workflows/ci.yml`
- `package.json`

**Definition of done**
- Workflow is visible and runs automatically on pull requests.
- Type-check, lint, and build all run as independent CI steps.
- Required checks can be enabled in branch protection.

---

## P1-1: Remove `any` from primary rendering paths

**Title**
- P1: Replace `any` casts in content rendering with strict interfaces

**Description**
- Eliminate broad casting in core page data flow and establish typed contracts.
- Improve maintainability and reduce runtime shape assumptions.

**File pointers**
- `src/pages/Home.tsx`
- `src/components/About.tsx`
- `src/components/Contact.tsx`
- `src/components/PortfolioShowcase.tsx`
- `src/types/` (new or expanded)

**Definition of done**
- Identified `any` casts in target files removed or narrowed safely.
- Shared interfaces exist for major translation-backed sections.
- `npm run type-check` passes.

---

## P1-2: Optimize large image assets and static footprint

**Title**
- P1: Optimize heavy images and reduce landing payload

**Description**
- Convert largest image assets to efficient formats and serve responsive variants.
- Reduce unnecessary static asset transfer where possible.

**File pointers**
- `public/new-images/*`
- `public/images/*`
- `src/components/OptimizedImage.tsx`
- `src/components/Hero.tsx`

**Definition of done**
- Largest image assets reduced in byte size.
- Responsive image delivery strategy applied for key sections.
- No visible quality regressions on desktop/mobile.

---

## P1-3: Add foundational automated tests for critical journeys

**Title**
- P1: Introduce unit/integration tests for core interactions

**Description**
- Add initial tests around language switching, modal behavior, and project interactions.
- Provide a stable baseline to catch regressions from ongoing refactors.

**File pointers**
- `src/components/__tests__/*` (new)
- `src/pages/__tests__/*` (new)
- `package.json` (test script updates if needed)

**Definition of done**
- 10–20 high-value tests added and passing in CI.
- Modal close behavior and keyboard flow covered.
- i18n direction/lang behavior covered.

---

## P1-4: Implement technical SEO essentials

**Title**
- P1: Add sitemap, robots, canonical metadata, and JSON-LD

**Description**
- Deliver baseline technical SEO assets for crawlability and richer search previews.
- Ensure metadata is consistent and production-ready.

**File pointers**
- `public/index.html`
- `public/robots.txt` (new)
- `public/sitemap.xml` (new/generated)
- `public/manifest.json` (if added)

**Definition of done**
- Canonical URL present in document head.
- `robots.txt` and sitemap available at expected paths.
- JSON-LD included and validates in Rich Results tooling.
