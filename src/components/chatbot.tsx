"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/context/products-context";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
  time: string;
  recommendation?: { slug: string; name: string } | null;
};

const QUICK_QUESTIONS = [
  "Find a workflow",
  "Help me choose a workflow",
  "How does n8n work?",
  "Which workflow is best for leads?",
  "I need WhatsApp automation",
  "I need AI customer support",
  "Explain credits",
  "Help with checkout",
];

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: "Hi! I'm your automation assistant. What are you trying to automate?",
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(2);
  const { products } = useProducts();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  async function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: nextMessageId.current++, role: "user", text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      await new Promise((r) => setTimeout(r, 500));
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId.current++,
          role: "bot",
          text: data.reply,
          time: now(),
          recommendation: data.recommendation,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: nextMessageId.current++, role: "bot", text: "Sorry, I'm having trouble responding right now. Try again shortly.", time: now() },
      ]);
    } finally {
      setTyping(false);
    }
  }

  function clearChat() {
    setMessages([
      { id: nextMessageId.current++, role: "bot", text: "Hi! I'm your automation assistant. What are you trying to automate?", time: now() },
    ]);
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close automation assistant" : "Open automation assistant"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-2xl text-slate-950 shadow-[0_0_30px_rgba(99,102,241,0.55)] transition-transform hover:scale-105 animate-pulse-glow md:bottom-7 md:right-7"
      >
        {open ? "✕" : "✨"}
      </button>

      <div
        className={`fixed z-[95] flex flex-col overflow-hidden border border-white/10 bg-slate-950/95 backdrop-blur transition-all duration-300 ${
          open
            ? "inset-0 opacity-100 sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[560px] sm:w-[380px] sm:rounded-2xl sm:shadow-2xl md:right-7"
            : "pointer-events-none inset-0 opacity-0 sm:bottom-24 sm:right-5 sm:h-[560px] sm:w-[380px] sm:rounded-2xl"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label="FlowForge AI Assistant chat"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-lg">
              🤖
            </span>
            <div>
              <p className="text-sm font-bold text-white">FlowForge AI Assistant</p>
              <p className="text-[11px] text-emerald-400">● Online · Demo AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={clearChat} className="text-xs font-medium text-slate-400 hover:text-white">
              Clear
            </button>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m) => {
            const product = m.recommendation ? products.find((p) => p.slug === m.recommendation!.slug) : null;
            return (
              <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    m.role === "user"
                      ? "rounded-br-sm bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950"
                      : "rounded-bl-sm bg-slate-800/80 text-slate-100"
                  }`}
                >
                  {m.text}
                </div>
                <span className="mt-1 text-[10px] text-slate-500">{m.time}</span>
                {product && (
                  <Link
                    href={`/product/${product.slug}`}
                    className="mt-1 flex w-[85%] items-center justify-between gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/5 px-3 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/10"
                  >
                    View {product.name}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            );
          })}
          {typing && (
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-slate-800/80 px-4 py-3 w-fit">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
            </div>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar border-t border-white/10 px-3 py-2.5">
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="flex-none whitespace-nowrap rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-medium text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200"
            >
              {q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-white/10 p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about workflows, credits, checkout..."
            aria-label="Message the automation assistant"
            className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/50"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950"
          >
            ➤
          </button>
        </form>
      </div>
    </>
  );
}
