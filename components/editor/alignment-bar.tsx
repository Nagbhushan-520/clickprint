"use client";

import { AlignHorizontalJustifyCenter, AlignVerticalJustifyCenter, AlignStartHorizontal, AlignEndHorizontal, AlignStartVertical, AlignEndVertical } from "lucide-react";
import type { AlignKind } from "./canvas-board";
import { cn } from "@/lib/utils";

export function AlignmentBar({ onAlign, hasSelection }: { onAlign: (k: AlignKind) => void; hasSelection: boolean }) {
  const buttons: { id: AlignKind; label: string; icon: React.ElementType }[] = [
    { id: "left", label: "Align left", icon: AlignStartVertical },
    { id: "center", label: "Center horizontally", icon: AlignHorizontalJustifyCenter },
    { id: "right", label: "Align right", icon: AlignEndVertical },
    { id: "top", label: "Align top", icon: AlignStartHorizontal },
    { id: "middle", label: "Center vertically", icon: AlignVerticalJustifyCenter },
    { id: "bottom", label: "Align bottom", icon: AlignEndHorizontal },
  ];

  return (
    <div className={cn(
      "flex items-center gap-1 rounded-full border border-ink-900/10 bg-paper p-1 transition-opacity",
      !hasSelection && "opacity-50 pointer-events-none",
    )}>
      {buttons.map((b) => (
        <button
          key={b.id}
          title={b.label}
          onClick={() => onAlign(b.id)}
          className="rounded-full p-1.5 text-ink-700 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
        >
          <b.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
      ))}
    </div>
  );
}
