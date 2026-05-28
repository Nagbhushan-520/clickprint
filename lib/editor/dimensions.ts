/**
 * Print dimensions for A4 and A5.
 * Internal canvas coordinates = print pixels at 300 DPI.
 * Display zoom scales them to fit the viewport.
 *
 * Bleed = 3mm extra around trimmed edge (printer cuts here, so colors must extend past trim)
 * Safe area = 5mm inside trim (text/important elements must stay here)
 */
export const DIMENSIONS = {
  A4: {
    mm: { w: 210, h: 297 },
    px: { w: 2480, h: 3508 }, // 300 DPI
    bleedMm: 3,
    bleedPx: 35,  // 3mm at 300 DPI = ~35.4 pixels
    safeMm: 5,
    safePx: 59,   // 5mm at 300 DPI = ~59 pixels
  },
  A5: {
    mm: { w: 148, h: 210 },
    px: { w: 1748, h: 2480 }, // 300 DPI
    bleedMm: 3,
    bleedPx: 35,
    safeMm: 5,
    safePx: 59,
  },
} as const;

export const DPI = 300;
export const MM_TO_PX = DPI / 25.4; // 11.811...
export const PX_TO_MM = 25.4 / DPI; // 0.0847...

export type EditorSize = keyof typeof DIMENSIONS;

/** Get a viewport-fit zoom for a given canvas size + container size */
export function computeFitZoom(
  canvasSize: { w: number; h: number },
  containerSize: { w: number; h: number },
  padding = 40,
) {
  const availW = containerSize.w - padding * 2;
  const availH = containerSize.h - padding * 2;
  return Math.min(availW / canvasSize.w, availH / canvasSize.h, 1);
}
