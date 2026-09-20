import type { CategoryId } from "@/data/products";
import {
  catalogImages,
  categoryImages,
  categoryImageSets,
  productImageOverrides,
  type CatalogCategoryId,
} from "@/lib/catalog-images";

export const brandImages = {
  almig: catalogImages.almig,
  rotorcomp: catalogImages.rotorcomp,
  oilfree: catalogImages.oilfree,
} as const;

export function isCutoutImage(_src: string) {
  return false;
}

/** Full image visible inside catalog cards — no cropping. */
export const catalogCardImageClass =
  "object-contain p-4 transition duration-500 group-hover:scale-[1.02]";

export function resolveImage(src: string, categoryId?: CategoryId) {
  if (src.startsWith("/images/catalog/") || src.startsWith("/images/brand-")) return src;
  if (categoryId) return categoryImages[categoryId as CatalogCategoryId];
  return catalogImages.parts;
}

export function categoryImage(categoryId: CategoryId) {
  return categoryImages[categoryId as CatalogCategoryId];
}

export function categoryImagesFor(categoryId: CategoryId): readonly string[] {
  const set = categoryImageSets[categoryId as CatalogCategoryId];
  if (set?.length) return set;
  return [categoryImages[categoryId as CatalogCategoryId]];
}

export function productImage(
  productId: string,
  fallback: string,
  categoryId?: CategoryId,
  parentId?: string,
) {
  const fromOverride =
    productImageOverrides[productId] ??
    (parentId ? productImageOverrides[parentId] : undefined);

  if (fromOverride) return fromOverride;
  if (fallback.startsWith("/images/catalog/") || fallback.startsWith("/images/brand-")) {
    return fallback;
  }
  if (categoryId) return categoryImages[categoryId as CatalogCategoryId];
  return catalogImages.parts;
}
