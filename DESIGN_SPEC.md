# DESIGN_SPEC — Modern Tech-Centric Minimal (Premium)

## Direction
This portfolio is redesigned toward a **Modern Tech-Centric Minimal** tone: authoritative typography, strict spacing, restrained color use, and subtle motion cues. The style draws high-level inspiration from professional portfolio patterns and MarceloDesignX1-like layout clarity, while implemented with original code and no copied assets.

## Content Policy
- Source of truth is `src/content/content.ts`.
- Content is limited to existing repository text and previously provided copy.
- Missing details are marked as `TODO:` placeholders instead of fabricated claims.

## Visual Tokens
### Color
- Background: `#0A0D12`
- Surface: `#11161D`
- Surface-soft: `#151C25`
- Border: `rgba(255,255,255,0.14)`
- Text-strong: `#F3F7FF`
- Text-muted: `#A8B3C7`
- Accent (single): `#6EA8FE`

### Typography
- Display: clamp(2.4rem, 6vw, 5.25rem), line-height 1.02, tracking -0.04em.
- Section headings: clear hierarchy with tight tracking.
- Body: 1rem base, 1.65 line-height, max line length 62ch.
- Metadata/captions: uppercase micro labels for structure.

### Spacing
4px system:
- 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
- Section vertical rhythm: `clamp(4rem, 8vw, 7rem)`.

## Layout
- `Container` max-width: 1120px with responsive horizontal padding.
- Sections use clear top-down narrative flow:
  1. Hero
  2. Featured Projects (+ other projects)
  3. Experience timeline
  4. Skills matrix
  5. Contact CTA + form

## Motion
- Reveal transitions: fade + translateY(16px), 220–420ms.
- Hover interactions: gentle lift and border tint.
- Motion honors `prefers-reduced-motion` by disabling non-essential transitions.

## Accessibility Notes
- Semantic landmarks: `header`, `main`, `section`, `footer`.
- Keyboard-visible focus ring for every interactive control.
- Minimum touch target height around 40px.
- Preserve contrast in all text/background combinations.

## Performance Notes
- No new binary assets added.
- Keep decorative effects CSS-only.
- Lightweight interaction logic and simple render trees.
