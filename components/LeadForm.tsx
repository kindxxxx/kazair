"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { COMMENT_MAX_LENGTH, NAME_MAX_LENGTH, PRODUCT_MAX_LENGTH } from "@/lib/validation";
import { formatPhoneMask } from "@/lib/phone";
import { cn } from "@/lib/utils";
import { company } from "@/data/company";

type LeadContextValue = {
  openLead: (product?: string) => void;
  isLeadOpen: boolean;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function useLead() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLead must be used within LeadProvider");
  }
  return context;
}

export function LeadButton({
  product,
  children,
  className,
  onClick,
}: {
  product?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { openLead } = useLead();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        openLead(product);
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}

export function LeadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState("");
  const [formKey, setFormKey] = useState(0);

  const openLead = useCallback((next?: string) => {
    setProduct(next ?? "");
    setFormKey((value) => value + 1);
    setOpen(true);
  }, []);

  return (
    <LeadContext.Provider value={{ openLead, isLeadOpen: open }}>
      {children}
      <LeadForm
        key={formKey}
        open={open}
        product={product}
        onProductChange={setProduct}
        onClose={() => setOpen(false)}
      />
    </LeadContext.Provider>
  );
}

function LeadForm({
  open,
  product,
  onProductChange,
  onClose,
}: {
  open: boolean;
  product: string;
  onProductChange: (value: string) => void;
  onClose: () => void;
}) {
  const headingId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [comment, setComment] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, product, comment, honeypot }),
      });
      const payload = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setError(
          payload.error ||
            `Не удалось отправить заявку. Позвоните ${company.phone}`,
        );
        return;
      }

      setStatus("success");
      setName("");
      setPhone("+7");
      setComment("");
    } catch {
      setStatus("error");
      setError(`Не удалось отправить заявку. Позвоните ${company.phone}`);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-graphite/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="max-h-[92svh] w-full overflow-y-auto rounded-t-3xl bg-paper p-5 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-brand text-2xl text-navy">
              ✓
            </div>
            <h2 id={headingId} className="font-display text-2xl">
              Заявка отправлена
            </h2>
            <p className="mt-3 text-muted">
              Спасибо! Специалист свяжется с вами в ближайшее время.
            </p>
            <button type="button" className="btn btn-primary mt-8 w-full" onClick={onClose}>
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                Консультация или заказ
              </p>
              <h2 id={headingId} className="mt-2 font-display text-2xl">
                Получить расчёт
              </h2>
              <p className="mt-2 text-sm text-muted">
                Оставьте контакты — подберём оборудование и уточним стоимость.
              </p>
            </div>
            <label className="block space-y-2 text-sm font-medium">
              Ваше имя
              <input
                required
                name="name"
                autoComplete="name"
                maxLength={NAME_MAX_LENGTH}
                placeholder="Как к вам обращаться"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="block space-y-2 text-sm font-medium">
              Ваш телефон
              <input
                required
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(event) => setPhone(formatPhoneMask(event.target.value))}
              />
            </label>
            <label className="block space-y-2 text-sm font-medium">
              Оборудование
              <input
                name="product"
                maxLength={PRODUCT_MAX_LENGTH}
                value={product}
                placeholder="Не выбрано"
                onChange={(event) => onProductChange(event.target.value)}
              />
            </label>
            <label className="block space-y-2 text-sm font-medium">
              Сообщение
              <textarea
                name="comment"
                rows={4}
                maxLength={COMMENT_MAX_LENGTH}
                placeholder="Давление, производительность, отрасль или другие параметры"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </label>
            <input
              className="honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
            {status === "error" ? (
              <p className="rounded-2xl bg-brand-soft px-4 py-3 text-sm text-brand-dark">
                {error}
              </p>
            ) : null}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                className={cn("btn btn-primary flex-1", status === "loading" && "opacity-70")}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Отправка..." : "Отправить заявку"}
              </button>
              <button type="button" className="btn btn-outline flex-1" onClick={onClose}>
                Закрыть
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
