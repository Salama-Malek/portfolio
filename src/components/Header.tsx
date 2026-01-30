import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link as ScrollLink } from "react-scroll";
import GooeyNav from "./GooeyNav";
import useScrollSpy from "../hooks/useScrollSpy";

interface NavLink {
  to: string;
  label: string;
}

interface GooeyNavItem {
  label: string;
  href: string;
}

export default function Header(): ReactNode {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Handle smooth scroll for anchor links
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>): void => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#")) {
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [],
  );

  const navLinks: NavLink[] = [
    { to: "home", label: "header.nav.home" },
    { to: "about", label: "header.nav.about" },
    { to: "project", label: "header.nav.portfolio" },
    { to: "experience", label: "header.nav.experience" },
    { to: "testimonial", label: "header.nav.testimonials" },
    { to: "contactus", label: "header.nav.contact" },
  ];

  // Extract section IDs for scroll spy
  const sectionIds: string[] = navLinks.map((link) => link.to);

  // Use scroll spy to determine active section
  const activeIndex: number = useScrollSpy(sectionIds, -100);

  useEffect(() => {
    let ticking = false;
    const handleScroll = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const gooeyNavItems: GooeyNavItem[] = navLinks.map((l) => ({
    label: t(l.label),
    href: `#${l.to}`,
  }));

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo logo--3d">
            <ScrollLink to="home" smooth={true} offset={-80} duration={500}>
              <img
                className="logo-3d-dark"
                src="/images/sm.png"
                alt={t("common.logoAlt")}
              />
            </ScrollLink>
          </div>
          <nav className="main-nav d-none d-lg-block">
            <GooeyNav
              items={gooeyNavItems}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              externalActiveIndex={activeIndex}
            />
          </nav>
          <div className="header-actions d-flex align-items-center gap-3">
            <div className="d-none d-lg-flex">
              <LanguageSwitcher />
            </div>
            <a
              href="#contactus"
              onClick={handleAnchorClick}
              className="px-btn px-btn--compact"
            >
              {t("header.cta")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
