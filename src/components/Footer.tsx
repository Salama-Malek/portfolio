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
                      <img className="logo-3d-dark" src="/images/sm.png" alt={t("common.logoAlt")} />
                    </div>
                  </Link>
                </div>
                <p className="footer-text">{t("footer.description")}</p>
                <SocialBtns socialBtns={socialData as SocialLink[]} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-widget">
                <h5 className="widget-title">{t("footer.widgets.quickLinks")}</h5>
                <ul className="footer-nav">
                  <li><Link to="/">Salama Malek Developer Home</Link></li>
                  <li><Link to="/about">About Salama Malek &amp; SM4Tech</Link></li>
                  <li><Link to="/projects">React, Angular &amp; Node.js Projects</Link></li>
                  <li><a href="#technical-expertise" onClick={handleAnchorClick}>Fullstack Technical Expertise</a></li>
                  <li><a href="#faq" onClick={handleAnchorClick}>Fullstack Developer FAQ</a></li>
                  <li><Link to="/contact">Hire Salama Malek</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-widget">
                <h5 className="widget-title">{t("footer.widgets.contact")}</h5>
                <p className="footer-text">{t("footer.cta.description")}</p>
                <a href="#contactus" onClick={handleAnchorClick} className="px-btn">
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
