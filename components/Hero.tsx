"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides, type HeroSlideId } from "@/data/hero-slides";
import { catalogCardImageClass } from "@/lib/media";
import { useLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t } = useLocale();
  const [slide, setSlide] = useState(0);

  const slides = heroSlides.map((item) => ({
    ...item,
    ...t.hero.carousel[item.id as HeroSlideId],
  }));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((value) => (value + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const current = slides[slide];

  return (
    <section data-testid="hero" className="relative isolate overflow-hidden bg-navy text-white">
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        className="object-cover object-[72%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/82 to-navy/28" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-navy/30" />

      <div className="container-site relative grid min-h-[92svh] items-center gap-8 pb-12 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:pt-36">
        <div className="max-w-3xl">
          <h1 className="max-w-4xl font-display text-[1.85rem] leading-[1.12] uppercase sm:text-5xl lg:text-[3.4rem]">
            {t.company.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            {t.company.heroSubtitle}
          </p>
          <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.hero.consultAsk}
          </p>
        </div>

        <div
          className="overflow-hidden rounded-2xl bg-white/95 text-navy shadow-[0_24px_60px_rgba(0,18,36,0.28)]"
          data-testid="hero-carousel"
        >
          <Link href={current.href} className="block">
            <span className="relative block aspect-[16/9] bg-white">
              <Image
                src={current.image}
                alt={current.title}
                fill
                priority
                className={catalogCardImageClass}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </span>
            <span className="block p-5">
              <span className="block font-display text-xl leading-snug">{current.title}</span>
              <span className="mt-2 block text-sm leading-6 text-muted">{current.text}</span>
            </span>
          </Link>
          <div className="flex items-center justify-between border-t border-navy/8 px-4 py-3">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg bg-navy/8"
              aria-label={t.hero.aboutPrev}
              onClick={() => setSlide((value) => (value - 1 + slides.length) % slides.length)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.title}
                  className={cn("h-2.5 w-2.5 rounded-full", index === slide ? "bg-brand" : "bg-navy/20")}
                  onClick={() => setSlide(index)}
                />
              ))}
            </div>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg bg-navy/8"
              aria-label={t.hero.aboutNext}
              onClick={() => setSlide((value) => (value + 1) % slides.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
