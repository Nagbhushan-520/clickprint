"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import {
  Canvas as FabricCanvas,
  FabricObject,
  FabricImage,
  Rect,
  Circle,
  Textbox,
  Line,
  Triangle,
  Polygon,
  Path,
  Gradient,
  ActiveSelection,
  filters as fabricFilters,
} from "fabric";
import { DIMENSIONS, type EditorSize, computeFitZoom } from "@/lib/editor/dimensions";
import { loadFont, preloadAllFonts } from "@/lib/editor/fonts";
import type { Template, TemplateObject } from "@/lib/editor/templates";

export type ShapeKind = "rect" | "rounded" | "circle" | "line" | "triangle" | "star" | "arrow" | "speech";
export type ImageFilterKind = "none" | "grayscale" | "sepia" | "invert" | "vintage";
export type AlignKind = "left" | "center" | "right" | "top" | "middle" | "bottom" | "distribute-h" | "distribute-v";
export type BackgroundKind = { type: "color"; color: string } | { type: "gradient"; from: string; to: string; angle: number };

export type CanvasHandle = {
  getFabric: () => FabricCanvas | null;
  addText: (text: string, options?: Partial<Record<string, unknown>>) => void;
  addShape: (kind: ShapeKind) => void;
  addImage: (file: File) => Promise<void>;
  addImageFromUrl: (url: string) => Promise<void>;
  setBackground: (bg: BackgroundKind) => void;
  loadTemplate: (tpl: Template) => void;
  exportPNG: () => string;
  exportSVG: () => string;
  exportPDF: () => Promise<Uint8Array>;
  exportJSON: () => object;
  loadJSON: (json: object) => Promise<void>;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  bringForward: () => void;
  sendBackward: () => void;
  applyFilter: (filter: ImageFilterKind, intensity?: number) => void;
  setFilterValue: (key: "brightness" | "contrast" | "saturation", value: number) => void;
  align: (kind: AlignKind) => void;
  nudge: (dx: number, dy: number) => void;
  reorderLayer: (fromIndex: number, toIndex: number) => void;
  setZoom: (zoom: number) => void;
  fitToView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resize: (size: EditorSize) => void;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  toggleVisibility: (obj: FabricObject) => void;
  toggleLock: (obj: FabricObject) => void;
};

type Props = {
  size: EditorSize;
  initialTemplate?: Template | null;
  initialJSON?: object | null;
  onSelectionChange?: (obj: FabricObject | null) => void;
  onObjectsChange?: (objects: FabricObject[]) => void;
  onZoomChange?: (zoom: number) => void;
  onHistoryChange?: (canUndo: boolean, canRedo: boolean) => void;
  onAutoSave?: (json: object) => void;
};

const HISTORY_LIMIT = 50;
const SNAP_THRESHOLD = 20; // px in canvas units

