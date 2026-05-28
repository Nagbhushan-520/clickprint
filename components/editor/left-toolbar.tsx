"use client";

import { useRef } from "react";
import { LayoutTemplate, Type, Square, Circle as CircleIcon, Image as ImageIcon, Layers, Sparkles, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

export type Panel = "templates" | "text" | "shapes" | "images" | "layers" | "ai" | "background" | null;

export function LeftToolbar({
  active,
  onChange,
  onImageUpload,
}: {
  active: Panel;
  onChange: (p: Panel) => void;
  onImageUpload: (file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const tools: { id: NonNullable<Panel>; label: string; icon: React.ElementType }[] = [
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "text", label: "Text", icon: Type },
    { id: "shapes", label: "Shapes", icon: Square },
    { id: "images", label: "Images", icon: ImageIcon },
    { id: "ai", label: "AI", icon: Sparkles },
    { id: "background", label: "Background", icon: Palette },
    { id: "layers", label: "Layers", icon: Layers },
  ];

  return (
    <aside className="flex w-16 shrink-0 flex-col items-center gap-1 border-r border-ink-900/8 bg-paper py-3 md:w-20">
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => {
            if (t.id === "images") {
              fileRef.current?.click();
            }
            onChange(active === t.id ? null : t.id);
          }}
          className={cn(
            "group flex w-14 flex-col items-center gap-1 rounded-xl px-1 py-2 transition-all md:w-16",
            active === t.id
              ? "bg-flame-500/10 text-flame-600"
              : "text-ink-600 hover:bg-ink-900/5 hover:text-ink-900",
          )}
        >
          <t.icon className="h-5 w-5" strokeWidth={1.75} />
          <span className="text-[10px] font-medium tracking-tight">{t.label}</span>
        </button>
      ))}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onImageUpload(f);
          e.currentTarget.value = "";
        }}
      />
    </aside>
  );
}
