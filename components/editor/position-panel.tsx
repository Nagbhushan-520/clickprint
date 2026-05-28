"use client";

import { FabricObject } from "fabric";
import { useEffect, useState } from "react";
import { PX_TO_MM, MM_TO_PX } from "@/lib/editor/dimensions";

export function PositionPanel({
  selected,
  onSetPosition,
}: {
  selected: FabricObject | null;
  onSetPosition: (props: { left?: number; top?: number; width?: number; height?: number; angle?: number }) => void;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!selected) return;
    // Force re-read after object moves
    const handler = () => setTick((t) => t + 1);
    (selected as any).on?.("moving", handler);
    (selected as any).on?.("scaling", handler);
    (selected as any).on?.("rotating", handler);
    return () => {
      (selected as any).off?.("moving", handler);
      (selected as any).off?.("scaling", handler);
      (selected as any).off?.("rotating", handler);
    };
  }, [selected]);

  if (!selected) return null;

  const o = selected as any;
  const leftPx = o.left ?? 0;
  const topPx = o.top ?? 0;
  const widthPx = (o.width ?? 0) * (o.scaleX ?? 1);
  const heightPx = (o.height ?? 0) * (o.scaleY ?? 1);
  const angle = o.angle ?? 0;

  const toMm = (px: number) => (px * PX_TO_MM).toFixed(1);

  return (
    <div className="space-y-2">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">
        Position & size <span className="ml-1 text-ink-400 normal-case font-normal">mm</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <PxMmInput label="X" pxValue={leftPx} onChange={(px) => onSetPosition({ left: px })} />
        <PxMmInput label="Y" pxValue={topPx} onChange={(px) => onSetPosition({ top: px })} />
        <PxMmInput label="W" pxValue={widthPx} onChange={(px) => onSetPosition({ width: px })} />
        <PxMmInput label="H" pxValue={heightPx} onChange={(px) => onSetPosition({ height: px })} />
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-widest text-ink-500">Rotation</label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="number"
            value={Math.round(angle)}
            onChange={(e) => onSetPosition({ angle: Number(e.target.value) })}
            className="w-full rounded-md border border-ink-900/10 bg-paper px-2 py-1.5 text-xs"
          />
          <span className="text-[10px] text-ink-500">°</span>
        </div>
      </div>
    </div>
  );
}

function PxMmInput({ label, pxValue, onChange }: { label: string; pxValue: number; onChange: (px: number) => void }) {
  const [val, setVal] = useState((pxValue * PX_TO_MM).toFixed(1));

  useEffect(() => {
    setVal((pxValue * PX_TO_MM).toFixed(1));
  }, [pxValue]);

  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-ink-500">{label}</label>
      <input
        type="number"
        step={0.5}
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          const mm = Number(e.target.value);
          if (!Number.isNaN(mm)) {
            onChange(mm * MM_TO_PX);
          }
        }}
        className="mt-1 block w-full rounded-md border border-ink-900/10 bg-paper px-2 py-1.5 text-xs"
      />
    </div>
  );
}
