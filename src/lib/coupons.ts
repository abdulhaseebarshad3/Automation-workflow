// ---------------------------------------------------------------------------
// DEMO COUPON LOGIC
// For the MVP this validates against a small in-memory list on the server
// (see /api/coupons/validate) which is backed by the `coupons` table.
// A production system would look these up server-side against the DB and
// apply usage limits / per-customer rules.
// ---------------------------------------------------------------------------

export type CouponResult =
  | { ok: true; code: string; percent: number }
  | { ok: false; reason: "invalid" | "expired" };

export async function validateCoupon(code: string): Promise<CouponResult> {
  const res = await fetch("/api/coupons/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  return res.json();
}
