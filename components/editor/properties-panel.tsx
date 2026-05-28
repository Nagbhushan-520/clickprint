"use client";

import { FabricObject } from "fabric";
import { useEffect, useState } from "react";
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, FlipHorizontal, FlipVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageFilterKind } from "./canvas-board";

export function PropertiesPanel({
  selected,
  onChange,
  onApplyFilter,
  onSetFilterValue,
  onToggleTextStyle,
  onSetTextProperty,
  onFlip,
}: {
  selected: FabricObject | null;
  onChange: () => void;
  onApplyFilter?: (filter: ImageFilterKind) => void;
  onSetFilterValue?: (key: "brightness" | "contrast" | "saturation", value: number) => void;
  onToggleTextStyle?: (style: "bold" | "italic" | "underline") => void;
  onSetTextProperty?: (key: "lineHeight" | "charSpacing", value: number) => void;
  onFlip?: (axis: "horizontal" | "vertical") => void;
}) {
  if (!selected) {
    return (
      <aside className="hidden w-64 shrink-0 border-l border-ink-900/8 bg-paper p-4 lg:block">
        <div className="rounded-2xl border border-dashed border-ink-900/10 bg-cream p-6 text-center text-xs text-ink-500">
          Select an object on the canvas to edit its properties.
        </div>
      </aside>
    );
  }

  const type = (selected as any).type;
  const isText = type === "i-text" || type === "textbox";
  const isImage = type === "image";
  const isShape = type === "rect" || type === "circle" || type === "line" || type === "triangle" || type === "polygon" || type === "path";

  return (
    <aside className="hidden w-64 shrink-0 overflow-y-auto border-l border-ink-900/8 bg-paper lg:block">
      <div className="border-b border-ink-900/8 px-4 py-4">
        <h3 className="font-display text-sm font-semibold text-ink-900">
          {isText ? "Text properties" : isImage ? "Image properties" : "Shape properties"}
        </h3>
      </div>
      <div className="space-y-5 p-4">
        {!isImage && <FillRow obj={selected} onChange={onChange} />}
        {isText && (
          <>
            <TextRows obj={selected} onChange={onChange} />
            {onToggleTextStyle && onSetTextProperty && (
              <TextStyleRows
                obj={selected}
                onToggle={onToggleTextStyle}
                onSetProperty={onSetTextProperty}
              />
            )}
          </>
        )}
        {isShape && <StrokeRow obj={selected} onChange={onChange} />}
        {isImage && onApplyFilter && onSetFilterValue && (
          <ImageFilterRows
            onApplyFilter={onApplyFilter}
            onSetFilterValue={onSetFilterValue}
          />
        )}
        {(isImage || isShape) && onFlip && (
          <div>
            <Label>Flip</Label>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onFlip("horizontal")}
                className="flex items-center justify-center gap-1.5 rounded-md border border-ink-900/10 px-3 py-2 text-xs font-medium text-ink-700 transition-colors hover:border-ink-900 hover:bg-ink-900/5"
              >
                <FlipHorizontal className="h-3.5 w-3.5" />
                Horizontal
              </button>
              <button
                onClick={() => onFlip("vertical")}
                className="flex items-center justify-center gap-1.5 rounded-md border border-ink-900/10 px-3 py-2 text-xs font-medium text-ink-700 transition-colors hover:border-ink-900 hover:bg-ink-900/5"
              >
                <FlipVertical className="h-3.5 w-3.5" />
                Vertical
              </button>
            </div>
          </div>
        )}
        <OpacityRow obj={selected} onChange={onChange} />
      </div>
    </aside>
  );
}

