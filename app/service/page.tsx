import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ServiceView } from "@/components/ServiceView";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Сервис",
  description:
    "Гарантийное и послегарантийное обслуживание компрессоров, монтаж, ПНР, пневмоаудит и ремонт любой сложности.",
  alternates: { canonical: "/service" },
  openGraph: { url: "/service" },
};

export default function ServicePage() {
  const siteUrl = getSiteUrl();

  return (
    <div className="bg-paper pt-28 pb-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Сервис", item: `${siteUrl}/service` },
          ],
        }}
      />
      <ServiceView />
    </div>
  );
}
