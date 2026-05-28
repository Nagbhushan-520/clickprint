"use client";

import { Square, Circle as CircleIcon, Minus } from "lucide-react";
import { PanelHeader } from "./panel-templates";

export function PanelShapes({
  onAddRect,
  onAddCircle,
  onAddLine,
}: {
  onAddRect: () => void;
  onAddCircle: () => void;
  onAddLine: () => void;
}) {
  const shapes: { id: string; label: string; onClick: () => void; icon: React.ReactNode }[] = [
    { id: "rect", label: "Rectangle", onClick: onAddRect, icon: <div className="h-10 w-10 rounded-lg bg-flame-500" /> },
    { id: "round", label: "Rounded", onClick: onAddRect, icon: <div className="h-10 w-10 rounded-2xl bg-ink-900" /> },
    { id: "circle", label: "Circle", onClick: onAddCircle, icon: <div className="h-10 w-10 rounded-full bg-saffron-500" /> },
    { id: "line", label: "Line", onClick: onAddLine, icon: <div className="h-1 w-10 rounded-full bg-ink-900" /> },
  ];

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Shapes" subtitle="Click to add to canvas" />
      <div className="grid grid-cols-2 gap-3 overflow-y-auto p-3">
        {shapes.map((s) => (
          <button
            key={s.id}
            onClick={s.onClick}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-ink-900/8 bg-paper transition-all hover:border-ink-900/30 hover:shadow-sm"
          >
            <div className="grid place-items-center">{s.icon}</div>
            <span className="text-xs font-medium text-ink-700">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
