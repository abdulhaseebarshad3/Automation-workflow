import Link from "next/link";
import { Logo } from "./logo";

const COLUMNS = [
  {
    title: "Marketplace",
    links: [
      { label: "All Workflows", href: "/marketplace" },
      { label: "AI Agents", href: "/marketplace?category=AI%20Agents" },
      { label: "n8n Workflows", href: "/marketplace?compat=n8n" },
      { label: "Automation Bundles", href: "/marketplace?category=Automation%20Bundles" },
      { label: "Deals", href: "/deals" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/faq" },
      { label: "Setup Guides", href: "/faq" },
      { label: "Blog", href: "/faq" },
      { label: "Automation Ideas", href: "/marketplace" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/dashboard?tab=support" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Refund Policy", href: "/legal/refunds" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "X (Twitter)", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Premium, ready-to-import n8n workflows, AI agents, and automation systems built for modern
              businesses. Automate more. Build less.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              FlowForge AI is an independent marketplace. Products are{" "}
              <span className="font-semibold text-slate-400">n8n-compatible</span> and built for import into your
              own n8n instance — FlowForge AI is not affiliated with or an official n8n marketplace.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-slate-400 transition hover:text-cyan-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} FlowForge AI. All rights reserved.</p>
          <p className="text-xs text-slate-500">Prices shown in Pakistani Rupees (PKR). Secure demo checkout.</p>
        </div>
      </div>
    </footer>
  );
}
