/**
 * Stock image catalog. Uses Unsplash API when NEXT_PUBLIC_UNSPLASH_KEY is set.
 * Falls back to a curated public-domain image set when no key.
 *
 * All images are CORS-enabled and safe for commercial print use.
 */

export type StockImage = {
  id: string;
  url: string;
  thumb: string;
  alt: string;
  author?: string;
};

// Curated fallback set — works without API key
// Using Picsum / source.unsplash random as fallback hits
const CURATED_TOPICS = [
  "restaurant-food", "coffee-cafe", "wedding-decor", "yoga-fitness",
  "real-estate-home", "shop-retail", "festival-diwali", "music-concert",
  "team-business", "celebration-party", "education-books", "service-tools",
];

const CURATED_IMAGES: StockImage[] = [
  { id: "u-1", url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=70", alt: "Restaurant table" },
  { id: "u-2", url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=70", alt: "Coffee shop" },
  { id: "u-3", url: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=300&q=70", alt: "Fresh ingredients" },
  { id: "u-4", url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=70", alt: "Pizza" },
  { id: "u-5", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&q=70", alt: "Cafe interior" },
  { id: "u-6", url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=70", alt: "Burger" },
  { id: "u-7", url: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&q=70", alt: "Wedding flowers" },
  { id: "u-8", url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&q=70", alt: "Wedding rings" },
  { id: "u-9", url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&q=70", alt: "Yoga" },
  { id: "u-10", url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=70", alt: "Gym workout" },
  { id: "u-11", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&q=70", alt: "Real estate" },
  { id: "u-12", url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&q=70", alt: "Modern house" },
  { id: "u-13", url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&q=70", alt: "Shopping" },
  { id: "u-14", url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=70", alt: "Diwali lights" },
  { id: "u-15", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=70", alt: "Concert" },
  { id: "u-16", url: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=300&q=70", alt: "Concert crowd" },
  { id: "u-17", url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&q=70", alt: "Team meeting" },
  { id: "u-18", url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&q=70", alt: "Party celebration" },
  { id: "u-19", url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=70", alt: "Books library" },
  { id: "u-20", url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&q=70", alt: "Engineering" },
  { id: "u-21", url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&q=70", alt: "Salon" },
  { id: "u-22", url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&q=70", alt: "Sports" },
  { id: "u-23", url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&q=70", alt: "Interior design" },
  { id: "u-24", url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80", thumb: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=70", alt: "Fashion" },
];

export async function searchStockImages(query: string): Promise<StockImage[]> {
  // If query is empty, return curated set
  if (!query.trim()) return CURATED_IMAGES;

  const key = process.env.NEXT_PUBLIC_UNSPLASH_KEY;
  if (key) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=24&orientation=portrait`,
        { headers: { Authorization: `Client-ID ${key}` } },
      );
      if (res.ok) {
        const data = await res.json();
        return data.results.map((r: any) => ({
          id: r.id,
          url: r.urls.regular,
          thumb: r.urls.small,
          alt: r.alt_description || query,
          author: r.user?.name,
        }));
      }
    } catch (e) {
      // fall through to curated
    }
  }

  // Filter curated by simple keyword match
  const q = query.toLowerCase();
  return CURATED_IMAGES.filter((img) => img.alt.toLowerCase().includes(q));
}
