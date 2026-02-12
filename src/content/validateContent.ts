import type { PortfolioContent } from './content';

let hasWarned = false;

export function validateContentModel(content: PortfolioContent) {
  if (import.meta.env.PROD || hasWarned) return;

  const isMissing =
    !content.person.name ||
    !content.person.role ||
    !content.contact.email ||
    !content.contact.phone ||
    content.projects.featured.length < 1;

  if (isMissing) {
    hasWarned = true;
    console.warn('[content] Missing required content fields. Please review src/content/content.ts');
  }
}
