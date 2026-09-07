import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Product } from "@/lib/types";
import { DealsSection } from "@/components/home/deals-section";

export const dynamic = "force-dynamic";

export default async function DealsPage() {
  const rows = await db.select().from(products).where(eq(products.onSale, true));
  const deals = JSON.parse(JSON.stringify(rows)) as Product[];

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="text-xs text-slate-500">
          <span>Home</span> <span className="mx-1">/</span> <span className="text-slate-300">Deals</span>
        </div>
      </div>
      <DealsSection products={deals} />
    </div>
  );
}
