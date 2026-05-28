"use client";

import Link from "next/link";
import { Undo2, Redo2, Download, ArrowLeft, Loader2, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import type { EditorSize } from "@/lib/editor/dimensions";

export function TopToolbar({
  size,
  onSizeChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onExport,
  isExporting,
  hasOrder,
}: {
  size: EditorSize;
  onSizeChange: (s: EditorSize) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
  isExporting: boolean;
  hasOrder: boolean;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-ink-900/8 bg-paper px-3 md:px-4">
      <div className="flex items-center gap-3">
        <Link href="/" className="rounded-lg border border-ink-900/10 p-1.5 transition-colors hover:bg-ink-900/5">
          <ArrowLeft className="h-4 w-4 text-ink-700" />
        </Link>
        <Logo className="hidden sm:flex" />
        <div className="hidden h-5 w-px bg-ink-900/15 md:block" />
        <SizeSwitcher size={size} onChange={onSizeChange} />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="rounded-lg border border-ink-900/10 p-2 transition-colors hover:bg-ink-900/5 disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Undo"
        >
          <Undo2 className="h-4 w-4 text-ink-700" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="rounded-lg border border-ink-900/10 p-2 transition-colors hover:bg-ink-900/5 disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Redo"
        >
          <Redo2 className="h-4 w-4 text-ink-700" />
        </button>

        <div className="hidden h-5 w-px bg-ink-900/15 md:block" />

        <button
          onClick={onExport}
          disabled={isExporting}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
            isExporting
              ? "bg-ink-100 text-ink-500"
              : "bg-ink-900 text-paper hover:bg-flame-500",
          )}
        >
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              {hasOrder ? "Save & checkout" : "Export PDF"}
            </>
          )}
        </button>
      </div>
    </header>
  );
}

function SizeSwitcher({ size, onChange }: { size: EditorSize; onChange: (s: EditorSize) => void }) {
  return (
    <div className="hidden items-center gap-1 rounded-full border border-ink-900/10 bg-paper p-0.5 md:flex">
      {(["A4", "A5"] as const).map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
            size === s
              ? "bg-ink-900 text-paper"
              : "text-ink-600 hover:text-ink-900",
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
