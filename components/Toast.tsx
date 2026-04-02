"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, X, XCircle } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (opts: Omit<Toast, "id">) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const icons: Record<ToastType, React.ElementType> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles: Record<
  ToastType,
  { icon: string; bg: string; border: string; bar: string }
> = {
  success: {
    icon: "text-emerald-400",
    bg: "bg-emerald-500/[0.08]",
    border: "border-emerald-500/20",
    bar: "bg-emerald-500",
  },
  error: {
    icon: "text-red-400",
    bg: "bg-red-500/[0.08]",
    border: "border-red-500/20",
    bar: "bg-red-500",
  },
  warning: {
    icon: "text-synapse-gold",
    bg: "bg-synapse-gold/[0.08]",
    border: "border-synapse-gold/20",
    bar: "bg-synapse-gold",
  },
  info: {
    icon: "text-pulse-blue",
    bg: "bg-pulse-blue/[0.08]",
    border: "border-pulse-blue/20",
    bar: "bg-pulse-blue",
  },
};

let idCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (opts: Omit<Toast, "id">) => {
      const id = ++idCounter;
      const duration = opts.duration ?? 5000;
      setToasts((prev) => [...prev, { ...opts, id }]);
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  const ctx: ToastContextType = {
    toast: addToast,
    success: (title, message) =>
      addToast({ type: "success", title, message }),
    error: (title, message) =>
      addToast({ type: "error", title, message, duration: 7000 }),
    warning: (title, message) =>
      addToast({ type: "warning", title, message }),
    info: (title, message) => addToast({ type: "info", title, message }),
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}

      {/* Toast container — top right */}
      <div className="pointer-events-none fixed right-0 top-0 z-[100] flex w-full max-w-md flex-col gap-3 p-4 sm:p-6">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => {
            const Icon = icons[t.type];
            const style = styles[t.type];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                className={`pointer-events-auto relative overflow-hidden rounded-2xl border backdrop-blur-xl ${style.border} ${style.bg}`}
              >
                {/* Progress bar */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-[2px] ${style.bar}`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{
                    duration: (t.duration ?? 5000) / 1000,
                    ease: "linear",
                  }}
                />

                <div className="flex items-start gap-3 p-4">
                  {/* Icon with pulse animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className={`mt-0.5 shrink-0 ${style.icon}`}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </motion.div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-signal-white">
                      {t.title}
                    </p>
                    {t.message && (
                      <p className="mt-0.5 text-[13px] leading-relaxed text-signal-white/55">
                        {t.message}
                      </p>
                    )}
                  </div>

                  {/* Close */}
                  <button
                    onClick={() => removeToast(t.id)}
                    className="shrink-0 rounded-lg p-1 text-signal-white/25 transition-colors hover:bg-signal-white/[0.06] hover:text-signal-white/50"
                  >
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
