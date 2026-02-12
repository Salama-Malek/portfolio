import { content } from './content';

export type PortfolioContentMap = never;

export const contentMap = {
  person: {
    name: content.person.name,
    title: content.person.role,
    shortTagline: content.person.tagline,
    aboutShort: content.person.summary,
    aboutLong: 'TODO: Add extended about paragraph from verified source.',
  },
  contact: {
    emails: [content.contact.email],
    phone: content.contact.phone,
    links: {
      linkedin: content.contact.methods.find((m) => m.label === 'LinkedIn')?.href ?? null,
      khamsat: content.contact.methods.find((m) => m.label === 'Khamsat')?.href ?? null,
      github: content.contact.methods.find((m) => m.label === 'GitHub')?.href ?? null,
    },
  },
  nav: {
    home: 'Home',
    about: 'About Me',
    portfolio: 'Portfolio',
    experience: 'Experience',
    testimonials: 'Testimonials',
    contact: 'Contact',
  },
  stats: content.hero.keyFacts.map((f) => ({ label: f.label, value: Number(f.value) || 0 })),
  sections: {
    hero: {
      eyebrow: content.hero.eyebrow,
      ctaPrimary: content.hero.primaryCta.label,
      ctaSecondary: content.hero.secondaryCta.label,
    },
    about: { miniTitle: 'About Me', title: 'Available for Full Stack Projects' },
    portfolio: { miniTitle: 'My Work', title: 'Recent Projects', viewProject: 'View project ↗' },
    experience: { miniTitle: 'Experience', title: 'My Work Experience' },
    testimonials: { miniTitle: 'Testimonials', title: 'What Clients Say About My Work', empty: 'Coming soon' },
    contact: { miniTitle: 'Contact', title: content.contact.title, subtitle: content.contact.subtitle },
    footer: content.footer,
  },
  projects: content.projects.featured.map((p) => ({
    title: p.title,
    type: p.category,
    description: p.description,
    technologies: p.stack,
    liveDemoUrl: p.links.live,
    githubUrl: p.links.repo,
  })),
  experience: content.experience.map((item) => ({
    company: item.company,
    role: item.role,
    start: item.duration.split(' — ')[0],
    end: item.duration.split(' — ')[1] ?? '',
    bullets: item.highlights,
  })),
  education: [],
  skills: {
    frontend: content.skills.frontend,
    backend: content.skills.backend,
    mobile: content.skills.mobile,
    db: [],
    tools: content.skills.tools,
    cloudAndSecurity: content.skills.cloud,
  },
  testimonials: [],
};
