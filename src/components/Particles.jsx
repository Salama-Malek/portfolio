import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from 'tsparticles-slim';
import { useThemeContext } from '../ThemeProvider';
import particlesOptions from '../particles.json';

const ParticlesComponent = () => {
  const { theme } = useThemeContext();
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    ...particlesOptions,
    particles: {
      ...particlesOptions.particles,
      color: {
        value: theme === 'dark' ? '#ffffff' : '#000000',
      },
      links: {
        ...particlesOptions.particles.links,
        color: theme === 'dark' ? '#ffffff' : '#000000',
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
