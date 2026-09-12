import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[70svh] flex-col items-center justify-center pt-24 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl">Страница не найдена</h1>
      <p className="mt-3 max-w-md text-muted">
        Проверьте адрес или вернитесь в каталог компрессорного оборудования.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-outline">
          На главную
        </Link>
        <Link href="/catalog" className="btn btn-primary">
          В каталог
        </Link>
      </div>
    </div>
  );
}
