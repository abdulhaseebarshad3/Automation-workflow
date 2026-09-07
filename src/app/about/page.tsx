import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — FlowForge AI",
  description: "Learn about FlowForge AI, a premium marketplace for n8n workflows and AI automation systems.",
};

const STATS = [
  { value: "22+", label: "Ready-made workflows" },
  { value: "10k+", label: "Demo automation runs" },
  { value: "4.8★", label: "Average catalog rating" },
  { value: "8", label: "Automation categories" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">About FlowForge AI</span>
      <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
        We build automation so you don&apos;t have to start from zero.
      </h1>
      <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
        FlowForge AI is a digital marketplace focused entirely on n8n automation workflows, AI agents, and business
        automation systems. Every product is designed to be imported, configured, and running inside your own n8n
        instance in minutes — not weeks. We built FlowForge AI because most businesses don&apos;t need custom
        automation engineering, they need proven, ready-to-use building blocks they can adapt to their exact
        process.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
        Our catalog spans WhatsApp lead capture, AI customer support, content generation, sales follow-up, document
        processing, and advanced multi-agent research systems — with new automation workflows added regularly.
      </p>

      <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 text-center">
            <p className="text-2xl font-extrabold text-gradient">{s.value}</p>
            <p className="mt-1 text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-white/15 p-5 text-xs leading-relaxed text-slate-500">
        FlowForge AI builds and sells n8n-compatible workflow templates. We are an independent marketplace and are
        not officially affiliated with, endorsed by, or operated by n8n GmbH.
      </div>
    </div>
  );
}
