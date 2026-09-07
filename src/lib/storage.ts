// ---------------------------------------------------------------------------
// DEMO LOCALSTORAGE PERSISTENCE LAYER
//
// This MVP uses the browser's localStorage to persist cart, wishlist, demo
// auth/session, demo credits, demo membership, and demo order history.
//
// In a production build, these helpers would be replaced by real API calls,
// e.g. saveToStorage("cart") -> POST /api/cart, getFromStorage("user") ->
// GET /api/auth/session, etc. Keeping all reads/writes funneled through this
// module makes that swap straightforward later.
// ---------------------------------------------------------------------------

export const STORAGE_KEYS = {
  cart: "flowforge_cart",
  wishlist: "flowforge_wishlist",
  user: "flowforge_user",
  credits: "flowforge_credits",
  membership: "flowforge_membership",
  orders: "flowforge_orders",
  library: "flowforge_library",
} as const;

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (private browsing, quota) — fail silently.
  }
}

export function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}

export function clearStorage(): void {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((k) => window.localStorage.removeItem(k));
}
