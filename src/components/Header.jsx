import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { Link as ScrollLink } from 'react-scroll';
import GooeyNav from './GooeyNav';
import useScrollSpy from '../hooks/useScrollSpy';
import Button from './Button';

export default function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { to: 'home', label: 'header.nav.home' },
    { to: 'about', label: 'header.nav.about' },
    { to: 'portfolio-showcase', label: 'header.nav.portfolio' },
    { to: 'experience', label: 'header.nav.experience' },
    { to: 'testimonial', label: 'header.nav.testimonials' },
    { to: 'contactus', label: 'header.nav.contact' },
  ];

  const sectionIds = navLinks.map((link) => link.to);
  const activeIndex = useScrollSpy(sectionIds, -100);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 border-b border-transparent transition duration-500 ease-out ' +
        (isScrolled
          ? 'border-white/10 bg-slate-950/85 backdrop-blur-lg shadow-lg shadow-slate-950/40'
          : 'bg-gradient-to-b from-slate-950/80 via-slate-950/20 to-transparent')
      }
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800/70 bg-slate-900/70 shadow-lg shadow-indigo-500/10">
            <img
              src="/images/tech1.png"
              alt="Salama Malek - Full Stack Developer"
              className="h-9 w-9 object-contain"
            />
          </div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Salama</span>
            <span className="text-base font-semibold text-slate-100">Malek</span>
          </div>
        </Link>

        <nav className="hidden lg:block">
          <GooeyNav
            items={navLinks.map((link) => ({ label: t(link.label), href: `#${link.to}` }))}
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

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-full border border-slate-800/60 bg-slate-900/60 px-3 py-1.5 shadow-inner shadow-slate-950/70 backdrop-blur">
            <LanguageSwitcher />
            <span className="h-4 w-px bg-slate-800" aria-hidden="true" />
            <ThemeSwitcher />
          </div>
          <div className="hidden lg:block">
            <Button asChild size="sm">
              <ScrollLink to="contactus" smooth={true} offset={-80} duration={500}>
                {t('header.cta')}
              </ScrollLink>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
