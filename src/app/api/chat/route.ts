import { db } from "@/db";
import { products } from "@/db/schema";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/chat
//
// DEMO AI ASSISTANT
// This route uses simple keyword-matching against the product catalog to
// recommend a relevant workflow. It is intentionally rule-based so the MVP
// never needs a paid LLM key to function.
//
// To upgrade to a real AI assistant, replace the logic below with a call to
// an LLM provider, e.g.:
//   const completion = await fetch("https://api.openai.com/v1/chat/completions", {
//     headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, ...
//   });
// IMPORTANT: process.env.OPENAI_API_KEY must only ever be read here on the
// server — never in client components or exposed via NEXT_PUBLIC_*.
// ---------------------------------------------------------------------------

const INTENTS: { keywords: string[]; reply: string; categoryHint?: string }[] = [
  {
    keywords: ["whatsapp"],
    reply:
      "Great choice. I recommend starting with our AI WhatsApp Lead Qualifier — it captures incoming leads, uses AI to classify intent, and can send qualified prospects straight into your CRM.",
    categoryHint: "WhatsApp Automation",
  },
  {
    keywords: ["support", "customer service", "helpdesk", "ticket"],
    reply:
      "For customer support, the AI Customer Support Agent is our most popular pick — it drafts on-brand replies from your knowledge base and escalates tricky tickets to a human automatically.",
    categoryHint: "AI Agents",
  },
  {
    keywords: ["lead", "leads", "crm", "sales"],
    reply:
      "For lead generation and sales, I'd suggest CRM Lead Enrichment or the Sales Follow-Up Machine — both keep your pipeline warm without manual chasing.",
    categoryHint: "Sales Automation",
  },
  {
    keywords: ["email"],
    reply:
      "For email, Automated Email Follow-Up keeps your outreach warm automatically, and the Free AI Email Classifier is a great free starting point for inbox automation.",
    categoryHint: "Business Automation",
  },
  {
    keywords: ["content", "social", "instagram", "youtube", "blog"],
    reply:
      "For content, AI Content Factory turns one idea into a week of blog and social content, and YouTube Content Automation is perfect if you publish video.",
    categoryHint: "Content Automation",
  },
  {
    keywords: ["invoice", "pdf", "finance", "accounting"],
    reply:
      "For document-heavy tasks, AI Invoice Processor and AI PDF Data Extractor remove manual data entry almost entirely.",
    categoryHint: "Business Automation",
  },
  {
    keywords: ["credit", "credits"],
    reply:
      "Automation Credits let you pay-as-you-go for AI workflow executions and premium AI tools. You can buy credit packs on the Credits page, and Pro/Agency memberships include monthly credit allowances.",
  },
  {
    keywords: ["checkout", "payment", "pay", "buy"],
    reply:
      "Checkout supports Easypaisa, JazzCash, bank transfer, and card payments (demo integration for this MVP). Add a workflow to your cart, then head to Checkout — you'll get instant access after payment confirmation.",
  },
  {
    keywords: ["n8n", "how does n8n work"],
    reply:
      "n8n is an open workflow automation tool. Our products are ready-to-import n8n workflow files — download the JSON, import it into your n8n instance, plug in your API credentials, and activate it. No coding required for most workflows.",
  },
  {
    keywords: ["agent", "ai agent"],
    reply:
      "Our AI Agents category includes autonomous assistants like the AI Research Agent, RAG Knowledge Base Agent, and Multi-Agent Research System — ideal if you need more than a simple trigger-action workflow.",
    categoryHint: "AI Agents",
  },
  {
    keywords: ["free", "demo"],
    reply:
      "You can try Free AI Email Classifier, Free Lead Capture Workflow, or Google Sheets AI Assistant at no cost — a great way to get comfortable with n8n + AI before buying a premium workflow.",
  },
];

export async function POST(req: NextRequest) {
  const { message } = (await req.json()) as { message: string };
  const text = (message || "").toLowerCase();

  const matched = INTENTS.find((intent) => intent.keywords.some((k) => text.includes(k)));

  let recommendation = null as null | { slug: string; name: string };

  if (matched?.categoryHint) {
    const rows = await db.select().from(products);
    const candidates = rows
      .filter((p) => p.category === matched.categoryHint)
      .sort((a, b) => b.salesCount - a.salesCount);
    if (candidates[0]) {
      recommendation = { slug: candidates[0].slug, name: candidates[0].name };
    }
  }

  const reply =
    matched?.reply ||
    "I can help you find the right automation. Try telling me what you want to automate — for example WhatsApp leads, customer support, content, invoices, or CRM follow-ups.";

  return Response.json({ reply, recommendation });
}
