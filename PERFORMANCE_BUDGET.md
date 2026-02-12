# Performance Budget

## Lighthouse Targets (Production)
- Performance: **>= 95**
- Accessibility: **>= 95**
- Best Practices: **>= 95**
- SEO: **100**

## Resource Budgets
- Initial JS (gzipped): **<= 180 KB**
- Initial CSS (gzipped): **<= 70 KB**
- Largest Contentful Paint image: **<= 120 KB**
- Total blocking time: **<= 200ms**
- CLS: **<= 0.05**

## Implemented Controls
- Lazy loading for non-critical sections/components (`PortfolioShowcase`, `Testimonial`, canvas effects).
- Metadata and structured data generated without additional heavy dependencies.
- `OptimizedImage` dimensions/aspect-ratio enforced to reduce layout shift.
- Reduced-motion checks to avoid expensive animation on accessibility preference.
- Apache static asset cache policy and compression enabled.

## Ongoing Checks
Run the following before release:
1. `npm run build`
2. Lighthouse on production URL (mobile + desktop)
3. Verify no JS bundle regression with CRA bundle output size comparison.
