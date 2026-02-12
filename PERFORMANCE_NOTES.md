# Performance Notes

- No new image/font/video/pdf assets were added in this redesign.
- Visual style relies on CSS primitives (borders, spacing, typography) over heavy effects.
- Interaction patterns are lightweight and avoid continuous JavaScript animation loops.
- Reveal behavior is optional and reduced-motion aware.
- Content is centralized in `src/content/content.ts` to reduce duplication and ease static optimization.
