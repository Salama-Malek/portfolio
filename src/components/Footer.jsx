import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import SocialBtns from './SocialBtns';

export default function Footer({ socialData = [] }) {
  const { t } = useTranslation();

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
                        src="/images/tech1.png"
                        alt="Salama Malek - Full Stack Developer"
                      />
                    </div>
                  </Link>
                </div>
                <p className="footer-text">
                  A passionate full-stack developer dedicated to building innovative and user-friendly web applications.
                </p>
                <SocialBtns socialBtns={socialData} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-widget">
                <h5 className="widget-title">Quick Links</h5>
                <ul className="footer-nav">
                  <li><ScrollLink to="home" smooth={true}>Home</ScrollLink></li>
                  <li><ScrollLink to="about" smooth={true}>About</ScrollLink></li>
                  <li><ScrollLink to="project" smooth={true}>Projects</ScrollLink></li>
                  <li><ScrollLink to="experience" smooth={true}>Experience</ScrollLink></li>
                  <li><ScrollLink to="testimonial" smooth={true}>Testimonials</ScrollLink></li>
                  <li><ScrollLink to="contactus" smooth={true}>Contact</ScrollLink></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer-widget">
                <h5 className="widget-title">Get In Touch</h5>
                <p className="footer-text">
                  Have a project in mind? Let's talk about it.
                </p>
                <ScrollLink to="contactus" smooth={true} className="px-btn">
                  <span>Let's Talk</span>
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright-text">{t('footer.copyright')}</p>
          <button className="back-to-top" onClick={scrollToTop} title="Back to Top">
            <i className="bi bi-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}
