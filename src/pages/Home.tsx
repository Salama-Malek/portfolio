import React, { useMemo } from "react";
import Testimonial from "../components/Testimonial";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import PortfolioShowcase from "../components/PortfolioShowcase";
import { useTranslation } from "react-i18next";

interface HomePageData {
  hero?: Record<string, unknown>;
  socialBtns?: unknown[];
  about?: Record<string, unknown>;
  experience?: Record<string, unknown>;
  testimonial?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  portfolioShowcase?: Record<string, unknown>;
}

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();

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

  return (
    <>
      <Hero key={i18n.language} data={hero} socialData={socialBtns as any} />
      <About data={about} />
      <PortfolioShowcase data={portfolioShowcase} />
      <Experience data={experience} />
      <Testimonial data={testimonial} />
      <Contact data={contact} socialData={socialBtns as any} />
    </>
  );
};

export default Home;
