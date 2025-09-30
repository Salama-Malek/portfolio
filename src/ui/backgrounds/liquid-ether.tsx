import React, { useEffect, useRef } from 'react';

type LiquidEtherProps = {
  reducedMotion: boolean;
};

type NodeVector = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

const CANVAS_FPS = 28;
const PARTICLE_COUNT = 14;

const ease = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const createNodes = (width: number, height: number): NodeVector[] => {
  const maxRadius = Math.min(width, height) * 0.12;
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
    const radius = maxRadius * (0.35 + Math.random() * 0.45);
    return {
      x: width / 2 + Math.cos(angle) * radius,
      y: height / 2 + Math.sin(angle) * radius,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: ease(maxRadius * (0.12 + Math.random() * 0.18), 24, 96),
    };
  });
};

const updateNodes = (nodes: NodeVector[], width: number, height: number) => {
  for (const node of nodes) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < node.radius || node.x > width - node.radius) {
      node.vx *= -1;
      node.x = ease(node.x, node.radius, width - node.radius);
    }

    if (node.y < node.radius || node.y > height - node.radius) {
      node.vy *= -1;
      node.y = ease(node.y, node.radius, height - node.radius);
    }
  }
};

const drawNodes = (
  ctx: CanvasRenderingContext2D,
  nodes: NodeVector[],
  width: number,
  height: number,
) => {
  ctx.clearRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'var(--accent-primary)');
  gradient.addColorStop(1, 'var(--accent-secondary)');

  ctx.fillStyle = 'var(--background-elevated)';
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = 'lighter';
  for (const node of nodes) {
    const radial = ctx.createRadialGradient(
      node.x,
      node.y,
      node.radius * 0.25,
      node.x,
      node.y,
      node.radius,
    );
    radial.addColorStop(0, 'var(--accent-primary)');
    radial.addColorStop(0.6, 'var(--accent-tertiary)');
    radial.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  ctx.fillStyle = gradient;
  ctx.globalAlpha = 0.35;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1;
};

const LiquidEtherBackground: React.FC<LiquidEtherProps> = ({ reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>();
  const nodesRef = useRef<NodeVector[]>([]);
  const runningRef = useRef(true);
  const lastFrameRef = useRef(0);
  const dprRef = useRef(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2));

  useEffect(() => {
    if (reducedMotion) {
      return () => undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return () => undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return () => undefined;
    }

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      const dpr = dprRef.current;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodesRef.current = createNodes(innerWidth, innerHeight);
    };

    resize();

    const handleVisibility = () => {
      runningRef.current = !document.hidden;
    };

    const handleBlur = () => {
      runningRef.current = false;
    };

    const handleFocus = () => {
      runningRef.current = !document.hidden;
      lastFrameRef.current = 0;
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('resize', resize);

    const loop = (timestamp: number) => {
      if (!runningRef.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      if (timestamp - lastFrameRef.current < 1000 / CANVAS_FPS) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      lastFrameRef.current = timestamp;
      const width = window.innerWidth;
      const height = window.innerHeight;
      updateNodes(nodesRef.current, width, height);
      drawNodes(ctx, nodesRef.current, width, height);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        className="bg-liquid-ether--static"
        aria-hidden="true"
      />
    );
  }

  return <canvas ref={canvasRef} className="bg-liquid-ether" aria-hidden="true" />;
};

export default LiquidEtherBackground;
