"use client";

import Image from "next/image";
import { homeSections } from "@/data/home-sections";
import { catalogCardImageClass } from "@/lib/media";
import { afterTableByCategoryId, afterTableByLineId } from "@/data/catalog-copy";
import { SpecTable } from "@/components/SpecTable";
import { getSpecTable, localizeSpecTable } from "@/data/spec-tables";
import { useLocale } from "@/lib/i18n/locale";
import type { CategoryId } from "@/data/products";

export function SectionArticle({ categoryId }: { categoryId: CategoryId }) {
  const { locale, t } = useLocale();
  const section = homeSections.find((item) => item.categoryId === categoryId);
  if (!section) return null;

  const tableIds = [
    ...new Set([
      ...(section.tableIds ?? []),
      ...(section.subgroups?.flatMap((group) => group.tableIds ?? []) ?? []),
    ]),
  ];

  return (
    <article className="container-site pb-4 pt-28" data-testid={`article-${categoryId}`}>
      <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
        {t.catalog.label}
      </p>
      <h1 className="mt-3 max-w-4xl font-display text-3xl md:text-5xl">{section.title[locale]}</h1>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-muted">{section.intro[locale]}</p>
      {section.image ? (
        <div className="relative mt-8 aspect-[4/3] max-w-2xl overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10">
          <Image
            src={section.image}
            alt={section.title[locale]}
            fill
            priority
            className={catalogCardImageClass}
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      ) : null}
      <div className="mt-8 max-w-4xl space-y-4 leading-7 text-ink/85">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph.ru}>{paragraph[locale]}</p>
        ))}
      </div>
      {section.lists?.map((list) => (
        <div key={list.title?.ru ?? list.items[0].ru} className="mt-8">
          {list.title ? <h2 className="font-display text-2xl">{list.title[locale]}</h2> : null}
          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {list.items.map((item) => (
              <li key={item.ru} className="rounded-xl bg-white px-4 py-3 text-sm leading-6 ring-1 ring-navy/8">
                {item[locale]}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {section.subgroups?.map((group) => {
        const lineId = group.tableIds?.[0];
        const after = lineId ? afterTableByLineId[lineId] : undefined;
        return (
          <div key={group.title.ru} className="mt-10">
            <h2 className="font-display text-2xl md:text-3xl">{group.title[locale]}</h2>
            {group.lead ? <p className="mt-3 text-lg text-muted">{group.lead[locale]}</p> : null}
            <div className="mt-4 max-w-4xl space-y-4 leading-7 text-ink/85">
              {group.paragraphs.map((paragraph) => (
                <p key={paragraph.ru}>{paragraph[locale]}</p>
              ))}
            </div>
            {group.lists?.map((list) => (
              <ul key={list.title?.ru ?? list.items[0].ru} className="mt-4 grid gap-2 md:grid-cols-2">
                {list.items.map((item) => (
                  <li key={item.ru} className="rounded-xl bg-white px-4 py-3 text-sm leading-6 ring-1 ring-navy/8">
                    {item[locale]}
                  </li>
                ))}
              </ul>
            ))}
            {(group.tableIds ?? []).map((tableId) => {
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
            {after?.length ? (
              <div className="mt-8 max-w-4xl space-y-4 leading-7 text-ink/85">
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
        <div className="mt-8 max-w-4xl space-y-4 leading-7 text-ink/85">
          {(afterTableByCategoryId[categoryId] ?? []).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
