/**
 * Starter flyer templates. Stored as Fabric.js JSON-compatible scenes.
 * Object coords are in PRINT pixel units (300 DPI).
 */
import type { EditorSize } from "./dimensions";

export type TemplateObject =
  | {
      type: "rect";
      left: number; top: number; width: number; height: number;
      fill: string; rx?: number; ry?: number;
      angle?: number;
    }
  | {
      type: "circle";
      left: number; top: number; radius: number; fill: string;
    }
  | {
      type: "text";
      left: number; top: number; text: string;
      fontFamily: string; fontSize: number;
      fontWeight?: string | number;
      fill: string; textAlign?: "left" | "center" | "right";
      lineHeight?: number; charSpacing?: number;
      angle?: number;
    };

export type Template = {
  id: string;
  name: string;
  category: "restaurant" | "event" | "real-estate" | "retail" | "sale" | "fitness";
  size: EditorSize;
  background: string;
  objects: TemplateObject[];
  thumbColors: [string, string]; // for the thumbnail card
};

// A5 dimensions: 1748 × 2480 pixels at 300 DPI
// A4 dimensions: 2480 × 3508 pixels at 300 DPI

export const TEMPLATES: Template[] = [
  {
    id: "restaurant-bold",
    name: "Restaurant · Bold",
    category: "restaurant",
    size: "A5",
    background: "#0A0A06",
    thumbColors: ["#0A0A06", "#FF4D2E"],
    objects: [
      { type: "rect", left: 100, top: 100, width: 1548, height: 200, fill: "#FF4D2E" },
      { type: "text", left: 200, top: 140, text: "NEW MENU", fontFamily: "Bebas Neue", fontSize: 110, fill: "#FFFCF5", charSpacing: 80 },
      { type: "text", left: 100, top: 700, text: "Authentic\nFlavors,\nServed Fresh", fontFamily: "Playfair Display", fontSize: 260, fontWeight: 700, fill: "#FFFCF5", lineHeight: 0.95 },
      { type: "rect", left: 100, top: 1900, width: 1548, height: 4, fill: "#FF4D2E" },
      { type: "text", left: 100, top: 1960, text: "Restaurant Name", fontFamily: "Bebas Neue", fontSize: 70, fill: "#FFFCF5", charSpacing: 40 },
      { type: "text", left: 100, top: 2060, text: "123 Street · 080 12345 6789", fontFamily: "Inter", fontSize: 50, fill: "#FFFCF5" },
      { type: "text", left: 100, top: 2140, text: "Order online · @restaurant.in", fontFamily: "Inter", fontSize: 50, fill: "#FF6B41" },
    ],
  },
  {
    id: "event-launch",
    name: "Event · Launch",
    category: "event",
    size: "A5",
    background: "#F7F4ED",
    thumbColors: ["#F7F4ED", "#0A0A06"],
    objects: [
      { type: "text", left: 100, top: 100, text: "GRAND\nOPENING", fontFamily: "Anton", fontSize: 280, fill: "#0A0A06", lineHeight: 0.9, charSpacing: 0 },
      { type: "rect", left: 100, top: 880, width: 800, height: 8, fill: "#FF4D2E" },
      { type: "text", left: 100, top: 940, text: "Saturday · 7pm onwards", fontFamily: "Playfair Display", fontSize: 80, fill: "#0A0A06" },
      { type: "circle", left: 1200, top: 1500, radius: 350, fill: "#FF4D2E" },
      { type: "text", left: 1290, top: 1750, text: "FREE\nENTRY", fontFamily: "Bebas Neue", fontSize: 100, fill: "#FFFCF5", textAlign: "center", lineHeight: 0.95 },
      { type: "text", left: 100, top: 2200, text: "The Venue\n123 Street, Bangalore", fontFamily: "Inter", fontSize: 50, fill: "#0A0A06", lineHeight: 1.4 },
    ],
  },
  {
    id: "sale-50",
    name: "Sale · Big Numbers",
    category: "sale",
    size: "A5",
    background: "#FF4D2E",
    thumbColors: ["#FF4D2E", "#FFFCF5"],
    objects: [
      { type: "text", left: 100, top: 100, text: "FLAT", fontFamily: "Bebas Neue", fontSize: 180, fill: "#FFFCF5", charSpacing: 100 },
      { type: "text", left: 100, top: 280, text: "50%", fontFamily: "Anton", fontSize: 1100, fill: "#FFFCF5", lineHeight: 0.85 },
      { type: "text", left: 100, top: 1500, text: "OFF EVERYTHING", fontFamily: "Bebas Neue", fontSize: 180, fill: "#0A0A06", charSpacing: 60 },
      { type: "rect", left: 100, top: 2100, width: 1548, height: 240, fill: "#0A0A06", rx: 120, ry: 120 },
      { type: "text", left: 250, top: 2170, text: "WEEKEND ONLY · STORE NAME", fontFamily: "Bebas Neue", fontSize: 90, fill: "#FFFCF5", charSpacing: 50 },
    ],
  },
  {
    id: "yoga-calm",
    name: "Yoga · Calm",
    category: "fitness",
    size: "A5",
    background: "#F2E8DC",
    thumbColors: ["#F2E8DC", "#5C5C4D"],
    objects: [
      { type: "circle", left: 1200, top: 200, radius: 400, fill: "#E89400" },
      { type: "text", left: 100, top: 700, text: "Find\nyour\nflow.", fontFamily: "Playfair Display", fontSize: 380, fontWeight: 400, fill: "#3E3E33", lineHeight: 0.95 },
      { type: "rect", left: 100, top: 1900, width: 200, height: 6, fill: "#FF4D2E" },
      { type: "text", left: 100, top: 1960, text: "MORNING YOGA RETREAT", fontFamily: "Inter", fontSize: 60, fontWeight: 700, fill: "#3E3E33", charSpacing: 40 },
      { type: "text", left: 100, top: 2070, text: "Saturdays · 6:30 AM · Cubbon Park", fontFamily: "Inter", fontSize: 50, fill: "#5C5C4D" },
      { type: "text", left: 100, top: 2200, text: "@yogastudio · 9876543210", fontFamily: "Inter", fontSize: 45, fill: "#5C5C4D" },
    ],
  },
  {
    id: "realestate-modern",
    name: "Real Estate · Modern",
    category: "real-estate",
    size: "A4",
    background: "#FFFCF5",
    thumbColors: ["#FFFCF5", "#0A0A06"],
    objects: [
      { type: "rect", left: 0, top: 0, width: 2480, height: 400, fill: "#0A0A06" },
      { type: "text", left: 100, top: 140, text: "FOR SALE", fontFamily: "Bebas Neue", fontSize: 120, fill: "#FF4D2E", charSpacing: 80 },
      { type: "text", left: 100, top: 600, text: "3 BHK\nApartment", fontFamily: "Playfair Display", fontSize: 320, fontWeight: 700, fill: "#0A0A06", lineHeight: 0.95 },
      { type: "text", left: 100, top: 1400, text: "₹ 1.85 Cr · 1,450 sqft", fontFamily: "Bebas Neue", fontSize: 140, fill: "#FF4D2E", charSpacing: 30 },
      { type: "rect", left: 100, top: 1700, width: 600, height: 4, fill: "#0A0A06" },
      { type: "text", left: 100, top: 1770, text: "AMENITIES", fontFamily: "Inter", fontSize: 50, fontWeight: 700, fill: "#0A0A06", charSpacing: 40 },
      { type: "text", left: 100, top: 1870, text: "• Modular kitchen   • 2 covered parking\n• Gym + Pool   • Power backup\n• Children's play area   • 24/7 security", fontFamily: "Inter", fontSize: 56, fill: "#5C5C4D", lineHeight: 1.5 },
      { type: "rect", left: 0, top: 3300, width: 2480, height: 208, fill: "#0A0A06" },
      { type: "text", left: 100, top: 3340, text: "Realty Co.", fontFamily: "Bebas Neue", fontSize: 80, fill: "#FFFCF5", charSpacing: 40 },
      { type: "text", left: 100, top: 3430, text: "9876543210 · realty.co · Whitefield", fontFamily: "Inter", fontSize: 44, fill: "#FFFCF5" },
    ],
  },
  {
    id: "retail-clean",
    name: "Retail · Clean",
    category: "retail",
    size: "A5",
    background: "#FFFCF5",
    thumbColors: ["#FFFCF5", "#FF4D2E"],
    objects: [
      { type: "text", left: 100, top: 100, text: "NEW", fontFamily: "Bebas Neue", fontSize: 200, fill: "#FF4D2E", charSpacing: 60 },
      { type: "text", left: 100, top: 380, text: "COLLECTION", fontFamily: "Bebas Neue", fontSize: 200, fill: "#0A0A06", charSpacing: 60 },
      { type: "rect", left: 100, top: 800, width: 1548, height: 1000, fill: "#0A0A06" },
      { type: "text", left: 200, top: 1100, text: "Shop the\nseason's best", fontFamily: "Playfair Display", fontSize: 200, fontWeight: 700, fill: "#FFFCF5", lineHeight: 1.0 },
      { type: "text", left: 200, top: 1600, text: "Up to 30% off launch week", fontFamily: "Inter", fontSize: 60, fill: "#FF6B41" },
      { type: "text", left: 100, top: 1900, text: "Visit us at MG Road", fontFamily: "Inter", fontSize: 60, fontWeight: 700, fill: "#0A0A06" },
      { type: "text", left: 100, top: 2010, text: "@yourbrand · 080 1234 5678", fontFamily: "Inter", fontSize: 50, fill: "#5C5C4D" },
    ],
  },
];

export function blankTemplate(size: EditorSize): Template {
  return {
    id: "blank",
    name: "Blank",
    category: "retail",
    size,
    background: "#FFFCF5",
    objects: [],
    thumbColors: ["#FFFCF5", "#0A0A06"],
  };
}
