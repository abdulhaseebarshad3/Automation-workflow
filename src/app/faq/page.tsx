import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";
import { GENERAL_FAQ } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "FAQ — FlowForge AI",
  description: "Frequently asked questions about n8n workflows, AI agents, credits, and membership on FlowForge AI.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Help Center</span>
      <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Frequently Asked Questions</h1>
      <p className="mt-3 text-sm text-slate-400">
        Everything you need to know about buying, installing, and running FlowForge AI automation workflows.
      </p>
      <div className="mt-10">
        <FaqAccordion items={GENERAL_FAQ} />
      </div>
    </div>
  );
}
