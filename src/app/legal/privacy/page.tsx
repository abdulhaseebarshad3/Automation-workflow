import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy — FlowForge AI" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="mt-2 text-xs text-slate-500">Last updated January 2026 · Demo content for MVP purposes.</p>
      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-slate-300">
        <section>
          <h2 className="mb-2 text-lg font-bold text-white">Data We Store</h2>
          <p>
            This MVP stores cart contents, wishlist items, demo session details, demo credits, and demo membership
            status locally in your browser via localStorage. Order records submitted through checkout are stored in
            our database to power your order history and confirmation pages.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-white">Third-Party Services</h2>
          <p>
            No payment or AI provider secret keys are exposed to the browser. All sensitive integrations are designed
            to run server-side in a production deployment.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-white">Your Choices</h2>
          <p>
            You can clear your local demo data at any time by clearing your browser&apos;s site storage for this
            domain.
          </p>
        </section>
      </div>
    </div>
  );
}
