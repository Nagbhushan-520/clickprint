"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export function OptionCard({
  selected,
  onSelect,
  title,
  subtitle,
  badge,
  accent = "flame",
  size = "md",
  disabled,
}: {
  selected: boolean;
  onSelect: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: string;
  accent?: "flame" | "ink" | "saffron";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}) {
  const accentClasses = {
    flame: "border-flame-500 bg-flame-500/5 ring-flame-500/20",
    ink: "border-ink-900 bg-ink-900/5 ring-ink-900/20",
    saffron: "border-saffron-500 bg-saffron-500/5 ring-saffron-500/20",
  }[accent];

  const sizeClasses = {
    sm: "px-4 py-3",
    md: "px-5 py-4",
    lg: "px-6 py-5",
  }[size];

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border text-left transition-all duration-300",
        sizeClasses,
        selected
          ? `${accentClasses} ring-4 shadow-[0_10px_30px_-15px_rgba(255,77,46,0.4)]`
          : "border-ink-900/10 bg-paper hover:border-ink-900/30 hover:shadow-md",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
      )}
    >
      {badge && (
        <span className="absolute -top-px right-3 -translate-y-1/2 rounded-full bg-flame-500 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-paper">
          {badge}
        </span>
      )}
      <div className="flex items-start gap-3">
        {selected && (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-flame-500"
          >
            <Check className="h-3 w-3 text-paper" strokeWidth={3} />
          </motion.div>
        )}
        {!selected && (
          <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 border-ink-900/15" />
        )}
        <div className="min-w-0 flex-1">
          <div className="font-display text-base font-semibold tracking-tight text-ink-900">
            {title}
          </div>
          {subtitle && (
            <div className="mt-0.5 text-xs leading-snug text-ink-500">{subtitle}</div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
