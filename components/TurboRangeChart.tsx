"use client";

import {
  formatTurboCapacity,
  turboBarHeightPercent,
  turboRangeBars,
  turboRangeYTicks,
} from "@/data/turbo-range-chart";
import { useLocale } from "@/lib/i18n/locale";

export function TurboRangeChart({
  caption,
  note,
}: {
  caption?: string;
  note?: string;
}) {
  const { locale } = useLocale();
  const yLabel = locale === "kk" ? "Қысымы, (бар)" : "Давление, (бар)";
  const xLabel = locale === "kk" ? "Өнімділігі, (м³/сағ)" : "Производительность, (м³/час)";

  return (
    <figure className="mt-6" data-testid="turbo-range-chart">
      {caption ? <figcaption className="mb-3 text-sm font-medium text-ink">{caption}</figcaption> : null}
      <div className="overflow-x-auto rounded-xl bg-white p-3 ring-1 ring-navy/10 sm:p-4">
        <div className="w-full min-w-[280px] max-w-3xl">
          <div className="grid grid-cols-[auto_1fr] gap-x-2 sm:gap-x-3">
            <div className="relative flex w-8 shrink-0 items-center justify-center sm:w-10">
              <span className="origin-center -rotate-90 whitespace-nowrap text-[10px] font-medium text-navy/80 sm:text-xs">
                {yLabel}
              </span>
            </div>
            <div className="relative min-w-0">
              <div className="pointer-events-none absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between">
                {turboRangeYTicks.map((tick) => (
                  <div key={tick} className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-7 text-right text-[10px] text-navy/70 sm:w-8 sm:text-xs">
                      {tick.toLocaleString("ru-RU")}
                    </span>
                    <span className="h-px flex-1 bg-navy/15" />
                  </div>
                ))}
              </div>
              <div className="ml-7 flex h-44 items-end sm:ml-10 sm:h-60 md:h-64">
                {turboRangeBars.map((bar) => (
                  <div
                    key={bar.capacity}
                    className="flex h-full min-w-0 flex-1 flex-col justify-end border-r border-navy/80 first:border-l"
                  >
                    <div
                      className="relative w-full border-t border-navy/80 transition-[height] duration-300"
                      style={{
                        height: `${turboBarHeightPercent(bar.maxPressureBar)}%`,
                        backgroundColor: bar.color,
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center px-0.5 text-[8px] font-semibold leading-none text-navy/90 [writing-mode:vertical-rl] rotate-180 sm:text-[10px] md:text-xs">
                        {formatTurboCapacity(bar.capacity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-[10px] font-medium text-navy/80 sm:text-xs">{xLabel}</p>
            </div>
          </div>
        </div>
      </div>
      {note ? <p className="mt-3 text-sm text-muted">{note}</p> : null}
    </figure>
  );
}
