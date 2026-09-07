import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { NextRequest } from "next/server";
import { eq, sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// POST /api/orders
//
// DEMO PAYMENT INTEGRATION
// This endpoint simulates order creation *after* a successful (demo)
// payment. In production:
//   1. The frontend would call POST /api/payments/create to get a payment
//      session from a real gateway (JazzCash / Easypaisa / a card processor).
//   2. The gateway would redirect/confirm, then call a signed server-side
//      webhook (POST /api/payments/webhook) which verifies the payment and
//      THEN creates the order below.
// Never trust the client to declare "payment succeeded" in a real system —
// this MVP does so only because there is no real payment gateway wired up.
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    customerName,
    customerEmail,
    customerPhone,
    country,
    city,
    paymentMethod,
    items,
    couponCode,
    discount = 0,
  } = body as {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    country?: string;
    city?: string;
    paymentMethod: string;
    couponCode?: string | null;
    discount?: number;
    items: { productId: number; productName: string; productSlug: string; price: number; quantity: number }[];
  };

  if (!customerName || !customerEmail || !items?.length) {
    return Response.json({ error: "Missing required order fields" }, { status: 400 });
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = Math.max(subtotal - (discount || 0), 0);
  const orderNumber = `FAI-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const [order] = await db
    .insert(orders)
    .values({
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      country,
      city,
      paymentMethod,
      subtotal,
      discount: discount || 0,
      total,
      couponCode: couponCode || null,
      status: "paid",
    })
    .returning();

  await db.insert(orderItems).values(
    items.map((i) => ({
      orderId: order.id,
      productId: i.productId || null,
      productName: i.productName,
      productSlug: i.productSlug,
      price: i.price,
      quantity: i.quantity,
    }))
  );

  // Bump the demo sales counters so best-seller data feels alive.
  for (const i of items) {
    if (i.productId) {
      await db
        .update(products)
        .set({ salesCount: sql`${products.salesCount} + ${i.quantity}` })
        .where(eq(products.id, i.productId));
    }
  }

  return Response.json({
    order: {
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      country: order.country,
      city: order.city,
      paymentMethod: order.paymentMethod,
      subtotal: order.subtotal,
      discount: order.discount,
      total: order.total,
      couponCode: order.couponCode,
      status: order.status,
      createdAt: order.createdAt,
      items: items.map((i) => ({
        productName: i.productName,
        productSlug: i.productSlug,
        price: i.price,
        quantity: i.quantity,
      })),
    },
  });
}
