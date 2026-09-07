import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

export function ProductSection({
  eyebrow,
  title,
  subtitle,
  products,
  viewAllHref,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  products: Product[];
  viewAllHref: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">{eyebrow}</span>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">{subtitle}</p>
        </div>
        <Link
          href={viewAllHref}
          className="whitespace-nowrap rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
