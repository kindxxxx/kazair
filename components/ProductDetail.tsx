"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { getProductArticle, type HomeList } from "@/data/home-sections";
import { getSpecTable, localizeSpecTable } from "@/data/spec-tables";
import { WhatsAppLink } from "@/components/ContactLinks";
import { SpecTable } from "@/components/SpecTable";
import { localizeProduct } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/locale";
import type { Locale } from "@/lib/i18n/types";

export function ProductDetail({ product }: { product: Product }) {
  const { locale, t } = useLocale();
  const item = localizeProduct(product, locale);
  const article = getProductArticle(product);

  return (
    <div className="container-site">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            priority
            className="object-contain p-2"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <Link
            href={`/catalog/${item.categoryId}`}
            className="text-xs font-semibold tracking-[0.18em] text-brand uppercase"
          >
            {item.category}
          </Link>
          <h1 className="mt-3 font-display text-4xl">{item.name}</h1>
          <p className="mt-4 text-lg text-muted">{item.description}</p>
          {item.body ? <p className="mt-4 leading-7 text-ink/80">{item.body}</p> : null}
          {item.specifications.length > 0 ? (
            <dl className="mt-8 space-y-3">
              {item.specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 border-b border-stone py-3">
                  <dt className="text-muted">{spec.label}</dt>
                  <dd className="text-right font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <p className="mt-8 font-medium">{t.product.price}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink productName={item.name} className="btn btn-primary">
              {t.product.consult}
            </WhatsAppLink>
            <Link href={`/catalog/${item.categoryId}`} className="btn btn-outline">
              {t.product.backToCatalog}
            </Link>
          </div>
        </div>
      </div>

      {article ? (
        <div className="mt-12">
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
          {article.subgroup ? <ArticleLists lists={article.section.lists} locale={locale} /> : null}
        </div>
      ) : null}

      {article?.tableIds.map((tableId) => {
        const table = getSpecTable(tableId);
        if (!table) return null;
        const localized = localizeSpecTable(table, locale);
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
    </div>
  );
}

function ArticleParagraphs({
  paragraphs,
  locale,
}: {
  paragraphs: { ru: string; kk: string }[];
  locale: Locale;
}) {
  if (paragraphs.length === 0) return null;
  return (
    <div className="mt-5 max-w-4xl space-y-4 leading-7 text-ink/85">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.ru}>{paragraph[locale]}</p>
      ))}
    </div>
  );
}

function ArticleLists({
  lists,
  locale,
}: {
  lists?: HomeList[];
  locale: Locale;
}) {
  if (!lists?.length) return null;
  return (
    <>
      {lists.map((list) => (
        <div key={list.title?.ru ?? list.items[0].ru} className="mt-8">
          {list.title ? <h3 className="font-display text-xl">{list.title[locale]}</h3> : null}
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {list.items.map((item) => (
              <li
                key={item.ru}
                className="rounded-[10px] border border-navy/8 bg-white px-4 py-3 text-sm leading-6"
              >
                {item[locale]}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
