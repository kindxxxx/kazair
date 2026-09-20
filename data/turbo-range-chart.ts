export type TurboRangeBar = {
  capacity: number;
  maxPressureBar: number;
  color: string;
};

/** Working-area chart for centrifugal turbo compressors (matches source document colors). */
export const turboRangeBars: TurboRangeBar[] = [
  { capacity: 2000, maxPressureBar: 0.8, color: "#FFEB3B" },
  { capacity: 5500, maxPressureBar: 25, color: "#FF9800" },
  { capacity: 8500, maxPressureBar: 80, color: "#EF5350" },
  { capacity: 15000, maxPressureBar: 80, color: "#C62828" },
  { capacity: 20000, maxPressureBar: 80, color: "#C62828" },
  { capacity: 25000, maxPressureBar: 80, color: "#C62828" },
  { capacity: 41000, maxPressureBar: 80, color: "#C62828" },
  { capacity: 60000, maxPressureBar: 80, color: "#C62828" },
  { capacity: 600000, maxPressureBar: 80, color: "#B71C1C" },
];

export const turboRangeYTicks = [0.8, 25, 80] as const;

/** Step bands so low pressure (0,8 bar) remains visible like the source chart. */
export function turboBarHeightPercent(maxPressureBar: number): number {
  const lowBand = 16;
  const midBand = 22;
  const highBand = 62;
  if (maxPressureBar <= 0.8) return lowBand;
  if (maxPressureBar <= 25) return lowBand + midBand;
  return lowBand + midBand + highBand;
}

export function formatTurboCapacity(value: number): string {
  return value.toLocaleString("ru-RU");
}
