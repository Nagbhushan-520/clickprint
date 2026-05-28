"use client";

import { LayoutTemplate, Sparkles, Type, Smile, Camera, Image as ImageIcon, Palette, QrCode, Bookmark, Layers, MoreHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Panel } from "./left-toolbar";

type Tool = { id: NonNullable<Panel>; label: string; icon: React.ElementType };

const PRIMARY: Tool[] = [
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "ai", label: "AI", icon: Sparkles },
  { id: "text", label: "Text", icon: Type },
  { id: "stickers", label: "Elements", icon: Smile },
  { id: "photos", label: "Photos", icon: Camera },
];

const MORE: Tool[] = [
  { id: "shapes", label: "Shapes", icon: Smile },
  { id: "images", label: "Uploads", icon: ImageIcon },
  { id: "background", label: "Background", icon: Palette },
  { id: "qrcode", label: "QR Code", icon: QrCode },
  { id: "brand-kit", label: "Brand kit", icon: Bookmark },
  { id: "layers", label: "Layers", icon: Layers },
];

export function MobileBottomNav({
  active,
  onChange,
  onImageUpload,
}: {
  active: Panel;
  onChange: (p: Panel) => void;
  onImageUpload: (file: File) => void;
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <nav className="flex h-16 shrink-0 items-center justify-around border-t border-ink-900/8 bg-paper px-1 md:hidden">
        {PRIMARY.map((t) => (
          <Btn key={t.id} tool={t} active={active === t.id} onClick={() => onChange(active === t.id ? null : t.id)} />
        ))}
        <button
          onClick={() => setMoreOpen((v) => !v)}
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-2 transition-colors",
            moreOpen ? "text-flame-600" : "text-ink-600",
          )}
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </nav>

      {/* More overflow drawer */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMoreOpen(false)}
        >
          <div className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm" />
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-paper p-4 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto h-1 w-12 rounded-full bg-ink-900/15" />
            <div className="mt-5 grid grid-cols-4 gap-2">
              {MORE.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setMoreOpen(false);
                    if (t.id === "images") fileRef.current?.click();
                    else onChange(t.id);
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 rounded-2xl border border-ink-900/8 bg-paper p-4 transition-all",
                    active === t.id ? "border-flame-500 bg-flame-500/5 text-flame-600" : "text-ink-700",
                  )}
                >
                  <t.icon className="h-6 w-6" strokeWidth={1.75} />
                  <span className="text-xs font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
    </>
  );
}

function Btn({ tool, active, onClick }: { tool: Tool; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-2 transition-colors",
        active ? "text-flame-600" : "text-ink-600",
      )}
    >
      <tool.icon className={cn("h-5 w-5", active && "drop-shadow-[0_2px_4px_rgba(255,77,46,0.4)]")} strokeWidth={1.75} />
      <span className="text-[10px] font-medium">{tool.label}</span>
    </button>
  );
}
