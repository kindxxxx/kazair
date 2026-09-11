import { products } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";

const popularIds = ["oil-free", "integrated-laser", "mobile-rotorcomp", "n-gen-skid"];

export function Popular() {
  const items = products.filter((item) => popularIds.includes(item.id));

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            Популярные модели
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Часто запрашивают</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <ProductCard product={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
