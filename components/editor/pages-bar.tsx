"use client";

import { Plus, Trash2, Copy, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export type Page = {
  id: string;
  name: string;
  json: object | null;
  thumbDataUrl?: string;
};

export function PagesBar({
  pages,
  currentIndex,
  onSelect,
  onAddBlank,
  onDuplicate,
  onDelete,
}: {
  pages: Page[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onAddBlank: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex h-20 shrink-0 items-center gap-2 border-t border-ink-900/8 bg-paper px-3 overflow-x-auto">
      {pages.map((p, i) => (
        <button
          key={p.id}
          onClick={() => onSelect(i)}
          className={cn(
            "relative grid h-14 w-12 shrink-0 place-items-center rounded-md border-2 transition-all",
            i === currentIndex
              ? "border-flame-500 bg-flame-500/5 shadow-[0_4px_12px_-4px_rgba(255,77,46,0.4)]"
              : "border-ink-900/10 bg-paper hover:border-ink-900/30",
          )}
          title={p.name}
        >
          {p.thumbDataUrl ? (
            <img src={p.thumbDataUrl} alt={p.name} className="h-full w-full rounded object-cover" />
          ) : (
            <FileText className="h-4 w-4 text-ink-400" />
          )}
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-ink-500">
            {i + 1}
          </span>
        </button>
      ))}

      <button
        onClick={onAddBlank}
        title="Add blank page"
        className="grid h-14 w-12 shrink-0 place-items-center rounded-md border-2 border-dashed border-ink-900/20 text-ink-500 transition-colors hover:border-flame-500 hover:text-flame-600"
      >
        <Plus className="h-4 w-4" />
      </button>

      <div className="ml-2 flex items-center gap-1">
        <button
          onClick={onDuplicate}
          disabled={pages.length === 0}
          title="Duplicate current page"
          className="rounded-md p-2 text-ink-700 transition-colors hover:bg-ink-900/5 disabled:opacity-30"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onDelete}
          disabled={pages.length <= 1}
          title="Delete current page"
          className="rounded-md p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-30"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="ml-auto text-xs text-ink-500">
        Page {currentIndex + 1} of {pages.length}
      </div>
    </div>
  );
}
