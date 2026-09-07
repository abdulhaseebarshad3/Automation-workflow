"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPKR, discountPercent } from "@/lib/format";
import { ProductThumb } from "./product-thumb";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { QuickViewModal } from "./quick-view-modal";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [quickView, setQuickView] = useState(false);
  const off = discountPercent(product.price, product.oldPrice);
  const wishlisted = isWishlisted(product.id);

  return (
    <>
      <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_20px_50px_rgba(8,15,35,0.55)]">
        <div className="relative">
          <Link href={`/product/${product.slug}`} className="block">
            <ProductThumb image={product.image} name={product.name} />
          </Link>

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.isFree && (
              <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-950">
                Free
              </span>
            )}
            {off > 0 && !product.isFree && (
              <span className="rounded-full bg-rose-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                -{off}%
              </span>
            )}
            {product.isNew && (
              <span className="rounded-full bg-indigo-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                New
              </span>
            )}
          </div>

          <button
            onClick={() => toggleWishlist(product)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition ${
              wishlisted ? "bg-rose-500/90 text-white" : "bg-slate-950/60 text-slate-200 hover:bg-slate-950/80"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7.5-4.6-10-9.3C.6 8.4 2.6 5 6 5c2 0 3.3 1 4.5 2.4a1 1 0 0 0 1.4 0C13.1 6 14.4 5 16.4 5c3.4 0 5.4 3.4 4 6.7C19.5 16.4 12 21 12 21z" />
            </svg>
          </button>

          <button
            onClick={() => setQuickView(true)}
            className="absolute inset-x-3 bottom-3 translate-y-2 rounded-lg bg-slate-950/80 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          >
            Quick View
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-4">
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide">
            <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-cyan-300 ring-1 ring-cyan-500/20">
              {product.compatibility}
            </span>
            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-violet-300 ring-1 ring-violet-500/20">
              {product.difficulty}
            </span>
          </div>

          <Link href={`/product/${product.slug}`} className="line-clamp-2 text-[15px] font-semibold text-white hover:text-cyan-300">
            {product.name}
          </Link>
          <p className="line-clamp-2 text-xs text-slate-400">{product.tagline}</p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-amber-400">★ {product.rating}</span>
            <span>·</span>
            <span>{product.salesCount.toLocaleString()} sales</span>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <div className="flex flex-col">
              {product.oldPrice ? (
                <span className="text-[11px] text-slate-500 line-through">{formatPKR(product.oldPrice)}</span>
              ) : (
                <span className="h-[15px]" />
              )}
              <span className="text-base font-bold text-white">{formatPKR(product.price)}</span>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-3 py-2 text-xs font-bold text-slate-950 shadow-[0_0_16px_rgba(34,211,238,0.3)] transition hover:brightness-110"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </article>

      {quickView && <QuickViewModal product={product} onClose={() => setQuickView(false)} />}
    </>
  );
}
