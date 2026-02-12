export const SITE_URL = "https://salama.sm4tech.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/home-banner.png`;

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  ogType?: "website" | "profile" | "article";
}

export const SEO_BY_PATH: Record<string, SeoMeta> = {
  "/": {
    title:
      "Salama Malek Developer | Fullstack React, TypeScript, Angular & Node.js Engineer",
    description:
      "Salama Malek is a fullstack developer and founder of SM4Tech, delivering React, TypeScript, Angular, Node.js, and scalable web solutions.",
    keywords:
      "Salama Malek, Salama Malek developer, SM4Tech, Fullstack developer Salama, React developer, TypeScript developer, Angular developer, Node.js developer",
    canonicalPath: "/",
    ogType: "profile",
  },
  "/projects": {
    title:
      "Projects by Salama Malek | React, Angular, TypeScript & Node.js Portfolio",
    description:
      "Explore production-ready projects by Salama Malek across React, Angular, TypeScript, Node.js, and fullstack architecture.",
    keywords:
      "Salama Malek projects, fullstack developer projects, React portfolio, Angular portfolio, Node.js projects",
    canonicalPath: "/projects",
  },
  "/about": {
    title:
      "About Salama Malek | Fullstack Developer and SM4Tech Founder",
    description:
      "Learn about Salama Malek's experience in fullstack engineering, technical strategy, and delivery through SM4Tech.",
    keywords:
      "About Salama Malek, SM4Tech founder, fullstack software engineer",
    canonicalPath: "/about",
  },
  "/contact": {
    title:
      "Contact Salama Malek | Hire a Fullstack Developer for React, Angular, Node.js",
    description:
      "Contact Salama Malek for fullstack development, React and Angular implementation, Node.js APIs, and technical consulting.",
    keywords:
      "Contact Salama Malek, hire fullstack developer, SM4Tech contact",
    canonicalPath: "/contact",
  },
};

export const defaultSeoMeta = SEO_BY_PATH["/"];
