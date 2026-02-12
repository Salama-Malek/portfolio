import type { PortfolioContentMap } from './contentMap';

let hasWarned = false;

export function validateContentModel(content: PortfolioContentMap) {
  if (import.meta.env.PROD || hasWarned) return;

  const isMissing =
    !content.person.name ||
    !content.person.title ||
    !content.contact.emails[0] ||
    !content.contact.phone ||
    content.projects.length < 1;

  if (isMissing) {
    hasWarned = true;
    console.warn('[content] Missing required content fields. Please review src/content/contentMap.ts');
  }
}
