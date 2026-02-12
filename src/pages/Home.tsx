import React, { useMemo, useEffect, lazy, Suspense } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import SeoMeta from "../components/SeoMeta";
import StructuredData from "../components/StructuredData";
import { SEO_BY_PATH, defaultSeoMeta } from "../utils/seo";

const Testimonial = lazy(() => import("../components/Testimonial"));
const PortfolioShowcase = lazy(() => import("../components/PortfolioShowcase"));

interface HomePageData {
  hero?: Record<string, unknown>;
  socialBtns?: unknown[];
  about?: Record<string, unknown>;
  experience?: Record<string, unknown>;
  testimonial?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  portfolioShowcase?: Record<string, unknown>;
}

const expertiseAreas = [
  "React and TypeScript front-end architecture for scalable interfaces",
  "Angular applications with clean component patterns and RxJS workflows",
  "Node.js API engineering, authentication, and integration layers",
  "Performance optimization, Core Web Vitals improvements, and technical SEO",
];

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const homePageData = useMemo(() => {
    return (t("homePage", { returnObjects: true }) as HomePageData) || {};
  }, [t]);

  const {
    hero = {},
    socialBtns = [],
    about = {},
    experience = {},
    testimonial = {},
    contact = {},
    portfolioShowcase = {},
  } = homePageData;

  useEffect(() => {
    const pathToSection: Record<string, string> = {
      "/about": "about",
      "/projects": "project",
      "/contact": "contactus",
    };

    const targetId = pathToSection[pathname];
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [pathname]);

  const seoMeta = SEO_BY_PATH[pathname] || defaultSeoMeta;

  return (
    <>
      <SeoMeta meta={seoMeta} />
      <StructuredData path={pathname} />

      <Hero key={i18n.language} data={hero} socialData={socialBtns as any} />

      <section id="positioning" className="section pt-0">
        <div className="container">
          <h2>Salama Malek Developer: Fullstack Product Engineering for Growth</h2>
          <p>
            Salama Malek is a fullstack developer and SM4Tech founder helping brands launch
            high-performing digital products. I design and build production-ready experiences
            with React, TypeScript, Angular, and Node.js while prioritizing maintainable code,
            fast load times, and conversion-focused UX. If you are looking for a fullstack
            developer who can ship features and improve technical SEO performance, this portfolio
            highlights the process, stack depth, and outcomes.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <a className="px-btn" href="/projects">View fullstack projects</a>
            <a className="px-btn-outline" href="/contact">Start a project with SM4Tech</a>
          </div>
        </div>
      </section>

      <About data={about} />

      <section id="technical-expertise" className="section pt-0">
        <div className="container">
          <h2>Technical Expertise Across React, TypeScript, Angular, and Node.js</h2>
          <div className="row gy-3">
            {expertiseAreas.map((item) => (
              <div className="col-md-6" key={item}>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <PortfolioShowcase data={portfolioShowcase} />
      </Suspense>
      <Experience data={experience} />
      <Suspense fallback={null}>
        <Testimonial data={testimonial} />
      </Suspense>

      <section id="faq" className="section pt-0">
        <div className="container">
          <h2>FAQ: Hiring Salama Malek as a Fullstack Developer</h2>
          <h3>What services does SM4Tech provide?</h3>
          <p>
            SM4Tech provides end-to-end fullstack development, front-end delivery, backend APIs,
            performance optimization, and SEO-aware implementation.
          </p>
          <h3>Which stack is used most often?</h3>
          <p>
            Most builds are delivered using React, TypeScript, Angular, Node.js, Express, and
            MongoDB, with each stack choice aligned to business goals and maintainability.
          </p>
          <h3>How can I start a project?</h3>
          <p>
            Use the contact section to share scope, timeline, and desired outcomes. You will
            receive a clear implementation approach and next steps.
          </p>
        </div>
      </section>

      <Contact data={contact} socialData={socialBtns as any} />
    </>
  );
};

export default Home;
