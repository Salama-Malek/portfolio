import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const ToastContext = createContext({ pushToast: () => {}, dismissToast: () => {} });

let nextToastId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef(new Map());

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const pushToast = useCallback((toast) => {
    const id = nextToastId++;
    const lifetimeMs = Math.max(1500, Math.min(8000, toast.duration ?? 3500));
    const toastRecord = {
      id,
      title: toast.title ?? '',
      description: toast.description ?? '',
      type: toast.type ?? 'info',
    };
    setToasts((prev) => [...prev, toastRecord]);
    const timeoutId = setTimeout(() => dismissToast(id), lifetimeMs);
    timeoutsRef.current.set(id, timeoutId);
    return id;
  }, [dismissToast]);

  const value = useMemo(() => ({ pushToast, dismissToast, toasts }), [pushToast, dismissToast, toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}


