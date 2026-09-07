"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/products-context";
import { ProductCard } from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import { CATEGORIES, DIFFICULTIES } from "@/lib/types";

const PRICE_RANGES = [
  { label: "Free", min: 0, max: 0 },
  { label: "Under PKR 3,000", min: 1, max: 2999 },
  { label: "PKR 3,000 – 5,999", min: 3000, max: 5999 },
  { label: "PKR 6,000 – 8,999", min: 6000, max: 8999 },
  { label: "PKR 9,000+", min: 9000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export function MarketplaceClient() {
  const searchParams = useSearchParams();
  const { products, loading } = useProducts();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [categories, setCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category") as string] : []
  );
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [productType, setProductType] = useState<string | null>(null);
  const [sort, setSort] = useState(searchParams.get("sort") || "popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    const timeoutId = window.setTimeout(() => {
      if (q) setQuery(q);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [searchParams]);

  function toggleCategory(cat: string) {
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }
  function toggleDifficulty(d: string) {
    setDifficulties((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  function clearAll() {
    setQuery("");
    setCategories([]);
    setDifficulties([]);
    setPriceRange(null);
    setMinRating(0);
    setProductType(null);
    setSort("popular");
  }

  const filtered = useMemo(() => {
    let result = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (categories.length) {
      result = result.filter((p) => categories.includes(p.category));
    }

    if (difficulties.length) {
      result = result.filter((p) => difficulties.includes(p.difficulty));
    }

    if (priceRange) {
      const range = PRICE_RANGES.find((r) => r.label === priceRange);
      if (range) result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    if (minRating > 0) {
      result = result.filter((p) => Number(p.rating) >= minRating);
    }

    if (productType === "free") result = result.filter((p) => p.isFree);
    if (productType === "sale") result = result.filter((p) => p.onSale);
    if (productType === "new") result = result.filter((p) => p.isNew);
    if (productType === "bestseller") result = result.filter((p) => p.bestseller);

    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
      default:
        result.sort((a, b) => b.salesCount - a.salesCount);
    }

    return result;
  }, [products, query, categories, difficulties, priceRange, minRating, productType, sort]);

  const activeFilterCount =
    categories.length + difficulties.length + (priceRange ? 1 : 0) + (minRating ? 1 : 0) + (productType ? 1 : 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-2 text-xs text-slate-500">
        <span>Home</span> <span className="mx-1">/</span> <span className="text-slate-300">Automation Marketplace</span>
      </div>
      <h1 className="text-2xl font-bold text-white sm:text-3xl">Automation Marketplace</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">
        Browse every n8n workflow, AI agent, and automation system in the FlowForge AI catalog.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search workflows, e.g. WhatsApp, CRM, Email, Shopify..."
          aria-label="Search marketplace"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/50 sm:max-w-md"
        />
        <div className="flex items-center gap-2 sm:ml-auto">
          <button
            onClick={() => setFiltersOpen(true)}
            className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5 lg:hidden"
          >
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white focus:border-cyan-400/50"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                Sort: {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block">
          <FilterPanel
            categories={categories}
            toggleCategory={toggleCategory}
            difficulties={difficulties}
            toggleDifficulty={toggleDifficulty}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            productType={productType}
            setProductType={setProductType}
            clearAll={clearAll}
          />
        </aside>

        {/* Mobile filter drawer */}
        {filtersOpen && (
          <div className="fixed inset-0 z-[85] lg:hidden">
            <div className="absolute inset-0 bg-slate-950/70" onClick={() => setFiltersOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-slate-950 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Filters</h2>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="text-slate-400">
                  ✕
                </button>
              </div>
              <FilterPanel
                categories={categories}
                toggleCategory={toggleCategory}
                difficulties={difficulties}
                toggleDifficulty={toggleDifficulty}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
                productType={productType}
                setProductType={setProductType}
                clearAll={clearAll}
              />
              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-3 text-sm font-bold text-slate-950"
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        )}

        <div>
          <p className="mb-4 text-sm text-slate-400">
            {loading ? "Loading workflows…" : `${filtered.length} workflow${filtered.length === 1 ? "" : "s"} found`}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 py-20 text-center">
              <span className="text-4xl">🔎</span>
              <p className="text-lg font-bold text-white">No workflows found</p>
              <p className="max-w-sm text-sm text-slate-400">Try another automation, category, or keyword.</p>
              <button
                onClick={clearAll}
                className="mt-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterPanel({
  categories,
  toggleCategory,
  difficulties,
  toggleDifficulty,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  productType,
  setProductType,
  clearAll,
}: {
  categories: string[];
  toggleCategory: (c: string) => void;
  difficulties: string[];
  toggleDifficulty: (d: string) => void;
  priceRange: string | null;
  setPriceRange: (r: string | null) => void;
  minRating: number;
  setMinRating: (n: number) => void;
  productType: string | null;
  setProductType: (t: string | null) => void;
  clearAll: () => void;
}) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-white">Filters</h2>
        <button onClick={clearAll} className="text-xs font-semibold text-cyan-300 hover:text-cyan-200">
          Clear All
        </button>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Category</h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={categories.includes(c)}
                onChange={() => toggleCategory(c)}
                className="h-3.5 w-3.5 accent-cyan-400"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Product Type</h3>
        <div className="flex flex-col gap-2">
          {[
            { v: "free", l: "Free Products" },
            { v: "sale", l: "On Sale" },
            { v: "new", l: "New Arrivals" },
            { v: "bestseller", l: "Best Sellers" },
          ].map((o) => (
            <label key={o.v} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
              <input
                type="radio"
                name="productType"
                checked={productType === o.v}
                onChange={() => setProductType(productType === o.v ? null : o.v)}
                className="h-3.5 w-3.5 accent-cyan-400"
              />
              {o.l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Price</h3>
        <div className="flex flex-col gap-2">
          {PRICE_RANGES.map((r) => (
            <label key={r.label} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
              <input
                type="radio"
                name="price"
                checked={priceRange === r.label}
                onChange={() => setPriceRange(priceRange === r.label ? null : r.label)}
                className="h-3.5 w-3.5 accent-cyan-400"
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Rating</h3>
        <div className="flex flex-col gap-2">
          {[4.5, 4, 3.5].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(minRating === r ? 0 : r)}
                className="h-3.5 w-3.5 accent-cyan-400"
              />
              {r}+ ★
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Difficulty</h3>
        <div className="flex flex-col gap-2">
          {DIFFICULTIES.map((d) => (
            <label key={d} className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={difficulties.includes(d)}
                onChange={() => toggleDifficulty(d)}
                className="h-3.5 w-3.5 accent-cyan-400"
              />
              {d}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
