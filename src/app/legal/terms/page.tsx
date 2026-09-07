import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service — FlowForge AI" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p className="mt-2 text-xs text-slate-500">Last updated January 2026 · Demo content for MVP purposes.</p>
      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-slate-300">
        <section>
          <h2 className="mb-2 text-lg font-bold text-white">1. Digital Products</h2>
          <p>
            All products sold on FlowForge AI are digital automation workflow files intended for import into your
            own n8n instance. Products are licensed for use, not sold as a transfer of underlying intellectual
            property beyond the granted usage rights of your plan.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-white">2. n8n Compatibility</h2>
          <p>
            FlowForge AI is an independent marketplace. Workflows are built to be compatible with n8n but FlowForge
            AI is not officially affiliated with, endorsed by, or operated by n8n GmbH.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-white">3. Accounts &amp; Demo Authentication</h2>
          <p>
            This MVP uses a simulated, browser-local authentication layer for demonstration purposes. No real user
            credentials are transmitted or stored on a server in this version of the product.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-white">4. Payments</h2>
          <p>
            Checkout in this MVP simulates payment confirmation for demonstration purposes only. No real financial
            transaction occurs. A production deployment would integrate a licensed payment processor.
          </p>
        </section>
      </div>
    </div>
  );
}