export const CanvasBoard = forwardRef<CanvasHandle, Props>(function CanvasBoard(
  { size, initialTemplate, initialJSON, onSelectionChange, onObjectsChange, onZoomChange, onHistoryChange, onAutoSave },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elRef = useRef<HTMLCanvasElement>(null);
  const guidesRef = useRef<HTMLCanvasElement>(null);
  const fcRef = useRef<FabricCanvas | null>(null);
  const historyRef = useRef<{ stack: string[]; index: number; suppress: boolean }>({
    stack: [],
    index: -1,
    suppress: false,
  });
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [zoom, setZoomState] = useState(1);

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
      onSelectionChange?.(fc.getActiveObject() ?? null);
    };
    fc.on("selection:created", updateSelection);
    fc.on("selection:updated", updateSelection);
    fc.on("selection:cleared", updateSelection);

    // Snap guides during drag
    fc.on("object:moving", (e) => {
      const obj = e.target;
      if (!obj) return;
      drawSnapGuides(fc, obj);
    });
    fc.on("mouse:up", () => clearGuides());

    // History
    const pushHistory = () => {
      if (historyRef.current.suppress) return;
      const json = JSON.stringify(fc.toJSON());
      const h = historyRef.current;
      if (h.index < h.stack.length - 1) {
        h.stack = h.stack.slice(0, h.index + 1);
      }
      h.stack.push(json);
      if (h.stack.length > HISTORY_LIMIT) h.stack.shift();
      h.index = h.stack.length - 1;
      onHistoryChange?.(h.index > 0, false);
      onObjectsChange?.(fc.getObjects());

      // Auto-save (debounced)
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = setTimeout(() => {
        onAutoSave?.(JSON.parse(json));
      }, 600);
    };
    fc.on("object:added", pushHistory);
    fc.on("object:modified", pushHistory);
    fc.on("object:removed", pushHistory);

    // Load initial
    if (initialJSON) {
      historyRef.current.suppress = true;
      fc.loadFromJSON(initialJSON).then(() => {
        fc.renderAll();
        historyRef.current.suppress = false;
        pushHistory();
      });
    } else if (initialTemplate) {
      loadTemplateImpl(fc, initialTemplate);
    } else {
      pushHistory();
    }

    setTimeout(() => fitToViewImpl(fc, containerRef.current), 50);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
      fc.dispose();
      fcRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!fcRef.current) return;
    const dim = DIMENSIONS[size];
    fcRef.current.setDimensions({ width: dim.px.w, height: dim.px.h });
    fitToViewImpl(fcRef.current, containerRef.current);
  }, [size]);

  useEffect(() => {
    const onResize = () => fitToViewImpl(fcRef.current, containerRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
    fc.setDimensions({ width: newW, height: newH }, { cssOnly: true });
    if (guidesRef.current) {
      guidesRef.current.width = newW;
      guidesRef.current.height = newH;
    }
    setZoomState(z);
    onZoomChange?.(z);
  };

  // --- Snap guides ---
  const drawSnapGuides = (fc: FabricCanvas, obj: FabricObject) => {
    if (!guidesRef.current) return;
    const ctx = guidesRef.current.getContext("2d");
    if (!ctx) return;
    const z = fc.getZoom();
    ctx.clearRect(0, 0, guidesRef.current.width, guidesRef.current.height);
    ctx.strokeStyle = "#FF4D2E";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);

    const bounds = obj.getBoundingRect();
    const cw = fc.getWidth() / z;
    const ch = fc.getHeight() / z;
    const objLeft = bounds.left;
    const objRight = bounds.left + bounds.width;
    const objCenterX = bounds.left + bounds.width / 2;
    const objTop = bounds.top;
    const objBottom = bounds.top + bounds.height;
    const objCenterY = bounds.top + bounds.height / 2;

    // Canvas center vertical
    if (Math.abs(objCenterX - cw / 2) < SNAP_THRESHOLD) {
      obj.set({ left: (obj.left ?? 0) + (cw / 2 - objCenterX) });
      drawLineCanvas(ctx, cw / 2 * z, 0, cw / 2 * z, ch * z);
    }
    // Canvas center horizontal
    if (Math.abs(objCenterY - ch / 2) < SNAP_THRESHOLD) {
      obj.set({ top: (obj.top ?? 0) + (ch / 2 - objCenterY) });
      drawLineCanvas(ctx, 0, ch / 2 * z, cw * z, ch / 2 * z);
    }
    // Edges
    if (Math.abs(objLeft) < SNAP_THRESHOLD) {
      obj.set({ left: (obj.left ?? 0) - objLeft });
      drawLineCanvas(ctx, 0, 0, 0, ch * z);
    }
    if (Math.abs(objRight - cw) < SNAP_THRESHOLD) {
      obj.set({ left: (obj.left ?? 0) + (cw - objRight) });
      drawLineCanvas(ctx, cw * z, 0, cw * z, ch * z);
    }
    if (Math.abs(objTop) < SNAP_THRESHOLD) {
      obj.set({ top: (obj.top ?? 0) - objTop });
      drawLineCanvas(ctx, 0, 0, cw * z, 0);
    }
    if (Math.abs(objBottom - ch) < SNAP_THRESHOLD) {
      obj.set({ top: (obj.top ?? 0) + (ch - objBottom) });
      drawLineCanvas(ctx, 0, ch * z, cw * z, ch * z);
    }

    // Snap to other objects
    const others = fc.getObjects().filter((o) => o !== obj);
    for (const other of others) {
      const ob = other.getBoundingRect();
      const oCenterX = ob.left + ob.width / 2;
      const oCenterY = ob.top + ob.height / 2;
      if (Math.abs(objCenterX - oCenterX) < SNAP_THRESHOLD) {
        obj.set({ left: (obj.left ?? 0) + (oCenterX - objCenterX) });
        drawLineCanvas(ctx, oCenterX * z, 0, oCenterX * z, ch * z);
      }
      if (Math.abs(objCenterY - oCenterY) < SNAP_THRESHOLD) {
        obj.set({ top: (obj.top ?? 0) + (oCenterY - objCenterY) });
        drawLineCanvas(ctx, 0, oCenterY * z, cw * z, oCenterY * z);
      }
    }
  };

  const drawLineCanvas = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const clearGuides = () => {
    if (!guidesRef.current) return;
    const ctx = guidesRef.current.getContext("2d");
    ctx?.clearRect(0, 0, guidesRef.current.width, guidesRef.current.height);
  };

  // --- Template load ---
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
    const json = JSON.stringify(fc.toJSON());
    historyRef.current.stack = [json];
    historyRef.current.index = 0;
    onHistoryChange?.(false, false);
    onObjectsChange?.(fc.getObjects());
  };

  // --- Shape factory ---
  const makeShape = (kind: ShapeKind): FabricObject | null => {
    const common = { left: 200, top: 200 };
    switch (kind) {
      case "rect":
        return new Rect({ ...common, width: 600, height: 400, fill: "#FF4D2E" });
      case "rounded":
        return new Rect({ ...common, width: 600, height: 400, fill: "#0A0A06", rx: 60, ry: 60 });
      case "circle":
        return new Circle({ ...common, radius: 250, fill: "#FFAA00" });
      case "line":
        return new Line([100, 200, 900, 200], { stroke: "#0A0A06", strokeWidth: 12 });
      case "triangle":
        return new Triangle({ ...common, width: 500, height: 500, fill: "#FF4D2E" });
      case "star": {
        const points = makeStarPoints(5, 250, 100, 200, 200);
        return new Polygon(points, { ...common, fill: "#FFAA00" });
      }
      case "arrow": {
        // Arrow shape as path
        const p = "M 0 50 L 200 50 L 200 0 L 300 100 L 200 200 L 200 150 L 0 150 Z";
        return new Path(p, { ...common, fill: "#0A0A06" });
      }
      case "speech": {
        const p = "M 30 30 L 470 30 Q 500 30 500 60 L 500 280 Q 500 310 470 310 L 200 310 L 150 380 L 150 310 L 50 310 Q 20 310 20 280 L 20 60 Q 20 30 50 30 Z";
        return new Path(p, { ...common, fill: "#FF4D2E" });
      }
      default:
        return null;
    }
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
        editable: true,
        ...options,
      });
      fc.add(t);
      fc.setActiveObject(t);
      fc.requestRenderAll();
    },
    addShape: (kind) => {
      const fc = fcRef.current;
      if (!fc) return;
      const obj = makeShape(kind);
      if (!obj) return;
      fc.add(obj);
      fc.setActiveObject(obj);
      fc.requestRenderAll();
    },
    addImage: async (file) => {
      const fc = fcRef.current;
      if (!fc) return;
      const url = URL.createObjectURL(file);
      const img = await FabricImage.fromURL(url, { crossOrigin: "anonymous" });
      const maxDim = Math.min(fc.getWidth(), fc.getHeight()) * 0.6;
      const scale = Math.min(maxDim / img.width!, maxDim / img.height!, 1);
      img.scale(scale);
      img.set({ left: 200, top: 200 });
      fc.add(img);
      fc.setActiveObject(img);
      fc.requestRenderAll();
    },
    addImageFromUrl: async (url) => {
      const fc = fcRef.current;
      if (!fc) return;
      const img = await FabricImage.fromURL(url, { crossOrigin: "anonymous" });
      const maxDim = Math.min(fc.getWidth(), fc.getHeight()) * 0.6;
      const scale = Math.min(maxDim / img.width!, maxDim / img.height!, 1);
      img.scale(scale);
      img.set({ left: 200, top: 200 });
      fc.add(img);
      fc.setActiveObject(img);
      fc.requestRenderAll();
    },
    setBackground: (bg) => {
      const fc = fcRef.current;
      if (!fc) return;
      if (bg.type === "color") {
        fc.backgroundColor = bg.color;
      } else {
        const gradient = new Gradient({
          type: "linear",
          gradientUnits: "percentage",
          coords: {
            x1: 0, y1: 0,
            x2: Math.cos((bg.angle - 90) * Math.PI / 180),
            y2: Math.sin((bg.angle - 90) * Math.PI / 180),
          },
          colorStops: [
            { offset: 0, color: bg.from },
            { offset: 1, color: bg.to },
          ],
        });
        // Apply to background as a Rect
        const dim = DIMENSIONS[size];
        const bgRect = new Rect({
          left: 0, top: 0, width: dim.px.w, height: dim.px.h,
          fill: gradient,
          selectable: false, evented: false,
          excludeFromExport: false,
        });
        // Remove old background rect
        fc.getObjects().forEach((o) => {
          if ((o as any).__isBackground) fc.remove(o);
        });
        (bgRect as any).__isBackground = true;
        fc.add(bgRect);
        fc.sendObjectToBack(bgRect);
        fc.backgroundColor = bg.from;
      }
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
      return fc.toDataURL({ format: "png", quality: 1, multiplier: 1 });
    },
    exportSVG: () => {
      const fc = fcRef.current;
      if (!fc) return "";
      return fc.toSVG();
    },
    exportPDF: async () => {
      const fc = fcRef.current;
      if (!fc) throw new Error("No canvas");
      const { PDFDocument, rgb } = await import("pdf-lib");
      const png = fc.toDataURL({ format: "png", quality: 1, multiplier: 1 });
      const dim = DIMENSIONS[size];
      const ptsPerMm = 2.83465; // 1mm = 2.83465 pt
      const pdf = await PDFDocument.create();
      const page = pdf.addPage([dim.mm.w * ptsPerMm, dim.mm.h * ptsPerMm]);
      const pngBytes = Uint8Array.from(atob(png.split(",")[1]), (c) => c.charCodeAt(0));
      const img = await pdf.embedPng(pngBytes);
      page.drawImage(img, {
        x: 0,
        y: 0,
        width: dim.mm.w * ptsPerMm,
        height: dim.mm.h * ptsPerMm,
      });
      return await pdf.save();
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
      fc.getActiveObjects().forEach((o) => fc.remove(o));
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
    applyFilter: (filter, intensity = 1) => {
      const fc = fcRef.current;
      if (!fc) return;
      const active = fc.getActiveObject();
      if (!active || (active as any).type !== "image") return;
      const img = active as FabricImage;
      img.filters = img.filters || [];
      // Replace existing color filters
      img.filters = img.filters.filter((f: any) => !["Grayscale", "Sepia", "Invert", "Vintage"].includes(f.type));
      if (filter === "grayscale") img.filters.push(new fabricFilters.Grayscale());
      else if (filter === "sepia") img.filters.push(new fabricFilters.Sepia());
      else if (filter === "invert") img.filters.push(new fabricFilters.Invert());
      else if (filter === "vintage") img.filters.push(new fabricFilters.Vintage());
      img.applyFilters();
      fc.requestRenderAll();
    },
    setFilterValue: (key, value) => {
      const fc = fcRef.current;
      if (!fc) return;
      const active = fc.getActiveObject();
      if (!active || (active as any).type !== "image") return;
      const img = active as FabricImage;
      img.filters = img.filters || [];
      const className = key === "brightness" ? "Brightness" : key === "contrast" ? "Contrast" : "Saturation";
      img.filters = img.filters.filter((f: any) => f.type !== className);
      if (value !== 0) {
        const FilterCls = (fabricFilters as any)[className];
        const filterInstance = new FilterCls({ [key]: value });
        img.filters.push(filterInstance);
      }
      img.applyFilters();
      fc.requestRenderAll();
    },
    align: (kind) => {
      const fc = fcRef.current;
      if (!fc) return;
      const active = fc.getActiveObject();
      if (!active) return;
      const cw = fc.getWidth() / fc.getZoom();
      const ch = fc.getHeight() / fc.getZoom();

      if (active instanceof ActiveSelection) {
        const objs = active.getObjects();
        // Multi-object align: align relative to selection bbox
        const bbox = active.getBoundingRect();
        objs.forEach((obj) => {
          const ob = obj.getBoundingRect();
          if (kind === "left") obj.set({ left: (obj.left ?? 0) - (ob.left - bbox.left) });
          if (kind === "right") obj.set({ left: (obj.left ?? 0) + (bbox.left + bbox.width - (ob.left + ob.width)) });
          if (kind === "center") obj.set({ left: (obj.left ?? 0) + (bbox.left + bbox.width / 2 - (ob.left + ob.width / 2)) });
          if (kind === "top") obj.set({ top: (obj.top ?? 0) - (ob.top - bbox.top) });
          if (kind === "bottom") obj.set({ top: (obj.top ?? 0) + (bbox.top + bbox.height - (ob.top + ob.height)) });
          if (kind === "middle") obj.set({ top: (obj.top ?? 0) + (bbox.top + bbox.height / 2 - (ob.top + ob.height / 2)) });
        });
      } else {
        const ob = active.getBoundingRect();
        if (kind === "left") active.set({ left: (active.left ?? 0) - ob.left });
        if (kind === "right") active.set({ left: (active.left ?? 0) + (cw - (ob.left + ob.width)) });
        if (kind === "center") active.set({ left: (active.left ?? 0) + (cw / 2 - (ob.left + ob.width / 2)) });
        if (kind === "top") active.set({ top: (active.top ?? 0) - ob.top });
        if (kind === "bottom") active.set({ top: (active.top ?? 0) + (ch - (ob.top + ob.height)) });
        if (kind === "middle") active.set({ top: (active.top ?? 0) + (ch / 2 - (ob.top + ob.height / 2)) });
      }
      fc.requestRenderAll();
      fc.fire("object:modified", { target: active });
    },
    nudge: (dx, dy) => {
      const fc = fcRef.current;
      if (!fc) return;
      const active = fc.getActiveObject();
      if (!active) return;
      active.set({ left: (active.left ?? 0) + dx, top: (active.top ?? 0) + dy });
      active.setCoords();
      fc.requestRenderAll();
      fc.fire("object:modified", { target: active });
    },
    reorderLayer: (fromIndex, toIndex) => {
      const fc = fcRef.current;
      if (!fc) return;
      const objs = fc.getObjects();
      if (fromIndex < 0 || fromIndex >= objs.length || toIndex < 0 || toIndex >= objs.length) return;
      const obj = objs[fromIndex];
      // Move in stack
      fc.moveObjectTo(obj, toIndex);
      fc.requestRenderAll();
    },
    setZoom: (z) => {
      const fc = fcRef.current;
      if (!fc) return;
      fc.setZoom(z);
      setZoomState(z);
      onZoomChange?.(z);
    },
    fitToView: () => fitToViewImpl(fcRef.current, containerRef.current),
    zoomIn: () => {
      const fc = fcRef.current;
      if (!fc) return;
      const next = Math.min(fc.getZoom() * 1.25, 4);
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
      const next = Math.max(fc.getZoom() * 0.8, 0.05);
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
    toggleVisibility: (obj) => {
      const fc = fcRef.current;
      if (!fc) return;
      obj.visible = !obj.visible;
      fc.requestRenderAll();
      onObjectsChange?.(fc.getObjects());
    },
    toggleLock: (obj) => {
      const fc = fcRef.current;
      if (!fc) return;
      const wasLocked = obj.lockMovementX || false;
      obj.set({
        lockMovementX: !wasLocked,
        lockMovementY: !wasLocked,
        lockScalingX: !wasLocked,
        lockScalingY: !wasLocked,
        lockRotation: !wasLocked,
        evented: wasLocked,
        selectable: wasLocked,
      });
      fc.requestRenderAll();
      onObjectsChange?.(fc.getObjects());
    },
  }));

  return (
    <div
      ref={containerRef}
      className="relative grid h-full w-full place-items-center overflow-auto bg-cream p-8 [background-image:radial-gradient(circle,rgba(10,10,6,0.06)_1px,transparent_1px)] [background-size:24px_24px]"
    >
      <div className="relative shadow-[0_30px_60px_-20px_rgba(10,10,6,0.3)]">
        <canvas ref={elRef} />
        {/* Snap guides overlay */}
        <canvas
          ref={guidesRef}
          className="pointer-events-none absolute inset-0"
        />
      </div>
    </div>
  );
});

// Helpers
function makeStarPoints(spikes: number, outerRadius: number, innerRadius: number, cx: number, cy: number) {
  const points: { x: number; y: number }[] = [];
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  for (let i = 0; i < spikes; i++) {
    points.push({ x: cx + Math.cos(rot) * outerRadius, y: cy + Math.sin(rot) * outerRadius });
    rot += step;
    points.push({ x: cx + Math.cos(rot) * innerRadius, y: cy + Math.sin(rot) * innerRadius });
    rot += step;
  }
  return points;
}

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
      editable: true,
    });
  }
  return null;
}
