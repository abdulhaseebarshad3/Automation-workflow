import { db } from "@/db";
import { coupons } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/coupons/validate
// DEMO coupon validation backed by the `coupons` table. In production this
// would also enforce per-customer usage limits and minimum order values.
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const { code } = await req.json();
  if (!code || typeof code !== "string") {
    return Response.json({ ok: false, reason: "invalid" });
  }

  const [row] = await db
    .select()
    .from(coupons)
    .where(eq(coupons.code, code.trim().toUpperCase()))
    .limit(1);

  if (!row) return Response.json({ ok: false, reason: "invalid" });
  if (!row.active || (row.expiresAt && new Date(row.expiresAt) < new Date())) {
    return Response.json({ ok: false, reason: "expired" });
  }

  return Response.json({ ok: true, code: row.code, percent: row.percent });
}
