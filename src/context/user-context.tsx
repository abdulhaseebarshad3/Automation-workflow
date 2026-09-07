"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage";
import { useToast } from "./toast-context";
import type { Order } from "@/lib/types";

// ---------------------------------------------------------------------------
// DEMO AUTHENTICATION LAYER
// This context simulates a signed-in customer entirely in localStorage.
// A production build would replace `login`/`logout` with calls to
// POST /api/auth/login and POST /api/auth/register, and store a session
// token/cookie instead of a plain object.
// ---------------------------------------------------------------------------

export type DemoUser = { name: string; email: string };
export type Membership = { plan: "Starter" | "Pro" | "Agency"; cycle: "monthly" | "yearly" } | null;

type UserContextValue = {
  user: DemoUser | null;
  login: (user: DemoUser) => void;
  loginDemo: () => void;
  logout: () => void;
  credits: number;
  addCredits: (amount: number) => void;
  spendCredits: (amount: number) => boolean;
  membership: Membership;
  setMembership: (m: Membership) => void;
  library: string[];
  addToLibrary: (slugs: string[]) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  hydrated: boolean;
};

const UserContext = createContext<UserContextValue | null>(null);

const DEMO_LIBRARY = ["ai-whatsapp-lead-qualifier", "free-ai-email-classifier", "ai-content-factory"];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [credits, setCredits] = useState(0);
  const [membership, setMembershipState] = useState<Membership>(null);
  const [library, setLibrary] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setUser(getFromStorage(STORAGE_KEYS.user, null as DemoUser | null));
      setCredits(getFromStorage(STORAGE_KEYS.credits, 0));
      setMembershipState(getFromStorage(STORAGE_KEYS.membership, null as Membership));
      setLibrary(getFromStorage(STORAGE_KEYS.library, [] as string[]));
      setOrders(getFromStorage(STORAGE_KEYS.orders, [] as Order[]));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.user, user);
  }, [user, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.credits, credits);
  }, [credits, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.membership, membership);
  }, [membership, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.library, library);
  }, [library, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.orders, orders);
  }, [orders, hydrated]);

  const login = (u: DemoUser) => {
    setUser(u);
    showToast(`Welcome, ${u.name.split(" ")[0]}!`, "success");
  };

  const loginDemo = () => {
    setUser({ name: "Demo Customer", email: "demo@example.com" });
    setCredits(320);
    setMembershipState({ plan: "Pro", cycle: "monthly" });
    setLibrary((prev) => Array.from(new Set([...prev, ...DEMO_LIBRARY])));
    showToast("Signed in with demo account", "success");
  };

  const logout = () => {
    setUser(null);
    showToast("Signed out", "info");
  };

  const addCredits = (amount: number) => setCredits((c) => c + amount);
  const spendCredits = (amount: number) => {
    let ok = false;
    setCredits((c) => {
      if (c >= amount) {
        ok = true;
        return c - amount;
      }
      return c;
    });
    return ok;
  };

  const addToLibrary = (slugs: string[]) => {
    setLibrary((prev) => Array.from(new Set([...prev, ...slugs])));
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    addToLibrary(order.items.filter((i) => i.price >= 0).map((i) => i.productSlug));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        loginDemo,
        logout,
        credits,
        addCredits,
        spendCredits,
        membership,
        setMembership: setMembershipState,
        library,
        addToLibrary,
        orders,
        addOrder,
        hydrated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
