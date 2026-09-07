const NODE_ICONS: Record<string, string> = {
  webhook: "🔗",
  trigger: "⚡",
  ai: "🧠",
  agent: "🧠",
  crm: "🗂️",
  whatsapp: "💬",
  email: "✉️",
  slack: "💠",
  database: "🗄️",
  sheet: "📊",
  export: "📤",
  search: "🔍",
  brief: "📄",
  calendar: "📅",
  scoring: "🎯",
  sync: "🔁",
};

function iconFor(label: string): string {
  const key = Object.keys(NODE_ICONS).find((k) => label.toLowerCase().includes(k));
  return key ? NODE_ICONS[key] : "◆";
}

export function WorkflowVisualizer({
  steps,
  className = "",
}: {
  steps: string[];
  className?: string;
}) {
  return (
    <div className={`relative overflow-x-auto no-scrollbar ${className}`}>
      <div className="flex min-w-max items-center gap-0 px-2 py-6 md:justify-center">
        {steps.map((step, idx) => (
          <div key={step + idx} className="flex items-center">
            <div className="flex w-32 flex-col items-center gap-2 text-center md:w-36">
              <div
                className="glow-border animate-float flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-xl shadow-[0_0_22px_rgba(34,211,238,0.18)]"
                style={{ animationDelay: `${idx * 0.25}s` }}
                aria-hidden="true"
              >
                {iconFor(step)}
              </div>
              <span className="text-xs font-medium text-slate-300">{step}</span>
            </div>
            {idx < steps.length - 1 && (
              <svg width="48" height="12" viewBox="0 0 48 12" className="mx-1 shrink-0 text-cyan-400/60" aria-hidden="true">
                <line x1="0" y1="6" x2="42" y2="6" stroke="currentColor" strokeWidth="2" className="animate-dash" />
                <polygon points="42,2 48,6 42,10" fill="currentColor" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
