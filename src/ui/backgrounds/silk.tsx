import React from 'react';

type StubProps = {
  reducedMotion: boolean;
};

const SilkBackground: React.FC<StubProps> = ({ reducedMotion }) => (
  <div
    className={`bg-stub ${reducedMotion ? 'bg-stub--static' : 'bg-stub--animated'}`}
    data-variant="silk"
    aria-hidden="true"
  />
);

export default SilkBackground;
