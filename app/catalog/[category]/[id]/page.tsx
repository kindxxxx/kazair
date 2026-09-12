import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { JsonLd } from "@/components/JsonLd";
import { ProductDetail } from "@/components/ProductDetail";
import { company } from "@/data/company";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ category: string; id: string }>;
};

export function generateStaticParams() {
  return products.map((item) => ({ category: item.categoryId, id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Позиция не найдена" };
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/catalog/${product.categoryId}/${product.id}` },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/catalog/${product.categoryId}/${product.id}`,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const siteUrl = getSiteUrl();
  const productUrl = `${siteUrl}/catalog/${product.categoryId}/${product.id}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Каталог", item: `${siteUrl}/catalog` },
        {
          "@type": "ListItem",
          position: 3,
          name: product.category,
          item: `${siteUrl}/catalog/${product.categoryId}`,
        },
        { "@type": "ListItem", position: 4, name: product.name, item: productUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: toAbsoluteUrl(product.image),
      brand: { "@type": "Brand", name: company.name },
      category: product.category,
      url: productUrl,
    },
  ];

  return (
    <div className="bg-paper pt-28 pb-16">
      <JsonLd data={jsonLd} />
      <ProductDetail product={product} />
    </div>
  );
}
