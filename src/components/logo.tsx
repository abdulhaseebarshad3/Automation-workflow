import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="FlowForge AI home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-500 shadow-[0_0_20px_rgba(99,102,241,0.45)] transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" aria-hidden="true">
          <circle cx="6" cy="6" r="2.2" fill="currentColor" />
          <circle cx="18" cy="6" r="2.2" fill="currentColor" />
          <circle cx="12" cy="18" r="2.4" fill="currentColor" />
          <path d="M7.6 7.2L11 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16.4 7.2L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 6H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight text-white">
          FlowForge <span className="text-gradient">AI</span>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
          Automation Marketplace
        </span>
      </span>
    </Link>
  );
}