function ImageFilterRows({
  onApplyFilter,
  onSetFilterValue,
}: {
  onApplyFilter: (filter: ImageFilterKind) => void;
  onSetFilterValue: (key: "brightness" | "contrast" | "saturation", value: number) => void;
}) {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);

  return (
    <>
      <div>
        <Label>Effects</Label>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {[
            { key: "none" as const, label: "None" },
            { key: "grayscale" as const, label: "B&W" },
            { key: "sepia" as const, label: "Sepia" },
            { key: "vintage" as const, label: "Vintage" },
            { key: "invert" as const, label: "Invert" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => onApplyFilter(f.key)}
              className="rounded-md border border-ink-900/10 px-2 py-1.5 text-xs font-medium text-ink-700 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-paper"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <FilterSlider
        label="Brightness"
        min={-0.5}
        max={0.5}
        step={0.05}
        value={brightness}
        onChange={(v) => {
          setBrightness(v);
          onSetFilterValue("brightness", v);
        }}
      />
      <FilterSlider
        label="Contrast"
        min={-0.5}
        max={0.5}
        step={0.05}
        value={contrast}
        onChange={(v) => {
          setContrast(v);
          onSetFilterValue("contrast", v);
        }}
      />
      <FilterSlider
        label="Saturation"
        min={-1}
        max={1}
        step={0.1}
        value={saturation}
        onChange={(v) => {
          setSaturation(v);
          onSetFilterValue("saturation", v);
        }}
      />
    </>
  );
}

function FilterSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-flame-500"
        />
        <span className="w-12 text-right font-mono text-[10px] text-ink-700">
          {value > 0 ? "+" : ""}{Math.round(value * 100)}
        </span>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] font-semibold uppercase tracking-widest text-ink-500">{children}</label>;
}

function FillRow({ obj, onChange }: { obj: FabricObject; onChange: () => void }) {
  const value = ((obj as any).fill as string) || "#000000";
  return (
    <div>
      <Label>Color</Label>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => {
            obj.set({ fill: e.target.value });
            obj.canvas?.requestRenderAll();
            onChange();
          }}
          className="h-10 w-10 cursor-pointer rounded-lg border border-ink-900/10"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            obj.set({ fill: e.target.value });
            obj.canvas?.requestRenderAll();
            onChange();
          }}
          className="flex-1 rounded-lg border border-ink-900/10 bg-paper px-3 py-2 text-xs font-mono text-ink-900"
        />
      </div>
    </div>
  );
}

