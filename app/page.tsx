import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Catalog } from "@/components/Catalog";
import { Popular } from "@/components/Popular";
import { HowToOrder } from "@/components/HowToOrder";
import { Clients } from "@/components/Clients";
import { About } from "@/components/About";
import { Contacts } from "@/components/Contacts";
import { ServiceView } from "@/components/ServiceView";
import { products } from "@/data/products";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: getSiteUrl() },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Catalog products={products} />
      <Popular />
      <HowToOrder />
      <section id="service" className="scroll-mt-24 bg-paper py-16 md:py-24">
        <ServiceView headingAs="h2" />
      </section>
      <About />
      <Contacts compact />
      <Clients />
    </>
  );
}
