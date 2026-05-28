"use client";

import { useState } from "react";
import { TEMPLATES, TEMPLATE_CATEGORIES, type Template, type TemplateCategory } from "@/lib/editor/templates";
import type { EditorSize } from "@/lib/editor/dimensions";
import { cn } from "@/lib/utils";

export function PanelTemplates({
  currentSize,
  onSelect,
}: {
  currentSize: EditorSize;
  onSelect: (tpl: Template) => void;
}) {
  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const [filterBySize, setFilterBySize] = useState(false);

  let filtered = TEMPLATES;
  if (category !== "all") {
    filtered = filtered.filter((t) => t.category === category);
  }
  if (filterBySize) {
    filtered = filtered.filter((t) => t.size === currentSize);
  }

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Templates" subtitle={`${TEMPLATES.length} designs · click to load`} />

      {/* Category tabs (scrollable) */}
      <div className="border-b border-ink-900/8 px-2 py-2 overflow-x-auto">
        <div className="flex gap-1">
          {TEMPLATE_CATEGORIES.map((c) => (
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

      {/* Size filter toggle */}
      <div className="flex items-center justify-between border-b border-ink-900/8 px-3 py-2 text-xs">
        <span className="text-ink-500">{filtered.length} templates</span>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={filterBySize}
            onChange={(e) => setFilterBySize(e.target.checked)}
            className="accent-flame-500"
          />
          <span className="text-ink-700">Only {currentSize}</span>
        </label>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2 overflow-y-auto p-3">
        {filtered.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl)}
            className="group overflow-hidden rounded-xl border border-ink-900/8 bg-paper transition-all hover:border-ink-900/40 hover:shadow-md hover:-translate-y-0.5"
          >
            <TemplateThumb tpl={tpl} />
            <div className="px-2 py-2 text-left">
              <div className="truncate text-xs font-semibold text-ink-900">{tpl.name}</div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] capitalize text-ink-500">{tpl.category.replace("-", " ")}</div>
                <div className="text-[10px] font-mono text-ink-400">{tpl.size}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TemplateThumb({ tpl }: { tpl: Template }) {
  const aspect = tpl.size === "A4" ? "4 / 5" : "1 / 1.41";
  const W = tpl.size === "A4" ? 2480 : 1748;
  const H = tpl.size === "A4" ? 3508 : 2480;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: aspect,
        backgroundColor: tpl.background,
      }}
    >
      {tpl.objects.slice(0, 8).map((o, i) => {
        if (o.type === "text") {
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${(o.left / W) * 100}%`,
                top: `${(o.top / H) * 100}%`,
                color: o.fill,
                fontFamily: o.fontFamily,
                fontSize: `${Math.max(Math.min(o.fontSize / 12, 22), 4)}px`,
                fontWeight: typeof o.fontWeight === "number" ? o.fontWeight : (o.fontWeight === "bold" ? 700 : 400),
                fontStyle: o.fontStyle || "normal",
                lineHeight: o.lineHeight ?? 1.0,
                maxWidth: "90%",
                whiteSpace: "pre-line",
                letterSpacing: o.charSpacing ? `${o.charSpacing / 200}px` : undefined,
                textAlign: o.textAlign,
              }}
            >
              {o.text}
            </div>
          );
        }
        if (o.type === "rect") {
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${(o.left / W) * 100}%`,
                top: `${(o.top / H) * 100}%`,
                width: `${(o.width / W) * 100}%`,
                height: `${(o.height / H) * 100}%`,
                background: o.fill,
                borderRadius: o.rx ? `${(o.rx / W) * 100}%` : 0,
              }}
            />
          );
        }
        if (o.type === "circle") {
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(o.left / W) * 100}%`,
                top: `${(o.top / H) * 100}%`,
                width: `${((o.radius * 2) / W) * 100}%`,
                height: `${((o.radius * 2) / H) * 100}%`,
                background: o.fill,
              }}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export function PanelHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-ink-900/8 px-4 py-4">
      <h3 className="font-display text-sm font-semibold text-ink-900">{title}</h3>
      {subtitle && <p className="mt-0.5 text-[11px] leading-snug text-ink-500">{subtitle}</p>}
    </div>
  );
}
