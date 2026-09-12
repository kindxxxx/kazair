"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WhatsAppLink } from "@/components/ContactLinks";
import { useLocale } from "@/lib/i18n/locale";

const brands = ["ALMiG", "Hanwha", "ROTORCOMP", "Atlas Copco"];

export function Hero() {
  const { t } = useLocale();
  const [slide, setSlide] = useState(0);
  const slides = [
    { title: t.hero.aboutSlides.company, text: t.company.aboutLead },
    { title: t.hero.aboutSlides.work, text: t.company.aboutText },
    { title: t.hero.aboutSlides.projects, text: t.company.aboutProjects },
    { title: t.hero.aboutSlides.industries, text: t.company.aboutIndustries },
  ];
  const current = slides[slide];
  const go = (next: number) => setSlide((next + slides.length) % slides.length);
  const touchX = useRef<number | null>(null);

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

      <div className="container-site relative grid min-h-[100svh] items-center gap-8 py-28 lg:grid-cols-[1.05fr_0.95fr] lg:py-32">
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

        <article
          id="about"
          className="flex min-h-[22rem] scroll-mt-28 flex-col rounded-xl border border-white/12 bg-white/8 p-6 shadow-[0_20px_60px_rgba(0,20,40,0.25)] backdrop-blur-md sm:min-h-[24rem] sm:p-8"
          aria-roledescription="carousel"
          aria-label={t.about.label}
          onTouchStart={(event) => {
            touchX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchX.current == null) return;
            const dx = (event.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
            if (dx > 48) go(slide - 1);
            if (dx < -48) go(slide + 1);
            touchX.current = null;
          }}
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {t.about.label}
          </p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">{current.title}</h2>
          <p
            key={slide}
            className="mt-4 flex-1 text-sm leading-7 text-white/80 sm:text-base"
            aria-live="polite"
          >
            {current.text}
          </p>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-xs tracking-wide text-white/55">
              {t.hero.aboutSlideOf
                .replace("{current}", String(slide + 1))
                .replace("{total}", String(slides.length))}
            </p>
            <div className="flex items-center gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`${index + 1}`}
                  aria-current={index === slide ? true : undefined}
                  onClick={() => setSlide(index)}
                  className={`h-2 rounded-full transition ${
                    index === slide ? "w-6 bg-brand" : "w-2 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
              <button
                type="button"
                onClick={() => go(slide - 1)}
                className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                aria-label={t.hero.aboutPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(slide + 1)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                aria-label={t.hero.aboutNext}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
