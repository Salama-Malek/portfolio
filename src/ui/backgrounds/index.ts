import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export type BackgroundId = 'liquid-ether' | 'beams' | 'silk' | 'particles' | 'grid-motion';

export const DEFAULT_BACKGROUND: BackgroundId = 'liquid-ether';

export const backgroundLabels: Record<BackgroundId, string> = {
  'liquid-ether': 'backgrounds.liquidEther',
  beams: 'backgrounds.beams',
  silk: 'backgrounds.silk',
  particles: 'backgrounds.particles',
  'grid-motion': 'backgrounds.gridMotion',
};

export const backgroundModules: Record<BackgroundId, () => Promise<{ default: ComponentType<{ reducedMotion: boolean }> }>> = {
  'liquid-ether': () => import('./liquid-ether'),
  beams: () => import('./beams'),
  silk: () => import('./silk'),
  particles: () => import('./particles'),
  'grid-motion': () => import('./grid-motion'),
};

export const backgroundComponents = Object.fromEntries(
  (Object.keys(backgroundModules) as BackgroundId[]).map((key) => [key, lazy(backgroundModules[key])]),
) as Record<BackgroundId, LazyExoticComponent<ComponentType<{ reducedMotion: boolean }>>>;
