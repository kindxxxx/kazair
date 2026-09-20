import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { EquipmentGrid } from "@/components/EquipmentGrid";
import { Popular } from "@/components/Popular";
import { ConsultBanner } from "@/components/ConsultBanner";
import { Clients } from "@/components/Clients";
import { About } from "@/components/About";
import { Contacts } from "@/components/Contacts";
import { ServiceView } from "@/components/ServiceView";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: getSiteUrl() },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <EquipmentGrid />
      <Popular />
      <section id="service" className="scroll-mt-28 bg-paper py-16 md:py-24">
        <ServiceView headingAs="h2" />
      </section>
      <About />
      <ConsultBanner />
      <Contacts compact />
      <Clients />
    </>
  );
}
