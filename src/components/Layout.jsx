import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import Aos from 'aos';
import BottomNav from './BottomNav'; // Import the new component
import ToastContainer from './ToastContainer';
import { useTranslation } from 'react-i18next';

export default function Layout() {
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  useEffect(() => {
    const language = i18n.language || 'en';
    const normalizedLanguage = language.split('-')[0];

    const bodyElement = document.body;
    const previousFont = bodyElement.style.fontFamily;
    const previousDir = bodyElement.getAttribute('dir');

    const fontFamilyMap = {
      ar: 'var(--font-arabic)',
      ru: 'var(--font-cyrillic)',
    };

    const fontFamily = fontFamilyMap[normalizedLanguage] || 'var(--font-latin)';
    const direction = normalizedLanguage === 'ar' ? 'rtl' : 'ltr';

    bodyElement.style.fontFamily = fontFamily;
    bodyElement.dir = direction;

    return () => {
      bodyElement.style.fontFamily = previousFont;
      if (previousDir) {
        bodyElement.setAttribute('dir', previousDir);
      } else {
        bodyElement.removeAttribute('dir');
      }
    };
  }, [i18n.language]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <CustomCursor />
      <Footer />
      <BottomNav /> {/* Add the new component here */}
      <ToastContainer />
    </>
  );
}
