"use client";

import { useMemo } from "react";
import { homeSections } from "@/data/home-sections";
import { afterTableByCategoryId, afterTableByLineId } from "@/data/catalog-copy";
import { isDualBrandProduct } from "@/data/brand-choice";
import { getTypeProducts, products, type CategoryId } from "@/data/products";
import { CatalogHero } from "@/components/CatalogHero";
import { ArticleLists, ArticleParagraphs } from "@/components/CatalogArticleBlocks";
import { ProductTypesSection } from "@/components/ProductTypesSection";
import { SpecTable } from "@/components/SpecTable";
import { TurboRangeChart } from "@/components/TurboRangeChart";
import { getSpecTable, localizeSpecTable } from "@/data/spec-tables";
import { useLocale } from "@/lib/i18n/locale";

function categoryTypeProducts(categoryId: CategoryId) {
  return products
    .filter(
      (product) =>
        product.categoryId === categoryId &&
        product.kind === "line" &&
        !product.aliasOf &&
        !isDualBrandProduct(product),
    )
    .flatMap((line) => getTypeProducts(line.id));
}

export function SectionArticle({ categoryId }: { categoryId: CategoryId }) {
  const { locale, t } = useLocale();
  const section = homeSections.find((item) => item.categoryId === categoryId);
  const typeItems = useMemo(() => categoryTypeProducts(categoryId), [categoryId]);

  if (!section) return null;

  const tableIds = [
    ...new Set([
      ...(section.tableIds ?? []),
      ...(section.subgroups?.flatMap((group) => group.tableIds ?? []) ?? []),
    ]),
  ];

  return (
    <article className="container-site pb-4 pt-28" data-testid={`article-${categoryId}`}>
      <CatalogHero
        eyebrow={t.catalog.label}
        eyebrowHref="/catalog"
        title={section.title[locale]}
        description={section.intro[locale]}
        image={section.image}
        imageAlt={section.title[locale]}
        backHref="/catalog"
        backLabel={t.catalog.title}
      />

      <ProductTypesSection typeItems={typeItems} />

      <div className="mt-12 max-w-4xl">
        <ArticleParagraphs paragraphs={section.paragraphs} locale={locale} />
        <ArticleLists lists={section.lists} locale={locale} />
      </div>

      {section.subgroups?.map((group) => {
        const lineId = group.tableIds?.[0];
        const after = lineId ? afterTableByLineId[lineId] : undefined;
        return (
          <div key={group.title.ru} className="mt-12 max-w-4xl">
            <h2 className="font-display text-2xl md:text-3xl">{group.title[locale]}</h2>
            {group.lead ? <p className="mt-3 text-lg text-muted">{group.lead[locale]}</p> : null}
            <ArticleParagraphs paragraphs={group.paragraphs} locale={locale} />
            <ArticleLists lists={group.lists} locale={locale} />
            {(group.tableIds ?? []).map((tableId) => {
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
            {after?.length ? (
              <div className="mt-10 space-y-4 leading-7 text-ink/85">
                {after.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}

      {(section.subgroups?.length ? [] : tableIds).map((tableId) => {
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

      {!section.subgroups?.length ? (
        <div className="mt-10 max-w-4xl space-y-4 leading-7 text-ink/85">
          {(afterTableByCategoryId[categoryId] ?? []).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
