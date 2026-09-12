import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/Catalog";
import { JsonLd } from "@/components/JsonLd";
import { categories, getCategory, products, type CategoryId } from "@/data/products";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map((item) => ({ category: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const item = getCategory(category);
  if (!item) return { title: "Категория не найдена" };
  return {
    title: item.name,
    description: item.intro,
    alternates: { canonical: `/catalog/${item.id}` },
    openGraph: {
      title: item.name,
      description: item.intro,
      url: `/catalog/${item.id}`,
      images: [{ url: item.cover, alt: item.name }],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const item = getCategory(category);
  if (!item) notFound();

  const siteUrl = getSiteUrl();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Каталог", item: `${siteUrl}/catalog` },
      {
        "@type": "ListItem",
        position: 3,
        name: item.name,
        item: `${siteUrl}/catalog/${item.id}`,
      },
    ],
  };

  return (
    <div className="bg-paper pt-24">
      <JsonLd data={breadcrumbJsonLd} />
      <Catalog
        products={products}
        initialCategory={item.id as CategoryId}
        syncUrl
        title={item.name}
        headingAs="h1"
      />
    </div>
  );
}
