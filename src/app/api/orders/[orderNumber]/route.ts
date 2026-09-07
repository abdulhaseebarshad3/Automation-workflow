import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await params;

  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  if (!order) return Response.json({ error: "Order not found" }, { status: 404 });

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return Response.json({
    order: {
      ...order,
      items: items.map((i) => ({
        productName: i.productName,
        productSlug: i.productSlug,
        price: i.price,
        quantity: i.quantity,
      })),
    },
  });
}
