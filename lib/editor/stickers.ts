/**
 * Curated SVG stickers for flyer design.
 * Each is a self-contained SVG string (24x24 viewBox at design size).
 * Loaded via Fabric.util.loadSVGFromString and grouped on canvas.
 */

export type StickerCategory = "shapes" | "celebration" | "food" | "decor" | "arrows" | "icons";

export type Sticker = {
  id: string;
  category: StickerCategory;
  name: string;
  svg: string;
};

// Helper: wrap a path in a 200x200 SVG with a fill
const make = (name: string, fill: string, body: string, vb = "0 0 200 200"): Sticker => ({
  id: name,
  category: "icons",
  name,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="200" height="200">${body.replace(/{fill}/g, fill)}</svg>`,
});

export const STICKERS: Sticker[] = [
  // Celebration
  { id: "star-burst", category: "celebration", name: "Star burst",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M100 10 L 115 75 L 180 80 L 130 120 L 150 185 L 100 145 L 50 185 L 70 120 L 20 80 L 85 75 Z" fill="#FFAA00"/></svg>` },
  { id: "confetti", category: "celebration", name: "Confetti",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <rect x="20" y="40" width="10" height="30" fill="#FF4D2E" transform="rotate(20 25 55)"/>
      <rect x="60" y="20" width="10" height="30" fill="#FFAA00" transform="rotate(-15 65 35)"/>
      <rect x="120" y="50" width="10" height="30" fill="#52B788" transform="rotate(35 125 65)"/>
      <rect x="160" y="30" width="10" height="30" fill="#7DA8E5" transform="rotate(-25 165 45)"/>
      <rect x="40" y="140" width="10" height="30" fill="#FF6B41" transform="rotate(45 45 155)"/>
      <rect x="100" y="160" width="10" height="30" fill="#FFC547" transform="rotate(-30 105 175)"/>
      <rect x="150" y="120" width="10" height="30" fill="#2D6A4F" transform="rotate(15 155 135)"/>
    </svg>` },
  { id: "fireworks", category: "celebration", name: "Fireworks",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><g stroke="#FF4D2E" stroke-width="6" stroke-linecap="round" fill="none"><line x1="100" y1="100" x2="100" y2="30"/><line x1="100" y1="100" x2="170" y2="100"/><line x1="100" y1="100" x2="100" y2="170"/><line x1="100" y1="100" x2="30" y2="100"/><line x1="100" y1="100" x2="150" y2="50"/><line x1="100" y1="100" x2="150" y2="150"/><line x1="100" y1="100" x2="50" y2="150"/><line x1="100" y1="100" x2="50" y2="50"/></g><circle cx="100" cy="100" r="10" fill="#FFAA00"/></svg>` },
  { id: "gift", category: "celebration", name: "Gift",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect x="40" y="70" width="120" height="100" fill="#FF4D2E"/><rect x="95" y="70" width="10" height="100" fill="#FFAA00"/><rect x="30" y="65" width="140" height="20" fill="#FF6B41"/><rect x="95" y="65" width="10" height="20" fill="#FFAA00"/><path d="M 70 65 Q 60 35 80 35 Q 100 35 100 60 Q 100 35 120 35 Q 140 35 130 65" stroke="#FFAA00" stroke-width="8" fill="none"/></svg>` },

  // Food
  { id: "pizza", category: "food", name: "Pizza",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M100 20 L 180 180 L 20 180 Z" fill="#FFAA00" stroke="#9C1F12" stroke-width="6"/><circle cx="100" cy="100" r="10" fill="#FF4D2E"/><circle cx="70" cy="140" r="8" fill="#FF4D2E"/><circle cx="130" cy="140" r="8" fill="#FF4D2E"/><circle cx="85" cy="110" r="6" fill="#52B788"/><circle cx="120" cy="110" r="6" fill="#52B788"/></svg>` },
  { id: "coffee", category: "food", name: "Coffee",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 40 80 L 40 160 Q 40 180 60 180 L 130 180 Q 150 180 150 160 L 150 80 Z" fill="#FFFCF5" stroke="#3E3E33" stroke-width="6"/><path d="M 150 100 Q 180 100 180 120 Q 180 140 150 140" fill="none" stroke="#3E3E33" stroke-width="6"/><path d="M 60 70 Q 60 50 80 50 M 90 70 Q 90 50 110 50 M 120 70 Q 120 50 140 50" stroke="#5C5C4D" stroke-width="4" fill="none"/></svg>` },
  { id: "burger", category: "food", name: "Burger",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 30 80 Q 30 40 100 40 Q 170 40 170 80 Z" fill="#FFAA00"/><rect x="30" y="80" width="140" height="15" fill="#52B788"/><rect x="30" y="95" width="140" height="20" fill="#9C1F12"/><rect x="30" y="115" width="140" height="15" fill="#FFFCF5"/><path d="M 30 130 Q 30 170 100 170 Q 170 170 170 130 Z" fill="#E89400"/></svg>` },
  { id: "spice", category: "food", name: "Chili",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 60 50 Q 70 30 90 40 Q 100 25 110 40 Q 130 30 140 50" fill="#52B788"/><path d="M 100 40 Q 110 60 130 80 Q 150 110 140 150 Q 130 180 100 180 Q 70 170 70 140 Q 70 110 90 80 Q 100 60 100 40 Z" fill="#FF4D2E"/></svg>` },

  // Decor
  { id: "diya", category: "decor", name: "Diya",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 30 130 Q 100 100 170 130 L 150 160 Q 100 180 50 160 Z" fill="#9C1F12"/><ellipse cx="100" cy="130" rx="70" ry="12" fill="#7A1B11"/><path d="M 100 130 Q 95 100 100 80 Q 105 100 100 130 Z" fill="#FFAA00"/><path d="M 100 80 Q 95 60 100 40 Q 105 60 100 80 Z" fill="#FFC547"/></svg>` },
  { id: "leaf", category: "decor", name: "Leaf",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 100 20 Q 30 50 30 120 Q 30 180 100 180 Q 170 180 170 120 Q 170 50 100 20 Z" fill="#52B788"/><path d="M 100 30 L 100 175" stroke="#1B4332" stroke-width="3"/><path d="M 100 70 L 60 90 M 100 100 L 50 130 M 100 130 L 60 155 M 100 70 L 140 90 M 100 100 L 150 130 M 100 130 L 140 155" stroke="#1B4332" stroke-width="2" fill="none"/></svg>` },
  { id: "lotus", category: "decor", name: "Lotus",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><ellipse cx="100" cy="120" rx="20" ry="40" fill="#FF6B41"/><ellipse cx="60" cy="130" rx="30" ry="20" fill="#FF4D2E" transform="rotate(-30 60 130)"/><ellipse cx="140" cy="130" rx="30" ry="20" fill="#FF4D2E" transform="rotate(30 140 130)"/><ellipse cx="100" cy="100" rx="40" ry="15" fill="#FFAA00"/></svg>` },
  { id: "rangoli", category: "decor", name: "Rangoli",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><g transform="translate(100 100)"><g><circle r="20" fill="#FF4D2E"/><circle r="10" fill="#FFAA00"/></g><g transform="rotate(0)"><ellipse cx="50" cy="0" rx="15" ry="8" fill="#52B788"/></g><g transform="rotate(45)"><ellipse cx="50" cy="0" rx="15" ry="8" fill="#FFAA00"/></g><g transform="rotate(90)"><ellipse cx="50" cy="0" rx="15" ry="8" fill="#7DA8E5"/></g><g transform="rotate(135)"><ellipse cx="50" cy="0" rx="15" ry="8" fill="#FF4D2E"/></g><g transform="rotate(180)"><ellipse cx="50" cy="0" rx="15" ry="8" fill="#52B788"/></g><g transform="rotate(225)"><ellipse cx="50" cy="0" rx="15" ry="8" fill="#FFAA00"/></g><g transform="rotate(270)"><ellipse cx="50" cy="0" rx="15" ry="8" fill="#7DA8E5"/></g><g transform="rotate(315)"><ellipse cx="50" cy="0" rx="15" ry="8" fill="#FF4D2E"/></g></g></svg>` },

  // Arrows
  { id: "arrow-r", category: "arrows", name: "Arrow right",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 20 80 L 120 80 L 120 50 L 180 100 L 120 150 L 120 120 L 20 120 Z" fill="#0A0A06"/></svg>` },
  { id: "arrow-curve", category: "arrows", name: "Curved arrow",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 20 100 Q 20 30 100 30 Q 180 30 180 100" stroke="#0A0A06" stroke-width="14" fill="none"/><path d="M 160 80 L 180 100 L 160 120" stroke="#0A0A06" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: "arrow-down", category: "arrows", name: "Arrow down",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 80 20 L 120 20 L 120 120 L 150 120 L 100 180 L 50 120 L 80 120 Z" fill="#FF4D2E"/></svg>` },

  // Icons
  { id: "phone", category: "icons", name: "Phone",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 50 30 Q 30 30 30 60 Q 30 130 100 170 Q 130 175 145 160 L 160 145 Q 170 130 155 120 L 130 100 Q 120 95 115 105 L 105 115 Q 80 100 70 75 L 85 65 Q 95 60 90 50 L 70 30 Q 60 25 50 30 Z" fill="#0A0A06"/></svg>` },
  { id: "map-pin", category: "icons", name: "Map pin",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 100 20 Q 40 20 40 80 Q 40 130 100 180 Q 160 130 160 80 Q 160 20 100 20 Z" fill="#FF4D2E"/><circle cx="100" cy="80" r="22" fill="#FFFCF5"/></svg>` },
  { id: "clock", category: "icons", name: "Clock",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><circle cx="100" cy="100" r="80" fill="none" stroke="#0A0A06" stroke-width="10"/><path d="M 100 50 L 100 100 L 140 130" stroke="#0A0A06" stroke-width="10" stroke-linecap="round" fill="none"/></svg>` },
  { id: "verified", category: "icons", name: "Verified",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><circle cx="100" cy="100" r="80" fill="#52B788"/><path d="M 60 100 L 90 130 L 145 70" stroke="#FFFCF5" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>` },
  { id: "discount", category: "icons", name: "Discount",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 100 20 L 180 100 L 100 180 L 20 100 Z" fill="#FF4D2E"/><circle cx="100" cy="100" r="50" fill="none" stroke="#FFFCF5" stroke-width="6"/><text x="100" y="118" font-family="Arial Black, sans-serif" font-size="40" font-weight="900" text-anchor="middle" fill="#FFFCF5">%</text></svg>` },
  { id: "heart", category: "icons", name: "Heart",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 100 170 Q 30 120 30 70 Q 30 30 65 30 Q 90 30 100 55 Q 110 30 135 30 Q 170 30 170 70 Q 170 120 100 170 Z" fill="#FF4D2E"/></svg>` },

  // Shapes
  { id: "speech-bubble", category: "shapes", name: "Speech bubble",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 30 30 L 170 30 Q 190 30 190 50 L 190 130 Q 190 150 170 150 L 80 150 L 50 185 L 50 150 L 30 150 Q 10 150 10 130 L 10 50 Q 10 30 30 30 Z" fill="#FFAA00"/></svg>` },
  { id: "badge", category: "shapes", name: "Badge",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><circle cx="100" cy="100" r="80" fill="#FF4D2E"/><circle cx="100" cy="100" r="65" fill="none" stroke="#FFFCF5" stroke-width="6"/></svg>` },
  { id: "burst", category: "shapes", name: "Burst",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><path d="M 100 10 L 115 50 L 155 35 L 150 75 L 190 80 L 165 110 L 190 145 L 150 145 L 155 185 L 115 165 L 100 200 L 85 165 L 45 185 L 50 145 L 10 145 L 35 110 L 10 80 L 50 75 L 45 35 L 85 50 Z" fill="#FFAA00"/></svg>` },
];

export const STICKER_CATEGORIES: { id: StickerCategory; label: string }[] = [
  { id: "celebration", label: "Celebration" },
  { id: "food", label: "Food" },
  { id: "decor", label: "Decor" },
  { id: "arrows", label: "Arrows" },
  { id: "icons", label: "Icons" },
  { id: "shapes", label: "Shapes" },
];
