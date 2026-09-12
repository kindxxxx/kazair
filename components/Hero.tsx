"use client";

import Image from "next/image";
import { heroSlides } from "@/data/products";
import { WhatsAppLink } from "@/components/ContactLinks";
import { useLocale } from "@/lib/i18n/locale";

const brands = ["ALMiG", "Hanwha", "ROTORCOMP", "Atlas Copco"];

export function Hero() {
  const { t } = useLocale();
  const slideTitles = [
    t.hero.slides.turbo,
    t.hero.slides.almig,
    t.hero.slides.rotorcomp,
    t.hero.slides.mobile,
    t.hero.slides.piston,
    t.hero.slides.mks,
  ];

  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <Image
        src="/images/hero-bg.webp"
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
            {t.hero.facts}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[1.7rem] leading-tight uppercase sm:text-4xl lg:text-5xl">
            {t.company.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            {t.company.heroSubtitle}
          </p>
          <p className="mt-5 max-w-2xl text-sm text-white/70">
            {t.hero.brands}: {brands.join(", ")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#catalog" className="btn btn-primary px-7 py-3.5">
              {t.hero.catalog}
            </a>
            <WhatsAppLink className="btn btn-secondary px-7 py-3.5">WhatsApp</WhatsAppLink>
          </div>
        </div>

        <div className="hidden gap-3 lg:grid">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/12 bg-white shadow-[0_16px_40px_rgba(0,20,40,0.28)]">
            <Image
              src={heroSlides[1].image}
              alt={slideTitles[1]}
              fill
              priority
              className="object-contain p-3"
              sizes="40vw"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 3].map((index) => (
              <article
                key={heroSlides[index].title}
                className="overflow-hidden rounded-xl border border-white/12 bg-white/8 backdrop-blur-sm"
              >
                <div className="relative aspect-[16/10] bg-white">
                  <Image
                    src={heroSlides[index].image}
                    alt={slideTitles[index]}
                    fill
                    className="object-contain p-2"
                    sizes="200px"
                  />
                </div>
                <p className="px-3 py-2 text-xs leading-5 text-white/80">{slideTitles[index]}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
