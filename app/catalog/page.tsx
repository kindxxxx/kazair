import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Каталог компрессоров и компрессорного оборудования KAZaircompressor: винтовые, мобильные, турбо, осушители, генераторы, ресиверы.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <div className="pt-24">
      <Catalog products={products} syncUrl headingAs="h1" />
    </div>
  );
}
