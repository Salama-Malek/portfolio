# Architecture Decision: CRA → Vite Migration

## Decision
Migrate from Create React App (CRA) to Vite.

## Why
1. **Build speed**: Vite's native ESM dev server and Rollup pipeline drastically improve local iteration and production build performance.
2. **Modern defaults**: CRA is effectively maintenance-light, while Vite aligns with current React + TypeScript best practices.
3. **Static hosting fit**: Vite produces a simple static `dist/` output that is straightforward to deploy on Hostinger.
4. **Lean architecture**: Migration removes CRA-specific tooling and enables cleaner frontend structure for the redesigned portfolio.

## Scope
- Replace `react-scripts` scripts with Vite scripts.
- Add `vite.config.ts` and root `index.html`.
- Move app bootstrap to Vite style entrypoint.
- Validate with `npm run type-check` and `npm run build`.
