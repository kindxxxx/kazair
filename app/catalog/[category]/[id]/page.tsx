import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { LeadButton } from "@/components/LeadForm";

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
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <div className="bg-paper pt-28 pb-16">
      <div className="container-site grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-contain p-2"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <Link
            href={`/catalog/${product.categoryId}`}
            className="text-xs font-semibold tracking-[0.18em] text-brand uppercase"
          >
            {product.category}
          </Link>
          <h1 className="mt-3 font-display text-4xl">{product.name}</h1>
          <p className="mt-4 text-lg text-muted">{product.description}</p>
          {product.body ? <p className="mt-4 leading-7 text-ink/80">{product.body}</p> : null}
          {product.specifications.length > 0 ? (
            <dl className="mt-8 space-y-3">
              {product.specifications.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between gap-4 border-b border-stone py-3"
                >
                  <dt className="text-muted">{item.label}</dt>
                  <dd className="text-right font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <p className="mt-8 font-medium">Уточнить стоимость</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <LeadButton product={product.name} className="btn btn-primary">
              Консультация или заказ
            </LeadButton>
            <Link href="/catalog" className="btn btn-outline">
              В каталог
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
