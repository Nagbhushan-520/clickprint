/**
 * SHIM: replaces Antonio's Postgres templates with our own catalog.
 * Returns fabric-JSON templates the editor can load via editor.loadJson().
 * Starter set is intentionally small; more can be added by pasting exported
 * JSON from the editor itself (Export → JSON) into TEMPLATE_LIBRARY.
 */
"use client";

import { useState, useEffect } from "react";

export type Template = {
  id: string;
  name: string;
  json: string;
  width: number;
  height: number;
  thumbnailUrl: string | null;
  isPro: boolean;
};

export type ResponseType = { data: Template[] };

// A5 at 300 DPI = 1748 x 2480. Simple starter templates as fabric v5 JSON.
function tpl(id: string, name: string, bg: string, objects: object[]): Template {
  return {
    id,
    name,
    width: 1748,
    height: 2480,
    isPro: false,
    thumbnailUrl: null,
    json: JSON.stringify({
      version: "5.3.0",
      objects,
      background: bg,
    }),
  };
}

const text = (opts: Record<string, unknown>) => ({
  type: "textbox",
  version: "5.3.0",
  originX: "left",
  originY: "top",
  fill: "#000000",
  fontFamily: "Arial",
  fontWeight: "normal",
  textAlign: "left",
  editable: true,
  width: 1400,
  ...opts,
});

const rect = (opts: Record<string, unknown>) => ({
  type: "rect",
  version: "5.3.0",
  originX: "left",
  originY: "top",
  ...opts,
});

const TEMPLATE_LIBRARY: Template[] = [
  tpl("blank-a5", "Blank A5", "#FFFFFF", []),
  tpl("restaurant", "Restaurant", "#0A0A06", [
    rect({ left: 100, top: 100, width: 1548, height: 200, fill: "#FF4D2E" }),
    text({ left: 200, top: 150, text: "NEW MENU", fontSize: 110, fill: "#FFFCF5", fontWeight: "bold" }),
    text({ left: 120, top: 700, text: "Authentic\nFlavors", fontSize: 240, fill: "#FFFCF5", fontWeight: "bold" }),
    text({ left: 120, top: 1980, text: "Restaurant Name\n080 1234 5678", fontSize: 60, fill: "#FFFCF5" }),
  ]),
  tpl("sale", "Big Sale", "#FF4D2E", [
    text({ left: 120, top: 120, text: "FLAT", fontSize: 200, fill: "#FFFCF5", fontWeight: "bold" }),
    text({ left: 120, top: 320, text: "50%", fontSize: 900, fill: "#FFFCF5", fontWeight: "bold" }),
    text({ left: 120, top: 1450, text: "OFF EVERYTHING", fontSize: 160, fill: "#0A0A06", fontWeight: "bold" }),
    rect({ left: 120, top: 2050, width: 1508, height: 220, fill: "#0A0A06", rx: 110, ry: 110 }),
    text({ left: 260, top: 2110, text: "WEEKEND ONLY", fontSize: 90, fill: "#FFFCF5", fontWeight: "bold" }),
  ]),
  tpl("event", "Event", "#F7F4ED", [
    text({ left: 120, top: 150, text: "GRAND\nOPENING", fontSize: 260, fill: "#0A0A06", fontWeight: "bold" }),
    rect({ left: 120, top: 880, width: 800, height: 12, fill: "#FF4D2E" }),
    text({ left: 120, top: 950, text: "Saturday · 7pm onwards", fontSize: 80, fill: "#0A0A06" }),
    text({ left: 120, top: 2150, text: "The Venue, Bangalore", fontSize: 60, fill: "#5C5C4D" }),
  ]),
];

export const useGetTemplates = (_apiQuery?: { page: string; limit: string }) => {
  const [data, setData] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async so the loading state renders, then serve the library.
    const t = setTimeout(() => {
      setData(TEMPLATE_LIBRARY);
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(t);
  }, []);

  return { data, isLoading, isError: false };
};
