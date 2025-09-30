import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SkipLink from '../a11y/SkipLink';
import BackgroundLayer from '../../ui/backgrounds/BackgroundLayer';
import { BackgroundProvider } from '../../ui/backgrounds/background-provider';
import LanguageMenu from '../navigation/LanguageMenu';
import BackgroundSelect from '../navigation/BackgroundSelect';
import CommandPalette from '../command-palette/CommandPalette';

const AppShell: React.FC = () => {
  const { t } = useTranslation();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/writing', label: t('nav.writing') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/docs', label: t('nav.docs') },
    { to: '/examples', label: t('nav.examples') },
    { to: '/blog', label: t('nav.blog') },
  ];

  return (
    <BackgroundProvider>
      <BackgroundLayer />
      <div className="app-root">
        <SkipLink />
        <header className="global-header" role="banner">
          <div className="global-header__inner">
            <NavLink to="/" className="global-header__logo" aria-label={t('nav.home')}>
              <span>{t('nav.brand')}</span>
            </NavLink>
            <nav aria-label={t('nav.primary')} className="global-header__nav">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className="nav-link">
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="global-header__spacer" />
            <div className="global-header__actions">
              <button
                type="button"
                className="command-button"
                onClick={() => setPaletteOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={paletteOpen}
              >
                {t('palette.trigger')} <span aria-hidden="true">⌘K</span>
              </button>
              <BackgroundSelect />
              <LanguageMenu />
            </div>
          </div>
        </header>
        <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
        <main id="main" className="main-content" tabIndex={-1}>
          <div className="main-content__inner">
            <Outlet />
          </div>
        </main>
      </div>
    </BackgroundProvider>
  );
};

export default AppShell;
