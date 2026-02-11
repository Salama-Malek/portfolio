# 4-Week Engineering Roadmap

This roadmap is derived from `PORTFOLIO_AUDIT.md` and focuses first on trust blockers (security, accessibility, install/build reliability), then on maintainability and hiring-facing quality.

## Week 1 — Stabilize core trust signals (P0)

### Milestones
- Deterministic install and CI baseline in place.
- Security and high-priority accessibility fixes shipped with no UX redesign.
- P0 pull request merged (`P0: security + a11y + install stability`).

### Planned work
- Fix `window.open` tabnabbing risk (`noopener,noreferrer`).
- Replace non-semantic clickable project-card patterns with semantic controls.
- Add modal semantics and keyboard/focus behavior (ESC close + focus return).
- Add baseline GitHub Actions pipeline: install, type-check, lint, build.
- Fix npm install/tooling compatibility path so `npm ci` is reliable in CI.

### Acceptance criteria
- `npm ci` succeeds in CI and local clean install flow.
- CI workflow passes on PRs with required checks for type-check, lint, and build.
- Project card interactions are keyboard/semantic (button/link), no clickable non-semantic wrappers.
- Modals expose `role="dialog"`, `aria-modal`, valid labels, close on ESC, and restore focus on close.
- External links opened by JavaScript include `noopener,noreferrer`.

---

## Week 2 — Type safety and data contract hardening (P1)

### Milestones
- `any` usage reduced in core rendering paths.
- Translation/content shape validated at boundaries.

### Planned work
- Remove high-impact `any` casts in `Home`, `About`, `Contact`, `PortfolioShowcase`.
- Introduce typed content interfaces in a shared contract module.
- Add runtime guards for translation-backed structured data.

### Acceptance criteria
- No `any` in primary content rendering path without explicit justification comment.
- Strong interfaces cover hero, projects, services, testimonials, and experience payloads.
- Type-check passes with stricter typing and no regressions.

---

## Week 3 — Performance and testing baseline (P1)

### Milestones
- Largest assets optimized.
- First automated test suite introduced.

### Planned work
- Convert/replace largest image assets with responsive modern formats.
- Add 10–20 high-value tests (modal flows, card interactions, language/dir behavior).
- Add smoke accessibility checks in test pipeline for major interactive paths.

### Acceptance criteria
- Initial route payload reduced measurably versus current baseline.
- Core user flows covered by automated tests with passing CI.
- No critical a11y violations in tested components.

---

## Week 4 — SEO essentials and production hardening (P1)

### Milestones
- Technical SEO baseline deployed.
- Security and quality workflows expanded.

### Planned work
- Add `robots.txt`, sitemap generation, canonical link, and JSON-LD.
- Add dependency scanning automation (Dependabot and/or audit workflow).
- Document branch protection and required status checks.

### Acceptance criteria
- Public site includes crawlability essentials and structured metadata.
- Dependency/security checks run automatically on schedule and PRs.
- Engineering handbook/docs updated with release and quality gates.
