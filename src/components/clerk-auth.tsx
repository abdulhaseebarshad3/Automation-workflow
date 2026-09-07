"use client";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function ClerkAuth() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return null;
  }

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="hidden rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-100 sm:block">
            Continue with Google
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href="/dashboard" className="sr-only">
          Account
        </Link>
      </SignedOut>
    </>
  );
}
