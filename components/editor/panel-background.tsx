"use client";

import { PanelHeader } from "./panel-templates";

const COLORS = [
  "#FFFCF5", "#F7F4ED", "#F2E8DC", "#FFFFFF",
  "#0A0A06", "#15150F", "#272720", "#3E3E33",
  "#FF4D2E", "#FF6B41", "#FFAA00", "#FFC547",
  "#E89400", "#9C1F12", "#7A1B11", "#F2BB1B",
  "#E4E4D9", "#C8C8B7", "#8C8C7A", "#5C5C4D",
  "#1C2E40", "#2E4A6B", "#3D6CA6", "#7DA8E5",
  "#1B4332", "#2D6A4F", "#52B788", "#95D5B2",
];

export function PanelBackground({ onChange }: { onChange: (color: string) => void }) {
  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Background" subtitle="Solid color · click to apply" />
      <div className="grid grid-cols-4 gap-2 overflow-y-auto p-3">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="aspect-square rounded-xl border border-ink-900/10 transition-all hover:scale-105 hover:shadow-md"
            style={{ background: c }}
            aria-label={c}
          />
        ))}
      </div>
      <div className="border-t border-ink-900/8 p-3">
        <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">
          Custom
        </label>
        <input
          type="color"
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 h-10 w-full cursor-pointer rounded-lg border border-ink-900/10"
        />
      </div>
    </div>
  );
}
