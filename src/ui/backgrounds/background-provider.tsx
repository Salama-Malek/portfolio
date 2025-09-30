import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_BACKGROUND, type BackgroundId } from './index';

type BackgroundContextValue = {
  background: BackgroundId;
  setBackground: (id: BackgroundId) => void;
  reducedMotion: boolean;
};

const BackgroundContext = createContext<BackgroundContextValue | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'app.background';

const supportsReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getSearchParams = (search: string) => {
  const params = new URLSearchParams(search);
  return params;
};

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reducedMotion, setReducedMotion] = useState(supportsReducedMotion());
  const [background, setBackgroundState] = useState<BackgroundId>(() => {
    if (typeof window === 'undefined') return DEFAULT_BACKGROUND;
    const params = getSearchParams(window.location.search);
    const fromQuery = params.get('bg');
    if (fromQuery && isBackgroundId(fromQuery)) {
      return fromQuery;
    }
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored && isBackgroundId(stored)) {
      return stored;
    }
    return DEFAULT_BACKGROUND;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReducedMotion(media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, background);
  }, [background]);

  useEffect(() => {
    const params = getSearchParams(location.search);
    const queryBackground = params.get('bg');
    if (queryBackground && isBackgroundId(queryBackground) && queryBackground !== background) {
      setBackgroundState(queryBackground);
    }
  }, [location.search, background]);

  useEffect(() => {
    const params = getSearchParams(location.search);
    if (params.get('bg') !== background) {
      params.set('bg', background);
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [background, location.search, navigate]);

  useEffect(() => {
    document.documentElement.dataset.prefersReducedMotion = reducedMotion ? 'true' : 'false';
  }, [reducedMotion]);

  const value = useMemo<BackgroundContextValue>(
    () => ({ background, setBackground: setBackgroundState, reducedMotion }),
    [background, reducedMotion],
  );

  return <BackgroundContext.Provider value={value}>{children}</BackgroundContext.Provider>;
};

const isBackgroundId = (value: string): value is BackgroundId =>
  ['liquid-ether', 'beams', 'silk', 'particles', 'grid-motion'].includes(value);

export const useBackground = () => {
  const ctx = useContext(BackgroundContext);
  if (!ctx) {
    throw new Error('useBackground must be used within BackgroundProvider');
  }
  return ctx;
};
