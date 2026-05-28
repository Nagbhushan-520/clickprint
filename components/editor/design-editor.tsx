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
import { PanelStickers } from "./panel-stickers";
import { PanelBrandKit } from "./panel-brand-kit";
import { PanelQRCode } from "./panel-qrcode";
import { PanelPhotos } from "./panel-photos";
import { PagesBar, type Page } from "./pages-bar";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { MobileBottomSheet } from "./mobile-bottom-sheet";
import { MobileContextBar, type ContextAction } from "./mobile-context-bar";
import { PropertiesPanel } from "./properties-panel";
import { ZoomIn, ZoomOut, Maximize, Save, CheckCircle2 } from "lucide-react";
import type { EditorSize } from "@/lib/editor/dimensions";
import type { Template } from "@/lib/editor/templates";
import { TEMPLATES } from "@/lib/editor/templates";

type Props = {
  orderId?: string;
  initialSize?: EditorSize;
  aiMode?: boolean;
  templateId?: string;
};

const AUTOSAVE_KEY = "clickprint_editor_autosave";

export function DesignEditor({ orderId, initialSize = "A5", aiMode = false, templateId }: Props) {
  const router = useRouter();
  const canvasRef = useRef<CanvasHandle>(null);
  const [size, setSize] = useState<EditorSize>(initialSize);
  // Default to canvas-first on mobile (no panel). On desktop, open templates.
  const [panel, setPanel] = useState<Panel>(() => {
    if (aiMode) return "ai";
    if (typeof window !== "undefined" && window.innerWidth < 768) return null;
    return "templates";
  });
  const [selected, setSelected] = useState<FabricObject | null>(null);
  const [objects, setObjects] = useState<FabricObject[]>([]);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState({ canUndo: false, canRedo: false });
  const [isExporting, setIsExporting] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [showBleed, setShowBleed] = useState(true);
  const [showSafe, setShowSafe] = useState(true);
  const [dpiWarning, setDpiWarning] = useState<{ dpi: number; filename?: string } | null>(null);

  // Multi-page state
  const [pages, setPages] = useState<Page[]>([{ id: "p1", name: "Front", json: null }]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Page operations
  const persistCurrentPage = () => {
    const fc = canvasRef.current?.getFabric();
    if (!fc) return;
    const json = fc.toJSON();
    setPages((ps) => {
      const next = [...ps];
      if (next[currentPageIndex]) next[currentPageIndex] = { ...next[currentPageIndex], json };
      return next;
    });
  };

  const switchToPage = (index: number) => {
    if (index === currentPageIndex) return;
    persistCurrentPage();
    const target = pages[index];
    if (!target) return;
    setCurrentPageIndex(index);
    setTimeout(() => {
      if (target.json) canvasRef.current?.loadJSON(target.json);
      else {
        // Blank page
        const fc = canvasRef.current?.getFabric();
        if (fc) {
          fc.clear();
          fc.backgroundColor = "#FFFCF5";
          fc.requestRenderAll();
        }
      }
    }, 50);
  };

  const addBlankPage = () => {
    persistCurrentPage();
    const newPage: Page = {
      id: `p${Date.now()}`,
      name: `Page ${pages.length + 1}`,
      json: null,
    };
    setPages((ps) => [...ps, newPage]);
    setCurrentPageIndex(pages.length);
    setTimeout(() => {
      const fc = canvasRef.current?.getFabric();
      if (fc) {
        fc.clear();
        fc.backgroundColor = "#FFFCF5";
        fc.requestRenderAll();
      }
    }, 50);
  };

  const duplicatePage = () => {
    persistCurrentPage();
    const fc = canvasRef.current?.getFabric();
    if (!fc) return;
    const json = fc.toJSON();
    const newPage: Page = {
      id: `p${Date.now()}`,
      name: `${pages[currentPageIndex]?.name ?? "Page"} copy`,
      json,
    };
    setPages((ps) => [...ps, newPage]);
    setCurrentPageIndex(pages.length);
  };

  const deletePage = () => {
    if (pages.length <= 1) return;
    setPages((ps) => ps.filter((_, i) => i !== currentPageIndex));
    const newIndex = Math.max(0, currentPageIndex - 1);
    setCurrentPageIndex(newIndex);
    setTimeout(() => {
      const target = pages[newIndex];
      if (target?.json) canvasRef.current?.loadJSON(target.json);
    }, 50);
  };

  const [initialTemplate, setInitialTemplate] = useState<Template | null>(null);
  const [initialJSON, setInitialJSON] = useState<object | null>(null);

  // On mount, decide what to initialize with
  useEffect(() => {
    if (typeof window === "undefined") return;

    // If templateId is specified, load that template (overrides autosave)
    if (templateId) {
      const tpl = TEMPLATES.find((t) => t.id === templateId);
      if (tpl) {
        setSize(tpl.size);
        setInitialTemplate(tpl);
        return;
      }
    }

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
      // Group / ungroup
      if (meta && e.key === "g" && !inField) {
        e.preventDefault();
        if (e.shiftKey) {
          canvasRef.current?.ungroupSelected();
        } else {
          canvasRef.current?.groupSelected();
        }
      }
      // Copy / paste
      if (meta && e.key === "c" && !inField) {
        canvasRef.current?.copySelected();
      }
      if (meta && e.key === "v" && !inField) {
        e.preventDefault();
        canvasRef.current?.pasteCopied();
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
        showBleed={showBleed}
        showSafe={showSafe}
        onToggleBleed={() => setShowBleed((v) => !v)}
        onToggleSafe={() => setShowSafe((v) => !v)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop left toolbar */}
        <div className="hidden md:block">
          <LeftToolbar
            active={panel}
            onChange={setPanel}
            onImageUpload={(f) => canvasRef.current?.addImage(f)}
          />
        </div>

        {/* Desktop side panel */}
        {panel && (
          <aside className="hidden w-64 shrink-0 overflow-hidden md:flex md:flex-col border-r border-ink-900/8 bg-paper">
            {panel === "templates" && (
              <PanelTemplates
                currentSize={size}
                onSelect={(tpl) => {
                  setSize(tpl.size);
                  canvasRef.current?.resize(tpl.size);
                  canvasRef.current?.loadTemplate(tpl);
                }}
                onSelectCustom={async (tpl) => {
                  // Load image as background
                  const res = await fetch(tpl.imageDataUrl);
                  const blob = await res.blob();
                  const file = new File([blob], tpl.name + ".png", { type: "image/png" });
                  canvasRef.current?.addBackgroundImage(file);
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
              <PanelBackground
                onChange={(bg) => canvasRef.current?.setBackground(bg)}
                onUploadImage={(f) => canvasRef.current?.addBackgroundImage(f)}
              />
            )}
            {panel === "stickers" && (
              <PanelStickers
                onAdd={(svg) => canvasRef.current?.addSticker(svg)}
              />
            )}
            {panel === "photos" && (
              <PanelPhotos
                onAdd={async (url) => {
                  await canvasRef.current?.addImageFromUrl(url);
                }}
              />
            )}
            {panel === "qrcode" && (
              <PanelQRCode
                onAdd={async (data, color, bg) => {
                  await canvasRef.current?.addQRCode(data, color, bg);
                }}
              />
            )}
            {panel === "brand-kit" && (
              <PanelBrandKit
                onPickColor={(color) => {
                  // Apply to selected object's fill, or set as background
                  const fc = canvasRef.current?.getFabric();
                  const active = fc?.getActiveObject();
                  if (active) {
                    (active as any).set({ fill: color });
                    fc?.requestRenderAll();
                  } else {
                    canvasRef.current?.setBackground({ type: "color", color });
                  }
                }}
                onPickFont={(family) => {
                  const fc = canvasRef.current?.getFabric();
                  const active = fc?.getActiveObject() as any;
                  if (active && (active.type === "textbox" || active.type === "i-text")) {
                    active.set({ fontFamily: family });
                    fc?.requestRenderAll();
                  } else {
                    canvasRef.current?.addText("Your text", { fontFamily: family, fontSize: 140 });
                  }
                }}
                onPickLogo={(dataUrl) => canvasRef.current?.addImageFromUrl(dataUrl)}
              />
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

        {/* Mobile bottom sheet — same panel content but as a slide-up sheet */}
        <MobileBottomSheet open={!!panel && !selected} onClose={() => setPanel(null)}>
          {panel === "templates" && (
            <PanelTemplates
              currentSize={size}
              onSelect={(tpl) => {
                setSize(tpl.size);
                canvasRef.current?.resize(tpl.size);
                canvasRef.current?.loadTemplate(tpl);
                setPanel(null);
              }}
              onSelectCustom={async (tpl) => {
                const res = await fetch(tpl.imageDataUrl);
                const blob = await res.blob();
                const file = new File([blob], tpl.name + ".png", { type: "image/png" });
                await canvasRef.current?.addBackgroundImage(file);
                setPanel(null);
              }}
            />
          )}
          {panel === "text" && <PanelText onAddText={(text, opts) => { canvasRef.current?.addText(text, opts); setPanel(null); }} />}
          {panel === "shapes" && <PanelShapes onAddShape={(kind) => { canvasRef.current?.addShape(kind); setPanel(null); }} />}
          {panel === "background" && <PanelBackground onChange={(bg) => { canvasRef.current?.setBackground(bg); }} onUploadImage={(f) => { canvasRef.current?.addBackgroundImage(f); setPanel(null); }} />}
          {panel === "stickers" && <PanelStickers onAdd={(svg) => { canvasRef.current?.addSticker(svg); setPanel(null); }} />}
          {panel === "photos" && <PanelPhotos onAdd={async (url) => { await canvasRef.current?.addImageFromUrl(url); setPanel(null); }} />}
          {panel === "qrcode" && <PanelQRCode onAdd={async (d, c, b) => { await canvasRef.current?.addQRCode(d, c, b); setPanel(null); }} />}
          {panel === "brand-kit" && (
            <PanelBrandKit
              onPickColor={(color) => {
                const fc = canvasRef.current?.getFabric();
                const active = fc?.getActiveObject();
                if (active) { (active as any).set({ fill: color }); fc?.requestRenderAll(); }
                else canvasRef.current?.setBackground({ type: "color", color });
              }}
              onPickFont={(family) => {
                const fc = canvasRef.current?.getFabric();
                const active = fc?.getActiveObject() as any;
                if (active && (active.type === "textbox" || active.type === "i-text")) {
                  active.set({ fontFamily: family }); fc?.requestRenderAll();
                } else canvasRef.current?.addText("Your text", { fontFamily: family, fontSize: 140 });
              }}
              onPickLogo={(dataUrl) => { canvasRef.current?.addImageFromUrl(dataUrl); setPanel(null); }}
            />
          )}
          {panel === "layers" && (
            <PanelLayers
              objects={objects}
              selected={selected}
              onSelect={(o) => { const fc = canvasRef.current?.getFabric(); fc?.setActiveObject(o); fc?.requestRenderAll(); setSelected(o); setPanel(null); }}
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
            <PanelAi freeRemaining={3} onGenerate={async () => { await new Promise((r) => setTimeout(r, 1500)); alert("AI generation lands in Phase 2.5."); }} />
          )}
        </MobileBottomSheet>

        <div className="relative flex-1 overflow-hidden">
          <CanvasBoard
            ref={canvasRef}
            size={size}
            initialTemplate={initialTemplate}
            initialJSON={initialJSON}
            showBleed={showBleed}
            showSafe={showSafe}
            onSelectionChange={setSelected}
            onObjectsChange={setObjects}
            onZoomChange={setZoom}
            onHistoryChange={(canUndo, canRedo) => setHistory({ canUndo, canRedo })}
            onAutoSave={onAutoSave}
            onLowDpiWarning={(w) => {
              setDpiWarning(w);
              if (w) setTimeout(() => setDpiWarning(null), 8000);
            }}
          />

          {/* Auto-save indicator */}
          {savedAt && Date.now() - savedAt < 2200 && (
            <div className="pointer-events-none absolute right-4 top-4 inline-flex animate-fade-up items-center gap-1.5 rounded-full bg-ink-900/85 px-3 py-1.5 text-xs font-medium text-paper backdrop-blur-md">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
              Saved
            </div>
          )}

          {/* DPI warning toast */}
          {dpiWarning && (
            <div className="absolute left-1/2 top-4 -translate-x-1/2 flex max-w-md items-start gap-3 rounded-2xl border border-saffron-500/30 bg-saffron-500/95 px-4 py-3 text-sm text-ink-900 shadow-[0_10px_30px_-10px_rgba(255,170,0,0.5)]">
              <span className="text-base">⚠️</span>
              <div>
                <div className="font-semibold">Low resolution image</div>
                <div className="text-xs mt-0.5 text-ink-800">
                  This image will print at ~{dpiWarning.dpi} DPI. Recommended: 300 DPI.
                  Smaller display will improve quality. Consider higher-resolution source.
                </div>
              </div>
              <button onClick={() => setDpiWarning(null)} className="rounded p-1 text-ink-700 hover:bg-ink-900/10">✕</button>
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
          onToggleTextStyle={(style) => canvasRef.current?.toggleTextStyle(style)}
          onSetTextProperty={(key, value) => canvasRef.current?.setTextProperty(key, value)}
          onFlip={(axis) => canvasRef.current?.flipSelected(axis)}
          onSetTextStroke={(color, width) => canvasRef.current?.setTextStroke(color, width)}
          onSetTextGradient={(from, to, angle) => canvasRef.current?.setTextGradient(from, to, angle)}
          onSetTextShadow={(color, blur, ox, oy) => canvasRef.current?.setTextShadow(color, blur, ox, oy)}
          onClearTextShadow={() => canvasRef.current?.clearTextShadow()}
          onSetPosition={(props) => canvasRef.current?.setPosition(props)}
        />
      </div>

      {/* Pages bar — desktop only */}
      <div className="hidden md:block">
        <PagesBar
          pages={pages}
          currentIndex={currentPageIndex}
          onSelect={switchToPage}
          onAddBlank={addBlankPage}
          onDuplicate={duplicatePage}
          onDelete={deletePage}
        />
      </div>

      {/* Mobile: Bottom nav OR context bar based on selection */}
      {selected ? (
        <MobileContextBar
          selected={selected}
          onAction={(action) => {
            if (action === "delete") canvasRef.current?.deleteSelected();
            else if (action === "duplicate") canvasRef.current?.duplicateSelected();
            else if (action === "flip") canvasRef.current?.flipSelected("horizontal");
            else if (action === "color") setPanel("background");
            else if (action === "font") setPanel("text");
            else if (action === "size") setPanel("text");
            else if (action === "style") setPanel("text");
            else if (action === "layers") setPanel("layers");
            else if (action === "ai") setPanel("ai");
          }}
          onDone={() => {
            const fc = canvasRef.current?.getFabric();
            fc?.discardActiveObject();
            fc?.requestRenderAll();
            setSelected(null);
          }}
        />
      ) : (
        <MobileBottomNav
          active={panel}
          onChange={setPanel}
          onImageUpload={(f) => canvasRef.current?.addImage(f)}
        />
      )}
    </div>
  );
}
