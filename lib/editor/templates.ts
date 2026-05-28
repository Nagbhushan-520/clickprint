/**
 * 30+ flyer templates across all categories.
 * Stored as Fabric.js JSON-compatible scenes.
 * Object coords are in PRINT pixel units (300 DPI).
 */
import type { EditorSize } from "./dimensions";

export type TemplateObject =
  | { type: "rect"; left: number; top: number; width: number; height: number; fill: string; rx?: number; ry?: number; angle?: number; stroke?: string; strokeWidth?: number }
  | { type: "circle"; left: number; top: number; radius: number; fill: string }
  | { type: "text"; left: number; top: number; text: string; fontFamily: string; fontSize: number; fontWeight?: string | number; fontStyle?: string; fill: string; textAlign?: "left" | "center" | "right"; lineHeight?: number; charSpacing?: number; angle?: number };

export type TemplateCategory = "restaurant" | "event" | "real-estate" | "retail" | "sale" | "fitness" | "festival" | "education" | "wedding" | "service";

export type Template = {
  id: string;
  name: string;
  category: TemplateCategory;
  size: EditorSize;
  background: string;
  objects: TemplateObject[];
  thumbColors: [string, string];
};

// A5 dims: 1748 × 2480, A4 dims: 2480 × 3508

export const TEMPLATE_CATEGORIES: { id: TemplateCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "restaurant", label: "Restaurant" },
  { id: "event", label: "Event" },
  { id: "sale", label: "Sale" },
  { id: "real-estate", label: "Real estate" },
  { id: "retail", label: "Retail" },
  { id: "fitness", label: "Fitness" },
  { id: "festival", label: "Festival" },
  { id: "education", label: "Education" },
  { id: "wedding", label: "Wedding" },
  { id: "service", label: "Service" },
];

