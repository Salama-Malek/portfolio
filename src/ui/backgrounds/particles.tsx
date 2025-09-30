import React from 'react';

type StubProps = {
  reducedMotion: boolean;
};

const ParticlesBackground: React.FC<StubProps> = ({ reducedMotion }) => (
  <div
    className={`bg-stub ${reducedMotion ? 'bg-stub--static' : 'bg-stub--animated'}`}
    data-variant="particles"
    aria-hidden="true"
  />
);

export default ParticlesBackground;
