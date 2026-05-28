"use client";

import { useState } from "react";
import { STICKERS, STICKER_CATEGORIES, type StickerCategory } from "@/lib/editor/stickers";
import { PanelHeader } from "./panel-templates";
import { cn } from "@/lib/utils";

export function PanelStickers({ onAdd }: { onAdd: (svg: string) => void }) {
  const [category, setCategory] = useState<StickerCategory>("celebration");

  const filtered = STICKERS.filter((s) => s.category === category);

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Stickers" subtitle="Click to add to your design" />

      {/* Category tabs */}
      <div className="border-b border-ink-900/8 px-2 py-2 overflow-x-auto">
        <div className="flex gap-1">
          {STICKER_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap transition-colors",
                category === c.id ? "bg-ink-900 text-paper" : "text-ink-600 hover:bg-ink-900/5",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 overflow-y-auto p-3">
        {filtered.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => onAdd(sticker.svg)}
            title={sticker.name}
            className="group aspect-square overflow-hidden rounded-xl border border-ink-900/8 bg-paper p-2 transition-all hover:border-ink-900/30 hover:shadow-md hover:-translate-y-0.5 [&>div>svg]:h-full [&>div>svg]:w-full"
          >
            <div
              className="grid h-full w-full place-items-center"
              dangerouslySetInnerHTML={{ __html: sticker.svg }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
