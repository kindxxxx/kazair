import { useLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className="inline-flex h-10 overflow-hidden rounded-lg border border-navy/12 bg-white/70"
      role="group"
      aria-label={t.header.language}
      data-testid="language-switcher"
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
          data-testid={`language-${item.id}`}
          onClick={() => setLocale(item.id)}
          className={cn(
            "px-3 text-xs font-semibold tracking-wide transition",
            locale === item.id ? "bg-navy text-white" : "text-navy/65 hover:text-navy",
          )}
          aria-pressed={locale === item.id}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
