import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[70svh] flex-col items-center justify-center pt-24 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl">Страница не найдена</h1>
      <p className="mt-3 max-w-md text-muted">
        Проверьте адрес или вернитесь в каталог компрессорного оборудования.
      </p>
      <Link href="/catalog" className="btn btn-primary mt-8">
        В каталог
      </Link>
    </div>
  );
}
