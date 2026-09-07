import { Suspense } from "react";
import { DashboardClient } from "./dashboard-client";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-slate-400">Loading dashboard…</div>}>
      <DashboardClient />
    </Suspense>
  );
}
