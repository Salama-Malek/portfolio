import React from 'react';

type StubProps = {
  reducedMotion: boolean;
};

const BeamsBackground: React.FC<StubProps> = ({ reducedMotion }) => (
  <div
    className={`bg-stub ${reducedMotion ? 'bg-stub--static' : 'bg-stub--animated'}`}
    data-variant="beams"
    aria-hidden="true"
  />
);

export default BeamsBackground;
