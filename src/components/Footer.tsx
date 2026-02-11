import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SocialBtns from "./SocialBtns"; 
import type { SocialLink } from "../types/common";

interface FooterProps {
  socialData?: SocialLink[];
}

export default function Footer({ socialData = [] }: FooterProps): React.JSX.Element {
  const { t } = useTranslation();
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Handle smooth scroll for anchor links
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>): void => {
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [],
  );

  useEffect(() => {
    let ticking = false;
    const handleScroll = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Get hero section height
          const hero = document.getElementById("home");
          const heroHeight = hero ? hero.offsetHeight : 400;
          setShowBackToTop(window.scrollY > heroHeight);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback((): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="row">
            <div className="col-lg-4">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link to="/">
                    <div className="logo logo--3d">
                      <img
                        className="logo-3d-dark"
                        src="/images/sm.png"
                        alt={t("common.logoAlt")}
                      />
                    </div>
                  </Link>
                </div>
                <p className="footer-text">{t("footer.description")}</p>
                <SocialBtns socialBtns={socialData as SocialLink[]} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-widget">
                <h5 className="widget-title">
                  {t("footer.widgets.quickLinks")}
                </h5>
                <ul className="footer-nav">
                  <li>
                    <a href="#home" onClick={handleAnchorClick}>
                      {t("header.nav.home")}
                    </a>
                  </li>
                  <li>
                    <a href="#about" onClick={handleAnchorClick}>
                      {t("header.nav.about")}
                    </a>
                  </li>
                  <li>
                    <a href="#project" onClick={handleAnchorClick}>
                      {t("header.nav.portfolio")}
                    </a>
                  </li>
                  <li>
                    <a href="#experience" onClick={handleAnchorClick}>
                      {t("header.nav.experience")}
                    </a>
                  </li>
                  <li>
                    <a href="#testimonial" onClick={handleAnchorClick}>
                      {t("header.nav.testimonials")}
                    </a>
                  </li>
                  <li>
                    <a href="#contactus" onClick={handleAnchorClick}>
                      {t("header.nav.contact")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-widget">
                <h5 className="widget-title">{t("footer.widgets.contact")}</h5>
                <p className="footer-text">{t("footer.cta.description")}</p>
                <a
                  href="#contactus"
                  onClick={handleAnchorClick}
                  className="px-btn"
                >
                  <span>{t("header.cta")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright-text">{t("footer.copyright")}</p>
          {showBackToTop && (
            <button
              className="back-to-top"
              onClick={scrollToTop}
              title={t("common.backToTop")}
              aria-label={t("common.backToTop")}
            >
              <i className="bi bi-arrow-up"></i>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
