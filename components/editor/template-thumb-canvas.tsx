"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Circle, Textbox } from "fabric";
import type { Template, TemplateObject } from "@/lib/editor/templates";
import { loadFont } from "@/lib/editor/fonts";

// In-memory cache so we don't re-render the same thumbnail
const thumbCache = new Map<string, string>();
// Fonts we've already triggered a load for
const fontsTriggered = new Set<string>();

/**
 * Renders an accurate thumbnail for a template using a real Fabric.js mini-canvas.
 * Caches data URLs across mounts.
 */
export function TemplateThumbCanvas({ tpl, width = 300 }: { tpl: Template; width?: number }) {
  const [dataUrl, setDataUrl] = useState<string | null>(thumbCache.get(tpl.id) ?? null);
  const [error, setError] = useState(false);
  const elRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (dataUrl) return;

    let cancelled = false;
    let fc: FabricCanvas | null = null;

    (async () => {
      try {
        // Pre-trigger font loads for all fonts in this template
        const fonts = new Set<string>();
        for (const obj of tpl.objects) {
          if (obj.type === "text" && obj.fontFamily) fonts.add(obj.fontFamily);
        }
        for (const f of fonts) {
          if (!fontsTriggered.has(f)) {
            loadFont(f);
            fontsTriggered.add(f);
          }
        }

        // Wait for fonts to actually load
        if (typeof document !== "undefined" && document.fonts) {
          try {
            await Promise.race([
              Promise.all([...fonts].map((f) => document.fonts.load(`bold 32px "${f}"`))),
              new Promise((r) => setTimeout(r, 1500)),
            ]);
          } catch {}
        }

        if (cancelled) return;

        const W = tpl.size === "A4" ? 2480 : 1748;
        const H = tpl.size === "A4" ? 3508 : 2480;
        const scale = width / W;
        const targetH = H * scale;

        // Create offscreen canvas
        const el = document.createElement("canvas");
        el.width = width;
        el.height = Math.round(targetH);

        fc = new FabricCanvas(el, {
          width,
          height: Math.round(targetH),
          backgroundColor: tpl.background,
          enableRetinaScaling: false,
          renderOnAddRemove: false,
          interactive: false,
        });

        for (const obj of tpl.objects) {
          const fabObj = templateObjToFabricScaled(obj, scale);
          if (fabObj) fc.add(fabObj);
        }
        fc.renderAll();

        // One more frame to ensure render
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        await new Promise((r) => setTimeout(r, 50));
        if (cancelled) return;

        const url = fc.toDataURL({ format: "png", quality: 0.85, multiplier: 1 });
        thumbCache.set(tpl.id, url);
        if (!cancelled) setDataUrl(url);
      } catch (e) {
        if (!cancelled) setError(true);
      } finally {
        if (fc) {
          try { fc.dispose(); } catch {}
        }
      }
    })();

    return () => { cancelled = true; if (fc) { try { fc.dispose(); } catch {} } };
  }, [tpl.id, width, dataUrl]);

  const aspect = tpl.size === "A4" ? "210 / 297" : "148 / 210";

  if (error) {
    return (
      <div className="grid w-full place-items-center text-xs text-ink-500" style={{ aspectRatio: aspect, backgroundColor: tpl.background }}>
        {tpl.name}
      </div>
    );
  }

  if (!dataUrl) {
    // Loading skeleton — show background color + name placeholder
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect, backgroundColor: tpl.background }}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
      </div>
    );
  }

  return (
    <img
      src={dataUrl}
      alt={tpl.name}
      width={width}
      className="block w-full"
      style={{ aspectRatio: aspect }}
    />
  );
}

function templateObjToFabricScaled(obj: TemplateObject, scale: number) {
  if (obj.type === "rect") {
    return new Rect({
      left: obj.left * scale,
      top: obj.top * scale,
      width: obj.width * scale,
      height: obj.height * scale,
      fill: obj.fill,
      rx: (obj.rx ?? 0) * scale,
      ry: (obj.ry ?? 0) * scale,
      angle: obj.angle ?? 0,
      selectable: false,
      evented: false,
    });
  }
  if (obj.type === "circle") {
    return new Circle({
      left: obj.left * scale,
      top: obj.top * scale,
      radius: obj.radius * scale,
      fill: obj.fill,
      selectable: false,
      evented: false,
    });
  }
  if (obj.type === "text") {
    return new Textbox(obj.text, {
      left: obj.left * scale,
      top: obj.top * scale,
      fontFamily: obj.fontFamily,
      fontSize: obj.fontSize * scale,
      fontWeight: obj.fontWeight ?? "normal",
      fontStyle: obj.fontStyle ?? "normal",
      fill: obj.fill,
      textAlign: obj.textAlign ?? "left",
      lineHeight: obj.lineHeight ?? 1.16,
      charSpacing: obj.charSpacing ?? 0,
      angle: obj.angle ?? 0,
      width: 1500 * scale,
      selectable: false,
      evented: false,
    });
  }
  return null;
}
