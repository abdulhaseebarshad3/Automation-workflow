"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useUser } from "@/context/user-context";
import { useToast } from "@/context/toast-context";
import { validateCoupon } from "@/lib/coupons";
import { formatPKR } from "@/lib/format";
import { ProductThumb } from "@/components/product-thumb";
import type { Order } from "@/lib/types";

const PAYMENT_METHODS = [
  { id: "easypaisa", label: "Easypaisa", icon: "📱", desc: "Pay via Easypaisa mobile wallet" },
  { id: "jazzcash", label: "JazzCash", icon: "💳", desc: "Pay via JazzCash mobile wallet" },
  { id: "bank", label: "Bank Transfer", icon: "🏦", desc: "Direct bank transfer" },
  { id: "card", label: "Debit / Credit Card", icon: "💰", desc: "Visa, Mastercard, UnionPay" },
];

type PaymentState = "idle" | "processing" | "success" | "failed";

export default function CheckoutPage() {
  const { items, subtotal, discount, total, coupon, applyCoupon, clearCart } = useCart();
  const { user, addOrder } = useUser();
  const { showToast } = useToast();
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [city, setCity] = useState("");
  const [method, setMethod] = useState("easypaisa");
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [cardNumber, setCardNumber] = useState("");

  async function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    const result = await validateCoupon(couponInput.trim());
    if (result.ok) {
      applyCoupon({ code: result.code, percent: result.percent });
      setCouponMsg({ ok: true, text: `Coupon ${result.code} applied — ${result.percent}% off` });
      showToast("Coupon applied", "success");
    } else {
      applyCoupon(null);
      setCouponMsg({
        ok: false,
        text: result.reason === "expired" ? "This coupon has expired" : "Invalid coupon code",
      });
    }
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || items.length === 0) {
      showToast("Please complete the required fields", "error");
      return;
    }

    setPaymentState("processing");

    // -------------------------------------------------------------------
    // DEMO PAYMENT INTEGRATION
    // Connect this interface to a secure backend/payment gateway.
    // Never expose API secret keys in frontend JavaScript.
    //
    // Real flow:
    //   1. POST /api/payments/create -> returns a gateway session/redirect
    //   2. User completes payment on Easypaisa/JazzCash/card gateway
    //   3. Gateway calls POST /api/payments/webhook (server-to-server)
    //   4. Webhook verifies signature and marks the order as paid
    // -------------------------------------------------------------------
    await new Promise((r) => setTimeout(r, 1600));

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          country,
          city,
          paymentMethod: method,
          couponCode: coupon?.code || null,
          discount,
          items: items.map((i) => ({
            productId: i.productId,
            productName: i.name,
            productSlug: i.slug,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error("Order failed");
      const data = await res.json();
      const order: Order = data.order;

      setPaymentState("success");
      addOrder(order);
      clearCart();
      showToast("Payment successful", "success");
      setTimeout(() => router.push(`/order-success/${order.orderNumber}`), 900);
    } catch {
      setPaymentState("failed");
      showToast("Payment failed. Please try again.", "error");
    }
  }

  if (items.length === 0 && paymentState === "idle") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="text-4xl">🛒</span>
        <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
        <p className="text-sm text-slate-400">Add a workflow to your cart before checking out.</p>
        <Link href="/marketplace" className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-bold text-slate-950">
          Explore Workflows
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Checkout</h1>
      <p className="mt-2 text-sm text-slate-400">Complete your order below. This is a demo checkout — no real charge occurs.</p>

      <form onSubmit={handlePlaceOrder} className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-8">
          <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-300">Customer Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm text-slate-300">
                Full Name *
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm text-slate-300">
                Email *
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm text-slate-300 sm:col-span-2">
                Phone
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 3xx xxxxxxx"
                  className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-300">Billing</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm text-slate-300">
                Country
                <input value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm text-slate-300">
                City
                <input value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white" />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-slate-300">Payment</h2>
            <p className="mb-4 text-xs text-slate-500">DEMO PAYMENT INTEGRATION — no real transaction is processed.</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    method === m.id ? "border-cyan-400/40 bg-cyan-500/10" : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                    className="accent-cyan-400"
                  />
                  <span className="text-xl">{m.icon}</span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{m.label}</span>
                    <span className="block text-xs text-slate-400">{m.desc}</span>
                  </span>
                </label>
              ))}
            </div>

            {method === "card" && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm text-slate-300 sm:col-span-2">
                  Card Number (demo — not stored or transmitted)
                  <input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                    placeholder="4242 4242 4242 4242"
                    className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-slate-300">
                  Expiry
                  <input placeholder="MM/YY" className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-slate-300">
                  CVC
                  <input placeholder="123" className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white" />
                </label>
              </div>
            )}

            {(method === "easypaisa" || method === "jazzcash") && (
              <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
                You will receive a payment request notification on your {method === "easypaisa" ? "Easypaisa" : "JazzCash"} number
                to confirm this demo payment.
              </div>
            )}

            {method === "bank" && (
              <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
                Bank transfer details would be emailed after order confirmation in a production integration.
              </div>
            )}

            <p className="mt-4 rounded-lg border border-dashed border-white/15 p-3 text-[11px] leading-relaxed text-slate-500">
              DEMO PAYMENT INTEGRATION. Connect this interface to a secure backend/payment gateway. Never expose API
              secret keys in frontend JavaScript.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-300">Order Summary</h2>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.productId} className="flex items-center gap-3">
                <ProductThumb image={item.image} name={item.name} className="h-12 w-16 flex-none rounded-lg" sizes="64px" />
                <div className="flex-1">
                  <p className="line-clamp-1 text-xs font-semibold text-slate-200">{item.name}</p>
                  <p className="text-[11px] text-slate-500">Qty {item.quantity}</p>
                </div>
                <span className="text-xs font-semibold text-white">{formatPKR(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex gap-2">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/5"
            >
              Apply
            </button>
          </div>
          {couponMsg && (
            <p className={`mt-2 text-xs ${couponMsg.ok ? "text-emerald-400" : "text-rose-400"}`}>{couponMsg.text}</p>
          )}

          <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount</span>
                <span>-{formatPKR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span>{formatPKR(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={paymentState === "processing"}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.35)] transition hover:brightness-110 disabled:opacity-70"
          >
            {paymentState === "processing" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                Processing payment…
              </>
            ) : (
              `Pay ${formatPKR(total)}`
            )}
          </button>

          {paymentState === "failed" && (
            <p className="mt-3 text-center text-xs font-medium text-rose-400">Payment failed. Please try again.</p>
          )}
          {paymentState === "success" && (
            <p className="mt-3 text-center text-xs font-medium text-emerald-400">Payment successful — redirecting…</p>
          )}

          <p className="mt-4 text-center text-[11px] text-slate-500">🔒 Secure demo checkout · PKR pricing</p>
        </aside>
      </form>
    </div>
  );
}