export const TEMPLATES: Template[] = [
  // RESTAURANT (5)
  {
    id: "restaurant-bold", name: "Bold Menu", category: "restaurant", size: "A5",
    background: "#0A0A06", thumbColors: ["#0A0A06", "#FF4D2E"],
    objects: [
      { type: "rect", left: 100, top: 100, width: 1548, height: 200, fill: "#FF4D2E" },
      { type: "text", left: 200, top: 140, text: "NEW MENU", fontFamily: "Bebas Neue", fontSize: 110, fill: "#FFFCF5", charSpacing: 80 },
      { type: "text", left: 100, top: 700, text: "Authentic\nFlavors,\nServed Fresh", fontFamily: "Playfair Display", fontSize: 260, fontWeight: 700, fill: "#FFFCF5", lineHeight: 0.95 },
      { type: "rect", left: 100, top: 1900, width: 1548, height: 4, fill: "#FF4D2E" },
      { type: "text", left: 100, top: 1960, text: "Restaurant Name", fontFamily: "Bebas Neue", fontSize: 70, fill: "#FFFCF5", charSpacing: 40 },
      { type: "text", left: 100, top: 2060, text: "123 Street · 080 12345 6789", fontFamily: "Inter", fontSize: 50, fill: "#FFFCF5" },
    ],
  },
  {
    id: "restaurant-elegant", name: "Elegant Dining", category: "restaurant", size: "A4",
    background: "#F7F4ED", thumbColors: ["#F7F4ED", "#9C1F12"],
    objects: [
      { type: "text", left: 200, top: 200, text: "FINE", fontFamily: "Cormorant Garamond", fontSize: 320, fontStyle: "italic", fontWeight: 400, fill: "#9C1F12" },
      { type: "text", left: 200, top: 480, text: "DINING", fontFamily: "Cormorant Garamond", fontSize: 320, fontWeight: 700, fill: "#0A0A06" },
      { type: "rect", left: 200, top: 900, width: 400, height: 2, fill: "#9C1F12" },
      { type: "text", left: 200, top: 970, text: "A culinary journey awaits", fontFamily: "Cormorant Garamond", fontSize: 80, fontStyle: "italic", fill: "#3E3E33" },
      { type: "text", left: 200, top: 2200, text: "Reservations\n+91 98765 43210", fontFamily: "Inter", fontSize: 60, fontWeight: 700, fill: "#0A0A06", lineHeight: 1.4 },
      { type: "text", left: 200, top: 3200, text: "Bistro Nomad", fontFamily: "Cormorant Garamond", fontSize: 140, fontStyle: "italic", fill: "#9C1F12" },
    ],
  },
  {
    id: "cafe-cozy", name: "Cozy Cafe", category: "restaurant", size: "A5",
    background: "#F2E8DC", thumbColors: ["#F2E8DC", "#9C1F12"],
    objects: [
      { type: "text", left: 100, top: 200, text: "since\n2024", fontFamily: "Dancing Script", fontSize: 150, fill: "#9C1F12", lineHeight: 1 },
      { type: "text", left: 100, top: 700, text: "Coffee.\nConvos.\nCalm.", fontFamily: "Playfair Display", fontSize: 320, fontWeight: 700, fill: "#3E3E33", lineHeight: 0.95 },
      { type: "circle", left: 1100, top: 1700, radius: 280, fill: "#9C1F12" },
      { type: "text", left: 1200, top: 1900, text: "OPEN\n8 AM", fontFamily: "Bebas Neue", fontSize: 100, fill: "#FFFCF5", textAlign: "center", lineHeight: 1 },
      { type: "text", left: 100, top: 2300, text: "Find us on Indiranagar", fontFamily: "Inter", fontSize: 50, fill: "#5C5C4D" },
    ],
  },
  {
    id: "food-photo", name: "Food Special", category: "restaurant", size: "A5",
    background: "#FFAA00", thumbColors: ["#FFAA00", "#0A0A06"],
    objects: [
      { type: "rect", left: 0, top: 0, width: 1748, height: 800, fill: "#0A0A06" },
      { type: "text", left: 200, top: 250, text: "WEEKEND\nSPECIAL", fontFamily: "Bebas Neue", fontSize: 200, fill: "#FFAA00", lineHeight: 0.95, charSpacing: 30 },
      { type: "text", left: 200, top: 900, text: "Biryani Combo", fontFamily: "Playfair Display", fontSize: 180, fontWeight: 700, fill: "#0A0A06" },
      { type: "text", left: 200, top: 1100, text: "with curd & dessert", fontFamily: "Inter", fontSize: 60, fontStyle: "italic", fill: "#3E3E33" },
      { type: "text", left: 200, top: 1500, text: "₹249", fontFamily: "Bebas Neue", fontSize: 500, fill: "#0A0A06" },
      { type: "rect", left: 200, top: 2100, width: 1300, height: 200, fill: "#0A0A06", rx: 20 },
      { type: "text", left: 350, top: 2150, text: "ORDER NOW · 080 1234 5678", fontFamily: "Bebas Neue", fontSize: 90, fill: "#FFAA00", charSpacing: 30 },
    ],
  },
  {
    id: "menu-minimal", name: "Minimal Menu", category: "restaurant", size: "A4",
    background: "#FFFCF5", thumbColors: ["#FFFCF5", "#0A0A06"],
    objects: [
      { type: "text", left: 200, top: 200, text: "menu", fontFamily: "DM Serif Display", fontSize: 300, fill: "#0A0A06" },
      { type: "rect", left: 200, top: 600, width: 100, height: 4, fill: "#FF4D2E" },
      { type: "text", left: 200, top: 800, text: "STARTERS", fontFamily: "Inter", fontSize: 50, fontWeight: 700, fill: "#0A0A06", charSpacing: 60 },
      { type: "text", left: 200, top: 900, text: "Paneer Tikka  ·  ₹220\nVeg Spring Roll  ·  ₹180\nChicken 65  ·  ₹260", fontFamily: "Inter", fontSize: 56, fill: "#3E3E33", lineHeight: 1.7 },
      { type: "text", left: 200, top: 1500, text: "MAINS", fontFamily: "Inter", fontSize: 50, fontWeight: 700, fill: "#0A0A06", charSpacing: 60 },
      { type: "text", left: 200, top: 1600, text: "Veg Biryani  ·  ₹280\nChicken Curry  ·  ₹320\nButter Naan  ·  ₹60", fontFamily: "Inter", fontSize: 56, fill: "#3E3E33", lineHeight: 1.7 },
    ],
  },

  // EVENTS (5)
  {
    id: "event-launch", name: "Grand Opening", category: "event", size: "A5",
    background: "#F7F4ED", thumbColors: ["#F7F4ED", "#0A0A06"],
    objects: [
      { type: "text", left: 100, top: 100, text: "GRAND\nOPENING", fontFamily: "Anton", fontSize: 280, fill: "#0A0A06", lineHeight: 0.9 },
      { type: "rect", left: 100, top: 880, width: 800, height: 8, fill: "#FF4D2E" },
      { type: "text", left: 100, top: 940, text: "Saturday · 7pm onwards", fontFamily: "Playfair Display", fontSize: 80, fill: "#0A0A06" },
      { type: "circle", left: 1200, top: 1500, radius: 350, fill: "#FF4D2E" },
      { type: "text", left: 1290, top: 1750, text: "FREE\nENTRY", fontFamily: "Bebas Neue", fontSize: 100, fill: "#FFFCF5", textAlign: "center", lineHeight: 0.95 },
      { type: "text", left: 100, top: 2200, text: "The Venue\n123 Street, Bangalore", fontFamily: "Inter", fontSize: 50, fill: "#0A0A06", lineHeight: 1.4 },
    ],
  },
  {
    id: "concert-bold", name: "Concert Night", category: "event", size: "A5",
    background: "#0A0A06", thumbColors: ["#0A0A06", "#FFAA00"],
    objects: [
      { type: "text", left: 100, top: 200, text: "LIVE", fontFamily: "Bungee", fontSize: 280, fill: "#FFAA00" },
      { type: "text", left: 100, top: 550, text: "MUSIC", fontFamily: "Bungee", fontSize: 280, fill: "#FF4D2E" },
      { type: "text", left: 100, top: 900, text: "NIGHT", fontFamily: "Bungee", fontSize: 280, fill: "#7DA8E5" },
      { type: "rect", left: 100, top: 1400, width: 1548, height: 4, fill: "#FFFCF5" },
      { type: "text", left: 100, top: 1480, text: "Sat · 8pm · Cubbon Park Bandstand", fontFamily: "Inter", fontSize: 60, fontWeight: 700, fill: "#FFFCF5" },
      { type: "text", left: 100, top: 1600, text: "₹500 entry · Food & drinks inside", fontFamily: "Inter", fontSize: 50, fill: "#FFAA00" },
      { type: "text", left: 100, top: 2200, text: "Featuring", fontFamily: "Inter", fontSize: 50, fontStyle: "italic", fill: "#8C8C7A" },
      { type: "text", left: 100, top: 2280, text: "THE COLLECTIVE", fontFamily: "Bebas Neue", fontSize: 130, fill: "#FFFCF5", charSpacing: 60 },
    ],
  },
  {
    id: "workshop-clean", name: "Workshop", category: "event", size: "A5",
    background: "#FFFCF5", thumbColors: ["#FFFCF5", "#2E4A6B"],
    objects: [
      { type: "rect", left: 100, top: 100, width: 600, height: 80, fill: "#2E4A6B", rx: 40 },
      { type: "text", left: 200, top: 120, text: "WORKSHOP", fontFamily: "Inter", fontSize: 50, fontWeight: 700, fill: "#FFFCF5", charSpacing: 40 },
      { type: "text", left: 100, top: 350, text: "Learn the art\nof pottery", fontFamily: "Playfair Display", fontSize: 260, fontWeight: 700, fill: "#0A0A06", lineHeight: 0.95 },
      { type: "text", left: 100, top: 1100, text: "with Master Crafter Ramesh", fontFamily: "Playfair Display", fontSize: 80, fontStyle: "italic", fill: "#5C5C4D" },
      { type: "rect", left: 100, top: 1400, width: 1548, height: 600, fill: "#F2E8DC" },
      { type: "text", left: 200, top: 1450, text: "SAT 12 OCT", fontFamily: "Bebas Neue", fontSize: 120, fill: "#2E4A6B", charSpacing: 40 },
      { type: "text", left: 200, top: 1620, text: "10 AM · 4 PM", fontFamily: "Bebas Neue", fontSize: 90, fill: "#0A0A06" },
      { type: "text", left: 200, top: 1800, text: "₹2,500 · materials included", fontFamily: "Inter", fontSize: 50, fill: "#3E3E33" },
      { type: "text", left: 100, top: 2200, text: "RSVP +91 98765 43210", fontFamily: "Inter", fontSize: 60, fontWeight: 700, fill: "#0A0A06" },
    ],
  },
  {
    id: "fleamarket", name: "Flea Market", category: "event", size: "A5",
    background: "#FF6B41", thumbColors: ["#FF6B41", "#FFFCF5"],
    objects: [
      { type: "rect", left: 0, top: 0, width: 1748, height: 2480, fill: "#FF6B41" },
      { type: "text", left: 100, top: 200, text: "WEEKEND\nFLEA MARKET", fontFamily: "Bungee Shade", fontSize: 200, fill: "#FFFCF5", lineHeight: 0.95 },
      { type: "circle", left: 1000, top: 1200, radius: 350, fill: "#0A0A06" },
      { type: "text", left: 1080, top: 1370, text: "120+\nSTALLS", fontFamily: "Bebas Neue", fontSize: 130, fill: "#FFFCF5", textAlign: "center", lineHeight: 1 },
      { type: "text", left: 100, top: 1900, text: "Vintage · Crafts\nFood · Music", fontFamily: "Playfair Display", fontSize: 130, fontWeight: 700, fill: "#FFFCF5", lineHeight: 1.1 },
      { type: "rect", left: 100, top: 2300, width: 1548, height: 110, fill: "#0A0A06", rx: 55 },
      { type: "text", left: 220, top: 2330, text: "SAT - SUN · 10AM ONWARDS · LALBAGH", fontFamily: "Bebas Neue", fontSize: 65, fill: "#FFAA00", charSpacing: 30 },
    ],
  },
  {
    id: "exhibition", name: "Exhibition", category: "event", size: "A4",
    background: "#0A0A06", thumbColors: ["#0A0A06", "#FFAA00"],
    objects: [
      { type: "text", left: 200, top: 200, text: "art", fontFamily: "DM Serif Display", fontSize: 350, fontStyle: "italic", fill: "#FFAA00" },
      { type: "text", left: 200, top: 600, text: "EXHIBITION", fontFamily: "Bebas Neue", fontSize: 280, fill: "#FFFCF5", charSpacing: 80 },
      { type: "rect", left: 200, top: 1100, width: 600, height: 4, fill: "#FFAA00" },
      { type: "text", left: 200, top: 1200, text: "Contemporary works\nby Karnataka artists", fontFamily: "Playfair Display", fontSize: 150, fontStyle: "italic", fill: "#FFFCF5", lineHeight: 1.15 },
      { type: "text", left: 200, top: 2800, text: "10 — 15 NOV", fontFamily: "Bebas Neue", fontSize: 200, fill: "#FFAA00", charSpacing: 30 },
      { type: "text", left: 200, top: 3050, text: "Karnataka Chitrakala Parishath", fontFamily: "Inter", fontSize: 60, fill: "#FFFCF5" },
      { type: "text", left: 200, top: 3140, text: "11 AM — 8 PM · Free entry", fontFamily: "Inter", fontSize: 50, fill: "#8C8C7A" },
    ],
  },

  // SALE (4)
  {
    id: "sale-50", name: "50% Off", category: "sale", size: "A5",
    background: "#FF4D2E", thumbColors: ["#FF4D2E", "#FFFCF5"],
    objects: [
      { type: "text", left: 100, top: 100, text: "FLAT", fontFamily: "Bebas Neue", fontSize: 180, fill: "#FFFCF5", charSpacing: 100 },
      { type: "text", left: 100, top: 280, text: "50%", fontFamily: "Anton", fontSize: 1100, fill: "#FFFCF5", lineHeight: 0.85 },
      { type: "text", left: 100, top: 1500, text: "OFF EVERYTHING", fontFamily: "Bebas Neue", fontSize: 180, fill: "#0A0A06", charSpacing: 60 },
      { type: "rect", left: 100, top: 2100, width: 1548, height: 240, fill: "#0A0A06", rx: 120 },
      { type: "text", left: 250, top: 2170, text: "WEEKEND ONLY · STORE NAME", fontFamily: "Bebas Neue", fontSize: 90, fill: "#FFFCF5", charSpacing: 50 },
    ],
  },
  {
    id: "sale-mega", name: "Mega Sale", category: "sale", size: "A5",
    background: "#FFFCF5", thumbColors: ["#FFFCF5", "#FF4D2E"],
    objects: [
      { type: "rect", left: 0, top: 0, width: 1748, height: 600, fill: "#0A0A06" },
      { type: "text", left: 200, top: 200, text: "MEGA SALE", fontFamily: "Black Ops One", fontSize: 240, fill: "#FFAA00", charSpacing: 30 },
      { type: "text", left: 100, top: 800, text: "Up to", fontFamily: "Inter", fontSize: 90, fill: "#3E3E33" },
      { type: "text", left: 100, top: 900, text: "70%", fontFamily: "Anton", fontSize: 900, fill: "#FF4D2E", lineHeight: 0.85 },
      { type: "text", left: 100, top: 1850, text: "OFF", fontFamily: "Anton", fontSize: 400, fill: "#0A0A06" },
      { type: "text", left: 700, top: 2050, text: "select\nitems", fontFamily: "Playfair Display", fontSize: 110, fontStyle: "italic", fill: "#5C5C4D", lineHeight: 1 },
      { type: "rect", left: 100, top: 2300, width: 1548, height: 110, fill: "#FF4D2E", rx: 55 },
      { type: "text", left: 200, top: 2335, text: "ENDS SUNDAY · STORE NAME", fontFamily: "Bebas Neue", fontSize: 70, fill: "#FFFCF5", charSpacing: 40 },
    ],
  },
  {
    id: "buy-one", name: "Buy 1 Get 1", category: "sale", size: "A5",
    background: "#FFAA00", thumbColors: ["#FFAA00", "#0A0A06"],
    objects: [
      { type: "text", left: 100, top: 200, text: "BUY 1", fontFamily: "Bungee", fontSize: 360, fill: "#0A0A06" },
      { type: "text", left: 100, top: 700, text: "GET 1", fontFamily: "Bungee", fontSize: 360, fill: "#9C1F12" },
      { type: "text", left: 100, top: 1200, text: "FREE!", fontFamily: "Bungee", fontSize: 400, fill: "#FFFCF5" },
      { type: "text", left: 100, top: 1800, text: "On all summer wear", fontFamily: "Playfair Display", fontSize: 100, fontStyle: "italic", fill: "#0A0A06" },
      { type: "text", left: 100, top: 2200, text: "WEEKEND ONLY", fontFamily: "Bebas Neue", fontSize: 110, fill: "#0A0A06", charSpacing: 50 },
      { type: "text", left: 100, top: 2330, text: "Sat & Sun · 11 AM - 8 PM", fontFamily: "Inter", fontSize: 50, fill: "#3E3E33" },
    ],
  },
  {
    id: "clearance", name: "Clearance", category: "sale", size: "A4",
    background: "#9C1F12", thumbColors: ["#9C1F12", "#FFFCF5"],
    objects: [
      { type: "text", left: 200, top: 200, text: "CLEAR", fontFamily: "Bebas Neue", fontSize: 600, fill: "#FFFCF5", charSpacing: 60 },
      { type: "text", left: 200, top: 800, text: "ANCE", fontFamily: "Bebas Neue", fontSize: 600, fill: "#FFFCF5", charSpacing: 60 },
      { type: "text", left: 200, top: 1500, text: "STOCK MUST", fontFamily: "Inter", fontSize: 90, fontWeight: 900, fill: "#FFAA00", charSpacing: 40 },
      { type: "text", left: 200, top: 1620, text: "GO!", fontFamily: "Bungee", fontSize: 280, fill: "#FFAA00" },
      { type: "rect", left: 200, top: 2700, width: 2080, height: 200, fill: "#FFFCF5" },
      { type: "text", left: 280, top: 2755, text: "EVERYTHING UP TO 80% OFF", fontFamily: "Bebas Neue", fontSize: 100, fill: "#9C1F12", charSpacing: 30 },
      { type: "text", left: 200, top: 3100, text: "20 OCT — 27 OCT · STORE NAME", fontFamily: "Inter", fontSize: 60, fill: "#FFFCF5" },
    ],
  },

  // FITNESS (3)
  {
    id: "yoga-calm", name: "Yoga Retreat", category: "fitness", size: "A5",
    background: "#F2E8DC", thumbColors: ["#F2E8DC", "#5C5C4D"],
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
    id: "gym-bold", name: "Gym Membership", category: "fitness", size: "A5",
    background: "#0A0A06", thumbColors: ["#0A0A06", "#FFAA00"],
    objects: [
      { type: "text", left: 100, top: 100, text: "GET", fontFamily: "Bebas Neue", fontSize: 300, fill: "#FFAA00", charSpacing: 40 },
      { type: "text", left: 100, top: 350, text: "STRONG", fontFamily: "Bebas Neue", fontSize: 480, fill: "#FFFCF5", charSpacing: 40 },
      { type: "text", left: 100, top: 800, text: "STAY HUNGRY", fontFamily: "Bebas Neue", fontSize: 300, fill: "#FF4D2E", charSpacing: 40 },
      { type: "rect", left: 100, top: 1400, width: 1548, height: 4, fill: "#FFAA00" },
      { type: "text", left: 100, top: 1500, text: "FIRST MONTH FREE", fontFamily: "Bebas Neue", fontSize: 180, fill: "#FFAA00", charSpacing: 40 },
      { type: "text", left: 100, top: 1750, text: "Personal training · Group classes · Spa", fontFamily: "Inter", fontSize: 50, fill: "#FFFCF5" },
      { type: "rect", left: 100, top: 2200, width: 1548, height: 200, fill: "#FF4D2E", rx: 100 },
      { type: "text", left: 220, top: 2250, text: "JOIN NOW · IRONWORKS GYM", fontFamily: "Bebas Neue", fontSize: 90, fill: "#FFFCF5", charSpacing: 40 },
    ],
  },
  {
    id: "marathon", name: "Marathon", category: "fitness", size: "A5",
    background: "#FFFCF5", thumbColors: ["#FFFCF5", "#FF4D2E"],
    objects: [
      { type: "text", left: 100, top: 150, text: "RUN.", fontFamily: "Anton", fontSize: 500, fill: "#FF4D2E", charSpacing: 30 },
      { type: "text", left: 100, top: 650, text: "RUN.", fontFamily: "Anton", fontSize: 500, fill: "#FF6B41", charSpacing: 30 },
      { type: "text", left: 100, top: 1150, text: "RUN.", fontFamily: "Anton", fontSize: 500, fill: "#FFAA00", charSpacing: 30 },
      { type: "rect", left: 100, top: 1850, width: 1548, height: 4, fill: "#0A0A06" },
      { type: "text", left: 100, top: 1950, text: "BANGALORE MARATHON 2026", fontFamily: "Bebas Neue", fontSize: 130, fill: "#0A0A06", charSpacing: 40 },
      { type: "text", left: 100, top: 2150, text: "10 KM · 21 KM · 42 KM", fontFamily: "Inter", fontSize: 70, fontWeight: 700, fill: "#FF4D2E" },
      { type: "text", left: 100, top: 2290, text: "Sun 12 Jan · 5 AM · Cubbon Park", fontFamily: "Inter", fontSize: 50, fill: "#3E3E33" },
    ],
  },

  // REAL ESTATE (3)
  {
    id: "realestate-modern", name: "Modern Listing", category: "real-estate", size: "A4",
    background: "#FFFCF5", thumbColors: ["#FFFCF5", "#0A0A06"],
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
    id: "rent-listing", name: "For Rent", category: "real-estate", size: "A5",
    background: "#1B4332", thumbColors: ["#1B4332", "#FFFCF5"],
    objects: [
      { type: "text", left: 100, top: 100, text: "FOR RENT", fontFamily: "Bebas Neue", fontSize: 200, fill: "#52B788", charSpacing: 80 },
      { type: "rect", left: 100, top: 360, width: 200, height: 4, fill: "#FFFCF5" },
      { type: "text", left: 100, top: 500, text: "2 BHK", fontFamily: "Playfair Display", fontSize: 280, fontWeight: 700, fill: "#FFFCF5" },
      { type: "text", left: 100, top: 800, text: "Independent\nHouse", fontFamily: "Playfair Display", fontSize: 200, fontWeight: 400, fontStyle: "italic", fill: "#52B788", lineHeight: 1 },
      { type: "rect", left: 100, top: 1500, width: 1548, height: 400, fill: "#FFFCF5" },
      { type: "text", left: 200, top: 1550, text: "₹ 28,000/month", fontFamily: "Bebas Neue", fontSize: 160, fill: "#1B4332", charSpacing: 30 },
      { type: "text", left: 200, top: 1750, text: "1,200 sqft · Furnished · Parking", fontFamily: "Inter", fontSize: 55, fill: "#3E3E33" },
      { type: "text", left: 100, top: 2200, text: "VIEW TODAY", fontFamily: "Bebas Neue", fontSize: 100, fill: "#FFFCF5", charSpacing: 40 },
      { type: "text", left: 100, top: 2320, text: "+91 98765 43210 · HSR Layout", fontFamily: "Inter", fontSize: 50, fill: "#95D5B2" },
    ],
  },
  {
    id: "open-house", name: "Open House", category: "real-estate", size: "A5",
    background: "#F7F4ED", thumbColors: ["#F7F4ED", "#2E4A6B"],
    objects: [
      { type: "text", left: 100, top: 200, text: "OPEN", fontFamily: "Anton", fontSize: 500, fill: "#2E4A6B" },
      { type: "text", left: 100, top: 700, text: "HOUSE", fontFamily: "Anton", fontSize: 500, fill: "#0A0A06" },
      { type: "text", left: 100, top: 1300, text: "Sunday · 11 AM — 4 PM", fontFamily: "Playfair Display", fontSize: 90, fontStyle: "italic", fill: "#3E3E33" },
      { type: "rect", left: 100, top: 1600, width: 1548, height: 300, fill: "#2E4A6B" },
      { type: "text", left: 200, top: 1660, text: "4 BHK VILLA · GATED COMMUNITY", fontFamily: "Bebas Neue", fontSize: 90, fill: "#FFFCF5", charSpacing: 40 },
      { type: "text", left: 200, top: 1780, text: "₹ 3.25 Cr · 2,400 sqft · 4 bed · 4 bath", fontFamily: "Inter", fontSize: 50, fill: "#FFFCF5" },
      { type: "text", left: 100, top: 2050, text: "12 Whitefield Main Road", fontFamily: "Inter", fontSize: 60, fontWeight: 700, fill: "#0A0A06" },
      { type: "text", left: 100, top: 2200, text: "Refreshments served\n+91 98765 43210", fontFamily: "Inter", fontSize: 50, fill: "#3E3E33", lineHeight: 1.5 },
    ],
  },

  // RETAIL (3)
  {
    id: "retail-clean", name: "New Collection", category: "retail", size: "A5",
    background: "#FFFCF5", thumbColors: ["#FFFCF5", "#FF4D2E"],
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
  {
    id: "boutique", name: "Boutique Opening", category: "retail", size: "A5",
    background: "#9C1F12", thumbColors: ["#9C1F12", "#F7F4ED"],
    objects: [
      { type: "text", left: 100, top: 200, text: "Now\nopen.", fontFamily: "Playfair Display", fontSize: 480, fontStyle: "italic", fontWeight: 400, fill: "#F7F4ED", lineHeight: 0.95 },
      { type: "rect", left: 100, top: 1200, width: 200, height: 4, fill: "#FFAA00" },
      { type: "text", left: 100, top: 1300, text: "THE\nBOUTIQUE", fontFamily: "Bebas Neue", fontSize: 200, fill: "#F7F4ED", charSpacing: 60, lineHeight: 1 },
      { type: "text", left: 100, top: 1900, text: "Hand-curated apparel\nFor every occasion", fontFamily: "Playfair Display", fontSize: 80, fontStyle: "italic", fill: "#FFAA00", lineHeight: 1.3 },
      { type: "text", left: 100, top: 2200, text: "Indiranagar 100 Ft Road", fontFamily: "Inter", fontSize: 55, fill: "#F7F4ED" },
      { type: "text", left: 100, top: 2300, text: "@theboutique.in", fontFamily: "Inter", fontSize: 55, fontWeight: 700, fill: "#FFAA00" },
    ],
  },
  {
    id: "shoe-launch", name: "Sneaker Drop", category: "retail", size: "A5",
    background: "#FFFCF5", thumbColors: ["#FFFCF5", "#0A0A06"],
    objects: [
      { type: "rect", left: 0, top: 0, width: 1748, height: 500, fill: "#FF4D2E" },
      { type: "text", left: 100, top: 150, text: "DROP 04", fontFamily: "Bebas Neue", fontSize: 250, fill: "#FFFCF5", charSpacing: 50 },
      { type: "text", left: 100, top: 650, text: "THE", fontFamily: "Bebas Neue", fontSize: 220, fill: "#0A0A06", charSpacing: 50 },
      { type: "text", left: 100, top: 870, text: "AURORA", fontFamily: "Bebas Neue", fontSize: 380, fill: "#0A0A06", charSpacing: 50 },
      { type: "text", left: 100, top: 1300, text: "Sneakers reimagined", fontFamily: "Playfair Display", fontSize: 100, fontStyle: "italic", fill: "#5C5C4D" },
      { type: "circle", left: 1100, top: 1700, radius: 280, fill: "#FF4D2E" },
      { type: "text", left: 1190, top: 1900, text: "₹6,499", fontFamily: "Bebas Neue", fontSize: 120, fill: "#FFFCF5", charSpacing: 30 },
      { type: "text", left: 100, top: 2300, text: "DROPS 12 OCT · 11 AM IST", fontFamily: "Bebas Neue", fontSize: 90, fill: "#0A0A06", charSpacing: 40 },
    ],
  },

  // FESTIVAL (3)
  {
    id: "diwali", name: "Diwali", category: "festival", size: "A5",
    background: "#9C1F12", thumbColors: ["#9C1F12", "#FFAA00"],
    objects: [
      { type: "text", left: 100, top: 200, text: "Shubh", fontFamily: "Dancing Script", fontSize: 280, fill: "#FFAA00" },
      { type: "text", left: 100, top: 500, text: "DIWALI", fontFamily: "Bungee Shade", fontSize: 380, fill: "#FFFCF5", charSpacing: 30 },
      { type: "circle", left: 1300, top: 1300, radius: 220, fill: "#FFAA00" },
      { type: "circle", left: 1300, top: 1300, radius: 160, fill: "#9C1F12" },
      { type: "circle", left: 1300, top: 1300, radius: 100, fill: "#FFAA00" },
      { type: "text", left: 100, top: 1700, text: "Festival of lights\nFestival of joy", fontFamily: "Playfair Display", fontSize: 120, fontStyle: "italic", fill: "#FFAA00", lineHeight: 1.2 },
      { type: "rect", left: 100, top: 2100, width: 1548, height: 200, fill: "#FFAA00" },
      { type: "text", left: 200, top: 2160, text: "50% OFF · DIWALI SPECIAL", fontFamily: "Bebas Neue", fontSize: 100, fill: "#9C1F12", charSpacing: 40 },
    ],
  },
  {
    id: "holi", name: "Holi", category: "festival", size: "A5",
    background: "#FFFCF5", thumbColors: ["#FFFCF5", "#FF4D2E"],
    objects: [
      { type: "circle", left: 200, top: 200, radius: 200, fill: "#FF4D2E" },
      { type: "circle", left: 800, top: 100, radius: 150, fill: "#FFAA00" },
      { type: "circle", left: 1400, top: 300, radius: 180, fill: "#52B788" },
      { type: "circle", left: 1500, top: 800, radius: 120, fill: "#7DA8E5" },
      { type: "circle", left: 200, top: 700, radius: 100, fill: "#9C1F12" },
      { type: "text", left: 100, top: 1100, text: "HAPPY", fontFamily: "Bungee", fontSize: 300, fill: "#FF4D2E" },
      { type: "text", left: 100, top: 1500, text: "HOLI", fontFamily: "Bungee", fontSize: 400, fill: "#0A0A06" },
      { type: "text", left: 100, top: 2100, text: "Let colors paint our friendship", fontFamily: "Playfair Display", fontSize: 90, fontStyle: "italic", fill: "#3E3E33" },
      { type: "text", left: 100, top: 2300, text: "FROM CLICK PRINT TEAM", fontFamily: "Inter", fontSize: 50, fontWeight: 700, fill: "#0A0A06", charSpacing: 50 },
    ],
  },
  {
    id: "ganesh", name: "Ganesh Chaturthi", category: "festival", size: "A5",
    background: "#FF6B41", thumbColors: ["#FF6B41", "#FFFCF5"],
    objects: [
      { type: "text", left: 100, top: 200, text: "Ganpati", fontFamily: "Playfair Display", fontSize: 240, fontStyle: "italic", fill: "#FFFCF5" },
      { type: "text", left: 100, top: 500, text: "Bappa", fontFamily: "Bungee", fontSize: 360, fill: "#FFAA00" },
      { type: "text", left: 100, top: 900, text: "Morya!", fontFamily: "Playfair Display", fontSize: 240, fontStyle: "italic", fontWeight: 700, fill: "#FFFCF5" },
      { type: "rect", left: 100, top: 1400, width: 1548, height: 4, fill: "#FFFCF5" },
      { type: "text", left: 100, top: 1500, text: "10 DAY FESTIVITIES", fontFamily: "Bebas Neue", fontSize: 130, fill: "#FFFCF5", charSpacing: 50 },
      { type: "text", left: 100, top: 1700, text: "Visit our pandal · 7 PM aarti daily", fontFamily: "Inter", fontSize: 55, fill: "#FFFCF5" },
      { type: "rect", left: 100, top: 2200, width: 1548, height: 200, fill: "#9C1F12", rx: 100 },
      { type: "text", left: 250, top: 2255, text: "BANGALORE COMMUNITY HALL", fontFamily: "Bebas Neue", fontSize: 80, fill: "#FFAA00", charSpacing: 40 },
    ],
  },

  // EDUCATION (2)
  {
    id: "tuition", name: "Tuition Class", category: "education", size: "A5",
    background: "#2E4A6B", thumbColors: ["#2E4A6B", "#FFAA00"],
    objects: [
      { type: "text", left: 100, top: 200, text: "ADMISSIONS", fontFamily: "Bebas Neue", fontSize: 120, fill: "#FFAA00", charSpacing: 70 },
      { type: "text", left: 100, top: 400, text: "OPEN", fontFamily: "Anton", fontSize: 380, fill: "#FFFCF5" },
      { type: "rect", left: 100, top: 850, width: 200, height: 6, fill: "#FFAA00" },
      { type: "text", left: 100, top: 950, text: "Math · Science · Coding", fontFamily: "Playfair Display", fontSize: 130, fontStyle: "italic", fill: "#FFFCF5" },
      { type: "text", left: 100, top: 1200, text: "Classes 8 to 12", fontFamily: "Inter", fontSize: 70, fontWeight: 700, fill: "#FFAA00" },
      { type: "rect", left: 100, top: 1500, width: 1548, height: 600, fill: "#FFFCF5", rx: 20 },
      { type: "text", left: 200, top: 1560, text: "WHY CHOOSE US", fontFamily: "Inter", fontSize: 50, fontWeight: 700, fill: "#2E4A6B", charSpacing: 40 },
      { type: "text", left: 200, top: 1680, text: "✓ Small batch · max 8 students\n✓ Personal mentoring\n✓ Weekly mock tests\n✓ 95% board pass rate", fontFamily: "Inter", fontSize: 55, fill: "#0A0A06", lineHeight: 1.5 },
      { type: "text", left: 100, top: 2200, text: "Bright Minds Academy · 9876543210", fontFamily: "Inter", fontSize: 50, fill: "#FFFCF5" },
    ],
  },
  {
    id: "course-launch", name: "Course Launch", category: "education", size: "A5",
    background: "#FFFCF5", thumbColors: ["#FFFCF5", "#FF4D2E"],
    objects: [
      { type: "rect", left: 0, top: 0, width: 1748, height: 400, fill: "#FF4D2E" },
      { type: "text", left: 100, top: 130, text: "NEW COURSE", fontFamily: "Bebas Neue", fontSize: 140, fill: "#FFFCF5", charSpacing: 60 },
      { type: "text", left: 100, top: 550, text: "Learn", fontFamily: "Playfair Display", fontSize: 200, fontStyle: "italic", fill: "#5C5C4D" },
      { type: "text", left: 100, top: 770, text: "DIGITAL", fontFamily: "Bebas Neue", fontSize: 320, fill: "#0A0A06", charSpacing: 40 },
      { type: "text", left: 100, top: 1080, text: "MARKETING", fontFamily: "Bebas Neue", fontSize: 320, fill: "#FF4D2E", charSpacing: 40 },
      { type: "text", left: 100, top: 1550, text: "with industry mentors", fontFamily: "Playfair Display", fontSize: 100, fontStyle: "italic", fill: "#3E3E33" },
      { type: "rect", left: 100, top: 1800, width: 1548, height: 4, fill: "#0A0A06" },
      { type: "text", left: 100, top: 1900, text: "12 WEEKS · WEEKEND ONLY · ₹25,000", fontFamily: "Bebas Neue", fontSize: 90, fill: "#0A0A06", charSpacing: 40 },
      { type: "text", left: 100, top: 2050, text: "Cohort starts 15 Nov · Limited seats", fontFamily: "Inter", fontSize: 50, fill: "#5C5C4D" },
      { type: "text", left: 100, top: 2300, text: "Apply: marketingacademy.in", fontFamily: "Inter", fontSize: 60, fontWeight: 700, fill: "#FF4D2E" },
    ],
  },

  // WEDDING (2)
  {
    id: "wedding-invite", name: "Wedding Invite", category: "wedding", size: "A5",
    background: "#F7F4ED", thumbColors: ["#F7F4ED", "#9C1F12"],
    objects: [
      { type: "text", left: 100, top: 200, text: "Together", fontFamily: "Allura", fontSize: 220, fill: "#9C1F12" },
      { type: "text", left: 100, top: 450, text: "WITH OUR FAMILIES", fontFamily: "Inter", fontSize: 50, fontWeight: 700, fill: "#5C5C4D", charSpacing: 50 },
      { type: "text", left: 100, top: 700, text: "Priya", fontFamily: "Cormorant Garamond", fontSize: 260, fontStyle: "italic", fontWeight: 700, fill: "#0A0A06" },
      { type: "text", left: 100, top: 950, text: "&", fontFamily: "Allura", fontSize: 200, fill: "#9C1F12" },
      { type: "text", left: 100, top: 1150, text: "Arjun", fontFamily: "Cormorant Garamond", fontSize: 260, fontStyle: "italic", fontWeight: 700, fill: "#0A0A06" },
      { type: "rect", left: 600, top: 1500, width: 540, height: 2, fill: "#9C1F12" },
      { type: "text", left: 100, top: 1600, text: "WED, NOV 22", fontFamily: "Bebas Neue", fontSize: 140, fill: "#9C1F12", charSpacing: 70 },
      { type: "text", left: 100, top: 1820, text: "Grand Hotel · 6 PM onwards", fontFamily: "Playfair Display", fontSize: 80, fontStyle: "italic", fill: "#5C5C4D" },
      { type: "text", left: 100, top: 2200, text: "With love,\nPriya & Arjun", fontFamily: "Cormorant Garamond", fontSize: 80, fontStyle: "italic", fill: "#0A0A06", lineHeight: 1.4 },
    ],
  },
  {
    id: "save-date", name: "Save the Date", category: "wedding", size: "A5",
    background: "#3E3E33", thumbColors: ["#3E3E33", "#FFAA00"],
    objects: [
      { type: "text", left: 100, top: 200, text: "save the date", fontFamily: "Dancing Script", fontSize: 200, fontStyle: "italic", fill: "#FFAA00" },
      { type: "rect", left: 100, top: 600, width: 1548, height: 4, fill: "#FFAA00" },
      { type: "text", left: 100, top: 800, text: "22.11.2026", fontFamily: "Bebas Neue", fontSize: 440, fill: "#FFFCF5", charSpacing: 30 },
      { type: "text", left: 100, top: 1500, text: "S · M · Wedding", fontFamily: "Playfair Display", fontSize: 130, fontStyle: "italic", fill: "#FFAA00" },
      { type: "text", left: 100, top: 2000, text: "Sneha + Madhav", fontFamily: "Cormorant Garamond", fontSize: 180, fontStyle: "italic", fontWeight: 700, fill: "#FFFCF5" },
      { type: "text", left: 100, top: 2300, text: "Formal invitation to follow", fontFamily: "Inter", fontSize: 50, fontStyle: "italic", fill: "#C8C8B7" },
    ],
  },

  // SERVICE (2)
  {
    id: "salon", name: "Salon Opening", category: "service", size: "A5",
    background: "#FF6B41", thumbColors: ["#FF6B41", "#0A0A06"],
    objects: [
      { type: "text", left: 100, top: 200, text: "GLOW", fontFamily: "Bebas Neue", fontSize: 480, fill: "#FFFCF5", charSpacing: 80 },
      { type: "text", left: 100, top: 700, text: "Up", fontFamily: "Allura", fontSize: 280, fill: "#0A0A06" },
      { type: "text", left: 100, top: 1050, text: "SALON & SPA", fontFamily: "Bebas Neue", fontSize: 220, fill: "#0A0A06", charSpacing: 50 },
      { type: "rect", left: 100, top: 1400, width: 1548, height: 200, fill: "#FFFCF5" },
      { type: "text", left: 200, top: 1450, text: "FREE consultation", fontFamily: "Inter", fontSize: 60, fontWeight: 700, fill: "#FF4D2E" },
      { type: "text", left: 200, top: 1525, text: "on your first visit", fontFamily: "Inter", fontSize: 50, fill: "#3E3E33" },
      { type: "text", left: 100, top: 1750, text: "Haircut · Color · Treatment\nBridal · Spa · Nails", fontFamily: "Playfair Display", fontSize: 90, fontStyle: "italic", fill: "#FFFCF5", lineHeight: 1.3 },
      { type: "text", left: 100, top: 2200, text: "BOOK NOW", fontFamily: "Bebas Neue", fontSize: 110, fill: "#0A0A06", charSpacing: 40 },
      { type: "text", left: 100, top: 2330, text: "+91 98765 43210 · Indiranagar 12th main", fontFamily: "Inter", fontSize: 45, fill: "#0A0A06" },
    ],
  },
  {
    id: "plumber", name: "Plumber Card", category: "service", size: "A5",
    background: "#7DA8E5", thumbColors: ["#7DA8E5", "#0A0A06"],
    objects: [
      { type: "rect", left: 0, top: 0, width: 1748, height: 600, fill: "#0A0A06" },
      { type: "text", left: 100, top: 180, text: "RAVI", fontFamily: "Bebas Neue", fontSize: 240, fill: "#FFAA00", charSpacing: 60 },
      { type: "text", left: 100, top: 400, text: "PLUMBING SERVICES", fontFamily: "Bebas Neue", fontSize: 100, fill: "#FFFCF5", charSpacing: 50 },
      { type: "text", left: 100, top: 800, text: "24/7", fontFamily: "Anton", fontSize: 500, fill: "#0A0A06" },
      { type: "text", left: 100, top: 1500, text: "EMERGENCY CALL", fontFamily: "Bebas Neue", fontSize: 140, fill: "#0A0A06", charSpacing: 40 },
      { type: "text", left: 100, top: 1700, text: "+91 98765 43210", fontFamily: "Bebas Neue", fontSize: 180, fill: "#FFFCF5", charSpacing: 30 },
      { type: "rect", left: 100, top: 2000, width: 1548, height: 4, fill: "#0A0A06" },
      { type: "text", left: 100, top: 2080, text: "Leaks · Drains · Installation · Repairs", fontFamily: "Inter", fontSize: 55, fontWeight: 700, fill: "#0A0A06" },
      { type: "text", left: 100, top: 2200, text: "10+ years experience · Verified", fontFamily: "Inter", fontSize: 50, fill: "#0A0A06" },
      { type: "text", left: 100, top: 2300, text: "Whitefield · HSR · Koramangala", fontFamily: "Inter", fontSize: 45, fill: "#0A0A06" },
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