function TextRows({ obj, onChange }: { obj: FabricObject; onChange: () => void }) {
  const o = obj as any;
  const [text, setText] = useState<string>(o.text || "");
  const [fontSize, setFontSize] = useState<number>(o.fontSize || 100);

  useEffect(() => {
    setText(o.text || "");
    setFontSize(o.fontSize || 100);
  }, [obj]);

  const align = o.textAlign || "left";

  return (
    <>
      <div>
        <Label>Text</Label>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            o.set({ text: e.target.value });
            obj.canvas?.requestRenderAll();
            onChange();
          }}
          rows={3}
          className="mt-2 block w-full rounded-lg border border-ink-900/10 bg-paper px-3 py-2 text-xs text-ink-900"
        />
      </div>

      <div>
        <Label>Size</Label>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="range"
            min={20}
            max={500}
            value={fontSize}
            onChange={(e) => {
              const v = Number(e.target.value);
              setFontSize(v);
              o.set({ fontSize: v });
              obj.canvas?.requestRenderAll();
              onChange();
            }}
            className="flex-1 accent-flame-500"
          />
          <span className="w-12 text-right font-mono text-xs text-ink-700">{fontSize}</span>
        </div>
      </div>

      <div>
        <Label>Align</Label>
        <div className="mt-2 inline-flex rounded-lg border border-ink-900/10">
          {(["left", "center", "right"] as const).map((a) => (
            <button
              key={a}
              onClick={() => {
                o.set({ textAlign: a });
                obj.canvas?.requestRenderAll();
                onChange();
              }}
              className={cn(
                "px-3 py-2 transition-colors",
                align === a ? "bg-ink-900 text-paper" : "text-ink-700 hover:bg-ink-900/5",
              )}
            >
              {a === "left" && <AlignLeft className="h-4 w-4" />}
              {a === "center" && <AlignCenter className="h-4 w-4" />}
              {a === "right" && <AlignRight className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Weight</Label>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[400, 500, 600, 700, 800].map((w) => (
            <button
              key={w}
              onClick={() => {
                o.set({ fontWeight: w });
                obj.canvas?.requestRenderAll();
                onChange();
              }}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                (o.fontWeight || 400) === w
                  ? "border-ink-900 bg-ink-900 text-paper"
                  : "border-ink-900/15 text-ink-700 hover:border-ink-900/40",
              )}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function StrokeRow({ obj, onChange }: { obj: FabricObject; onChange: () => void }) {
  const o = obj as any;
  return (
    <div>
      <Label>Border</Label>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="color"
          value={o.stroke || "#0A0A06"}
          onChange={(e) => {
            o.set({ stroke: e.target.value, strokeWidth: o.strokeWidth || 4 });
            obj.canvas?.requestRenderAll();
            onChange();
          }}
          className="h-9 w-9 cursor-pointer rounded-lg border border-ink-900/10"
        />
        <input
          type="number"
          min={0}
          max={50}
          value={o.strokeWidth || 0}
          onChange={(e) => {
            o.set({ strokeWidth: Number(e.target.value) });
            obj.canvas?.requestRenderAll();
            onChange();
          }}
          className="w-16 rounded-lg border border-ink-900/10 bg-paper px-2 py-1.5 text-xs"
        />
        <span className="text-xs text-ink-500">px</span>
      </div>
    </div>
  );
}

function TextStyleRows({
  obj,
  onToggle,
  onSetProperty,
}: {
  obj: FabricObject;
  onToggle: (style: "bold" | "italic" | "underline") => void;
  onSetProperty: (key: "lineHeight" | "charSpacing", value: number) => void;
}) {
  const o = obj as any;
  const isBold = o.fontWeight === "bold" || o.fontWeight === 700;
  const isItalic = o.fontStyle === "italic";
  const isUnderline = !!o.underline;
  const [lineHeight, setLineHeight] = useState<number>(o.lineHeight || 1.16);
  const [charSpacing, setCharSpacing] = useState<number>(o.charSpacing || 0);

  useEffect(() => {
    setLineHeight(o.lineHeight || 1.16);
    setCharSpacing(o.charSpacing || 0);
  }, [obj]);

  return (
    <>
      <div>
        <Label>Style</Label>
        <div className="mt-2 inline-flex gap-1.5">
          <button
            onClick={() => onToggle("bold")}
            className={cn(
              "rounded-md border px-3 py-2 transition-colors",
              isBold ? "border-ink-900 bg-ink-900 text-paper" : "border-ink-900/15 text-ink-700 hover:border-ink-900/40",
            )}
            title="Bold"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onToggle("italic")}
            className={cn(
              "rounded-md border px-3 py-2 transition-colors",
              isItalic ? "border-ink-900 bg-ink-900 text-paper" : "border-ink-900/15 text-ink-700 hover:border-ink-900/40",
            )}
            title="Italic"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onToggle("underline")}
            className={cn(
              "rounded-md border px-3 py-2 transition-colors",
              isUnderline ? "border-ink-900 bg-ink-900 text-paper" : "border-ink-900/15 text-ink-700 hover:border-ink-900/40",
            )}
            title="Underline"
          >
            <Underline className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div>
        <Label>Line height</Label>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="range"
            min={0.8}
            max={2.5}
            step={0.05}
            value={lineHeight}
            onChange={(e) => {
              const v = Number(e.target.value);
              setLineHeight(v);
              onSetProperty("lineHeight", v);
            }}
            className="flex-1 accent-flame-500"
          />
          <span className="w-12 text-right font-mono text-[10px] text-ink-700">{lineHeight.toFixed(2)}</span>
        </div>
      </div>

      <div>
        <Label>Letter spacing</Label>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="range"
            min={-100}
            max={500}
            step={10}
            value={charSpacing}
            onChange={(e) => {
              const v = Number(e.target.value);
              setCharSpacing(v);
              onSetProperty("charSpacing", v);
            }}
            className="flex-1 accent-flame-500"
          />
          <span className="w-12 text-right font-mono text-[10px] text-ink-700">{charSpacing}</span>
        </div>
      </div>
    </>
  );
}

function OpacityRow({ obj, onChange }: { obj: FabricObject; onChange: () => void }) {
  const o = obj as any;
  const [val, setVal] = useState<number>(Math.round((o.opacity ?? 1) * 100));

  useEffect(() => {
    setVal(Math.round((o.opacity ?? 1) * 100));
  }, [obj]);

  return (
    <div>
      <Label>Opacity</Label>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={100}
          value={val}
          onChange={(e) => {
            const v = Number(e.target.value);
            setVal(v);
            o.set({ opacity: v / 100 });
            obj.canvas?.requestRenderAll();
            onChange();
          }}
          className="flex-1 accent-flame-500"
        />
        <span className="w-12 text-right font-mono text-xs text-ink-700">{val}%</span>
      </div>
    </div>
  );
}
