import { company } from "@/data/company";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "white",
  className,
}: {
  variant?: "white" | "color";
  className?: string;
}) {
  const light = variant === "white";

  return (
    <span className={cn("flex min-w-0 items-center gap-3", className)}>
      <span
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-[10px]",
          light ? "bg-brand" : "bg-brand-dark",
        )}
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path
            d="M7 21c3.2-4.6 6.4-7 9-7s5.8 2.4 9 7"
            fill="none"
            stroke={light ? "#003755" : "#fff"}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="12" r="3.2" fill={light ? "#003755" : "#fff"} />
        </svg>
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block truncate font-display text-sm font-semibold tracking-tight md:text-base",
            light ? "text-white" : "text-navy",
          )}
        >
          {company.name}
        </span>
        <span
          className={cn(
            "mt-0.5 hidden truncate text-[11px] md:block",
            light ? "text-white/70" : "text-muted",
          )}
        >
          {company.tagline}
        </span>
      </span>
    </span>
  );
}
