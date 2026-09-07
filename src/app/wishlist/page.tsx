"use client";

import Link from "next/link";
import { useWishlist } from "@/context/wishlist-context";
import { useProducts } from "@/context/products-context";
import { ProductCard } from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const { products, loading } = useProducts();
  const wishlisted = products.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Saved Workflows</span>
      <h1 className="mt-2 text-3xl font-extrabold text-white">Your Wishlist</h1>
      <p className="mt-2 text-sm text-slate-400">Workflows you&apos;ve saved for later. Persisted locally on this device.</p>

      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : wishlisted.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 py-20 text-center">
            <span className="text-4xl">♡</span>
            <p className="text-lg font-bold text-white">Your wishlist is empty</p>
            <p className="max-w-sm text-sm text-slate-400">Save workflows you&apos;re interested in to find them here later.</p>
            <Link
              href="/marketplace"
              className="mt-2 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2.5 text-sm font-bold text-slate-950"
            >
              Explore Workflows
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {wishlisted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
