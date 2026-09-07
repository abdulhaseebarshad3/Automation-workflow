"use client";

import { useUser } from "@/context/user-context";
import { useToast } from "@/context/toast-context";
import { formatPKR } from "@/lib/format";

const PACKAGES = [
  { credits: 100, price: 999 },
  { credits: 500, price: 3999, popular: true },
  { credits: 1000, price: 6999 },
];

const USES = [
  { icon: "⚙️", title: "AI Workflow Executions", desc: "Run premium AI-powered workflow steps without your own API key." },
  { icon: "🔌", title: "AI API Usage", desc: "Cover AI model usage (OpenAI/Claude-style calls) inside supported workflows." },
  { icon: "🧰", title: "Automation Services", desc: "Redeem credits for setup help and custom automation add-ons." },
  { icon: "✨", title: "Premium AI Tools", desc: "Unlock advanced tools like multi-agent research and RAG indexing." },
];

export default function CreditsPage() {
  const { credits, addCredits, user, loginDemo } = useUser();
  const { showToast } = useToast();

  function purchase(pkg: (typeof PACKAGES)[number]) {
    if (!user) loginDemo();
    addCredits(pkg.credits);
    showToast(`${pkg.credits} credits added to your balance (demo purchase)`, "success");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Automation Credits</span>
        <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Pay-As-You-Go Automation Power</h1>
        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Credits are a flexible currency for AI workflow executions, AI API usage, automation services, and premium
          AI tools — built for the future of the FlowForge AI platform.
        </p>
      </div>

      <div className="glass mx-auto mt-8 flex w-fit flex-col items-center gap-1 rounded-2xl px-8 py-5">
        <span className="text-xs uppercase tracking-wide text-slate-400">Your Balance</span>
        <span className="text-3xl font-extrabold text-gradient">{credits.toLocaleString()} credits</span>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.credits}
            className={`relative flex flex-col items-center rounded-3xl border p-8 text-center transition hover:-translate-y-1 ${
              pkg.popular ? "glow-border border-cyan-400/30 bg-cyan-500/5" : "border-white/10 bg-slate-900/40"
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-1 text-[11px] font-bold uppercase text-slate-950">
                Best Value
              </span>
            )}
            <span className="text-4xl">💠</span>
            <h2 className="mt-3 text-2xl font-extrabold text-white">{pkg.credits.toLocaleString()}</h2>
            <p className="text-xs uppercase tracking-wide text-slate-400">Credits</p>
            <p className="mt-4 text-2xl font-bold text-cyan-300">{formatPKR(pkg.price)}</p>
            <button
              onClick={() => purchase(pkg)}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-3 text-sm font-bold text-slate-950 hover:brightness-110"
            >
              Buy Credits
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-center text-xl font-bold text-white">What Can Credits Be Used For?</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {USES.map((u) => (
            <div key={u.title} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 text-center">
              <span className="text-2xl">{u.icon}</span>
              <h3 className="mt-3 text-sm font-bold text-white">{u.title}</h3>
              <p className="mt-1.5 text-xs text-slate-400">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 rounded-xl border border-dashed border-white/15 p-4 text-center text-xs text-slate-500">
        DEMO CREDIT SYSTEM — For this MVP, credits are stored in your browser via localStorage. In production,
        purchases would call <code>POST /api/credits/purchase</code> and balances would be tracked server-side per
        account.
      </p>
    </div>
  );
}
