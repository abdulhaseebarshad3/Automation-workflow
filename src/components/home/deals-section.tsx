"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

function useCountdown(hours: number) {
  const [target] = useState(() => Date.now() + hours * 3600 * 1000);
  const [remaining, setRemaining] = useState(hours * 3600 * 1000);

  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(target - Date.now(), 0)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(remaining / 1000);
  return {
    hours: String(Math.floor(totalSeconds / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0"),
    seconds: String(totalSeconds % 60).padStart(2, "0"),
  };
}

export function DealsSection({ products }: { products: Product[] }) {
  const { hours, minutes, seconds } = useCountdown(18);

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-b from-rose-500/5 via-slate-950 to-slate-950 py-16">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-400">Limited-Time Deals</span>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Automate More. Spend Less.</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
              Save on best-selling automation workflows before this demo deal cycle ends.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { v: hours, l: "Hrs" },
              { v: minutes, l: "Min" },
              { v: seconds, l: "Sec" },
            ].map((t) => (
              <div key={t.l} className="glass flex w-16 flex-col items-center rounded-xl py-2.5">
                <span className="text-lg font-bold text-white tabular-nums">{t.v}</span>
                <span className="text-[10px] uppercase tracking-wide text-slate-400">{t.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/deals"
            className="inline-block rounded-xl bg-gradient-to-r from-rose-400 to-orange-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(251,113,133,0.3)] hover:brightness-110"
          >
            See All Deals
          </Link>
        </div>
      </div>
    </section>
  );
}
