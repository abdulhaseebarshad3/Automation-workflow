import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refund Policy — FlowForge AI" };

export default function RefundsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-white">Refund Policy</h1>
      <p className="mt-2 text-xs text-slate-500">Last updated January 2026 · Demo content for MVP purposes.</p>
      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-slate-300">
        <section>
          <h2 className="mb-2 text-lg font-bold text-white">Digital Product Policy</h2>
          <p>
            Because FlowForge AI products are downloadable digital goods, purchases are generally non-refundable
            once the workflow files have been downloaded or imported, consistent with standard digital marketplace
            practice.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-white">Exceptions</h2>
          <p>
            If a workflow is materially broken or not as described, contact support within 7 days of purchase and
            our team will review your request for a replacement or refund.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-white">Membership &amp; Credits</h2>
          <p>
            Membership subscriptions can be cancelled at any time from your dashboard and will not renew for the
            next billing cycle. Unused automation credits are non-refundable but do not expire.
          </p>
        </section>
      </div>
    </div>
  );
}
