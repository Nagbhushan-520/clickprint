"use client";

import { TEMPLATES, type Template } from "@/lib/editor/templates";
import type { EditorSize } from "@/lib/editor/dimensions";

export function PanelTemplates({
  currentSize,
  onSelect,
}: {
  currentSize: EditorSize;
  onSelect: (tpl: Template) => void;
}) {
  // Show templates matching current size first, then the rest
  const matching = TEMPLATES.filter((t) => t.size === currentSize);
  const others = TEMPLATES.filter((t) => t.size !== currentSize);
  const ordered = [...matching, ...others];

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Templates" subtitle="Click to load · replaces your current canvas" />
      <div className="grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-3">
        {ordered.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl)}
            className="group overflow-hidden rounded-xl border border-ink-900/8 bg-paper transition-all hover:border-ink-900/30 hover:shadow-md"
          >
            <TemplateThumb tpl={tpl} />
            <div className="px-2 py-2 text-left">
              <div className="truncate text-xs font-semibold text-ink-900">{tpl.name}</div>
              <div className="text-[10px] text-ink-500">{tpl.size}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TemplateThumb({ tpl }: { tpl: Template }) {
  // Simple miniature based on the first 4 text/shape objects
  const aspect = tpl.size === "A4" ? "4 / 5" : "1 / 1.41";
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: aspect,
        backgroundColor: tpl.background,
      }}
    >
      {tpl.objects.slice(0, 5).map((o, i) => {
        if (o.type === "text") {
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${(o.left / (tpl.size === "A4" ? 2480 : 1748)) * 100}%`,
                top: `${(o.top / (tpl.size === "A4" ? 3508 : 2480)) * 100}%`,
                color: o.fill,
                fontFamily: o.fontFamily,
                fontSize: `${Math.min(o.fontSize / 8, 14)}px`,
                fontWeight: typeof o.fontWeight === "number" ? o.fontWeight : 700,
                lineHeight: o.lineHeight ?? 1.0,
                maxWidth: "90%",
                whiteSpace: "pre-line",
                letterSpacing: o.charSpacing ? `${o.charSpacing / 100}px` : undefined,
              }}
            >
              {o.text}
            </div>
          );
        }
        if (o.type === "rect") {
          const w = tpl.size === "A4" ? 2480 : 1748;
          const h = tpl.size === "A4" ? 3508 : 2480;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${(o.left / w) * 100}%`,
                top: `${(o.top / h) * 100}%`,
                width: `${(o.width / w) * 100}%`,
                height: `${(o.height / h) * 100}%`,
                background: o.fill,
                borderRadius: o.rx ? `${(o.rx / w) * 100}%` : 0,
              }}
            />
          );
        }
        if (o.type === "circle") {
          const w = tpl.size === "A4" ? 2480 : 1748;
          const h = tpl.size === "A4" ? 3508 : 2480;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(o.left / w) * 100}%`,
                top: `${(o.top / h) * 100}%`,
                width: `${((o.radius * 2) / w) * 100}%`,
                height: `${((o.radius * 2) / h) * 100}%`,
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
