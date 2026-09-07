import { Suspense } from "react";
import { MarketplaceClient } from "./marketplace-client";

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-slate-400 sm:px-6 lg:px-8">Loading marketplace…</div>}>
      <MarketplaceClient />
    </Suspense>
  );
}
