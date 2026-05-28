/**
 * Print dimensions for A4 and A5.
 * Internal canvas coordinates = print pixels at 300 DPI.
 * Display zoom scales them to fit the viewport.
 */
export const DIMENSIONS = {
  A4: {
    mm: { w: 210, h: 297 },
    px: { w: 2480, h: 3508 }, // 300 DPI
    bleedMm: 3,
  },
  A5: {
    mm: { w: 148, h: 210 },
    px: { w: 1748, h: 2480 }, // 300 DPI
    bleedMm: 3,
  },
} as const;

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
