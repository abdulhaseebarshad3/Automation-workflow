const REASONS = [
  { icon: "🧩", title: "Ready-to-Use Workflows", desc: "Every workflow is tested and ready to import — no building from scratch." },
  { icon: "⏱️", title: "Save Hours of Development", desc: "Skip weeks of automation engineering with pre-built, proven systems." },
  { icon: "🎓", title: "Beginner-Friendly Setup", desc: "Step-by-step setup guides make automation accessible to non-developers." },
  { icon: "🔄", title: "Regular Workflow Updates", desc: "Workflows are maintained and improved as APIs and AI models evolve." },
  { icon: "♾️", title: "Lifetime Product Access", desc: "Pay once for standard workflows and access your files forever." },
  { icon: "🎧", title: "Premium Support", desc: "Get setup help and troubleshooting from our automation specialists." },
  { icon: "🔐", title: "Secure Digital Delivery", desc: "Your files and receipts are safely delivered to your account library." },
];

export function WhyChooseUs() {
  return (
    <section className="border-y border-white/10 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">Why Choose FlowForge AI</span>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Built for Teams That Value Their Time</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-violet-400/30 hover:-translate-y-1"
            >
              <span className="text-2xl" aria-hidden="true">
                {r.icon}
              </span>
              <h3 className="mt-3 text-sm font-bold text-white">{r.title}</h3>
              <p className="mt-1.5 text-xs text-slate-400">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
