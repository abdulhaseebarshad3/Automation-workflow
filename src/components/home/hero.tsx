import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="bg-grid bg-radial-glow pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-violet-500/20 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
        <div className="animate-slide-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan-400" />
            Ready-made AI workflows for n8n
          </span>

          <h1 className="mt-5 text-[clamp(2.25rem,5.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            Automate repetitive work
            <br />
            <span className="text-gradient">with AI and n8n.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-slate-400 sm:text-lg">
            Download a ready-made workflow, import it into n8n, and connect your accounts. Automate lead capture,
            customer support, email, content, and other daily business tasks without coding from scratch.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/marketplace"
              className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:brightness-110"
            >
              Browse Workflows
            </Link>
            <Link
              href="/marketplace?category=AI%20Agents"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10"
            >
              View AI Agents
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-500">
            <span>⭐ 4.8/5 average rating</span>
            <span>⚡ Import in minutes</span>
            <span>🔒 Works with your accounts</span>
          </div>
        </div>

        <div className="relative animate-fade-in [animation-delay:200ms]">
          <div className="glow-border animate-float overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(8,15,40,0.6)]">
            <Image
              src="/images/hero-workflow-animated.svg"
              alt="Animated n8n workflow showing a new lead moving through an AI agent, data enrichment, CRM, and Slack"
              width={1024}
              height={1024}
              priority
              className="h-auto w-full"
            />
          </div>
          <div className="glass absolute -bottom-6 -left-4 hidden rounded-2xl px-4 py-3 sm:block">
            <p className="text-xs text-slate-400">Trigger → AI → action</p>
            <p className="text-sm font-semibold text-white">Your workflow, ready to run.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
