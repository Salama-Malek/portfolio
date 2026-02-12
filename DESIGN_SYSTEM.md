# DESIGN SYSTEM — Modern Tech-Centric Premium Portfolio

This design system defines the visual and interaction foundation for the portfolio refresh. It is optimized for a dark, premium aesthetic with high readability, subtle motion, and accessible interaction patterns.

## 1) Color Tokens

Use CSS custom properties as the source of truth.

### Core surfaces
- `--color-bg: #07080b`
- `--color-surface: #10131a`
- `--color-surface-soft: #171b24`
- `--color-surface-glass: rgba(255, 255, 255, 0.04)`
- `--color-border: rgba(255, 255, 255, 0.12)`
- `--color-border-strong: rgba(255, 255, 255, 0.22)`

### Text hierarchy
- `--color-text: #f5f7ff`
- `--color-text-muted: #a6adc2`
- `--color-text-subtle: #7b8399`

### Brand and accents
- `--color-primary: #5f84ff`
- `--color-accent: #65f3d0`
- `--color-gradient-start: #7f68ff`
- `--color-gradient-end: #45d8ff`

### Semantic states
- `--color-focus-ring: #65f3d0`
- `--color-success: #45d483`
- `--color-warning: #ffb454`
- `--color-danger: #ff6b7d`

## 2) Typography Scale

Typography prioritizes strong contrast and compact visual rhythm.

- **Display** (`.type-display`): hero-level title, clamp based
  - `font-size: clamp(2.1rem, 6vw, 4.8rem)`
  - `line-height: 1.04`
  - `letter-spacing: -0.04em`
- **H1/H2/H3/H4**: semantic section hierarchy with negative tracking
- **Body** (`.type-body`): comfortable long-form reading
  - `line-height: 1.7`
  - `color: --color-text-muted`
- **Caption** (`.type-caption`): labels, overlines, metadata
  - uppercase with wider tracking

Recommended max line lengths:
- Hero copy: ~60ch
- Section description: ~64ch
- Card body: ~45ch

## 3) Spacing Scale

4px baseline spacing system:

- `--space-1: 0.25rem` (4px)
- `--space-2: 0.5rem` (8px)
- `--space-3: 0.75rem` (12px)
- `--space-4: 1rem` (16px)
- `--space-5: 1.25rem` (20px)
- `--space-6: 1.5rem` (24px)
- `--space-8: 2rem` (32px)
- `--space-10: 2.5rem` (40px)
- `--space-12: 3rem` (48px)
- `--space-16: 4rem` (64px)

Section rhythm:
- `.section { padding-block: clamp(4rem, 8vw, 7rem); }`

## 4) Motion Presets

All motion is subtle, purposeful, and should support comprehension.

### Durations
- `--duration-fast: 160ms` (micro feedback)
- `--duration-standard: 260ms` (hover/focus transitions)
- `--duration-slow: 420ms` (reveals and ambient motion)

### Easing
- `--ease-standard: cubic-bezier(0.2, 0.7, 0.2, 1)`
- `--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)`

### Presets
- **Reveal**: fade + translateY (20px → 0)
- **Lift hover**: translateY(-2px to -5px)
- **Ambient drift**: low-amplitude floating orbs in hero visuals

### Reduced-motion rule
Always honor:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition-duration: 0ms !important; }
}
```

## 5) Layout & Grid

- Container max width: `1160px`
- Global composition: sectional blocks + internal CSS grid
- Hero grid: asymmetric split (`1.2fr / 0.8fr` desktop)
- Card grids (projects/skills): responsive collapse to 1 column on tablet/mobile

## 6) Accessibility Rules

1. **Contrast**
   - Maintain WCAG AA minimum contrast for text/background pairs.
2. **Keyboard navigation**
   - Every interactive element must expose visible focus state (`:focus-visible`).
3. **Semantic structure**
   - Keep heading hierarchy logical and landmarks (`header`, `main`, `section`, `footer`).
4. **Motion safety**
   - Reduced-motion users receive equivalent hierarchy without animation.
5. **Touch targets**
   - Navigation and CTA controls should keep a minimum comfortable hit area (>= 36px height).
6. **Readable line lengths**
   - Constrain long text blocks to avoid fatigue.

## 7) Premium UI Patterns

- **Glass panels**: very light translucency + subtle border; avoid heavy blur overuse.
- **Gradient accents**: reserved for key call-to-action moments.
- **Micro interactions**: hover/focus transitions should feel responsive but understated.
- **Data-forward hero**: concise stat pills and structured metadata for engineering credibility.
