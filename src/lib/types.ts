// Shared frontend types mirroring the Drizzle `products` row shape.
// Keeping this separate from the schema lets client components import
// types without pulling in server-only DB code.

export type ProductIncluded = { name: string; type: string };
export type ProductFaq = { q: string; a: string };

export type Product = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  oldPrice: number | null;
  rating: string;
  reviewsCount: number;
  salesCount: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  compatibility: string;
  setupTime: string;
  version: string;
  creator: string;
  featured: boolean;
  bestseller: boolean;
  isFree: boolean;
  onSale: boolean;
  isNew: boolean;
  image: "cyan" | "violet" | "indigo" | "teal" | string;
  features: string[];
  requirements: string[];
  setupSteps: string[];
  included: ProductIncluded[];
  workflowSteps: string[];
  faq: ProductFaq[];
  lastUpdated: string;
  createdAt: string;
};

export type Review = {
  id: number;
  productId: number;
  author: string;
  role: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  price: number;
  oldPrice: number | null;
  image: string;
  quantity: number;
};

export type OrderItem = {
  productName: string;
  productSlug: string;
  price: number;
  quantity: number;
};

export type Order = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  country: string | null;
  city: string | null;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string | null;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export const CATEGORIES = [
  "AI Agents",
  "n8n Workflows",
  "Marketing Automation",
  "Sales Automation",
  "Business Automation",
  "WhatsApp Automation",
  "Content Automation",
  "Developer Automation",
] as const;

export const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;
