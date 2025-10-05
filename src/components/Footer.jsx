import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import SocialBtns from './SocialBtns';

export default function Footer({ socialData = [] }) {
  const { t } = useTranslation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get hero section height
      const hero = document.getElementById('home');
      const heroHeight = hero ? hero.offsetHeight : 400;
      setShowBackToTop(window.scrollY > heroHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
                        alt={t('common.logoAlt')}
                      />
                    </div>
                  </Link>
                </div>
                <p className="footer-text">{t('footer.description')}</p>
                <SocialBtns socialBtns={socialData} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-widget">
                <h5 className="widget-title">{t('footer.widgets.quickLinks')}</h5>
                <ul className="footer-nav">
                  <li><ScrollLink to="home" smooth={true}>{t('header.nav.home')}</ScrollLink></li>
                  <li><ScrollLink to="about" smooth={true}>{t('header.nav.about')}</ScrollLink></li>
                  <li><ScrollLink to="project" smooth={true}>{t('header.nav.portfolio')}</ScrollLink></li>
                  <li><ScrollLink to="experience" smooth={true}>{t('header.nav.experience')}</ScrollLink></li>
                  <li><ScrollLink to="testimonial" smooth={true}>{t('header.nav.testimonials')}</ScrollLink></li>
                  <li><ScrollLink to="contactus" smooth={true}>{t('header.nav.contact')}</ScrollLink></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-widget">
                <h5 className="widget-title">{t('footer.widgets.contact')}</h5>
                <p className="footer-text">{t('footer.cta.description')}</p>
                <ScrollLink to="contactus" smooth={true} className="px-btn">
                  <span>{t('header.cta')}</span>
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright-text">{t('footer.copyright')}</p>
          {showBackToTop && (
            <button
              className="back-to-top"
              onClick={scrollToTop}
              title={t('common.backToTop')}
              aria-label={t('common.backToTop')}
            >
              <i className="bi bi-arrow-up"></i>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
