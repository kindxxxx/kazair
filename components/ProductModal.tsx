"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { WhatsAppLink } from "@/components/ContactLinks";

type ProductModalContextValue = {
  openProduct: (product: Product) => void;
};

const ProductModalContext = createContext<ProductModalContextValue | null>(null);

export function useProductModal() {
  const context = useContext(ProductModalContext);
  if (!context) {
    throw new Error("useProductModal must be used within ProductModalProvider");
  }
  return context;
}

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const openProduct = useCallback((next: Product) => setProduct(next), []);

  return (
    <ProductModalContext.Provider value={{ openProduct }}>
      {children}
      <ProductModal product={product} onClose={() => setProduct(null)} />
    </ProductModalContext.Provider>
  );
}

function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-graphite/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="max-h-[92svh] w-full overflow-y-auto rounded-t-3xl bg-paper shadow-2xl sm:max-w-3xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-56 bg-mist">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-5 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              {product.category}
            </p>
            <h2 id="product-modal-title" className="mt-2 font-display text-2xl sm:text-3xl">
              {product.name}
            </h2>
            {product.description ? (
              <p className="mt-3 text-muted">{product.description}</p>
            ) : null}
            {product.specifications.length > 0 ? (
              <dl className="mt-5 space-y-2">
                {product.specifications.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between gap-4 border-b border-stone/80 py-2 text-sm"
                  >
                    <dt className="text-muted">{item.label}</dt>
                    <dd className="text-right font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <p className="mt-5 text-sm font-medium text-graphite">Уточнить стоимость</p>
            <div className="mt-5 flex flex-col gap-3">
              <WhatsAppLink productName={product.name} className="btn btn-primary">
                Консультация или заказ
              </WhatsAppLink>
              <Link
                href={`/catalog/${product.categoryId}/${product.id}`}
                className="btn btn-dark"
                onClick={onClose}
              >
                Открыть страницу
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
