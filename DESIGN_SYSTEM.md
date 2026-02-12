# Design System — Premium Motion Portfolio

## 1) Token System

### Color Tokens
- `--color-bg`: Core canvas (`#07080b`) for high contrast typography.
- `--color-surface`: Elevated panels (`#10131a`).
- `--color-surface-soft`: Subtle boundaries (`#171b24`).
- `--color-text`: Primary content (`#f5f7ff`).
- `--color-text-muted`: Secondary hierarchy (`#a6adc2`).
- `--color-text-subtle`: Tertiary metadata (`#7b8399`).
- `--color-primary`: Main brand action (`#5f84ff`).
- `--color-accent`: Dynamic motion accent (`#65f3d0`).
- `--color-gradient-start`: Premium purple-blue stop (`#7f68ff`).
- `--color-gradient-end`: Premium cyan stop (`#45d8ff`).
- `--color-border`: Hairline separators (`rgba(255,255,255,0.12)`).

### Typography Scale
- Display: clamp hero text with aggressive but readable leading.
- H1–H4: semantic heading rhythm.
- Body: readable long-form line-height.
- Caption: compact metadata and helper labels.

### Spacing Scale
- Based on 4px rhythm: `--space-1` to `--space-16`.
- Section spacing uses `clamp()` for responsive macro rhythm.

### Radius Scale
- `--radius-sm`: 8px
- `--radius-md`: 12px
- `--radius-lg`: 18px
- `--radius-xl`: 26px
- `--radius-pill`: 999px

### Shadow System
- Soft layered shadows for elevated premium cards.
- Strong glow shadow reserved for primary CTAs and focus states.

### Motion Tokens
- Fast: 160ms
- Standard: 260ms
- Slow: 420ms
- Easing:
  - `--ease-standard`: cubic-bezier(0.2, 0.7, 0.2, 1)
  - `--ease-spring`: cubic-bezier(0.16, 1, 0.3, 1)

## 2) Interaction Philosophy
- Motion should guide attention, never distract.
- Hover states provide depth and precision.
- Scroll reveal is subtle and stagger-ready.
- Inputs and interactive controls preserve strong focus visibility.
- Reduced motion users get equivalent hierarchy without animation.

## 3) Layout Grid
- App container max-width: 1160px.
- 12-column conceptual grid with CSS `grid-template-columns` utilities.
- Section primitives enforce consistent spacing and alignment.

## 4) Accessibility Principles
- Semantic heading order and landmark sections.
- Minimum contrast target WCAG AA.
- Keyboard-first navigation in header and CTA controls.
- Clear visible focus rings for all interactive elements.
- `prefers-reduced-motion` honored globally by motion wrappers.
