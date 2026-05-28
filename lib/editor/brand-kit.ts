/**
 * Brand kit: persisted across sessions in localStorage.
 * Stores colors, fonts, and logo data URLs for one-click reuse.
 */

export type BrandKit = {
  colors: string[];
  fonts: string[];
  logos: { id: string; dataUrl: string; name: string }[];
};

const KEY = "clickprint_brand_kit";

const DEFAULT_KIT: BrandKit = {
  colors: ["#FF4D2E", "#0A0A06", "#FFAA00", "#FFFCF5"],
  fonts: ["Inter", "Playfair Display", "Bebas Neue"],
  logos: [],
};

export function getBrandKit(): BrandKit {
  if (typeof window === "undefined") return DEFAULT_KIT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_KIT;
    return { ...DEFAULT_KIT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_KIT;
  }
}

export function saveBrandKit(kit: BrandKit) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(kit));
}

export function addBrandColor(color: string) {
  const kit = getBrandKit();
  if (!kit.colors.includes(color)) kit.colors.push(color);
  saveBrandKit(kit);
  return kit;
}

export function removeBrandColor(color: string) {
  const kit = getBrandKit();
  kit.colors = kit.colors.filter((c) => c !== color);
  saveBrandKit(kit);
  return kit;
}

export function addBrandFont(font: string) {
  const kit = getBrandKit();
  if (!kit.fonts.includes(font)) kit.fonts.push(font);
  saveBrandKit(kit);
  return kit;
}

export function removeBrandFont(font: string) {
  const kit = getBrandKit();
  kit.fonts = kit.fonts.filter((f) => f !== font);
  saveBrandKit(kit);
  return kit;
}

export async function addBrandLogo(file: File, name?: string) {
  return new Promise<BrandKit>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const kit = getBrandKit();
      kit.logos.push({
        id: `logo-${Date.now()}`,
        dataUrl: reader.result as string,
        name: name || file.name,
      });
      saveBrandKit(kit);
      resolve(kit);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function removeBrandLogo(id: string) {
  const kit = getBrandKit();
  kit.logos = kit.logos.filter((l) => l.id !== id);
  saveBrandKit(kit);
  return kit;
}
