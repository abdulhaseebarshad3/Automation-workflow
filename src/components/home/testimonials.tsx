const TESTIMONIALS = [
  {
    name: "Bilal Ahmed",
    role: "Agency Owner",
    rating: 5,
    text: "We deployed three workflows for clients in the same week we bought them. The setup guides make it painless to hand off to non-technical clients.",
  },
  {
    name: "Sana Malik",
    role: "Marketing Manager",
    rating: 5,
    text: "The AI Content Factory alone paid for itself in the first month. Consistent output without hiring a content writer.",
  },
  {
    name: "Hamza Tariq",
    role: "Automation Consultant",
    rating: 5,
    text: "I use FlowForge AI templates as a starting point for almost every client project now — they save me days of setup work.",
  },
  {
    name: "Ayesha Raza",
    role: "Founder",
    rating: 4,
    text: "The WhatsApp Lead Qualifier changed how fast we respond to inbound leads. Genuinely one of the best purchases for our small team.",
  },
  {
    name: "Faizan Iqbal",
    role: "Freelancer",
    rating: 5,
    text: "Clear documentation, real automation value, and pricing that actually makes sense for freelancers like me.",
  },
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Customer Reviews</span>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Loved by Founders &amp; Automation Teams</h2>
        <p className="mt-2 text-xs text-slate-500">Demo/sample testimonials representative of the FlowForge AI customer experience.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-white/10 bg-slate-900/40 p-6 transition hover:-translate-y-1 hover:border-cyan-400/20"
          >
            <div className="mb-3 text-amber-400">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
            <blockquote className="flex-1 text-sm text-slate-300">&ldquo;{t.text}&rdquo;</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold text-slate-950">
                {initials(t.name)}
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{t.name}</span>
                <span className="block text-xs text-slate-400">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
