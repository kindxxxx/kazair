import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/Catalog";
import { categories, getCategory, products, type CategoryId } from "@/data/products";

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
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const item = getCategory(category);
  if (!item) notFound();

  return (
    <div className="bg-paper pt-24">
      <div className="container-site grid items-center gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            Каталог
          </p>
          <h1 className="mt-3 font-display text-4xl">{item.name}</h1>
          <p className="mt-4 max-w-2xl text-muted">{item.intro}</p>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={item.cover}
            alt={item.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </div>
      </div>
      <Catalog
        products={products}
        initialCategory={item.id as CategoryId}
        syncUrl
        title={item.name}
        headingAs="h2"
      />
    </div>
  );
}
