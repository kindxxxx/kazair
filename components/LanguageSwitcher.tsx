"use client";

import { useLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";


export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className="inline-flex h-11 overflow-hidden rounded-[10px] border border-white/15 bg-white/10"
      role="group"
      aria-label={t.header.language}
    >
      {(
        [
          { id: "ru", label: "RU" },
          { id: "kk", label: "KZ" },
        ] as const
      ).map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setLocale(item.id)}
          className={cn(
            "px-3 text-xs font-semibold tracking-wide transition",
            locale === item.id ? "bg-white text-navy" : "text-white/75 hover:text-white",
          )}
          aria-pressed={locale === item.id}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
