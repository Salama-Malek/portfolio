# Performance Notes (P1)

## What was optimized

- Added responsive `sizes` for above-the-fold images (hero, about, project cards) to improve browser source selection and reduce over-downloading.
- Added motion/perf gating for heavy hero effects (`Particles`, `LiquidEther`) using:
  - `prefers-reduced-motion`
  - hero visibility (`IntersectionObserver`)
  - idle/deferred activation timing
- Kept all existing image binaries unchanged in this revision (no new binary assets committed).

## Asset audit (current repository)

### Public assets total size

- `14,661,126 bytes` (~13.98 MB)

### Top 5 largest files

1. `public/new-images/about3.jpeg` — `3,357,476 bytes`
2. `public/new-images/about2.png` — `1,324,902 bytes`
3. `public/new-images/about40.png` — `1,290,491 bytes`
4. `public/new-images/about5.png` — `1,213,072 bytes`
5. `public/images/home-banner.png` — `812,612 bytes`

## Trade-offs / notes

- This update intentionally avoids adding/removing binary image files to keep the PR reviewable and code-focused.
- A follow-up asset-only PR can convert top offenders to WebP/AVIF and include visual QA snapshots per asset.
