import React from 'react';

type StubProps = {
  reducedMotion: boolean;
};

const GridMotionBackground: React.FC<StubProps> = ({ reducedMotion }) => (
  <div
    className={`bg-stub ${reducedMotion ? 'bg-stub--static' : 'bg-stub--animated'}`}
    data-variant="grid-motion"
    aria-hidden="true"
  />
);

export default GridMotionBackground;
