# React 19 Modernization Audit & Migration Recommendation

## Executive summary

A direct in-place upgrade to React 19 is **not safe** with the current Create React App (`react-scripts@5.0.1`) toolchain. The project should not force a broken dependency graph under CRA. Instead, a structured migration to a modern build tool is recommended before adopting React 19.

## Phase 1 — Audit & compatibility check

### Current toolchain and versions

- Build system: **Create React App** via `react-scripts@5.0.1`.
- React runtime: `react@18.2.0`, `react-dom@18.2.0`.
- TypeScript (declared): `4.9.5`.
- React type packages (declared): `@types/react@18.2.15`, `@types/react-dom@18.2.7`.
- CI Node version: **Node 20** (`actions/setup-node@v4`, `node-version: 20`).

### CRA + React 19 compatibility conclusion

`react-scripts@5.0.1` is effectively unmaintained and has outdated peer constraints and ecosystem assumptions:

- `react-scripts` peer dependency for TypeScript is `^3.2.1 || ^4`.
- React 19 adoption in practice typically pairs with modern TypeScript and tooling versions that exceed CRA 5's supported matrix.

Given this, proceeding directly to React 19 inside CRA introduces high risk of install-time peer conflicts and/or build fragility.

**Decision:** Do **not** perform React 19 upgrade in-place on CRA.

## Phase 2 — Safe dependency strategy (while still on CRA)

### What was attempted

- Dependency audit command attempted: `npm outdated`.
- Clean install attempted: `npm ci`.

### Environment limitation observed

The environment cannot fully query/install from npm registry due access policy errors (`403 Forbidden` for packages such as `@tsparticles/engine` and `@types/node`). Because of this, a reliable package-by-package modernization pass could not be completed in this run.

### Guardrails preserved

- No use of `--legacy-peer-deps`.
- No TypeScript strictness weakening.
- No risky bulk dependency bumps.

## Phase 3 — React 19 upgrade status

Not executed, by design, because CRA is the blocker.

## Phase 4 — Modernization improvements completed in this PR

- Added explicit Node engine requirement to align local development with CI baseline:
  - `"engines": { "node": ">=20" }`

This helps prevent local/CI drift while preparing for a future toolchain migration.

## Recommended migration options

### Option A (recommended): Migrate to Vite + React + TypeScript

**Why:** Lowest-friction path from CRA SPA to modern React 19-compatible tooling.

Pros:
- Fast dev/build performance.
- Straightforward CRA migration for SPA projects.
- Strong ecosystem and active maintenance.

Cons:
- Requires replacing CRA-specific environment variable conventions and scripts.
- Requires moving/adjusting test and lint wiring.

### Option B: Migrate to Next.js

**Why:** Good if roadmap includes SSR/SSG, routing conventions, SEO, and full-stack features.

Pros:
- Excellent production platform for hybrid rendering.
- First-class React support and strong defaults.

Cons:
- Bigger architectural shift than Vite for a pure SPA.
- Requires route/file-structure and deployment model changes.

## Proposed next steps (Vite migration plan)

1. Scaffold Vite React TS app and port source incrementally.
2. Preserve existing routing and UI behavior; verify parity screen-by-screen.
3. Replace CRA env variables (`REACT_APP_*` patterns) with Vite equivalents.
4. Rewire linting/testing/build scripts.
5. Validate `npm run type-check` and `npm run build`.
6. Upgrade React/ReactDOM + `@types/*` to React 19-compatible latest stable.
7. Run regression checks and release.

## Validation executed in this run

- `npm run type-check` passed.
- `npm run build` passed (with existing ESLint warnings unrelated to this modernization decision).
- `npm ci` and `npm outdated` were blocked by registry policy (`403 Forbidden`), so dependency refresh could not be completed here.
