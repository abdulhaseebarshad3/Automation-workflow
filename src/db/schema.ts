import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  numeric,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// PRODUCTS — the core catalog of automation workflows / AI agents / bundles.
// ---------------------------------------------------------------------------
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  tagline: varchar("tagline", { length: 220 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  price: integer("price").notNull(),
  oldPrice: integer("old_price"),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("4.8"),
  reviewsCount: integer("reviews_count").notNull().default(0),
  salesCount: integer("sales_count").notNull().default(0),
  difficulty: varchar("difficulty", { length: 40 }).notNull().default("Beginner"),
  compatibility: varchar("compatibility", { length: 80 }).notNull().default("n8n"),
  setupTime: varchar("setup_time", { length: 60 }).notNull().default("15 minutes"),
  version: varchar("version", { length: 20 }).notNull().default("1.0.0"),
  creator: varchar("creator", { length: 80 }).notNull().default("FlowForge Studio"),
  featured: boolean("featured").notNull().default(false),
  bestseller: boolean("bestseller").notNull().default(false),
  isFree: boolean("is_free").notNull().default(false),
  onSale: boolean("on_sale").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  image: varchar("image", { length: 20 }).notNull().default("a"),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  requirements: jsonb("requirements").$type<string[]>().notNull().default([]),
  setupSteps: jsonb("setup_steps").$type<string[]>().notNull().default([]),
  included: jsonb("included")
    .$type<{ name: string; type: string }[]>()
    .notNull()
    .default([]),
  workflowSteps: jsonb("workflow_steps").$type<string[]>().notNull().default([]),
  faq: jsonb("faq").$type<{ q: string; a: string }[]>().notNull().default([]),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// REVIEWS — demo/sample customer reviews attached to a product.
// ---------------------------------------------------------------------------
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  author: varchar("author", { length: 80 }).notNull(),
  role: varchar("role", { length: 80 }).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// COUPONS — demo discount codes. In production this would be backend-managed.
// ---------------------------------------------------------------------------
export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 40 }).notNull().unique(),
  percent: integer("percent").notNull(),
  active: boolean("active").notNull().default(true),
  expiresAt: timestamp("expires_at"),
});

// ---------------------------------------------------------------------------
// ORDERS — created after a (demo) successful checkout / payment simulation.
// ---------------------------------------------------------------------------
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 40 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 120 }).notNull(),
  customerEmail: varchar("customer_email", { length: 160 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 40 }),
  country: varchar("country", { length: 80 }),
  city: varchar("city", { length: 80 }),
  paymentMethod: varchar("payment_method", { length: 40 }).notNull(),
  subtotal: integer("subtotal").notNull(),
  discount: integer("discount").notNull().default(0),
  total: integer("total").notNull(),
  couponCode: varchar("coupon_code", { length: 40 }),
  status: varchar("status", { length: 30 }).notNull().default("paid"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").references(() => products.id, {
    onDelete: "set null",
  }),
  productName: varchar("product_name", { length: 160 }).notNull(),
  productSlug: varchar("product_slug", { length: 160 }).notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull().default(1),
});
