"use client";

import { PanelHeader } from "./panel-templates";
import type { ShapeKind } from "./canvas-board";

export function PanelShapes({ onAddShape }: { onAddShape: (kind: ShapeKind) => void }) {
  const shapes: { id: ShapeKind; label: string; preview: React.ReactNode }[] = [
    { id: "rect", label: "Rectangle", preview: <div className="h-10 w-10 bg-flame-500" /> },
    { id: "rounded", label: "Rounded", preview: <div className="h-10 w-10 rounded-2xl bg-ink-900" /> },
    { id: "circle", label: "Circle", preview: <div className="h-10 w-10 rounded-full bg-saffron-500" /> },
    { id: "triangle", label: "Triangle", preview: <TrianglePreview /> },
    { id: "star", label: "Star", preview: <StarPreview /> },
    { id: "arrow", label: "Arrow", preview: <ArrowPreview /> },
    { id: "speech", label: "Speech", preview: <SpeechPreview /> },
    { id: "line", label: "Line", preview: <div className="h-1 w-10 rounded-full bg-ink-900" /> },
  ];

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Shapes" subtitle="Click to add to canvas" />
      <div className="grid grid-cols-2 gap-3 overflow-y-auto p-3">
        {shapes.map((s) => (
          <button
            key={s.id}
            onClick={() => onAddShape(s.id)}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-ink-900/8 bg-paper transition-all hover:border-ink-900/30 hover:shadow-sm hover:-translate-y-0.5"
          >
            <div className="grid place-items-center">{s.preview}</div>
            <span className="text-xs font-medium text-ink-700">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TrianglePreview() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <polygon points="20,4 36,36 4,36" fill="#FF4D2E" />
    </svg>
  );
}

function StarPreview() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <polygon points="20,3 24,14 36,15 27,23 30,35 20,29 10,35 13,23 4,15 16,14" fill="#FFAA00" />
    </svg>
  );
}

function ArrowPreview() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <path d="M 4 18 L 24 18 L 24 12 L 36 20 L 24 28 L 24 22 L 4 22 Z" fill="#0A0A06" />
    </svg>
  );
}

function SpeechPreview() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <path d="M 6 6 L 34 6 Q 38 6 38 10 L 38 26 Q 38 30 34 30 L 20 30 L 14 36 L 14 30 L 6 30 Q 2 30 2 26 L 2 10 Q 2 6 6 6 Z" fill="#FF4D2E" />
    </svg>
  );
}
