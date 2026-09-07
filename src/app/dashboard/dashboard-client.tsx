"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import { useWishlist } from "@/context/wishlist-context";
import { useProducts } from "@/context/products-context";
import { formatPKR, formatDate, initials } from "@/lib/format";
import { ProductThumb } from "@/components/product-thumb";

const TABS = [
  "Overview",
  "My Products",
  "Downloads",
  "Orders",
  "Credits",
  "Membership",
  "Wishlist",
  "Gift Cards",
  "Profile",
  "Support",
] as const;
type Tab = (typeof TABS)[number];

export function DashboardClient() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) || "Overview";
  const [tab, setTab] = useState<Tab>(TABS.includes(initialTab) ? initialTab : "Overview");
  const { user, loginDemo, logout, credits, membership, library, orders } = useUser();
  const { ids } = useWishlist();
  const { products } = useProducts();

  const libraryProducts = products.filter((p) => library.includes(p.slug));
  const wishlistProducts = products.filter((p) => ids.includes(p.id));

  if (!user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="text-4xl">🔐</span>
        <h1 className="text-2xl font-bold text-white">Sign in to your account</h1>
        <p className="text-sm text-slate-400">
          DEMO AUTHENTICATION — sign in instantly with a simulated demo account (no password required) to explore
          the customer dashboard.
        </p>
        <button
          onClick={loginDemo}
          className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-3.5 text-sm font-bold text-slate-950 hover:brightness-110"
        >
          Continue with Demo Account
        </button>
        <p className="text-xs text-slate-500">demo@example.com · frontend-only demo session</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-bold text-slate-950">
              {initials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto no-scrollbar rounded-2xl border border-white/10 bg-slate-900/40 p-2 lg:flex-col lg:overflow-visible">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-none whitespace-nowrap rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition ${
                  tab === t ? "bg-gradient-to-r from-cyan-400/20 to-violet-500/20 text-white" : "text-slate-400 hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
          <button
            onClick={logout}
            className="mt-3 w-full rounded-xl border border-white/10 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5"
          >
            Sign Out
          </button>
        </aside>

        <div>
          {tab === "Overview" && (
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, {user.name.split(" ")[0]}</h1>
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  { label: "Total Purchases", value: orders.length, icon: "🧾" },
                  { label: "Available Credits", value: credits, icon: "💠" },
                  { label: "Active Membership", value: membership?.plan || "None", icon: "👑" },
                  { label: "Saved Workflows", value: ids.length, icon: "♡" },
                ].map((card) => (
                  <div key={card.label} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                    <span className="text-xl">{card.icon}</span>
                    <p className="mt-3 text-2xl font-extrabold text-white">{card.value}</p>
                    <p className="text-xs text-slate-400">{card.label}</p>
                  </div>
                ))}
              </div>

              <h2 className="mb-4 mt-10 text-lg font-bold text-white">Recent Library Items</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {libraryProducts.slice(0, 3).map((p) => (
                  <LibraryCard key={p.slug} product={p} />
                ))}
                {libraryProducts.length === 0 && <p className="text-sm text-slate-400">No purchases yet.</p>}
              </div>
            </div>
          )}

          {tab === "My Products" && (
            <div>
              <h1 className="text-2xl font-bold text-white">My Products</h1>
              <p className="mt-1 text-sm text-slate-400">Workflows and agents currently in your library.</p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {libraryProducts.map((p) => (
                  <LibraryCard key={p.slug} product={p} />
                ))}
                {libraryProducts.length === 0 && (
                  <p className="text-sm text-slate-400">
                    You haven&apos;t purchased any workflows yet. Try our{" "}
                    <Link href="/marketplace?type=free" className="text-cyan-300">
                      free demo products
                    </Link>
                    .
                  </p>
                )}
              </div>
            </div>
          )}

          {tab === "Downloads" && (
            <div>
              <h1 className="text-2xl font-bold text-white">Downloads</h1>
              <p className="mt-1 text-sm text-slate-400">Download workflow files and setup guides for your library.</p>
              <div className="mt-6 flex flex-col gap-3">
                {libraryProducts.map((p) => (
                  <div key={p.slug} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/40 p-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.included.length} file(s) included</p>
                    </div>
                    <button className="rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20">
                      Download (Demo) ⬇
                    </button>
                  </div>
                ))}
                {libraryProducts.length === 0 && <p className="text-sm text-slate-400">No downloads available yet.</p>}
              </div>
            </div>
          )}

          {tab === "Orders" && (
            <div>
              <h1 className="text-2xl font-bold text-white">Order History</h1>
              <div className="mt-6 flex flex-col gap-4">
                {orders.map((o) => (
                  <div key={o.orderNumber} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-white">#{o.orderNumber}</p>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                        {o.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{formatDate(o.createdAt)} · {formatPKR(o.total)}</p>
                    <ul className="mt-3 flex flex-col gap-1">
                      {o.items.map((i) => (
                        <li key={i.productSlug} className="text-xs text-slate-400">
                          {i.productName} × {i.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {orders.length === 0 && <p className="text-sm text-slate-400">No orders yet.</p>}
              </div>
            </div>
          )}

          {tab === "Credits" && (
            <div>
              <h1 className="text-2xl font-bold text-white">Automation Credits</h1>
              <div className="glass mt-6 w-fit rounded-2xl px-8 py-6 text-center">
                <p className="text-xs uppercase tracking-wide text-slate-400">Current Balance</p>
                <p className="text-3xl font-extrabold text-gradient">{credits.toLocaleString()} credits</p>
              </div>
              <Link href="/credits" className="mt-5 inline-block rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-bold text-slate-950">
                Buy More Credits
              </Link>
            </div>
          )}

          {tab === "Membership" && (
            <div>
              <h1 className="text-2xl font-bold text-white">Membership</h1>
              {membership ? (
                <div className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-500/5 p-6">
                  <p className="text-sm text-slate-400">Current Plan</p>
                  <p className="text-2xl font-extrabold text-white">{membership.plan}</p>
                  <p className="mt-1 text-xs text-slate-500 capitalize">{membership.cycle} billing</p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-400">You don&apos;t have an active membership yet.</p>
              )}
              <Link href="/membership" className="mt-5 inline-block rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
                Manage Membership
              </Link>
            </div>
          )}

          {tab === "Wishlist" && (
            <div>
              <h1 className="text-2xl font-bold text-white">Wishlist</h1>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wishlistProducts.map((p) => (
                  <LibraryCard key={p.slug} product={p} />
                ))}
                {wishlistProducts.length === 0 && <p className="text-sm text-slate-400">Your wishlist is empty.</p>}
              </div>
            </div>
          )}

          {tab === "Gift Cards" && (
            <div>
              <h1 className="text-2xl font-bold text-white">Gift Cards</h1>
              <p className="mt-2 text-sm text-slate-400">Send or redeem a FlowForge AI gift card.</p>
              <Link href="/gift-cards" className="mt-5 inline-block rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-bold text-slate-950">
                Go to Gift Cards
              </Link>
            </div>
          )}

          {tab === "Profile" && (
            <div>
              <h1 className="text-2xl font-bold text-white">Profile</h1>
              <div className="mt-6 grid max-w-md grid-cols-1 gap-4">
                <label className="flex flex-col gap-1.5 text-sm text-slate-300">
                  Name
                  <input defaultValue={user.name} className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-slate-300">
                  Email
                  <input defaultValue={user.email} className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white" />
                </label>
                <button className="mt-2 w-fit rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-sm font-bold text-slate-950">
                  Save Changes (Demo)
                </button>
              </div>
            </div>
          )}

          {tab === "Support" && (
            <div>
              <h1 className="text-2xl font-bold text-white">Support</h1>
              <p className="mt-2 max-w-lg text-sm text-slate-400">
                Need help with a workflow or your order? Use the FlowForge AI Assistant chatbot in the bottom-right
                corner, or reach out via our contact page.
              </p>
              <Link href="/contact" className="mt-5 inline-block rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
                Contact Support
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LibraryCard({ product }: { product: ReturnType<typeof useProducts>["products"][number] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40">
      <ProductThumb image={product.image} name={product.name} className="aspect-[16/9]" />
      <div className="p-4">
        <p className="line-clamp-1 text-sm font-semibold text-white">{product.name}</p>
        <p className="mt-1 text-xs text-slate-500">v{product.version} · {product.setupTime} setup</p>
        <div className="mt-3 flex gap-2">
          <button className="flex-1 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-2 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20">
            Download
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="flex-1 rounded-lg border border-white/15 px-2 py-2 text-center text-xs font-semibold text-slate-200 hover:bg-white/5"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
