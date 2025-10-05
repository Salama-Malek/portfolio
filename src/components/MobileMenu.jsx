import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as ScrollLink } from 'react-scroll';
import SocialBtns from './SocialBtns';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function MobileMenu({ isOpen, navLinks, onClose }) {
  const { t } = useTranslation();
  const socialData = t('data.social', { returnObjects: true }) || [];

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  return (
    <>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="logo logo--3d mb-4">
            <img
              className="logo-3d-dark"
              src="/images/sm.png"
              alt={t('common.logoAlt')}
            />
          </div>
          <ul className="mobile-nav-list">
            {navLinks.map((link, index) => (
              <li
                key={link.to}
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <ScrollLink
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="mobile-nav-link"
                  onClick={onClose}
                >
                  {t(link.label)}
                </ScrollLink>
              </li>
            ))}
          </ul>
          <div
            className="mobile-menu-actions"
            style={{ animationDelay: `${0.1 * (navLinks.length + 1)}s` }}
          >
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          <div
            className="mobile-menu-footer"
            style={{
              animationDelay: `${0.1 * (navLinks.length + 2)}s`,
            }}
          >
            <SocialBtns socialBtns={socialData} />
            <ScrollLink
              to="contactus"
              smooth={true}
              offset={-80}
              duration={500}
              onClick={onClose}
              className="px-btn"
            >
              {t('header.cta')}
            </ScrollLink>
          </div>
        </div>
      </div>
      {isOpen && <div className="mobile-menu-overlay" onClick={onClose}></div>}
    </>
  );
}
