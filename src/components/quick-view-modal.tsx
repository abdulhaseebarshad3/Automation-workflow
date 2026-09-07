"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPKR, discountPercent } from "@/lib/format";
import { ProductThumb } from "./product-thumb";
import { WorkflowVisualizer } from "./workflow-visualizer";
import { useCart } from "@/context/cart-context";

export function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const off = discountPercent(product.price, product.oldPrice);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
      onClick={onClose}
    >
      <div
        className="glass relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl p-0 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80 text-slate-300 hover:text-white"
        >
          ✕
        </button>
        <ProductThumb image={product.image} name={product.name} className="rounded-t-3xl" />
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
            <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-cyan-300 ring-1 ring-cyan-500/30">
              {product.compatibility}
            </span>
            <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-violet-300 ring-1 ring-violet-500/30">
              {product.difficulty}
            </span>
            <span className="rounded-full bg-slate-500/10 px-2.5 py-1 text-slate-300 ring-1 ring-slate-500/30">
              {product.category}
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-white">{product.name}</h2>
          <p className="mt-2 text-sm text-slate-400">{product.tagline}</p>

          <WorkflowVisualizer steps={product.workflowSteps} className="mt-2" />

          <div className="mt-4 flex items-center gap-1 text-sm text-amber-400">
            {"★".repeat(Math.round(Number(product.rating)))}
            <span className="text-slate-400">
              {product.rating} · {product.reviewsCount} reviews · {product.salesCount.toLocaleString()} sales
            </span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
            <div>
              {product.oldPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-slate-500 line-through">{formatPKR(product.oldPrice)}</span>
                  <span className="text-2xl font-bold text-white">{formatPKR(product.price)}</span>
                  {off > 0 && (
                    <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-xs font-semibold text-rose-300">
                      -{off}%
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-2xl font-bold text-white">{formatPKR(product.price)}</span>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5"
              >
                Explore Workflow
              </Link>
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:brightness-110"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
