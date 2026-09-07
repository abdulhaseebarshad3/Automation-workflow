import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatPKR, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  if (!order) notFound();
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl text-emerald-400 animate-pulse-glow">
          ✓
        </span>
        <h1 className="mt-5 text-3xl font-extrabold text-white">Payment Successful</h1>
        <p className="mt-2 text-sm text-slate-400">Your order has been confirmed and added to your library.</p>
        <p className="mt-4 rounded-full border border-white/10 bg-slate-900/60 px-4 py-1.5 text-sm font-semibold text-cyan-300">
          Order #{order.orderNumber}
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/40 p-6">
        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500">Order Date</p>
            <p className="font-semibold text-slate-200">{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Customer Email</p>
            <p className="font-semibold text-slate-200">{order.customerEmail}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Payment Method</p>
            <p className="font-semibold capitalize text-slate-200">{order.paymentMethod}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Paid</p>
            <p className="font-semibold text-slate-200">{formatPKR(order.total)}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-300">Purchased Workflows</h2>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/40 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{item.productName}</p>
                  <p className="text-xs text-slate-500">Qty {item.quantity} · {formatPKR(item.price)}</p>
                </div>
                <Link
                  href={`/product/${item.productSlug}`}
                  className="rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20"
                >
                  Download (Demo) ⬇
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg border border-dashed border-white/15 p-3 text-[11px] text-slate-500">
            DEMO DOWNLOAD — In production, generate a signed/private download URL from the backend after successful
            payment verification.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/dashboard"
          className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-bold text-slate-950 hover:brightness-110"
        >
          Go to My Library
        </Link>
        <Link href="/marketplace" className="rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
