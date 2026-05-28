"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, Plus } from "lucide-react";
import { TEMPLATES, TEMPLATE_CATEGORIES, type Template, type TemplateCategory } from "@/lib/editor/templates";
import type { EditorSize } from "@/lib/editor/dimensions";
import { cn } from "@/lib/utils";
import { TemplateThumbCanvas } from "./template-thumb-canvas";
import { getCustomTemplates, addCustomTemplate, removeCustomTemplate, type CustomTemplate } from "@/lib/editor/custom-templates";

export function PanelTemplates({
  currentSize,
  onSelect,
  onSelectCustom,
}: {
  currentSize: EditorSize;
  onSelect: (tpl: Template) => void;
  onSelectCustom?: (tpl: CustomTemplate) => void;
}) {
  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const [filterBySize, setFilterBySize] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCustomTemplates(getCustomTemplates());
  }, []);

  const handleUpload = async (file: File) => {
    try {
      await addCustomTemplate(file);
      setCustomTemplates(getCustomTemplates());
      setShowCustom(true);
    } catch (e) {
      alert("Could not upload template. Try a smaller image.");
    }
  };

  let filtered = TEMPLATES;
  if (category !== "all") {
    filtered = filtered.filter((t) => t.category === category);
  }
  if (filterBySize) {
    filtered = filtered.filter((t) => t.size === currentSize);
  }

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Templates" subtitle={`${TEMPLATES.length} designs · or upload your own`} />

      {/* Upload / My templates toggle */}
      <div className="border-b border-ink-900/8 p-3 space-y-2">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-flame-500 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-flame-600"
        >
          <Upload className="h-4 w-4" />
          Upload your own template
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleUpload(f);
            e.currentTarget.value = "";
          }}
        />
        {customTemplates.length > 0 && (
          <div className="flex gap-1">
            <button
              onClick={() => setShowCustom(false)}
              className={cn(
                "flex-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors",
                !showCustom ? "bg-ink-900 text-paper" : "text-ink-600 hover:bg-ink-900/5",
              )}
            >
              Library ({TEMPLATES.length})
            </button>
            <button
              onClick={() => setShowCustom(true)}
              className={cn(
                "flex-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors",
                showCustom ? "bg-ink-900 text-paper" : "text-ink-600 hover:bg-ink-900/5",
              )}
            >
              Mine ({customTemplates.length})
            </button>
          </div>
        )}
      </div>

      {!showCustom && (
        <>
          {/* Category tabs */}
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
                <TemplateThumbCanvas tpl={tpl} width={200} />
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
        </>
      )}

      {showCustom && (
        <div className="grid flex-1 grid-cols-2 gap-2 overflow-y-auto p-3">
          {customTemplates.length === 0 && (
            <div className="col-span-2 grid place-items-center py-12 text-center">
              <Upload className="h-10 w-10 text-ink-300" strokeWidth={1.25} />
              <p className="mt-3 text-sm text-ink-700">No templates yet</p>
              <p className="mt-1 max-w-xs text-xs text-ink-500">
                Upload PNG, JPG, or PDF of your design. We'll load it as your starting point.
              </p>
            </div>
          )}
          {customTemplates.map((tpl) => (
            <div key={tpl.id} className="group relative overflow-hidden rounded-xl border border-ink-900/8 bg-paper transition-all hover:border-ink-900/40 hover:shadow-md">
              <button
                onClick={() => onSelectCustom?.(tpl)}
                className="block w-full"
              >
                <div className="relative" style={{ aspectRatio: tpl.size === "A4" ? "210/297" : "148/210", backgroundColor: "#FFFCF5" }}>
                  <img
                    src={tpl.imageDataUrl}
                    alt={tpl.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="px-2 py-2 text-left">
                  <div className="truncate text-xs font-semibold text-ink-900">{tpl.name}</div>
                  <div className="text-[10px] text-ink-400">
                    {new Date(tpl.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCustomTemplate(tpl.id);
                  setCustomTemplates(getCustomTemplates());
                }}
                className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-ink-900/80 text-paper opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Delete template"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function TemplateThumb({ tpl }: { tpl: Template }) {
  return <TemplateThumbCanvas tpl={tpl} width={200} />;
}

export function PanelHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-ink-900/8 px-4 py-4">
      <h3 className="font-display text-sm font-semibold text-ink-900">{title}</h3>
      {subtitle && <p className="mt-0.5 text-[11px] leading-snug text-ink-500">{subtitle}</p>}
    </div>
  );
}
