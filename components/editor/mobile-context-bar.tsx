"use client";

import { FabricObject } from "fabric";
import { Type, Palette, AArrowUp, Check, Bold, Italic, Underline, FlipHorizontal, Layers as LayersIcon, Copy, Trash2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type ContextAction = "color" | "font" | "size" | "style" | "flip" | "duplicate" | "delete" | "layers" | "ai";

export function MobileContextBar({
  selected,
  onAction,
  onDone,
}: {
  selected: FabricObject;
  onAction: (action: ContextAction) => void;
  onDone: () => void;
}) {
  const type = (selected as any).type;
  const isText = type === "i-text" || type === "textbox";
  const isImage = type === "image";

  const items: { id: ContextAction; label: string; icon: React.ElementType }[] = isText
    ? [
        { id: "color", label: "Color", icon: Palette },
        { id: "font", label: "Font", icon: Type },
        { id: "size", label: "Size", icon: AArrowUp },
        { id: "style", label: "Style", icon: Bold },
        { id: "layers", label: "Layer", icon: LayersIcon },
        { id: "duplicate", label: "Copy", icon: Copy },
        { id: "delete", label: "Delete", icon: Trash2 },
      ]
    : isImage
      ? [
          { id: "flip", label: "Flip", icon: FlipHorizontal },
          { id: "layers", label: "Layer", icon: LayersIcon },
          { id: "duplicate", label: "Copy", icon: Copy },
          { id: "delete", label: "Delete", icon: Trash2 },
        ]
      : [
          { id: "color", label: "Color", icon: Palette },
          { id: "layers", label: "Layer", icon: LayersIcon },
          { id: "duplicate", label: "Copy", icon: Copy },
          { id: "delete", label: "Delete", icon: Trash2 },
        ];

  return (
    <div className="flex h-16 shrink-0 items-center gap-1 border-t border-ink-900/8 bg-paper px-2 md:hidden">
      <div className="flex flex-1 items-center gap-1 overflow-x-auto">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => onAction(it.id)}
            className={cn(
              "flex shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors min-w-[56px]",
              it.id === "delete" ? "text-red-600" : "text-ink-700",
            )}
          >
            <it.icon className="h-5 w-5" strokeWidth={1.75} />
            <span className="text-[10px] font-medium">{it.label}</span>
          </button>
        ))}
      </div>
      <button
        onClick={onDone}
        className="shrink-0 grid h-11 w-11 place-items-center rounded-full bg-green-100 text-green-700"
        aria-label="Done"
      >
        <Check className="h-5 w-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}
