const STEPS = [
  { n: "01", title: "Find", desc: "Discover the automation you need from 20+ ready-made workflows and AI agents.", icon: "🔍" },
  { n: "02", title: "Purchase", desc: "Securely purchase your workflow through our demo checkout in under a minute.", icon: "🛒" },
  { n: "03", title: "Download", desc: "Get your workflow files instantly — JSON, guides, and prompt packs included.", icon: "⬇️" },
  { n: "04", title: "Automate", desc: "Import into n8n, connect your accounts, and start automating immediately.", icon: "⚙️" },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">How It Works</span>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">From Discovery to Automation in 4 Steps</h2>
      </div>

      <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent lg:block" />
        {STEPS.map((step) => (
          <div key={step.n} className="relative flex flex-col items-center text-center">
            <div className="glow-border relative flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 text-3xl shadow-[0_0_25px_rgba(99,102,241,0.2)]">
              {step.icon}
              <span className="absolute -top-3 -right-2 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                {step.n}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
            <p className="mt-2 max-w-[220px] text-sm text-slate-400">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
