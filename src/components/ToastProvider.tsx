import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";

interface Toast {
  id: number;
  title: string;
  description: string;
  type: "info" | "success" | "error" | "warning";
}

interface ToastInput {
  title?: string;
  description?: string;
  type?: "info" | "success" | "error" | "warning";
  duration?: number;
}

interface ToastContextType {
  pushToast: (toast: ToastInput) => number;
  dismissToast: (id: number) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType>({
  pushToast: () => 0,
  dismissToast: () => {},
  toasts: [],
});

let nextToastId = 1;

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps): ReactNode {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const dismissToast = useCallback((id: number): void => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const pushToast = useCallback(
    (toast: ToastInput): number => {
      const id = nextToastId++;
      const lifetimeMs = Math.max(1500, Math.min(8000, toast.duration ?? 3500));
      const toastRecord: Toast = {
        id,
        title: toast.title ?? "",
        description: toast.description ?? "",
        type: toast.type ?? "info",
      };
      setToasts((prev) => [...prev, toastRecord]);
      const timeoutId = setTimeout(() => dismissToast(id), lifetimeMs);
      timeoutsRef.current.set(id, timeoutId);
      return id;
    },
    [dismissToast],
  );

  const value = useMemo(
    (): ToastContextType => ({ pushToast, dismissToast, toasts }),
    [pushToast, dismissToast, toasts],
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  return useContext(ToastContext);
}
