/**
 * SHIM: replaces Antonio's Unsplash fetch with our curated stock images,
 * mapped into the Unsplash-like shape the ImageSidebar expects.
 */
"use client";

import { useState, useEffect } from "react";

type UnsplashLikeImage = {
  id: string;
  urls: { regular: string; small: string; thumb: string };
  alt_description: string | null;
  links: { html: string };
  user: { name: string };
};

// Reuse the same curated set our old editor used.
const CURATED: { id: string; url: string; thumb: string; alt: string }[] = [
  { id: "u-1", url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=70", alt: "Restaurant table" },
  { id: "u-2", url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=70", alt: "Coffee shop" },
  { id: "u-4", url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=70", alt: "Pizza" },
  { id: "u-7", url: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&q=70", alt: "Wedding flowers" },
  { id: "u-9", url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&q=70", alt: "Yoga" },
  { id: "u-11", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&q=70", alt: "Real estate" },
  { id: "u-14", url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=70", alt: "Diwali lights" },
  { id: "u-15", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=70", alt: "Concert" },
  { id: "u-18", url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&q=70", alt: "Party" },
  { id: "u-21", url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&q=70", alt: "Salon" },
];

export const useGetImages = () => {
  const [data, setData] = useState<UnsplashLikeImage[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(
        CURATED.map((c) => ({
          id: c.id,
          urls: { regular: c.url, small: c.thumb, thumb: c.thumb },
          alt_description: c.alt,
          links: { html: "https://unsplash.com" },
          user: { name: "Unsplash" },
        })),
      );
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(t);
  }, []);

  return { data, isLoading, isError: false };
};
