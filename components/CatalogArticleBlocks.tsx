import type { HomeList } from "@/data/home-sections";
import type { Locale } from "@/lib/i18n/types";

export function ArticleParagraphs({
  paragraphs,
  locale,
}: {
  paragraphs: { ru: string; kk: string }[];
  locale: Locale;
}) {
  if (paragraphs.length === 0) return null;
  return (
    <div className="mt-5 space-y-4 leading-7 text-ink/85">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.ru}>{paragraph[locale]}</p>
      ))}
    </div>
  );
}

export function ArticleLists({
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
            {list.items.map((listItem) => (
              <li
                key={listItem.ru}
                className="rounded-[10px] border border-navy/8 bg-white px-4 py-3 text-sm leading-6"
              >
                {listItem[locale]}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
