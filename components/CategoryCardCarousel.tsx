"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { catalogCardImageClass } from "@/lib/media";
import { cn } from "@/lib/utils";

export function CategoryCardCarousel({
  images,
  alt,
  intervalMs = 4000,
}: {
  images: readonly string[];
  alt: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const hasMany = images.length > 1;

  useEffect(() => {
    if (!hasMany) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [hasMany, images.length, intervalMs]);

  function show(next: number) {
    setIndex((next + images.length) % images.length);
  }

  return (
    <span
      className="relative block aspect-[5/4] bg-white"
      data-testid="category-card-carousel"
      onClick={(event) => event.stopPropagation()}
    >
      {images.map((src, imageIndex) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          className={cn(
            catalogCardImageClass,
            "transition-opacity duration-500",
            imageIndex === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      ))}

      {hasMany ? (
        <>
          <button
            type="button"
            aria-label="Предыдущее фото"
            className="absolute top-1/2 left-2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow ring-1 ring-navy/10 opacity-0 transition group-hover:opacity-100"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              show(index - 1);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Следующее фото"
            className="absolute top-1/2 right-2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow ring-1 ring-navy/10 opacity-0 transition group-hover:opacity-100"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              show(index + 1);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5">
            {images.map((src, dotIndex) => (
              <button
                key={src}
                type="button"
                aria-label={`Фото ${dotIndex + 1}`}
                className={cn(
                  "h-2 w-2 rounded-full transition",
                  dotIndex === index ? "bg-brand" : "bg-navy/25 hover:bg-navy/45",
                )}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  show(dotIndex);
                }}
              />
            ))}
          </span>
        </>
      ) : null}
    </span>
  );
}
