import React, { useRef, useEffect } from "react";

export default function CustomCursor(): React.JSX.Element | null {
  const cursorSm = useRef<HTMLDivElement>(null);
  const cursorLg = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const lastMoveTime = useRef<number>(0);

  // Disable on touch devices
  const isTouch: boolean =
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  useEffect(() => {
    if (isTouch) return;

    let mouseX: number = 0;
    let mouseY: number = 0;
    let currentX: number = 0;
    let currentY: number = 0;

    const handleMouseMove = (e: MouseEvent): void => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime.current = performance.now();

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(update);
      }
    };

    const update = (): void => {
      const now: number = performance.now();

      // Stop animation if mouse is idle
      if (now - lastMoveTime.current > 100) {
        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = null;
        return;
      }

      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      const transform: string = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (cursorSm.current) cursorSm.current.style.transform = transform;
      if (cursorLg.current) cursorLg.current.style.transform = transform;

      rafId.current = requestAnimationFrame(update);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div className="cs-cursor_lg" ref={cursorLg} />
      <div className="cs-cursor_sm" ref={cursorSm} />
    </>
  );
}
