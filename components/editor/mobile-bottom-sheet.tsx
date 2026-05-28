"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function MobileBottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[78vh] overflow-hidden rounded-t-3xl bg-paper shadow-2xl animate-fade-up">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-12 rounded-full bg-ink-900/15" />
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-ink-900/5 text-ink-700 hover:bg-ink-900/10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="h-[calc(78vh-2rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
