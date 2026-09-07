"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product, Review } from "@/lib/types";
import { formatPKR, discountPercent, formatDate } from "@/lib/format";
import { ProductThumb } from "@/components/product-thumb";
import { WorkflowVisualizer } from "@/components/workflow-visualizer";
import { ProductCard } from "@/components/product-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/context/toast-context";

const TABS = ["Overview", "Workflow", "Features", "Requirements", "Setup", "What's Included", "Reviews", "FAQ"] as const;

export function ProductDetailClient({
  product,
  reviews,
  related,
}: {
  product: Product;
  reviews: Review[];
  related: Product[];
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const router = useRouter();
  const off = discountPercent(product.price, product.oldPrice);
  const wishlisted = isWishlisted(product.id);

  function buyNow() {
    addToCart(product);
    router.push("/checkout");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-300">
          Home
        </Link>{" "}
        / <Link href="/marketplace" className="hover:text-slate-300">Marketplace</Link> /{" "}
        <Link href={`/marketplace?category=${encodeURIComponent(product.category)}`} className="hover:text-slate-300">
          {product.category}
        </Link>{" "}
        / <span className="text-slate-300">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <div className="glow-border overflow-hidden rounded-2xl">
            <ProductThumb image={product.image} name={product.name} className="aspect-[16/10]" sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 p-5">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">What It Automates — Visual Flow</p>
            <WorkflowVisualizer steps={product.workflowSteps} />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
            <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-cyan-300 ring-1 ring-cyan-500/30">
              {product.compatibility}-compatible
            </span>
            <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-violet-300 ring-1 ring-violet-500/30">
              {product.difficulty}
            </span>
            {product.isNew && (
              <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-indigo-300 ring-1 ring-indigo-500/30">New</span>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">{product.name}</h1>
          <p className="mt-2 text-sm text-slate-400">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-amber-400">{"★".repeat(Math.round(Number(product.rating)))}{"☆".repeat(5 - Math.round(Number(product.rating)))}</span>
            <span className="text-slate-300">{product.rating}</span>
            <a href="#reviews" className="text-slate-400 hover:text-cyan-300">
              {product.reviewsCount} reviews
            </a>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">{product.salesCount.toLocaleString()} sales</span>
          </div>

          <div className="mt-6 flex items-end gap-3 border-y border-white/10 py-5">
            {product.oldPrice ? (
              <>
                <span className="text-lg text-slate-500 line-through">{formatPKR(product.oldPrice)}</span>
                <span className="text-3xl font-extrabold text-white">{formatPKR(product.price)}</span>
                {off > 0 && (
                  <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-300">
                    Save {off}%
                  </span>
                )}
              </>
            ) : (
              <span className="text-3xl font-extrabold text-white">{formatPKR(product.price)}</span>
            )}
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs text-slate-500">Setup Time</dt>
              <dd className="font-semibold text-slate-200">{product.setupTime}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Version</dt>
              <dd className="font-semibold text-slate-200">{product.version}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Last Updated</dt>
              <dd className="font-semibold text-slate-200">{formatDate(product.lastUpdated)}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Creator</dt>
              <dd className="font-semibold text-slate-200">{product.creator}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Compatibility</dt>
              <dd className="font-semibold text-slate-200">{product.compatibility}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Category</dt>
              <dd className="font-semibold text-slate-200">{product.category}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={buyNow}
              className="flex-1 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:brightness-110"
            >
              {product.isFree ? "Get Free Workflow" : "Buy Now"}
            </button>
            <button
              onClick={() => addToCart(product)}
              className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3.5 text-sm font-bold text-white hover:bg-white/10"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-pressed={wishlisted}
              aria-label="Toggle wishlist"
              className={`flex items-center justify-center rounded-xl border px-4 py-3.5 text-sm font-bold ${
                wishlisted ? "border-rose-400/40 bg-rose-500/10 text-rose-300" : "border-white/15 text-white hover:bg-white/10"
              }`}
            >
              ♥
            </button>
          </div>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              showToast("Product link copied successfully", "success");
            }}
            className="mt-3 text-xs font-medium text-slate-500 hover:text-cyan-300"
          >
            Copy product link
          </button>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-400">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-white/10">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-none whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition ${
                tab === t ? "border-cyan-400 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === "Overview" && <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-slate-300">{product.description}</p>}

          {tab === "Workflow" && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <p className="mb-2 text-sm text-slate-400">
                Visual overview of the automation pipeline included in this product.
              </p>
              <WorkflowVisualizer steps={product.workflowSteps} />
            </div>
          )}

          {tab === "Features" && (
            <ul className="grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-slate-900/40 p-4 text-sm text-slate-300">
                  <span className="mt-0.5 text-cyan-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          {tab === "Requirements" && (
            <div className="max-w-2xl">
              <p className="mb-4 text-sm text-slate-400">You&apos;ll need the following accounts or API credentials to run this workflow:</p>
              <ul className="flex flex-col gap-2.5">
                {product.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-slate-900/40 p-4 text-sm text-slate-300">
                    <span className="mt-0.5 text-violet-400">🔑</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "Setup" && (
            <ol className="max-w-2xl flex-col gap-4">
              {product.setupSteps.map((s, i) => (
                <li key={s} className="mb-4 flex gap-4 rounded-xl border border-white/10 bg-slate-900/40 p-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold text-slate-950">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-300">{s}</p>
                </li>
              ))}
            </ol>
          )}

          {tab === "What's Included" && (
            <ul className="max-w-2xl flex flex-col gap-2.5">
              {product.included.map((inc) => (
                <li
                  key={inc.name}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/40 p-4 text-sm"
                >
                  <span className="text-slate-200">{inc.name}</span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase text-slate-400">
                    {inc.type}
                  </span>
                </li>
              ))}
              <li className="mt-2 rounded-xl border border-dashed border-white/15 p-4 text-xs text-slate-500">
                DEMO DOWNLOAD — In production, purchasing this product generates a signed, private download URL from
                the backend after payment verification. Files are not publicly hosted.
              </li>
            </ul>
          )}

          {tab === "Reviews" && (
            <div id="reviews" className="max-w-3xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="text-4xl font-extrabold text-white">{product.rating}</span>
                <div>
                  <div className="text-amber-400">{"★".repeat(Math.round(Number(product.rating)))}</div>
                  <p className="text-xs text-slate-400">{product.reviewsCount} reviews · demo sample data</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {reviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{r.author}</p>
                        <p className="text-xs text-slate-500">{r.role}</p>
                      </div>
                      <span className="text-amber-400">{"★".repeat(r.rating)}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">{r.comment}</p>
                  </div>
                ))}
                {reviews.length === 0 && <p className="text-sm text-slate-400">No reviews yet for this workflow.</p>}
              </div>
            </div>
          )}

          {tab === "FAQ" && (
            <div className="max-w-2xl">
              {product.faq.length ? (
                <FaqAccordion items={product.faq} />
              ) : (
                <p className="text-sm text-slate-400">No specific FAQs for this product yet — see our general FAQ page.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-10 border-t border-white/10 pt-10">
          <h2 className="mb-6 text-xl font-bold text-white">More in {product.category}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
