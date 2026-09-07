import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { Categories } from "@/components/home/categories";
import { ProductSection } from "@/components/home/product-section";
import { DealsSection } from "@/components/home/deals-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const rows = await db.select().from(products).orderBy(desc(products.salesCount));
  const all = rows as unknown as Product[];

  const featured = all.filter((p) => p.featured).slice(0, 8);
  const bestsellers = all.filter((p) => p.bestseller).slice(0, 4);
  const deals = all.filter((p) => p.onSale).slice(0, 4);

  return (
    <>
      <Hero />
      <TrustStrip />
      <Categories />
      <ProductSection
        eyebrow="Handpicked for You"
        title="Featured Automation Workflows"
        subtitle="The most versatile workflows and AI agents to kickstart your automation stack."
        products={featured}
        viewAllHref="/marketplace"
      />
      <DealsSection products={deals} />
      <ProductSection
        eyebrow="Trusted by Thousands"
        title="Best-Selling Automations"
        subtitle="The highest-rated, most-purchased workflows in the marketplace."
        products={bestsellers}
        viewAllHref="/marketplace?sort=popular"
      />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FaqSection />
    </>
  );
}
