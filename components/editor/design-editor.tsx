"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { FabricObject } from "fabric";
import { CanvasBoard, type CanvasHandle } from "./canvas-board";
import { TopToolbar } from "./top-toolbar";
import { LeftToolbar, type Panel } from "./left-toolbar";
import { PanelTemplates } from "./panel-templates";
import { PanelText } from "./panel-text";
import { PanelShapes } from "./panel-shapes";
import { PanelBackground } from "./panel-background";
import { PanelLayers } from "./panel-layers";
import { PanelAi } from "./panel-ai";
import { PropertiesPanel } from "./properties-panel";
import { ZoomIn, ZoomOut, Maximize, ChevronLeft } from "lucide-react";
import type { EditorSize } from "@/lib/editor/dimensions";
import type { Template } from "@/lib/editor/templates";
import { TEMPLATES } from "@/lib/editor/templates";
import { cn } from "@/lib/utils";

type Props = {
  orderId?: string;
  initialSize?: EditorSize;
  aiMode?: boolean;
};

export function DesignEditor({ orderId, initialSize = "A5", aiMode = false }: Props) {
  const router = useRouter();
  const canvasRef = useRef<CanvasHandle>(null);
  const [size, setSize] = useState<EditorSize>(initialSize);
  const [panel, setPanel] = useState<Panel>(aiMode ? "ai" : "templates");
  const [selected, setSelected] = useState<FabricObject | null>(null);
  const [objects, setObjects] = useState<FabricObject[]>([]);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState({ canUndo: false, canRedo: false });
  const [isExporting, setIsExporting] = useState(false);
  const [initialTemplate] = useState<Template | null>(() => {
    // Pick a default starter template for the chosen size if any
    return TEMPLATES.find((t) => t.size === initialSize) ?? null;
  });

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      const tag = (e.target as HTMLElement)?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA";

      if (meta && e.key === "z" && !e.shiftKey && !inField) {
        e.preventDefault();
        canvasRef.current?.undo();
      }
      if ((meta && e.key === "z" && e.shiftKey) || (meta && e.key === "y")) {
        if (!inField) {
          e.preventDefault();
          canvasRef.current?.redo();
        }
      }
      if (meta && e.key === "d" && !inField) {
        e.preventDefault();
        canvasRef.current?.duplicateSelected();
      }
      if ((e.key === "Delete" || e.key === "Backspace") && !inField) {
        if (selected) {
          canvasRef.current?.deleteSelected();
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const onExport = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      // Export PNG and JSON
      const png = canvasRef.current.exportPNG();
      const json = canvasRef.current.exportJSON();

      if (orderId) {
        // POST to server to save against order
        const res = await fetch(`/api/orders/${orderId}/design`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ png, json, size }),
        });
        if (res.ok) {
          router.push(`/checkout?orderId=${orderId}`);
          return;
        } else {
          alert("Could not save design. Try again.");
          setIsExporting(false);
          return;
        }
      }

      // No order yet — download the PNG
      const link = document.createElement("a");
      link.download = `flyer-${Date.now()}.png`;
      link.href = png;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-paper">
      <TopToolbar
        size={size}
        onSizeChange={(s) => {
          setSize(s);
          canvasRef.current?.resize(s);
        }}
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={() => canvasRef.current?.undo()}
        onRedo={() => canvasRef.current?.redo()}
        onExport={onExport}
        isExporting={isExporting}
        hasOrder={!!orderId}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftToolbar
          active={panel}
          onChange={setPanel}
          onImageUpload={(f) => canvasRef.current?.addImage(f)}
        />

        {/* Side panel content */}
        {panel && (
          <aside className="hidden w-72 shrink-0 border-r border-ink-900/8 bg-paper md:flex md:flex-col">
            {panel === "templates" && (
              <PanelTemplates
                currentSize={size}
                onSelect={(tpl) => {
                  setSize(tpl.size);
                  canvasRef.current?.resize(tpl.size);
                  canvasRef.current?.loadTemplate(tpl);
                }}
              />
            )}
            {panel === "text" && (
              <PanelText
                onAddText={(text, opts) => canvasRef.current?.addText(text, opts)}
              />
            )}
            {panel === "shapes" && (
              <PanelShapes
                onAddRect={() => canvasRef.current?.addRect()}
                onAddCircle={() => canvasRef.current?.addCircle()}
                onAddLine={() => canvasRef.current?.addLine()}
              />
            )}
            {panel === "background" && (
              <PanelBackground onChange={(c) => canvasRef.current?.setBackground(c)} />
            )}
            {panel === "layers" && (
              <PanelLayers
                objects={objects}
                selected={selected}
                onSelect={(o) => {
                  const fc = canvasRef.current?.getFabric();
                  fc?.setActiveObject(o);
                  fc?.requestRenderAll();
                  setSelected(o);
                }}
                onDelete={() => canvasRef.current?.deleteSelected()}
                onDuplicate={() => canvasRef.current?.duplicateSelected()}
                onBringForward={() => canvasRef.current?.bringForward()}
                onSendBackward={() => canvasRef.current?.sendBackward()}
              />
            )}
            {panel === "ai" && (
              <PanelAi
                freeRemaining={3}
                onGenerate={async () => {
                  // Phase 2.5 will wire this to /api/generate-image
                  await new Promise((r) => setTimeout(r, 1500));
                  alert("AI generation lands in Phase 2.5. The UX is ready — just needs the Gemini API call wired up.");
                }}
              />
            )}
          </aside>
        )}

        {/* Canvas */}
        <div className="relative flex-1 overflow-hidden">
          <CanvasBoard
            ref={canvasRef}
            size={size}
            initialTemplate={initialTemplate}
            onSelectionChange={setSelected}
            onObjectsChange={setObjects}
            onZoomChange={setZoom}
            onHistoryChange={(canUndo, canRedo) => setHistory({ canUndo, canRedo })}
          />

          {/* Floating bottom bar */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-ink-900/10 bg-paper/90 px-2 py-1 shadow-[0_10px_30px_-10px_rgba(10,10,6,0.3)] backdrop-blur-md">
              <button
                onClick={() => canvasRef.current?.zoomOut()}
                className="rounded-full p-2 text-ink-700 transition-colors hover:bg-ink-900/5"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="px-2 text-xs font-mono font-medium text-ink-700">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => canvasRef.current?.zoomIn()}
                className="rounded-full p-2 text-ink-700 transition-colors hover:bg-ink-900/5"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={() => canvasRef.current?.fitToView()}
                className="rounded-full p-2 text-ink-700 transition-colors hover:bg-ink-900/5"
                aria-label="Fit to view"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <PropertiesPanel
          selected={selected}
          onChange={() => {
            // Re-trigger object list update
            const fc = canvasRef.current?.getFabric();
            if (fc) setObjects([...fc.getObjects()]);
          }}
        />
      </div>
    </div>
  );
}
