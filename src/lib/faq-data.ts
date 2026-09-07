import type { FaqItem } from "@/components/faq-accordion";

export const GENERAL_FAQ: FaqItem[] = [
  {
    q: "What is n8n?",
    a: "n8n is a popular open-source workflow automation tool that lets you connect apps, APIs, and AI models visually. FlowForge AI sells ready-to-import workflow files built for n8n — we are not an official n8n marketplace.",
  },
  {
    q: "How do I install a workflow?",
    a: "After purchase, download the workflow JSON file from your library, open your n8n instance, choose Import from File (or paste the JSON), then connect your credentials as described in the included setup guide.",
  },
  {
    q: "Do I need technical knowledge?",
    a: "Most workflows are built to be beginner-friendly with step-by-step setup guides. Advanced workflows (like multi-agent systems) benefit from basic familiarity with APIs.",
  },
  {
    q: "Are API keys included?",
    a: "No. For security reasons, workflows never include API keys or credentials. You connect your own accounts (OpenAI, CRM, WhatsApp, etc.) directly inside your n8n instance.",
  },
  {
    q: "Do workflows work with self-hosted n8n?",
    a: "Yes, all workflows are compatible with both self-hosted and n8n Cloud instances running a reasonably current n8n version.",
  },
  {
    q: "Can I modify workflows?",
    a: "Absolutely. Once imported, workflows are fully editable — add steps, change prompts, or connect additional apps to fit your exact process.",
  },
  {
    q: "What happens after purchase?",
    a: "Your order is confirmed instantly (demo payment for this MVP), and the workflow is added to your account library for download, along with setup guides and any included prompt packs.",
  },
  {
    q: "Are products refundable?",
    a: "Digital products are non-refundable once downloaded, in line with standard digital marketplace practice — see our Refund Policy for full details.",
  },
  {
    q: "What are automation credits?",
    a: "Credits are a flexible currency for future AI workflow executions, AI API usage, and premium automation services. For this MVP, credits are managed as a frontend demo balance.",
  },
  {
    q: "How does membership work?",
    a: "Membership plans (Starter, Pro, Agency) unlock discounted or included workflow access, monthly credit allowances, and priority support on a recurring monthly or yearly basis.",
  },
];
