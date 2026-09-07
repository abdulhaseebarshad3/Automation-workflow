"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { formatPKR } from "@/lib/format";
import { ProductThumb } from "./product-thumb";

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeFromCart, updateQuantity, subtotal, discount, total, coupon } =
    useCart();

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <div
      className={`fixed inset-0 z-[80] transition-opacity duration-300 ${
        isDrawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isDrawerOpen}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={closeDrawer} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`glass absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 shadow-2xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-bold text-white">Your Cart ({items.length})</h2>
          <button onClick={closeDrawer} aria-label="Close cart" className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="text-4xl">🛒</div>
            <p className="font-semibold text-white">Your cart is empty</p>
            <p className="text-sm text-slate-400">Explore automation workflows and add one to get started.</p>
            <Link
              href="/marketplace"
              onClick={closeDrawer}
              className="mt-2 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Explore Workflows
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-3 border-b border-white/5 pb-4">
                    <ProductThumb image={item.image} name={item.name} className="h-16 w-20 flex-none rounded-lg" sizes="80px" />
                    <div className="flex flex-1 flex-col gap-1">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeDrawer}
                        className="line-clamp-1 text-sm font-semibold text-white hover:text-cyan-300"
                      >
                        {item.name}
                      </Link>
                      <span className="text-sm font-bold text-cyan-300">{formatPKR(item.price)}</span>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-6 w-6 items-center justify-center rounded border border-white/15 text-slate-300 hover:bg-white/5"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-6 w-6 items-center justify-center rounded border border-white/15 text-slate-300 hover:bg-white/5"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="ml-auto text-xs font-medium text-rose-400 hover:text-rose-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span>{formatPKR(subtotal)}</span>
              </div>
              {coupon && (
                <div className="mt-1 flex justify-between text-sm text-emerald-400">
                  <span>Coupon {coupon.code}</span>
                  <span>-{formatPKR(discount)}</span>
                </div>
              )}
              <div className="mt-2 flex justify-between text-base font-bold text-white">
                <span>Total</span>
                <span>{formatPKR(total)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="mt-4 block w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-3 text-center text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:brightness-110"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
