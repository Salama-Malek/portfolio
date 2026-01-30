import React, { ReactNode } from "react";
import { useToast } from "./ToastProvider";

export default function ToastContainer(): ReactNode {
  const { toasts, dismissToast } = useToast();
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast toast-${t.type}`}
          onClick={() => dismissToast(t.id)}
        >
          {t.title && <div className="toast-title">{t.title}</div>}
          {t.description && (
            <div className="toast-description">{t.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}
