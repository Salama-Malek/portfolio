import React from "react";
import { SITE_URL } from "../utils/seo";

interface StructuredDataProps {
  path: string;
}

const faqEntities = [
  {
    "@type": "Question",
    name: "What does Salama Malek specialize in?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Salama Malek specializes in fullstack product development using React, TypeScript, Angular, Node.js, Express, MongoDB, and scalable API architecture.",
    },
  },
  {
    "@type": "Question",
    name: "Can I hire Salama Malek for freelance or contract work?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. Salama offers freelance and contract engagements through SM4Tech for product builds, performance optimization, and technical consulting.",
    },
  },
  {
    "@type": "Question",
    name: "Which technologies are most used in delivered projects?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Core delivery technologies include React, TypeScript, Angular, Node.js, MongoDB, Express, SCSS, and cloud deployment workflows.",
    },
  },
];

export default function StructuredData({ path }: StructuredDataProps): React.JSX.Element {
  const canonical = `${SITE_URL}${path}`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Salama Malek",
        url: SITE_URL,
        image: `${SITE_URL}/images/home-banner.png`,
        jobTitle: "Fullstack Developer",
        description:
          "Fullstack developer focused on React, TypeScript, Angular, Node.js, and performance-led web engineering.",
        knowsAbout: ["React", "TypeScript", "Angular", "Node.js", "Express", "MongoDB", "SEO", "Web Performance"],
        worksFor: {
          "@id": `${SITE_URL}/#org`,
        },
        sameAs: [
          "https://github.com/Salama-Malek",
          "https://www.linkedin.com/in/salama-malek",
          "https://khamsat.com/user/salamamalek",
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "SM4Tech",
        url: SITE_URL,
        logo: `${SITE_URL}/images/sm.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Salama Malek | SM4Tech",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: path === "/" ? "Overview" : path.replace("/", "").replace(/^./, (m) => m.toUpperCase()),
            item: canonical,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqEntities,
      },
      {
        "@type": "SoftwareSourceCode",
        name: "Portfolio Platform",
        codeRepository: "https://github.com/Salama-Malek",
        programmingLanguage: ["TypeScript", "JavaScript"],
        runtimePlatform: "Web Browser",
        author: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@type": "CreativeWork",
        name: "SM4Tech Client Project Portfolio",
        creator: {
          "@id": `${SITE_URL}/#person`,
        },
        about: ["React", "Angular", "Node.js", "Fullstack Development"],
        url: `${SITE_URL}/projects`,
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}
