"use client";

import { FabricObject } from "fabric";
import { Type, Square, Circle as CircleIcon, Image as ImageIcon, ArrowUp, ArrowDown, Trash2, Copy, Minus } from "lucide-react";
import { PanelHeader } from "./panel-templates";
import { cn } from "@/lib/utils";

export function PanelLayers({
  objects,
  selected,
  onSelect,
  onDelete,
  onDuplicate,
  onBringForward,
  onSendBackward,
}: {
  objects: FabricObject[];
  selected: FabricObject | null;
  onSelect: (obj: FabricObject) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Layers" subtitle={`${objects.length} object${objects.length === 1 ? "" : "s"} on canvas`} />

      <div className="flex items-center gap-1 border-b border-ink-900/8 px-3 py-2">
        <LayerBtn onClick={onBringForward} icon={ArrowUp} label="Forward" disabled={!selected} />
        <LayerBtn onClick={onSendBackward} icon={ArrowDown} label="Backward" disabled={!selected} />
        <LayerBtn onClick={onDuplicate} icon={Copy} label="Duplicate" disabled={!selected} />
        <LayerBtn onClick={onDelete} icon={Trash2} label="Delete" disabled={!selected} danger />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {objects.length === 0 && (
          <div className="py-12 text-center text-xs text-ink-500">
            No layers yet. Add text, shapes, or images.
          </div>
        )}
        {[...objects].reverse().map((obj, i) => (
          <LayerRow
            key={(obj as any).__cpId ?? i}
            obj={obj}
            isActive={selected === obj}
            onClick={() => onSelect(obj)}
            index={objects.length - i}
          />
        ))}
      </div>
    </div>
  );
}

function LayerBtn({
  icon: Icon,
  label,
  onClick,
  disabled,
  danger,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={cn(
        "rounded-lg p-2 transition-colors",
        disabled
          ? "opacity-30 cursor-not-allowed"
          : danger
            ? "text-red-600 hover:bg-red-50"
            : "text-ink-700 hover:bg-ink-900/5",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

function LayerRow({
  obj,
  isActive,
  onClick,
  index,
}: {
  obj: FabricObject;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const type = (obj as any).type as string;
  const Icon =
    type === "i-text" || type === "textbox" ? Type :
    type === "circle" ? CircleIcon :
    type === "image" ? ImageIcon :
    type === "line" ? Minus :
    Square;

  const label =
    type === "textbox" || type === "i-text"
      ? ((obj as any).text as string)?.slice(0, 24).trim() || "Text"
      : type === "image"
        ? "Image"
        : type === "circle"
          ? "Circle"
          : type === "line"
            ? "Line"
            : "Rectangle";

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors",
        isActive ? "bg-flame-500/10 text-flame-700" : "hover:bg-ink-900/5",
      )}
    >
      <Icon className="h-4 w-4 shrink-0 text-ink-500 group-hover:text-ink-900" strokeWidth={1.75} />
      <span className="min-w-0 flex-1 truncate text-xs font-medium text-ink-800">
        {label}
      </span>
      <span className="text-[10px] text-ink-400">{index}</span>
    </button>
  );
}
