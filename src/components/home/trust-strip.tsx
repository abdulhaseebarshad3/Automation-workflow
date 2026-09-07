const ITEMS = [
  { icon: "⚡", label: "Instant Digital Delivery" },
  { icon: "🧩", label: "Ready-to-Import Workflows" },
  { icon: "🎓", label: "Beginner-Friendly Setup" },
  { icon: "♾️", label: "Lifetime Access" },
  { icon: "🔒", label: "Secure Checkout" },
  { icon: "🏢", label: "Built for Modern Businesses" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-white/10 bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
              <span className="text-xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-xs font-medium text-slate-300 sm:text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
