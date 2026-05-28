"use client";

import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { PanelHeader } from "./panel-templates";
import { searchStockImages, type StockImage } from "@/lib/editor/stock-images";

export function PanelPhotos({ onAdd }: { onAdd: (url: string) => Promise<void> }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setResults(await searchStockImages(""));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSearch = async () => {
    setLoading(true);
    try {
      setResults(await searchStockImages(query));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Stock photos" subtitle="Free for commercial use" />

      <div className="border-b border-ink-900/8 p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Search photos..."
            className="block w-full rounded-lg border border-ink-900/10 bg-paper px-3 py-2 pl-8 text-xs text-ink-900 placeholder:text-ink-400 focus:border-flame-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="grid h-32 place-items-center">
            <Loader2 className="h-5 w-5 animate-spin text-flame-500" />
          </div>
        ) : results.length === 0 ? (
          <div className="text-center text-xs text-ink-500">
            No photos found. Try a different search.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {results.map((img) => (
              <button
                key={img.id}
                onClick={() => onAdd(img.url)}
                className="group overflow-hidden rounded-lg border border-ink-900/8 bg-paper transition-all hover:border-ink-900/40 hover:shadow-md"
              >
                <img
                  src={img.thumb}
                  alt={img.alt}
                  loading="lazy"
                  className="block w-full object-cover aspect-square transition-transform group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
