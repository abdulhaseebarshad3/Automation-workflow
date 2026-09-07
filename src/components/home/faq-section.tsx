import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { GENERAL_FAQ } from "@/lib/faq-data";

export function FaqSection() {
  return (
    <section className="border-y border-white/10 bg-slate-900/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">FAQ</span>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Frequently Asked Questions</h2>
        </div>
        <FaqAccordion items={GENERAL_FAQ.slice(0, 6)} />
        <div className="mt-8 text-center">
          <Link href="/faq" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            View all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}
