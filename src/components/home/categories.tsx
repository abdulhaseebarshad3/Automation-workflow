import Link from "next/link";

const CATEGORIES = [
  { name: "AI Agents", icon: "🧠", desc: "AI employees, assistants & research agents", color: "from-cyan-500/20 to-cyan-500/0" },
  { name: "n8n Workflows", icon: "🔗", desc: "Ready-to-import automation templates", color: "from-indigo-500/20 to-indigo-500/0", query: "compat=n8n" },
  { name: "Marketing Automation", icon: "📣", desc: "Lead gen, email & social automation", color: "from-violet-500/20 to-violet-500/0" },
  { name: "Sales Automation", icon: "📈", desc: "CRM, qualification & follow-ups", color: "from-emerald-500/20 to-emerald-500/0" },
  { name: "Business Automation", icon: "🏢", desc: "Invoices, reports & operations", color: "from-cyan-500/20 to-cyan-500/0" },
  { name: "WhatsApp Automation", icon: "💬", desc: "Leads, notifications & support", color: "from-emerald-500/20 to-emerald-500/0" },
  { name: "Content Automation", icon: "🎬", desc: "Blogs, social posts & newsletters", color: "from-violet-500/20 to-violet-500/0" },
  { name: "Developer Automation", icon: "🛠️", desc: "APIs, databases & webhooks", color: "from-indigo-500/20 to-indigo-500/0" },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Automation Marketplace</span>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Browse by Category</h2>
        <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
          Every workflow is organized so you can find the exact automation your business needs — fast.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href={`/marketplace?${cat.query || `category=${encodeURIComponent(cat.name)}`}`}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${cat.color} bg-slate-900/40 p-5 transition hover:-translate-y-1 hover:border-cyan-400/30`}
          >
            <span className="text-2xl" aria-hidden="true">
              {cat.icon}
            </span>
            <h3 className="mt-3 text-sm font-bold text-white group-hover:text-cyan-300">{cat.name}</h3>
            <p className="mt-1 text-xs text-slate-400">{cat.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
