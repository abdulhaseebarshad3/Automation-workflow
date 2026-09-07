import { db } from "@/db";
import { products } from "@/db/schema";
import { asc } from "drizzle-orm";

// ---------------------------------------------------------------------------
// GET /api/products
// Returns the full product catalog. The marketplace UI performs search,
// filtering, and sorting on the client for an instant, no-reload experience.
// A larger production catalog would instead push filtering/pagination down
// to this route with query params (?q=&category=&sort=&page=).
// ---------------------------------------------------------------------------
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db.select().from(products).orderBy(asc(products.id));
  return Response.json({ products: rows });
}
