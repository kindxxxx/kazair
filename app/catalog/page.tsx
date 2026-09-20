import type { Metadata } from "next";
import { EquipmentGrid } from "@/components/EquipmentGrid";
import { parseCatalogFilter } from "@/lib/catalog-filter";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Каталог компрессоров и компрессорного оборудования KAZaircompressor: винтовые, мобильные, турбо, осушители, генераторы, ресиверы.",
  alternates: { canonical: "/catalog" },
  openGraph: { url: "/catalog" },
};

type Props = {
  searchParams: Promise<{ q?: string; tier?: string; filter?: string }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialFilter = parseCatalogFilter(params.filter);
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
    <div className="pt-16">
      <JsonLd data={breadcrumbJsonLd} />
      <EquipmentGrid headingAs="h1" initialFilter={initialFilter} syncUrl />
    </div>
  );
}
