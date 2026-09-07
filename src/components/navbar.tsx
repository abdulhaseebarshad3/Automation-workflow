"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useProducts } from "@/context/products-context";
import { ProductThumb } from "./product-thumb";
import { formatPKR } from "@/lib/format";
import { ClerkAuth } from "./clerk-auth";

const NAV_LINKS = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/marketplace?category=AI%20Agents", label: "AI Agents" },
  { href: "/marketplace?compat=n8n", label: "n8n Workflows" },
  { href: "/membership", label: "Membership" },
  { href: "/credits", label: "Credits" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/deals", label: "Deals" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount, openDrawer } = useCart();
  const { ids } = useWishlist();
  const { products } = useProducts();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = query.trim()
    ? products
        .filter((p) => {
          const q = query.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q))
          );
        })
        .slice(0, 5)
    : [];

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/marketplace?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-[60] border-b border-white/10 bg-slate-950/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav className="ml-6 hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <div className="relative hidden sm:block" ref={searchRef}>
            <form onSubmit={submitSearch}>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                type="search"
                placeholder="Search workflows, AI agents..."
                aria-label="Search products"
                className="w-52 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:w-72 focus:border-cyan-400/50 transition-all lg:w-64 lg:focus:w-80"
              />
            </form>
            {searchOpen && query.trim() && (
              <div className="absolute right-0 mt-2 w-96 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
                {results.length ? (
                  <ul>
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5"
                        >
                          <ProductThumb image={p.image} name={p.name} className="h-12 w-16 flex-none rounded-md" sizes="64px" />
                          <span className="flex-1">
                            <span className="block text-sm font-medium text-white">{p.name}</span>
                            <span className="text-xs text-slate-400">{p.category}</span>
                          </span>
                          <span className="text-xs font-semibold text-cyan-300">{formatPKR(p.price)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-4 text-sm text-slate-400">No workflows found. Try another keyword.</p>
                )}
                <button
                  onClick={submitSearch}
                  className="block w-full border-t border-white/10 px-4 py-2.5 text-center text-xs font-semibold text-cyan-300 hover:bg-white/5"
                >
                  View all results
                </button>
              </div>
            )}
          </div>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7.5-4.6-10-9.3C.6 8.4 2.6 5 6 5c2 0 3.3 1 4.5 2.4a1 1 0 0 0 1.4 0C13.1 6 14.4 5 16.4 5c3.4 0 5.4 3.4 4 6.7C19.5 16.4 12 21 12 21z" />
            </svg>
            {ids.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white">
                {ids.length}
              </span>
            )}
          </Link>

          <button
            onClick={openDrawer}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
              <path d="M2.5 3h2l2.2 11.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 7H6" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-bold text-slate-950">
                {itemCount}
              </span>
            )}
          </button>

          <Link
            href="/dashboard"
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5 hover:text-white sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="3.4" />
              <path d="M4.5 20c1.6-3.5 4.6-5.3 7.5-5.3s5.9 1.8 7.5 5.3" />
            </svg>
          </Link>

          <ClerkAuth />

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5 lg:hidden"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-950 px-4 py-4 lg:hidden">
          <form onSubmit={submitSearch} className="mb-3 sm:hidden">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search workflows..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500"
            />
          </form>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
