import React, { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from 'tsparticles-slim';
import { useThemeContext } from '../ThemeProvider';
import particlesOptions from '../particles.json';
import { getCssVariableValue } from '../utils/themeTokens';

const ParticlesComponent = () => {
  const { theme } = useThemeContext();
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particleColor = useMemo(() => {
    const fallback = theme === 'dark' ? '#ffffff' : '#000000';
    return getCssVariableValue('--text-primary', fallback);
  }, [theme]);

  const particlesConfig = {
    ...particlesOptions,
    particles: {
      ...particlesOptions.particles,
      color: {
        value: particleColor,
      },
      links: {
        ...particlesOptions.particles.links,
        color: particleColor,
      },
    },
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
    />
  );
};

export default ParticlesComponent;
