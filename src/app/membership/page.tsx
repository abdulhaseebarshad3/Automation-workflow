"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import { useToast } from "@/context/toast-context";
import { formatPKR } from "@/lib/format";

type PlanId = "Starter" | "Pro" | "Agency";

const PLANS: {
  id: PlanId;
  monthly: number;
  yearly: number;
  tagline: string;
  popular?: boolean;
  features: string[];
}[] = [
  {
    id: "Starter",
    monthly: 1499,
    yearly: 14990,
    tagline: "For individuals getting started with automation.",
    features: [
      "Access to selected workflow library",
      "150 monthly automation credits",
      "10% member discount on all purchases",
      "Basic email support",
    ],
  },
  {
    id: "Pro",
    monthly: 3499,
    yearly: 34990,
    tagline: "For growing teams that automate regularly.",
    popular: true,
    features: [
      "Access to premium workflow library",
      "600 monthly automation credits",
      "Includes AI Agents collection",
      "Exclusive member-only products",
      "20% member discount on all purchases",
      "Priority support (24h response)",
    ],
  },
  {
    id: "Agency",
    monthly: 7999,
    yearly: 79990,
    tagline: "For agencies deploying automation for clients.",
    features: [
      "Full workflow + AI agent library access",
      "2,000 monthly automation credits",
      "Commercial usage rights for clients",
      "Premium automation packs & bundles",
      "30% member discount on all purchases",
      "Priority support (same-day response)",
    ],
  },
];

const COMPARE_ROWS = [
  { label: "Monthly Credits", starter: "150", pro: "600", agency: "2,000" },
  { label: "Premium Workflow Access", starter: "Limited", pro: "Full", agency: "Full" },
  { label: "AI Agents Included", starter: "—", pro: "✓", agency: "✓" },
  { label: "Commercial / Client Usage", starter: "—", pro: "—", agency: "✓" },
  { label: "Member Discount", starter: "10%", pro: "20%", agency: "30%" },
  { label: "Support", starter: "Standard", pro: "Priority", agency: "Priority+" },
];

export default function MembershipPage() {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const { setMembership, membership } = useUser();
  const { showToast } = useToast();

  function subscribe(plan: PlanId) {
    setMembership({ plan, cycle });
    showToast(`Subscribed to ${plan} (${cycle}) — demo membership activated`, "success");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Membership</span>
        <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Unlock More Automation for Less</h1>
        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Subscribe to a membership plan for recurring credits, discounted workflows, and exclusive automation
          products. Demo subscription — no real billing occurs in this MVP.
        </p>
      </div>

      <div className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-slate-900/60 p-1">
        {(["monthly", "yearly"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCycle(c)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              cycle === c ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950" : "text-slate-300"
            }`}
          >
            {c === "monthly" ? "Monthly" : "Yearly (save ~17%)"}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const price = cycle === "monthly" ? plan.monthly : plan.yearly;
          const active = membership?.plan === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border p-7 transition hover:-translate-y-1 ${
                plan.popular
                  ? "glow-border border-cyan-400/30 bg-gradient-to-b from-cyan-500/10 to-slate-900/60 shadow-[0_25px_60px_rgba(34,211,238,0.15)]"
                  : "border-white/10 bg-slate-900/40"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-950">
                  Most Popular
                </span>
              )}
              <h2 className="text-lg font-bold text-white">{plan.id}</h2>
              <p className="mt-1 text-xs text-slate-400">{plan.tagline}</p>
              <p className="mt-5 text-3xl font-extrabold text-white">
                {formatPKR(price)}
                <span className="text-sm font-medium text-slate-400">/{cycle === "monthly" ? "mo" : "yr"}</span>
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="mt-0.5 text-cyan-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => subscribe(plan.id)}
                className={`mt-7 w-full rounded-xl py-3 text-sm font-bold transition ${
                  active
                    ? "border border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
                    : plan.popular
                    ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 hover:brightness-110"
                    : "border border-white/15 text-white hover:bg-white/10"
                }`}
              >
                {active ? "Current Plan ✓" : `Choose ${plan.id}`}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-16 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-slate-900/60 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3.5">Feature</th>
              <th className="px-5 py-3.5">Starter</th>
              <th className="px-5 py-3.5">Pro</th>
              <th className="px-5 py-3.5">Agency</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row, i) => (
              <tr key={row.label} className={i % 2 ? "bg-slate-900/20" : ""}>
                <td className="px-5 py-3.5 font-medium text-slate-200">{row.label}</td>
                <td className="px-5 py-3.5 text-slate-400">{row.starter}</td>
                <td className="px-5 py-3.5 text-slate-400">{row.pro}</td>
                <td className="px-5 py-3.5 text-slate-400">{row.agency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-center text-xs text-slate-500">
        Demo Membership — subscription billing is not processed in this MVP. See it reflected in your{" "}
        <Link href="/dashboard" className="text-cyan-300 hover:text-cyan-200">
          Dashboard
        </Link>
        .
      </p>
    </div>
  );
}
