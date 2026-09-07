"use client";

import { useState } from "react";
import { useToast } from "@/context/toast-context";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    showToast("Message sent (demo) — our team will follow up by email", "success");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Contact</span>
      <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Get in Touch</h1>
      <p className="mt-3 text-sm text-slate-400">
        Questions about a workflow, membership, or a custom automation project? Send us a message.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center text-emerald-300">
          ✅ Thanks for reaching out! This is a demo contact form — a production build would send this to a support
          inbox via a backend API route.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <label className="flex flex-col gap-1.5 text-sm text-slate-300">
            Name
            <input required className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-slate-300">
            Email
            <input required type="email" className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-slate-300">
            Message
            <textarea required rows={5} className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white" />
          </label>
          <button type="submit" className="mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-3.5 text-sm font-bold text-slate-950 hover:brightness-110">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
