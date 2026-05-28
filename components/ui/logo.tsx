"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const color = variant === "dark" ? "text-ink-900" : "text-paper";

  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <motion.div
        whileHover={{ rotate: -8 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="relative"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="block">
          <rect x="2" y="2" width="28" height="28" rx="8" className="fill-flame-500" />
          <path
            d="M10 12.5C10 11.1193 11.1193 10 12.5 10H17.5C20.5376 10 23 12.4624 23 15.5C23 18.5376 20.5376 21 17.5 21H14V23.5C14 24.3284 13.3284 25 12.5 25C11.6716 25 11 24.3284 11 23.5V14H10V12.5Z"
            className="fill-paper"
          />
          <circle cx="22" cy="11" r="2.5" className="fill-saffron-500" />
        </svg>
      </motion.div>
      <span className={cn("font-display text-xl font-bold tracking-tight", color)}>
        Click<span className="text-flame-500">Print</span>
      </span>
    </Link>
  );
}
