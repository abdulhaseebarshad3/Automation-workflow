import { db } from "@/db";
import { products, reviews as reviewsTable } from "@/db/schema";
import { eq, ne, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetailClient } from "./product-detail-client";
import type { Product, Review } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getData(slug: string) {
  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!product) return null;
  const productReviews = await db.select().from(reviewsTable).where(eq(reviewsTable.productId, product.id));
  const related = await db
    .select()
    .from(products)
    .where(and(eq(products.category, product.category), ne(products.id, product.id)))
    .limit(4);
  return { product, reviews: productReviews, related };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) return { title: "Product Not Found — FlowForge AI" };
  return {
    title: `${data.product.name} — FlowForge AI Marketplace`,
    description: data.product.tagline,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) notFound();

  const serialize = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

  return (
    <ProductDetailClient
      product={serialize(data.product) as unknown as Product}
      reviews={serialize(data.reviews) as unknown as Review[]}
      related={serialize(data.related) as unknown as Product[]}
    />
  );
}
