/**
 * Custom templates uploaded by the user.
 * Stored in localStorage as data URLs (or refs to uploaded files).
 * Can be used as background image OR loaded as a starting design.
 */

export type CustomTemplate = {
  id: string;
  name: string;
  imageDataUrl: string;
  size: "A4" | "A5";
  createdAt: string;
};

const KEY = "clickprint_custom_templates";

export function getCustomTemplates(): CustomTemplate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomTemplates(items: CustomTemplate[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch (e) {
    // localStorage might be full — show a friendlier error
    alert("Couldn't save template — storage may be full. Try removing older templates first.");
  }
}

export async function addCustomTemplate(file: File, name?: string): Promise<CustomTemplate> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Detect size from image aspect ratio
      const img = new Image();
      img.onload = () => {
        const aspect = img.height / img.width;
        const size: "A4" | "A5" = aspect >= 1.4 ? "A4" : "A4"; // Default A4 for now
        // A4 = 297/210 = 1.414, A5 = 210/148 = 1.419 — basically same aspect
        const tpl: CustomTemplate = {
          id: `ct-${Date.now()}`,
          name: name || file.name.replace(/\.[^.]+$/, ""),
          imageDataUrl: reader.result as string,
          size,
          createdAt: new Date().toISOString(),
        };
        const all = getCustomTemplates();
        all.unshift(tpl);
        saveCustomTemplates(all);
        resolve(tpl);
      };
      img.onerror = () => reject(new Error("Could not read image"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function removeCustomTemplate(id: string) {
  const all = getCustomTemplates();
  saveCustomTemplates(all.filter((t) => t.id !== id));
}
