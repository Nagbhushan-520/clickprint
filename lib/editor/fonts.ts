/**
 * Curated Google Fonts list — fonts that actually work for flyer design.
 * Loaded on-demand via <link rel="stylesheet"> when picked.
 */
export type FontDef = {
  family: string;
  category: "display" | "sans" | "serif" | "script" | "mono";
  weights: number[];
  preview?: string;
};

export const FONTS: FontDef[] = [
  // Display / Headlines
  { family: "Bebas Neue", category: "display", weights: [400] },
  { family: "Anton", category: "display", weights: [400] },
  { family: "Oswald", category: "display", weights: [400, 600, 700] },
  { family: "Archivo Black", category: "display", weights: [400] },
  { family: "Abril Fatface", category: "display", weights: [400] },
  { family: "Bricolage Grotesque", category: "display", weights: [400, 600, 700, 800] },
  { family: "Bungee", category: "display", weights: [400] },
  { family: "Righteous", category: "display", weights: [400] },

  // Sans
  { family: "Inter", category: "sans", weights: [400, 500, 600, 700, 800] },
  { family: "Poppins", category: "sans", weights: [400, 500, 600, 700, 800] },
  { family: "DM Sans", category: "sans", weights: [400, 500, 700] },
  { family: "Roboto", category: "sans", weights: [400, 500, 700] },
  { family: "Manrope", category: "sans", weights: [400, 600, 700, 800] },
  { family: "Outfit", category: "sans", weights: [400, 500, 700, 800] },
  { family: "Plus Jakarta Sans", category: "sans", weights: [400, 600, 700, 800] },

  // Serif
  { family: "Playfair Display", category: "serif", weights: [400, 700, 900] },
  { family: "Cormorant Garamond", category: "serif", weights: [400, 600, 700] },
  { family: "Lora", category: "serif", weights: [400, 600, 700] },
  { family: "Merriweather", category: "serif", weights: [400, 700, 900] },
  { family: "Fraunces", category: "serif", weights: [400, 600, 700, 900] },

  // Script
  { family: "Dancing Script", category: "script", weights: [400, 700] },
  { family: "Great Vibes", category: "script", weights: [400] },
  { family: "Pacifico", category: "script", weights: [400] },
  { family: "Sacramento", category: "script", weights: [400] },
  { family: "Caveat", category: "script", weights: [400, 700] },

  // Mono
  { family: "JetBrains Mono", category: "mono", weights: [400, 700] },
  { family: "IBM Plex Mono", category: "mono", weights: [400, 700] },
];

const loaded = new Set<string>();

/** Inject a Google Fonts link tag for a family (idempotent). */
export function loadFont(family: string, weights: number[] = [400, 700]) {
  if (typeof document === "undefined") return;
  const key = `${family}::${weights.join(",")}`;
  if (loaded.has(key)) return;
  loaded.add(key);

  const id = `gf-${family.toLowerCase().replace(/\s+/g, "-")}`;
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weights.join(";")}&display=swap`;
  document.head.appendChild(link);
}

/** Preload all curated fonts on editor open */
export function preloadAllFonts() {
  if (typeof document === "undefined") return;
  for (const f of FONTS) loadFont(f.family, f.weights);
}
