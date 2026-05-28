"use client";

import { useState } from "react";
import { FabricObject } from "fabric";
import { Type, Square, Circle as CircleIcon, Image as ImageIcon, ArrowUp, ArrowDown, Trash2, Copy, Minus, Eye, EyeOff, Lock, Unlock, GripVertical, Triangle, Star } from "lucide-react";
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
  onReorder,
  onToggleVisibility,
  onToggleLock,
}: {
  objects: FabricObject[];
  selected: FabricObject | null;
  onSelect: (obj: FabricObject) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onToggleVisibility: (obj: FabricObject) => void;
  onToggleLock: (obj: FabricObject) => void;
}) {
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const handleDrop = (toIndex: number) => {
    if (dragFrom === null || dragFrom === toIndex) return;
    onReorder(dragFrom, toIndex);
    setDragFrom(null);
    setDragOver(null);
  };

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Layers" subtitle={`${objects.length} object${objects.length === 1 ? "" : "s"} · drag to reorder`} />

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
        {[...objects].reverse().map((obj, displayIndex) => {
          const realIndex = objects.length - 1 - displayIndex;
          return (
            <LayerRow
              key={(obj as any).__cpId ?? `${(obj as any).type}-${realIndex}`}
              obj={obj}
              isActive={selected === obj}
              isDragOver={dragOver === realIndex}
              onClick={() => onSelect(obj)}
              onDragStart={() => setDragFrom(realIndex)}
              onDragEnter={() => setDragOver(realIndex)}
              onDragEnd={() => { setDragFrom(null); setDragOver(null); }}
              onDrop={() => handleDrop(realIndex)}
              onToggleVisibility={(e) => { e.stopPropagation(); onToggleVisibility(obj); }}
              onToggleLock={(e) => { e.stopPropagation(); onToggleLock(obj); }}
              index={realIndex + 1}
            />
          );
        })}
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
  isDragOver,
  onClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDrop,
  onToggleVisibility,
  onToggleLock,
  index,
}: {
  obj: FabricObject;
  isActive: boolean;
  isDragOver: boolean;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
  onDrop: () => void;
  onToggleVisibility: (e: React.MouseEvent) => void;
  onToggleLock: (e: React.MouseEvent) => void;
  index: number;
}) {
  const type = (obj as any).type as string;
  const Icon =
    type === "i-text" || type === "textbox" ? Type :
    type === "circle" ? CircleIcon :
    type === "image" ? ImageIcon :
    type === "line" ? Minus :
    type === "triangle" ? Triangle :
    type === "polygon" ? Star :
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
            : type === "triangle"
              ? "Triangle"
              : type === "polygon"
                ? "Polygon"
                : type === "path"
                  ? "Path"
                  : "Rectangle";

  const isHidden = obj.visible === false;
  const isLocked = (obj as any).lockMovementX === true;

  return (
    <div
      draggable
      onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; onDragStart(); }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDrop={(e) => { e.preventDefault(); onDrop(); }}
      onClick={onClick}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 py-2 text-left transition-all",
        isActive ? "bg-flame-500/10 text-flame-700" : "hover:bg-ink-900/5",
        isDragOver && "border border-flame-500/40 bg-flame-500/5",
        isHidden && "opacity-40",
      )}
    >
      <GripVertical className="h-3.5 w-3.5 shrink-0 text-ink-300 group-hover:text-ink-500 cursor-grab" />
      <Icon className="h-4 w-4 shrink-0 text-ink-500" strokeWidth={1.75} />
      <span className="min-w-0 flex-1 truncate text-xs font-medium text-ink-800">
        {label}
      </span>
      <button
        onClick={onToggleVisibility}
        className={cn(
          "rounded p-1 opacity-0 transition-opacity group-hover:opacity-100",
          isHidden && "opacity-100 text-ink-400",
          !isHidden && "text-ink-500 hover:text-ink-900",
        )}
        title={isHidden ? "Show" : "Hide"}
      >
        {isHidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
      </button>
      <button
        onClick={onToggleLock}
        className={cn(
          "rounded p-1 opacity-0 transition-opacity group-hover:opacity-100",
          isLocked && "opacity-100 text-flame-500",
          !isLocked && "text-ink-500 hover:text-ink-900",
        )}
        title={isLocked ? "Unlock" : "Lock"}
      >
        {isLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
      </button>
    </div>
  );
}
