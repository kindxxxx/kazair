"use client";

import Link from "next/link";
import { getTypeProducts, type Product } from "@/data/products";
import { isDualBrandProduct } from "@/data/brand-choice";
import { getProductArticle } from "@/data/home-sections";
import { getSpecTable, localizeSpecTable } from "@/data/spec-tables";
import { BrandChoice } from "@/components/BrandChoice";
import { CatalogHero } from "@/components/CatalogHero";
import { ArticleLists, ArticleParagraphs } from "@/components/CatalogArticleBlocks";
import { ProductTypesSection } from "@/components/ProductTypesSection";
import { SpecTable } from "@/components/SpecTable";
import { TurboRangeChart } from "@/components/TurboRangeChart";
import { productImage } from "@/lib/media";
import { localizeProduct } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";

export function ProductDetail({ product }: { product: Product }) {
  const { locale, t } = useLocale();
  const item = localizeProduct(product, locale);
  const article = getProductArticle(product);
  const lineId = item.parentId ?? item.aliasOf ?? item.id;
  const image = productImage(item.id, item.image, item.categoryId, lineId);
  const dualBrand = isDualBrandProduct(item);
  const typeItems = dualBrand ? [] : getTypeProducts(lineId);
  const tableIds = item.tableIds ?? [];

  if (dualBrand) {
    return (
      <div className="container-site">
        <Link
          href={`/catalog/${item.categoryId}`}
          className="text-xs font-semibold tracking-[0.18em] text-brand uppercase"
        >
          {item.category}
        </Link>
        <h1 className="mt-3 font-display text-4xl">{item.name}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">{item.description}</p>
        <p className="mt-8 text-lg text-navy">{t.catalog.chooseBrand}</p>
        <BrandChoice oilFree={item.id === "oil-free"} />
      </div>
    );
  }

  return (
    <div className="container-site">
      <CatalogHero
        eyebrow={item.category}
        eyebrowHref={`/catalog/${item.categoryId}`}
        manufacturer={item.manufacturer}
        title={item.name}
        description={item.description}
        image={image}
        imageAlt={item.name}
        backHref={`/catalog/${item.categoryId}`}
      />

      <ProductTypesSection
        typeItems={typeItems}
        activeId={item.id}
        activeTypeName={item.typeName}
      />

      {article ? (
        <div className="mt-12 max-w-4xl">
          {article.subgroup ? (
            <>
              <h2 className="font-display text-2xl md:text-3xl">{article.subgroup.title[locale]}</h2>
              {article.subgroup.lead ? (
                <p className="mt-3 text-lg text-muted">{article.subgroup.lead[locale]}</p>
              ) : null}
              <ArticleParagraphs paragraphs={article.subgroup.paragraphs} locale={locale} />
              <ArticleLists lists={article.subgroup.lists} locale={locale} />
            </>
          ) : (
            <>
              <ArticleParagraphs paragraphs={article.section.paragraphs} locale={locale} />
              <ArticleLists lists={article.section.lists} locale={locale} />
            </>
          )}
          {article.subgroup && item.manufacturer === "ALMiG" ? (
            <ArticleLists lists={article.section.lists} locale={locale} />
          ) : null}
        </div>
      ) : item.body ? (
        <div className="mt-12 max-w-4xl space-y-4 leading-7 text-ink/85">
          <p>{item.body}</p>
        </div>
      ) : null}

      {tableIds.map((tableId) => {
        const table = getSpecTable(tableId);
        if (!table) return null;
        const localized = localizeSpecTable(table, locale);
        if (tableId === "turbo-range") {
          return (
            <TurboRangeChart
              key={tableId}
              caption={localized.caption}
              note={localized.note}
            />
          );
        }
        return (
          <SpecTable
            key={tableId}
            caption={localized.caption}
            headers={localized.headers}
            rows={localized.rows}
            note={localized.note}
          />
        );
      })}

      {item.afterTable && item.afterTable.length > 0 ? (
        <div className="mt-10 max-w-4xl space-y-4 leading-7 text-ink/85" data-testid="after-table">
          {item.afterTable.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
