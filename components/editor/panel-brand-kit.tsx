"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { PanelHeader } from "./panel-templates";
import { FONTS } from "@/lib/editor/fonts";
import {
  type BrandKit,
  getBrandKit,
  addBrandColor,
  removeBrandColor,
  addBrandFont,
  removeBrandFont,
  addBrandLogo,
  removeBrandLogo,
} from "@/lib/editor/brand-kit";

export function PanelBrandKit({
  onPickColor,
  onPickFont,
  onPickLogo,
}: {
  onPickColor: (color: string) => void;
  onPickFont: (family: string) => void;
  onPickLogo: (dataUrl: string) => void;
}) {
  const [kit, setKit] = useState<BrandKit | null>(null);
  const [newColor, setNewColor] = useState("#FF4D2E");
  const [showFontPicker, setShowFontPicker] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setKit(getBrandKit());
  }, []);

  if (!kit) return null;

  const handleLogoUpload = async (file: File) => {
    const updated = await addBrandLogo(file);
    setKit({ ...updated });
  };

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Brand kit" subtitle="Your colors, fonts, and logos · saved locally" />

      <div className="overflow-y-auto p-3 space-y-6">
        {/* Colors */}
        <div>
          <SectionLabel>Brand colors</SectionLabel>
          <div className="mt-2 grid grid-cols-5 gap-1.5">
            {kit.colors.map((c) => (
              <div key={c} className="group relative">
                <button
                  onClick={() => onPickColor(c)}
                  className="aspect-square w-full rounded-lg border border-ink-900/10 transition-all hover:scale-105"
                  style={{ background: c }}
                  title={c}
                />
                <button
                  onClick={() => setKit({ ...removeBrandColor(c) })}
                  className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-ink-900 text-paper opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-2 w-2" />
                </button>
              </div>
            ))}
            <label className="grid aspect-square w-full cursor-pointer place-items-center rounded-lg border border-dashed border-ink-900/20 text-ink-500 hover:border-ink-900 hover:text-ink-900">
              <input
                type="color"
                value={newColor}
                onChange={(e) => {
                  setNewColor(e.target.value);
                  setKit({ ...addBrandColor(e.target.value) });
                }}
                className="opacity-0 absolute"
              />
              <Plus className="h-3.5 w-3.5" />
            </label>
          </div>
        </div>

        {/* Fonts */}
        <div>
          <SectionLabel>Brand fonts</SectionLabel>
          <div className="mt-2 space-y-1.5">
            {kit.fonts.map((f) => (
              <div key={f} className="group flex items-center justify-between rounded-lg border border-ink-900/8 bg-paper px-3 py-2 transition-colors hover:border-ink-900/30">
                <button
                  onClick={() => onPickFont(f)}
                  className="min-w-0 flex-1 text-left"
                  style={{ fontFamily: f }}
                >
                  <div className="truncate text-sm text-ink-900">{f}</div>
                </button>
                <button
                  onClick={() => setKit({ ...removeBrandFont(f) })}
                  className="rounded p-1 text-ink-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {!showFontPicker ? (
              <button
                onClick={() => setShowFontPicker(true)}
                className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-ink-900/20 py-2 text-xs text-ink-500 hover:border-ink-900 hover:text-ink-900"
              >
                <Plus className="h-3 w-3" />
                Add font
              </button>
            ) : (
              <div className="rounded-lg border border-ink-900/10 bg-paper p-2 max-h-60 overflow-y-auto">
                {FONTS.filter((f) => !kit.fonts.includes(f.family)).map((f) => (
                  <button
                    key={f.family}
                    onClick={() => {
                      setKit({ ...addBrandFont(f.family) });
                      setShowFontPicker(false);
                    }}
                    className="block w-full rounded px-2 py-1.5 text-left hover:bg-ink-900/5"
                    style={{ fontFamily: f.family }}
                  >
                    <span className="text-sm text-ink-900">{f.family}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logos */}
        <div>
          <SectionLabel>Logos</SectionLabel>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {kit.logos.map((logo) => (
              <div key={logo.id} className="group relative aspect-square overflow-hidden rounded-lg border border-ink-900/10 bg-paper">
                <button onClick={() => onPickLogo(logo.dataUrl)} className="grid h-full w-full place-items-center p-2">
                  <img src={logo.dataUrl} alt={logo.name} className="max-h-full max-w-full object-contain" />
                </button>
                <button
                  onClick={() => setKit({ ...removeBrandLogo(logo.id) })}
                  className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-ink-900 text-paper opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-2.5 w-2.5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => logoInputRef.current?.click()}
              className="grid aspect-square place-items-center rounded-lg border border-dashed border-ink-900/20 text-ink-500 hover:border-ink-900 hover:text-ink-900"
            >
              <Upload className="h-4 w-4" />
            </button>
          </div>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleLogoUpload(f);
              e.currentTarget.value = "";
            }}
          />
        </div>

        <p className="rounded-xl bg-cream px-3 py-2 text-[11px] leading-relaxed text-ink-500">
          Your brand kit is saved in your browser. Will sync to your account in Phase 4.
        </p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">
      {children}
    </div>
  );
}
