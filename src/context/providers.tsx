"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "./toast-context";
import { ProductsProvider } from "./products-context";
import { CartProvider } from "./cart-context";
import { WishlistProvider } from "./wishlist-context";
import { UserProvider } from "./user-context";
import { ToastContainer } from "@/components/toast-container";
import { CartDrawer } from "@/components/cart-drawer";
import { Chatbot } from "@/components/chatbot";

export function Providers({ children }: { children: ReactNode }) {
  const content = (
    <ToastProvider>
      <ProductsProvider>
        <CartProvider>
          <WishlistProvider>
            <UserProvider>
              {children}
              <CartDrawer />
              <Chatbot />
              <ToastContainer />
            </UserProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductsProvider>
    </ToastProvider>
  );

  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>{content}</ClerkProvider>
  ) : (
    content
  );
}
