import React, { useEffect, useRef, useState, ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  placement?: "top" | "bottom";
}

interface TooltipCoords {
  top: number;
  left: number;
}

export default function Tooltip({
  content,
  children,
  placement = "top",
}: TooltipProps): React.JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const [coords, setCoords] = useState<TooltipCoords>({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const spacing = 8;
    let top = rect.top - spacing;
    let left = rect.left + rect.width / 2;
    if (placement === "bottom") {
      top = rect.bottom + spacing;
    }
    setCoords({ top, left });
  }, [visible, placement]);

  return (
    <span
      ref={ref}
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          className={`tooltip-bubble tooltip-${placement}`}
          style={{ top: coords.top, left: coords.left }}
        >
          {content}
        </span>
      )}
    </span>
  );
}
