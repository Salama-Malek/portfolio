import React, { Suspense } from 'react';
import { backgroundComponents } from './index';
import { useBackground } from './background-provider';

const BackgroundLayer: React.FC = () => {
  const { background, reducedMotion } = useBackground();
  const BackgroundComponent = backgroundComponents[background] ?? backgroundComponents['liquid-ether'];

  return (
    <div className="background-layer" aria-hidden="true">
      <Suspense fallback={<div className="bg-liquid-ether--static" aria-hidden="true" />}>
        <BackgroundComponent reducedMotion={reducedMotion} />
      </Suspense>
    </div>
  );
};

export default BackgroundLayer;
