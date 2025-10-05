import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Link as ScrollLink } from 'react-scroll';
import GooeyNav from './GooeyNav';
import useScrollSpy from '../hooks/useScrollSpy';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: 'home', label: 'header.nav.home' },
    { to: 'about', label: 'header.nav.about' },
    { to: 'project', label: 'header.nav.portfolio' }, // <-- changed from 'portfolio-showcase' to 'project'
    { to: 'experience', label: 'header.nav.experience' },
    { to: 'testimonial', label: 'header.nav.testimonials' },
    { to: 'contactus', label: 'header.nav.contact' },
  ];

  // Extract section IDs for scroll spy
  const sectionIds = navLinks.map(link => link.to);
  
  // Use scroll spy to determine active section
  const activeIndex = useScrollSpy(sectionIds, -100);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo logo--3d">
            <Link to="/">
              <img
                className="logo-3d-dark"
                src="/images/sm.png"
                alt={t('common.logoAlt')}
              />
            </Link>
          </div>
          <nav className="main-nav d-none d-lg-block">
            <GooeyNav
              items={navLinks.map((l) => ({ label: t(l.label), href: `#${l.to}` }))}
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
          <div className="header-actions d-none d-lg-flex">
            <div className="d-flex align-items-center gap-3">
              <LanguageSwitcher />
            </div>
            <ScrollLink to="contactus" smooth={true} offset={-80} duration={500} className="px-btn">
              {t('header.cta')}
            </ScrollLink>
          </div>
          <button
            type="button"
            className="mobile-menu-toggle d-lg-none"
            aria-expanded={isMenuOpen}
            aria-controls="primary-mobile-navigation"
            aria-label={isMenuOpen ? t('navigation.close') : t('navigation.openMenu')}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">
              {isMenuOpen ? t('navigation.close') : t('navigation.openMenu')}
            </span>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} navLinks={navLinks} onClose={closeMenu} menuId="primary-mobile-navigation" />
    </header>
  );
}
