"use client";

import { useToast } from "@/context/toast-context";

const TONE_STYLES: Record<string, string> = {
  success: "border-cyan-400/30 bg-slate-900/95 text-cyan-100",
  error: "border-rose-400/30 bg-slate-900/95 text-rose-100",
  info: "border-violet-400/30 bg-slate-900/95 text-violet-100",
};

const TONE_ICON: Record<string, string> = {
  success: "✓",
  error: "⚠",
  info: "ℹ",
};

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:pr-6"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur animate-slide-up ${TONE_STYLES[t.tone]}`}
        >
          <span aria-hidden="true">{TONE_ICON[t.tone]}</span>
          <p className="text-sm font-medium">{t.message}</p>
          <button
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss notification"
            className="ml-auto text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
