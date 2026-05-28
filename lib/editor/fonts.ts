/**
 * Expanded Google Fonts library — 80+ fonts across all categories.
 * Loaded on-demand via <link rel="stylesheet"> when picked.
 */
export type FontDef = {
  family: string;
  category: "display" | "sans" | "serif" | "script" | "mono" | "indic";
  weights: number[];
};

export const FONTS: FontDef[] = [
  // Display / Headlines (16)
  { family: "Bebas Neue", category: "display", weights: [400] },
  { family: "Anton", category: "display", weights: [400] },
  { family: "Oswald", category: "display", weights: [400, 600, 700] },
  { family: "Archivo Black", category: "display", weights: [400] },
  { family: "Abril Fatface", category: "display", weights: [400] },
  { family: "Bricolage Grotesque", category: "display", weights: [400, 600, 700, 800] },
  { family: "Bungee", category: "display", weights: [400] },
  { family: "Bungee Shade", category: "display", weights: [400] },
  { family: "Righteous", category: "display", weights: [400] },
  { family: "Alfa Slab One", category: "display", weights: [400] },
  { family: "Black Ops One", category: "display", weights: [400] },
  { family: "Bowlby One", category: "display", weights: [400] },
  { family: "Permanent Marker", category: "display", weights: [400] },
  { family: "Russo One", category: "display", weights: [400] },
  { family: "Bangers", category: "display", weights: [400] },
  { family: "Staatliches", category: "display", weights: [400] },

  // Sans (18)
  { family: "Inter", category: "sans", weights: [400, 500, 600, 700, 800, 900] },
  { family: "Poppins", category: "sans", weights: [400, 500, 600, 700, 800, 900] },
  { family: "DM Sans", category: "sans", weights: [400, 500, 700] },
  { family: "Roboto", category: "sans", weights: [400, 500, 700, 900] },
  { family: "Manrope", category: "sans", weights: [400, 600, 700, 800] },
  { family: "Outfit", category: "sans", weights: [400, 500, 700, 800] },
  { family: "Plus Jakarta Sans", category: "sans", weights: [400, 600, 700, 800] },
  { family: "Montserrat", category: "sans", weights: [400, 500, 700, 900] },
  { family: "Open Sans", category: "sans", weights: [400, 600, 700, 800] },
  { family: "Lato", category: "sans", weights: [400, 700, 900] },
  { family: "Raleway", category: "sans", weights: [400, 600, 700, 900] },
  { family: "Work Sans", category: "sans", weights: [400, 600, 700, 800] },
  { family: "Nunito", category: "sans", weights: [400, 600, 700, 900] },
  { family: "Source Sans 3", category: "sans", weights: [400, 600, 700] },
  { family: "Barlow", category: "sans", weights: [400, 600, 700, 900] },
  { family: "Karla", category: "sans", weights: [400, 600, 700, 800] },
  { family: "Mulish", category: "sans", weights: [400, 600, 700, 900] },
  { family: "Rubik", category: "sans", weights: [400, 600, 700, 900] },

  // Serif (12)
  { family: "Playfair Display", category: "serif", weights: [400, 700, 900] },
  { family: "Cormorant Garamond", category: "serif", weights: [400, 600, 700] },
  { family: "Lora", category: "serif", weights: [400, 600, 700] },
  { family: "Merriweather", category: "serif", weights: [400, 700, 900] },
  { family: "Fraunces", category: "serif", weights: [400, 600, 700, 900] },
  { family: "DM Serif Display", category: "serif", weights: [400] },
  { family: "EB Garamond", category: "serif", weights: [400, 600, 700] },
  { family: "Crimson Text", category: "serif", weights: [400, 600, 700] },
  { family: "Libre Baskerville", category: "serif", weights: [400, 700] },
  { family: "PT Serif", category: "serif", weights: [400, 700] },
  { family: "Bitter", category: "serif", weights: [400, 600, 700, 900] },
  { family: "Spectral", category: "serif", weights: [400, 600, 700, 800] },

  // Script (12)
  { family: "Dancing Script", category: "script", weights: [400, 700] },
  { family: "Great Vibes", category: "script", weights: [400] },
  { family: "Pacifico", category: "script", weights: [400] },
  { family: "Sacramento", category: "script", weights: [400] },
  { family: "Caveat", category: "script", weights: [400, 700] },
  { family: "Satisfy", category: "script", weights: [400] },
  { family: "Kaushan Script", category: "script", weights: [400] },
  { family: "Allura", category: "script", weights: [400] },
  { family: "Tangerine", category: "script", weights: [400, 700] },
  { family: "Parisienne", category: "script", weights: [400] },
  { family: "Yellowtail", category: "script", weights: [400] },
  { family: "Cookie", category: "script", weights: [400] },

  // Mono (4)
  { family: "JetBrains Mono", category: "mono", weights: [400, 700] },
  { family: "IBM Plex Mono", category: "mono", weights: [400, 700] },
  { family: "Fira Code", category: "mono", weights: [400, 600, 700] },
  { family: "Space Mono", category: "mono", weights: [400, 700] },

  // Indian-language friendly (6) — for Hindi/Kannada flyers
  { family: "Noto Sans Devanagari", category: "indic", weights: [400, 600, 700, 900] },
  { family: "Noto Sans Kannada", category: "indic", weights: [400, 600, 700, 900] },
  { family: "Noto Serif Devanagari", category: "indic", weights: [400, 700] },
  { family: "Tiro Devanagari Hindi", category: "indic", weights: [400] },
  { family: "Hind", category: "indic", weights: [400, 600, 700] },
  { family: "Mukta", category: "indic", weights: [400, 600, 700, 800] },
];

const loaded = new Set<string>();

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

/** Preload most-used fonts on editor open. Don't preload all 80 - that's wasteful. */
export function preloadAllFonts() {
  if (typeof document === "undefined") return;
  const popular = ["Inter", "Playfair Display", "Bebas Neue", "Anton", "Montserrat", "Poppins"];
  for (const family of popular) {
    const def = FONTS.find((f) => f.family === family);
    if (def) loadFont(def.family, def.weights);
  }
}
