"use client";

import { useState } from "react";
import { useToast } from "@/context/toast-context";
import { formatPKR } from "@/lib/format";

const AMOUNTS = [1000, 2500, 5000, 10000];

export default function GiftCardsPage() {
  const [amount, setAmount] = useState(2500);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<null | { code: string }>(null);
  const { showToast } = useToast();

  function generateCode() {
    return `FFAI-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!recipientName || !recipientEmail) {
      showToast("Please fill in recipient details", "error");
      return;
    }
    const code = generateCode();
    setSent({ code });
    showToast("Gift card generated (demo delivery)", "success");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Gift Cards</span>
        <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Give the Gift of Automation</h1>
        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Send a FlowForge AI gift card that can be redeemed toward any workflow, AI agent, membership, or credit
          package.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-slate-900/40 p-7">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Amount</label>
            <div className="grid grid-cols-4 gap-2">
              {AMOUNTS.map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => setAmount(a)}
                  className={`rounded-xl border py-2.5 text-sm font-bold transition ${
                    amount === a
                      ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-200"
                      : "border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {a / 1000}k
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-1.5 text-sm text-slate-300">
            Recipient Name
            <input
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-slate-500"
              placeholder="e.g. Sara Khan"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-slate-300">
            Recipient Email
            <input
              required
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-slate-500"
              placeholder="sara@example.com"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-slate-300">
            Message (optional)
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-slate-500"
              placeholder="Happy automating!"
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-3.5 text-sm font-bold text-slate-950 hover:brightness-110"
          >
            Generate Gift Card — {formatPKR(amount)}
          </button>
          <p className="text-center text-xs text-slate-500">
            DEMO GIFT CARD DELIVERY — no email is actually sent in this MVP. A production build would call a backend
            endpoint to email the recipient securely.
          </p>
        </form>

        <div className="flex flex-col items-center justify-center gap-6">
          <div className="glow-border relative aspect-[16/10] w-full max-w-md rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-7 shadow-[0_25px_60px_rgba(8,15,40,0.6)]">
            <div className="bg-grid absolute inset-0 rounded-3xl opacity-30" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">FlowForge AI</span>
                <span className="text-xs text-cyan-300">Gift Card</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gradient">{formatPKR(amount)}</p>
                <p className="mt-1 text-xs text-slate-400">
                  To: {recipientName || "Recipient Name"}
                </p>
                {message && <p className="mt-1 line-clamp-2 text-xs italic text-slate-500">&ldquo;{message}&rdquo;</p>}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{sent ? sent.code : "FFAI-XXXX-XXXX"}</span>
                <span>Valid for 12 months</span>
              </div>
            </div>
          </div>
          {sent && (
            <div className="w-full max-w-md rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-center text-sm text-emerald-300">
              🎉 Gift card <strong>{sent.code}</strong> generated for {recipientEmail} (demo).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
