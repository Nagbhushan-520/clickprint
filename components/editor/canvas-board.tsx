"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Canvas as FabricCanvas, FabricObject, FabricImage, Rect, Circle, IText, Textbox, Line } from "fabric";
import { DIMENSIONS, type EditorSize, computeFitZoom } from "@/lib/editor/dimensions";
import { loadFont, preloadAllFonts } from "@/lib/editor/fonts";
import type { Template, TemplateObject } from "@/lib/editor/templates";

export type CanvasHandle = {
  getFabric: () => FabricCanvas | null;
  addText: (text: string, options?: Partial<Record<string, unknown>>) => void;
  addRect: () => void;
  addCircle: () => void;
  addLine: () => void;
  addImage: (file: File) => Promise<void>;
  setBackground: (color: string) => void;
  loadTemplate: (tpl: Template) => void;
  exportPNG: () => string;
  exportJSON: () => object;
  loadJSON: (json: object) => Promise<void>;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  bringForward: () => void;
  sendBackward: () => void;
  setZoom: (zoom: number) => void;
  fitToView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resize: (size: EditorSize) => void;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
};

type Props = {
  size: EditorSize;
  initialTemplate?: Template | null;
  onSelectionChange?: (obj: FabricObject | null) => void;
  onObjectsChange?: (objects: FabricObject[]) => void;
  onZoomChange?: (zoom: number) => void;
  onHistoryChange?: (canUndo: boolean, canRedo: boolean) => void;
};

const HISTORY_LIMIT = 40;

