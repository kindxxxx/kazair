import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { JsonLd } from "@/components/JsonLd";
import { products } from "@/data/products";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Каталог компрессоров и компрессорного оборудования KAZaircompressor: винтовые, мобильные, турбо, осушители, генераторы, ресиверы.",
  alternates: { canonical: "/catalog" },
  openGraph: { url: "/catalog" },
};

export default function CatalogPage() {
  const siteUrl = getSiteUrl();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Каталог", item: `${siteUrl}/catalog` },
    ],
  };

  return (
    <div className="pt-24">
      <JsonLd data={breadcrumbJsonLd} />
      <Catalog products={products} syncUrl headingAs="h1" />
    </div>
  );
}
