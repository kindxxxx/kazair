import Image from "next/image";
import { heroSlides } from "@/data/products";
import { company } from "@/data/company";
import { LeadButton } from "@/components/LeadForm";

const facts = ["С 2012 года", "Алматы", "Проекты «под ключ»"];
const brands = ["ALMiG", "Hanwha", "ROTORCOMP", "Atlas Copco"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover object-[72%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/78 to-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/25" />

      <div className="container-site relative grid min-h-[100svh] items-center gap-10 py-28 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
        <div className="max-w-2xl rounded-xl border border-white/12 bg-white/8 p-6 shadow-[0_20px_60px_rgba(0,20,40,0.25)] backdrop-blur-md sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            {facts.join("  ·  ")}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[1.7rem] leading-tight uppercase sm:text-4xl lg:text-5xl">
            {company.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            {company.heroSubtitle}
          </p>
          <p className="mt-5 max-w-2xl text-sm text-white/70">
            Бренды: {brands.join(", ")} и др.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#catalog" className="btn btn-primary px-7 py-3.5">
              Каталог
            </a>
            <LeadButton className="btn btn-secondary px-7 py-3.5">
              Оставить заявку
            </LeadButton>
          </div>
        </div>

        <div className="hidden gap-3 lg:grid">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/12 bg-white/8 shadow-[0_16px_40px_rgba(0,20,40,0.28)] backdrop-blur-sm">
            <Image
              src={heroSlides[1].image}
              alt={heroSlides[1].title}
              fill
              priority
              className="object-cover"
              sizes="40vw"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[heroSlides[0], heroSlides[3]].map((slide) => (
              <article
                key={slide.title}
                className="overflow-hidden rounded-xl border border-white/12 bg-white/8 backdrop-blur-sm"
              >
                <div className="relative h-28">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <p className="px-3 py-2 text-xs leading-5 text-white/80">{slide.title}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
