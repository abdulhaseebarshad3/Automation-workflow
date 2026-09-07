"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage";
import { useToast } from "./toast-context";
import type { Product } from "@/lib/types";

type WishlistContextValue = {
  ids: number[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: number) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIds(getFromStorage(STORAGE_KEYS.wishlist, [] as number[]));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.wishlist, ids);
  }, [ids, hydrated]);

  const toggleWishlist = (product: Product) => {
    setIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, "info");
        return prev.filter((id) => id !== product.id);
      }
      showToast(`Saved "${product.name}" to wishlist`, "success");
      return [...prev, product.id];
    });
  };

  const isWishlisted = (id: number) => ids.includes(id);

  return (
    <WishlistContext.Provider value={{ ids, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
