import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SUPPORTED_LOCALES = ['en', 'ru', 'ar', 'fr', 'de'];

const getOrigin = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://reactbits.dev';
};

const setMeta = (selector: string, value: string) => {
  if (typeof document === 'undefined') return;
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
    if (match) {
      element.setAttribute(match[1], match[2]);
    }
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

const setLink = (rel: string, href: string, hreflang?: string) => {
  if (typeof document === 'undefined') return;
  let element = document.head.querySelector(`link[rel="${rel}"][data-managed="true"]${
    hreflang ? `[hreflang="${hreflang}"]` : ''
  }`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    element.dataset.managed = 'true';
    if (hreflang) {
      element.hreflang = hreflang;
    }
    document.head.appendChild(element);
  }
  element.href = href;
};

const clearAlternateLinks = () => {
  if (typeof document === 'undefined') return;
  document
    .querySelectorAll('link[rel="alternate"][data-managed="true"]')
    .forEach((node) => node.parentElement?.removeChild(node));
};

type PageMetadataProps = {
  titleKey: string;
  descriptionKey: string;
  children: React.ReactNode;
};

const PageMetadata: React.FC<PageMetadataProps> = ({ titleKey, descriptionKey, children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const title = t(titleKey);
  const description = t(descriptionKey);
  const origin = getOrigin();
  const canonical = `${origin}/${i18n.language}${location.pathname}${location.search}`;

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:site_name"]', t('seo.siteName'));
    setMeta('meta[property="og:image"]', `${origin}/og-dark.png`);
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="theme-color"]', '#020617');
    setLink('canonical', canonical);
    clearAlternateLinks();
    SUPPORTED_LOCALES.forEach((locale) => {
      setLink('alternate', `${origin}/${locale}${location.pathname}${location.search}`, locale);
    });
    return () => undefined;
  }, [canonical, description, location.pathname, location.search, origin, t, title]);

  return <>{children}</>;
};

export default PageMetadata;
