"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { FabricObject } from "fabric";
import { CanvasBoard, type CanvasHandle, type AlignKind, type ImageFilterKind, type ShapeKind } from "./canvas-board";
import { TopToolbar } from "./top-toolbar";
import { LeftToolbar, type Panel } from "./left-toolbar";
import { PanelTemplates } from "./panel-templates";
import { PanelText } from "./panel-text";
import { PanelShapes } from "./panel-shapes";
import { PanelBackground } from "./panel-background";
import { PanelLayers } from "./panel-layers";
import { PanelAi } from "./panel-ai";
import { PropertiesPanel } from "./properties-panel";
import { ZoomIn, ZoomOut, Maximize, Save, CheckCircle2 } from "lucide-react";
import type { EditorSize } from "@/lib/editor/dimensions";
import type { Template } from "@/lib/editor/templates";
import { TEMPLATES } from "@/lib/editor/templates";

type Props = {
  orderId?: string;
  initialSize?: EditorSize;
  aiMode?: boolean;
};

const AUTOSAVE_KEY = "clickprint_editor_autosave";

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
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const [initialTemplate, setInitialTemplate] = useState<Template | null>(null);
  const [initialJSON, setInitialJSON] = useState<object | null>(null);

  // On mount, decide whether to load autosave or template
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.json) {
          setInitialJSON(parsed.json);
          if (parsed.size) setSize(parsed.size);
          return;
        }
      } catch {}
    }
    // No autosave - start with a default template for the size
    setInitialTemplate(TEMPLATES.find((t) => t.size === initialSize) ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      if (((meta && e.key === "z" && e.shiftKey) || (meta && e.key === "y")) && !inField) {
        e.preventDefault();
        canvasRef.current?.redo();
      }
      if (meta && e.key === "d" && !inField) {
        e.preventDefault();
        canvasRef.current?.duplicateSelected();
      }
      if ((e.key === "Delete" || e.key === "Backspace") && !inField && selected) {
        canvasRef.current?.deleteSelected();
        e.preventDefault();
      }
      // Arrow keys nudge
      if (!inField && selected && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        const step = e.shiftKey ? 50 : 5;
        const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
        const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
        canvasRef.current?.nudge(dx, dy);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Auto-save handler
  const onAutoSave = (json: object) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ json, size, ts: Date.now() }));
    setSavedAt(Date.now());
  };

  const onExport = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const png = canvasRef.current.exportPNG();
      const json = canvasRef.current.exportJSON();

      if (orderId) {
        const res = await fetch(`/api/orders/${orderId}/design`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ png, json, size }),
        });
        if (res.ok) {
          // Clear autosave since we've persisted
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(AUTOSAVE_KEY);
          }
          router.push(`/checkout?orderId=${orderId}`);
          return;
        } else {
          alert("Could not save design. Try again.");
          setIsExporting(false);
          return;
        }
      }

      // No order — download PDF
      const pdfBytes = await canvasRef.current.exportPDF();
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `clickprint-${size.toLowerCase()}-${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Export failed. Try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Don't render the canvas until we've decided what to initialize with
  if (initialTemplate === null && initialJSON === null) {
    return (
      <div className="fixed inset-0 z-[100] grid place-items-center bg-cream">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-flame-500/20 border-t-flame-500" />
          <div className="mt-4 font-display text-sm font-semibold text-ink-700">Loading editor...</div>
        </div>
      </div>
    );
  }

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
        hasSelection={!!selected}
        onAlign={(k: AlignKind) => canvasRef.current?.align(k)}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftToolbar
          active={panel}
          onChange={setPanel}
          onImageUpload={(f) => canvasRef.current?.addImage(f)}
        />

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
              <PanelText onAddText={(text, opts) => canvasRef.current?.addText(text, opts)} />
            )}
            {panel === "shapes" && (
              <PanelShapes onAddShape={(kind: ShapeKind) => canvasRef.current?.addShape(kind)} />
            )}
            {panel === "background" && (
              <PanelBackground onChange={(bg) => canvasRef.current?.setBackground(bg)} />
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
                onReorder={(from, to) => canvasRef.current?.reorderLayer(from, to)}
                onToggleVisibility={(o) => canvasRef.current?.toggleVisibility(o)}
                onToggleLock={(o) => canvasRef.current?.toggleLock(o)}
              />
            )}
            {panel === "ai" && (
              <PanelAi
                freeRemaining={3}
                onGenerate={async () => {
                  await new Promise((r) => setTimeout(r, 1500));
                  alert("AI generation lands in Phase 2.5. The UX is ready — just needs the Gemini API call wired up.");
                }}
              />
            )}
          </aside>
        )}

        <div className="relative flex-1 overflow-hidden">
          <CanvasBoard
            ref={canvasRef}
            size={size}
            initialTemplate={initialTemplate}
            initialJSON={initialJSON}
            onSelectionChange={setSelected}
            onObjectsChange={setObjects}
            onZoomChange={setZoom}
            onHistoryChange={(canUndo, canRedo) => setHistory({ canUndo, canRedo })}
            onAutoSave={onAutoSave}
          />

          {/* Auto-save indicator */}
          {savedAt && Date.now() - savedAt < 2200 && (
            <div className="pointer-events-none absolute right-4 top-4 inline-flex animate-fade-up items-center gap-1.5 rounded-full bg-ink-900/85 px-3 py-1.5 text-xs font-medium text-paper backdrop-blur-md">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
              Saved
            </div>
          )}

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
            const fc = canvasRef.current?.getFabric();
            if (fc) setObjects([...fc.getObjects()]);
          }}
          onApplyFilter={(filter: ImageFilterKind) => canvasRef.current?.applyFilter(filter)}
          onSetFilterValue={(key, value) => canvasRef.current?.setFilterValue(key, value)}
        />
      </div>
    </div>
  );
}
