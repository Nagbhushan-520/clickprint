"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { PanelHeader } from "./panel-templates";
import type { BackgroundKind } from "./canvas-board";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FFFCF5", "#F7F4ED", "#F2E8DC", "#FFFFFF",
  "#0A0A06", "#15150F", "#272720", "#3E3E33",
  "#FF4D2E", "#FF6B41", "#FFAA00", "#FFC547",
  "#E89400", "#9C1F12", "#7A1B11", "#F2BB1B",
  "#E4E4D9", "#C8C8B7", "#8C8C7A", "#5C5C4D",
  "#1C2E40", "#2E4A6B", "#3D6CA6", "#7DA8E5",
  "#1B4332", "#2D6A4F", "#52B788", "#95D5B2",
];

const GRADIENTS: { from: string; to: string; angle: number; name: string }[] = [
  { from: "#FF4D2E", to: "#FFAA00", angle: 135, name: "Sunset" },
  { from: "#0A0A06", to: "#FF4D2E", angle: 180, name: "Ember" },
  { from: "#1B4332", to: "#52B788", angle: 135, name: "Forest" },
  { from: "#2E4A6B", to: "#7DA8E5", angle: 180, name: "Sky" },
  { from: "#7A1B11", to: "#FFAA00", angle: 160, name: "Diwali" },
  { from: "#F2E8DC", to: "#FF6B41", angle: 135, name: "Cream" },
  { from: "#0A0A06", to: "#3E3E33", angle: 180, name: "Coal" },
  { from: "#FF4D2E", to: "#9C1F12", angle: 135, name: "Brick" },
];

export function PanelBackground({
  onChange,
  onUploadImage,
}: {
  onChange: (bg: BackgroundKind) => void;
  onUploadImage: (file: File) => void;
}) {
  const [mode, setMode] = useState<"color" | "gradient" | "image">("color");
  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Background" subtitle="Solid, gradient, or image" />

      <div className="flex border-b border-ink-900/8 px-3 py-2 gap-1">
        {(["color", "gradient", "image"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              mode === m ? "bg-ink-900 text-paper" : "text-ink-600 hover:bg-ink-900/5",
            )}
          >
            {m === "color" ? "Solid" : m === "gradient" ? "Gradient" : "Image"}
          </button>
        ))}
      </div>

      {mode === "color" && (
        <div className="grid grid-cols-4 gap-2 overflow-y-auto p-3">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ type: "color", color: c })}
              className="aspect-square rounded-xl border border-ink-900/10 transition-all hover:scale-105 hover:shadow-md"
              style={{ background: c }}
              aria-label={c}
            />
          ))}
        </div>
      )}

      {mode === "gradient" && (
        <div className="grid grid-cols-2 gap-2 overflow-y-auto p-3">
          {GRADIENTS.map((g) => (
            <button
              key={g.name}
              onClick={() => onChange({ type: "gradient", from: g.from, to: g.to, angle: g.angle })}
              className="aspect-square overflow-hidden rounded-xl border border-ink-900/10 transition-all hover:scale-105 hover:shadow-md"
              style={{ background: `linear-gradient(${g.angle}deg, ${g.from}, ${g.to})` }}
              title={g.name}
              aria-label={g.name}
            >
              <span className="block w-full bg-ink-900/40 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-paper text-center">
                {g.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {mode === "image" && (
        <div className="overflow-y-auto p-3 space-y-3">
          <button
            onClick={() => imageRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink-900/15 bg-paper p-8 text-center transition-all hover:border-flame-500 hover:bg-flame-500/5"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-flame-500 text-paper">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div className="text-xs font-semibold text-ink-900">Upload background image</div>
            <div className="text-[10px] text-ink-500">JPG, PNG · fills canvas</div>
          </button>
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUploadImage(f);
              e.currentTarget.value = "";
            }}
          />
          <p className="rounded-xl bg-cream px-3 py-2 text-[11px] leading-relaxed text-ink-500">
            Image will fill the canvas and lock to the back. You can still add text and shapes on top.
          </p>
        </div>
      )}

      <div className="border-t border-ink-900/8 p-3">
        <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">
          Custom color
        </label>
        <input
          type="color"
          onChange={(e) => onChange({ type: "color", color: e.target.value })}
          className="mt-2 h-10 w-full cursor-pointer rounded-lg border border-ink-900/10"
        />
      </div>
    </div>
  );
}
