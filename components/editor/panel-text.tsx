"use client";

import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { FONTS, loadFont, type FontDef } from "@/lib/editor/fonts";
import { PanelHeader } from "./panel-templates";
import { cn } from "@/lib/utils";

type FontCategory = "all" | "display" | "sans" | "serif" | "script" | "mono" | "indic";

const CAT_LABELS: { id: FontCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "display", label: "Display" },
  { id: "sans", label: "Sans" },
  { id: "serif", label: "Serif" },
  { id: "script", label: "Script" },
  { id: "mono", label: "Mono" },
  { id: "indic", label: "Indic" },
];

type PresetOpts = { text: string; fontFamily: string; fontSize: number; fontWeight?: number; charSpacing?: number };

const PRESETS: { label: string; sample: string; opts: PresetOpts }[] = [
  { label: "Display heading", sample: "Big bold headline", opts: { text: "HEADLINE", fontFamily: "Anton", fontSize: 280, charSpacing: 30 } },
  { label: "Editorial heading", sample: "Beautifully sharp", opts: { text: "Your headline", fontFamily: "Playfair Display", fontSize: 200, fontWeight: 700 } },
  { label: "Subhead", sample: "Cleanly written subhead", opts: { text: "Subhead", fontFamily: "Inter", fontSize: 100, fontWeight: 700 } },
  { label: "Body text", sample: "Clear, readable body text.", opts: { text: "Add body text...", fontFamily: "Inter", fontSize: 60 } },
  { label: "Script accent", sample: "with a flourish", opts: { text: "with style", fontFamily: "Dancing Script", fontSize: 150, fontWeight: 700 } },
];

export function PanelText({
  onAddText,
}: {
  onAddText: (text: string, opts: Record<string, unknown>) => void;
}) {
  const [category, setCategory] = useState<FontCategory>("all");
  const [search, setSearch] = useState("");

  // Pre-load the visible fonts so previews actually render in their typeface
  useEffect(() => {
    const visible = filterFonts(FONTS, category, search);
    visible.slice(0, 24).forEach((f) => loadFont(f.family));
  }, [category, search]);

  const filtered = filterFonts(FONTS, category, search);

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Text" subtitle={`${FONTS.length} fonts available`} />

      {/* Big primary CTA — Canva-style "Add text box" */}
      <div className="border-b border-ink-900/8 p-3">
        <button
          onClick={() => onAddText("Add your text", { fontFamily: "Inter", fontSize: 140, fontWeight: 700 })}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-flame-500 px-4 py-3 text-sm font-semibold text-paper transition-colors hover:bg-flame-600"
        >
          <Plus className="h-4 w-4" />
          Add a text box
        </button>
      </div>

      {/* Quick presets */}
      <div className="border-b border-ink-900/8 p-3">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">Default text styles</div>
        <div className="mt-2 space-y-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => onAddText(p.opts.text, p.opts)}
              className="block w-full rounded-xl border border-ink-900/8 bg-paper px-3 py-2.5 text-left transition-all hover:border-ink-900/40 hover:shadow-sm"
            >
              <div
                className="truncate text-ink-900"
                style={{
                  fontFamily: p.opts.fontFamily,
                  fontWeight: p.opts.fontWeight ?? 400,
                  fontSize: p.label.includes("Display") ? "22px" : p.label.includes("Editorial") ? "20px" : p.label.includes("Subhead") ? "17px" : "15px",
                  lineHeight: 1.1,
                }}
              >
                {p.sample}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Font picker */}
      <div className="border-b border-ink-900/8 p-3">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">All fonts</div>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fonts..."
            className="block w-full rounded-lg border border-ink-900/10 bg-paper px-3 py-2 pl-8 text-xs text-ink-900 placeholder:text-ink-400 focus:border-flame-500 focus:outline-none"
          />
        </div>
        {/* Category tabs */}
        <div className="mt-2 flex gap-1 overflow-x-auto">
          {CAT_LABELS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors",
                category === c.id ? "bg-ink-900 text-paper" : "text-ink-600 hover:bg-ink-900/5",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font list — cards with actual font preview */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.map((f) => (
          <button
            key={f.family}
            onClick={() => onAddText("Your text here", { fontFamily: f.family, fontSize: 140 })}
            className="block w-full rounded-xl border border-ink-900/8 bg-paper px-3 py-2.5 text-left transition-all hover:border-flame-500 hover:bg-flame-500/5"
          >
            <div className="text-base text-ink-900 truncate" style={{ fontFamily: f.family, fontWeight: f.category === "display" ? 400 : 600 }}>
              {f.family}
            </div>
            <div className="mt-0.5 text-[10px] capitalize text-ink-400">
              {f.category} · {f.weights.length} weight{f.weights.length === 1 ? "" : "s"}
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-ink-500">
            No fonts match "{search}"
          </div>
        )}
      </div>
    </div>
  );
}

function filterFonts(fonts: FontDef[], category: FontCategory, search: string): FontDef[] {
  let result = fonts;
  if (category !== "all") {
    result = result.filter((f) => f.category === category);
  }
  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter((f) => f.family.toLowerCase().includes(q));
  }
  return result;
}
