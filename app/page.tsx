import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Catalog } from "@/components/Catalog";
import { Popular } from "@/components/Popular";
import { HowToOrder } from "@/components/HowToOrder";
import { Clients } from "@/components/Clients";
import { About } from "@/components/About";
import { Contacts } from "@/components/Contacts";
import { products } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Catalog products={products} />
      <Popular />
      <HowToOrder />
      <Clients />
      <About />
      <Contacts compact />
    </>
  );
}
