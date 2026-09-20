import type { CategoryId } from "@/data/products";
import { categories } from "@/data/products";

export type CatalogFilter = "all" | CategoryId | "service";

export function parseCatalogFilter(value: string | undefined): CatalogFilter {
  if (!value || value === "all") return "all";
  if (value === "service") return "service";
  return categories.some((item) => item.id === value) ? (value as CategoryId) : "all";
}