export const CanvasBoard = forwardRef<CanvasHandle, Props>(function CanvasBoard(
  { size, initialTemplate, onSelectionChange, onObjectsChange, onZoomChange, onHistoryChange },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elRef = useRef<HTMLCanvasElement>(null);
  const fcRef = useRef<FabricCanvas | null>(null);
  const historyRef = useRef<{ stack: string[]; index: number; suppress: boolean }>({
    stack: [],
    index: -1,
    suppress: false,
  });
  const [zoom, setZoomState] = useState(1);

  // Initialize Fabric once
  useEffect(() => {
    if (!elRef.current || fcRef.current) return;
    const dim = DIMENSIONS[size];

    const fc = new FabricCanvas(elRef.current, {
      width: dim.px.w,
      height: dim.px.h,
      backgroundColor: "#FFFCF5",
      preserveObjectStacking: true,
      enableRetinaScaling: false,
      selectionColor: "rgba(255, 77, 46, 0.15)",
      selectionBorderColor: "#FF4D2E",
      selectionLineWidth: 2,
    });

    // Set object default styling for selection handles
    FabricObject.ownDefaults.borderColor = "#FF4D2E";
    FabricObject.ownDefaults.cornerColor = "#FF4D2E";
    FabricObject.ownDefaults.cornerStyle = "circle";
    FabricObject.ownDefaults.cornerSize = 18;
    FabricObject.ownDefaults.transparentCorners = false;
    FabricObject.ownDefaults.padding = 4;

    fcRef.current = fc;
    preloadAllFonts();

    // Selection events
    const updateSelection = () => {
      const active = fc.getActiveObject();
      onSelectionChange?.(active ?? null);
    };
    fc.on("selection:created", updateSelection);
    fc.on("selection:updated", updateSelection);
    fc.on("selection:cleared", updateSelection);

    // History tracking
    const pushHistory = () => {
      if (historyRef.current.suppress) return;
      const json = JSON.stringify(fc.toJSON());
      const h = historyRef.current;
      // Truncate forward if we're not at the head
      if (h.index < h.stack.length - 1) {
        h.stack = h.stack.slice(0, h.index + 1);
      }
      h.stack.push(json);
      if (h.stack.length > HISTORY_LIMIT) h.stack.shift();
      h.index = h.stack.length - 1;
      onHistoryChange?.(h.index > 0, false);
      onObjectsChange?.(fc.getObjects());
    };
    fc.on("object:added", pushHistory);
    fc.on("object:modified", pushHistory);
    fc.on("object:removed", pushHistory);

    // Load initial template
    if (initialTemplate) {
      loadTemplateImpl(fc, initialTemplate);
    } else {
      pushHistory();
    }

    // Fit zoom
    setTimeout(() => fitToViewImpl(fc, containerRef.current), 50);

    return () => {
      fc.dispose();
      fcRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resize when size prop changes
  useEffect(() => {
    if (!fcRef.current) return;
    const dim = DIMENSIONS[size];
    fcRef.current.setDimensions({ width: dim.px.w, height: dim.px.h });
    fitToViewImpl(fcRef.current, containerRef.current);
  }, [size]);

  // Handle window resize for zoom-to-fit
  useEffect(() => {
    const onResize = () => fitToViewImpl(fcRef.current, containerRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ---- helpers ----
  const fitToViewImpl = (fc: FabricCanvas | null, container: HTMLDivElement | null) => {
    if (!fc || !container) return;
    const rect = container.getBoundingClientRect();
    const z = computeFitZoom(
      { w: fc.getWidth(), h: fc.getHeight() },
      { w: rect.width, h: rect.height },
      60,
    );
    fc.setZoom(z);
    const newW = fc.getWidth() * z;
    const newH = fc.getHeight() * z;
    // Update DOM size of canvas to fit
    const elements = fc.getElement().parentElement;
    if (elements) {
      elements.style.width = `${newW}px`;
      elements.style.height = `${newH}px`;
    }
    fc.setDimensions({ width: newW, height: newH }, { cssOnly: true });
    setZoomState(z);
    onZoomChange?.(z);
  };

  const loadTemplateImpl = (fc: FabricCanvas, tpl: Template) => {
    historyRef.current.suppress = true;
    fc.clear();
    fc.backgroundColor = tpl.background;
    for (const obj of tpl.objects) {
      const fab = templateObjectToFabric(obj);
      if (fab) fc.add(fab);
    }
    fc.renderAll();
    historyRef.current.suppress = false;
    // Push the loaded state to history
    const json = JSON.stringify(fc.toJSON());
    historyRef.current.stack = [json];
    historyRef.current.index = 0;
    onHistoryChange?.(false, false);
    onObjectsChange?.(fc.getObjects());
  };

  useImperativeHandle(ref, () => ({
    getFabric: () => fcRef.current,
    addText: (text, options = {}) => {
      const fc = fcRef.current;
      if (!fc) return;
      const family = (options.fontFamily as string) ?? "Inter";
      loadFont(family);
      const t = new Textbox(text, {
        left: 200,
        top: 200,
        width: 800,
        fontSize: 120,
        fill: "#0A0A06",
        fontFamily: family,
        ...options,
      });
      fc.add(t);
      fc.setActiveObject(t);
      fc.requestRenderAll();
    },
    addRect: () => {
      const fc = fcRef.current;
      if (!fc) return;
      const r = new Rect({
        left: 200,
        top: 200,
        width: 600,
        height: 400,
        fill: "#FF4D2E",
        rx: 16,
        ry: 16,
      });
      fc.add(r);
      fc.setActiveObject(r);
      fc.requestRenderAll();
    },
    addCircle: () => {
      const fc = fcRef.current;
      if (!fc) return;
      const c = new Circle({
        left: 200,
        top: 200,
        radius: 250,
        fill: "#FFAA00",
      });
      fc.add(c);
      fc.setActiveObject(c);
      fc.requestRenderAll();
    },
    addLine: () => {
      const fc = fcRef.current;
      if (!fc) return;
      const l = new Line([100, 200, 900, 200], {
        stroke: "#0A0A06",
        strokeWidth: 12,
      });
      fc.add(l);
      fc.setActiveObject(l);
      fc.requestRenderAll();
    },
    addImage: async (file: File) => {
      const fc = fcRef.current;
      if (!fc) return;
      const url = URL.createObjectURL(file);
      const img = await FabricImage.fromURL(url, { crossOrigin: "anonymous" });
      // Scale to fit canvas reasonably
      const maxDim = Math.min(fc.getWidth(), fc.getHeight()) * 0.6;
      const scale = Math.min(maxDim / img.width!, maxDim / img.height!, 1);
      img.scale(scale);
      img.set({ left: 200, top: 200 });
      fc.add(img);
      fc.setActiveObject(img);
      fc.requestRenderAll();
    },
    setBackground: (color) => {
      const fc = fcRef.current;
      if (!fc) return;
      fc.backgroundColor = color;
      fc.requestRenderAll();
      const h = historyRef.current;
      const json = JSON.stringify(fc.toJSON());
      h.stack.push(json);
      h.index++;
      onHistoryChange?.(h.index > 0, false);
    },
    loadTemplate: (tpl) => {
      if (!fcRef.current) return;
      loadTemplateImpl(fcRef.current, tpl);
    },
    exportPNG: () => {
      const fc = fcRef.current;
      if (!fc) return "";
      return fc.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 1,
      });
    },
    exportJSON: () => {
      const fc = fcRef.current;
      if (!fc) return {};
      return fc.toJSON();
    },
    loadJSON: async (json) => {
      const fc = fcRef.current;
      if (!fc) return;
      historyRef.current.suppress = true;
      await fc.loadFromJSON(json);
      fc.renderAll();
      historyRef.current.suppress = false;
    },
    deleteSelected: () => {
      const fc = fcRef.current;
      if (!fc) return;
      const active = fc.getActiveObjects();
      active.forEach((o) => fc.remove(o));
      fc.discardActiveObject();
      fc.requestRenderAll();
    },
    duplicateSelected: () => {
      const fc = fcRef.current;
      if (!fc) return;
      const active = fc.getActiveObject();
      if (!active) return;
      active.clone().then((cloned: FabricObject) => {
        cloned.set({ left: (active.left ?? 0) + 40, top: (active.top ?? 0) + 40 });
        fc.add(cloned);
        fc.setActiveObject(cloned);
        fc.requestRenderAll();
      });
    },
    bringForward: () => {
      const fc = fcRef.current;
      if (!fc) return;
      const active = fc.getActiveObject();
      if (!active) return;
      fc.bringObjectForward(active);
      fc.requestRenderAll();
    },
    sendBackward: () => {
      const fc = fcRef.current;
      if (!fc) return;
      const active = fc.getActiveObject();
      if (!active) return;
      fc.sendObjectBackwards(active);
      fc.requestRenderAll();
    },
    setZoom: (z: number) => {
      const fc = fcRef.current;
      if (!fc) return;
      fc.setZoom(z);
      const newW = fc.getWidth() / fc.getZoom() * z;
      const newH = fc.getHeight() / fc.getZoom() * z;
      const elements = fc.getElement().parentElement;
      if (elements) {
        elements.style.width = `${fc.getWidth() * z / (fcRef.current?.getZoom() || 1)}px`;
      }
      setZoomState(z);
      onZoomChange?.(z);
    },
    fitToView: () => fitToViewImpl(fcRef.current, containerRef.current),
    zoomIn: () => {
      const fc = fcRef.current;
      if (!fc) return;
      const next = Math.min(zoom * 1.25, 4);
      fc.setZoom(next);
      fc.setDimensions({
        width: fc.getWidth() / fc.getZoom() * next,
        height: fc.getHeight() / fc.getZoom() * next,
      }, { cssOnly: true });
      setZoomState(next);
      onZoomChange?.(next);
    },
    zoomOut: () => {
      const fc = fcRef.current;
      if (!fc) return;
      const next = Math.max(zoom * 0.8, 0.05);
      fc.setZoom(next);
      setZoomState(next);
      onZoomChange?.(next);
    },
    resize: (newSize) => {
      const fc = fcRef.current;
      if (!fc) return;
      const dim = DIMENSIONS[newSize];
      fc.setWidth(dim.px.w);
      fc.setHeight(dim.px.h);
      fitToViewImpl(fc, containerRef.current);
    },
    undo: async () => {
      const fc = fcRef.current;
      const h = historyRef.current;
      if (!fc || h.index <= 0) return;
      h.index--;
      h.suppress = true;
      await fc.loadFromJSON(JSON.parse(h.stack[h.index]));
      fc.renderAll();
      h.suppress = false;
      onObjectsChange?.(fc.getObjects());
      onHistoryChange?.(h.index > 0, h.index < h.stack.length - 1);
    },
    redo: async () => {
      const fc = fcRef.current;
      const h = historyRef.current;
      if (!fc || h.index >= h.stack.length - 1) return;
      h.index++;
      h.suppress = true;
      await fc.loadFromJSON(JSON.parse(h.stack[h.index]));
      fc.renderAll();
      h.suppress = false;
      onObjectsChange?.(fc.getObjects());
      onHistoryChange?.(h.index > 0, h.index < h.stack.length - 1);
    },
  }));

  return (
    <div ref={containerRef} className="relative grid h-full w-full place-items-center overflow-auto bg-cream p-8 [background-image:radial-gradient(circle,rgba(10,10,6,0.06)_1px,transparent_1px)] [background-size:24px_24px]">
      <div className="relative shadow-[0_30px_60px_-20px_rgba(10,10,6,0.3)]">
        <canvas ref={elRef} />
      </div>
    </div>
  );
});

// Convert template object → Fabric instance
function templateObjectToFabric(obj: TemplateObject): FabricObject | null {
  if (obj.type === "rect") {
    return new Rect({
      left: obj.left, top: obj.top,
      width: obj.width, height: obj.height,
      fill: obj.fill,
      rx: obj.rx ?? 0, ry: obj.ry ?? 0,
      angle: obj.angle ?? 0,
    });
  }
  if (obj.type === "circle") {
    return new Circle({
      left: obj.left, top: obj.top,
      radius: obj.radius, fill: obj.fill,
    });
  }
  if (obj.type === "text") {
    if (obj.fontFamily) loadFont(obj.fontFamily);
    return new Textbox(obj.text, {
      left: obj.left, top: obj.top,
      fontFamily: obj.fontFamily,
      fontSize: obj.fontSize,
      fontWeight: obj.fontWeight ?? "normal",
      fill: obj.fill,
      textAlign: obj.textAlign ?? "left",
      lineHeight: obj.lineHeight ?? 1.16,
      charSpacing: obj.charSpacing ?? 0,
      angle: obj.angle ?? 0,
      width: 1500,
    });
  }
  return null;
}
