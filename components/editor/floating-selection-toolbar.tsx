"use client";

import { FabricObject } from "fabric";
import { Sparkles, MessageSquarePlus, Copy, Trash2, MoreHorizontal, Wand2 } from "lucide-react";

export function FloatingSelectionToolbar({
  selected,
  onDuplicate,
  onDelete,
}: {
  selected: FabricObject;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  // Get position of selected object relative to canvas
  const bounds = selected.getBoundingRect();
  const canvas = selected.canvas;
  if (!canvas) return null;
  const zoom = canvas.getZoom();
  const top = Math.max(0, (bounds.top - 50) * zoom);
  const left = ((bounds.left + bounds.width / 2)) * zoom;

  return (
    <div
      className="pointer-events-auto absolute z-20 -translate-x-1/2 rounded-full border border-ink-900/10 bg-paper px-2 py-1.5 shadow-[0_8px_20px_-6px_rgba(10,10,6,0.3)] backdrop-blur-md"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <div className="flex items-center gap-0.5">
        <button title="AI edit" className="grid h-7 w-7 place-items-center rounded-full text-flame-500 hover:bg-flame-500/10">
          <Sparkles className="h-3.5 w-3.5" />
        </button>
        <button title="Copy" onClick={onDuplicate} className="grid h-7 w-7 place-items-center rounded-full text-ink-700 hover:bg-ink-900/5">
          <Copy className="h-3.5 w-3.5" />
        </button>
        <button title="Delete" onClick={onDelete} className="grid h-7 w-7 place-items-center rounded-full text-red-600 hover:bg-red-50">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
        <button title="More" className="grid h-7 w-7 place-items-center rounded-full text-ink-700 hover:bg-ink-900/5">
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
