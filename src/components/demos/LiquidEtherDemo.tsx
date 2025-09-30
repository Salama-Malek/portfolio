import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const LiquidEtherDemo: React.FC = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const width = 320;
      const height = 180;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (time: number) => {
      const hue = (time / 40) % 360;
      ctx.clearRect(0, 0, 320, 180);
      const gradient = ctx.createLinearGradient(0, 0, 320, 180);
      gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.6)`);
      gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 70%, 50%, 0.4)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 320, 180);
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <figure className="card" aria-label={t('projects.liquidEther.demoAria')}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <figcaption>{t('projects.liquidEther.demoCaption')}</figcaption>
    </figure>
  );
};

export default LiquidEtherDemo;
