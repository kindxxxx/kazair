import { isValidPhone } from "./phone";

export const COMMENT_MAX_LENGTH = 1000;
export const NAME_MAX_LENGTH = 80;
export const PRODUCT_MAX_LENGTH = 2000;

export type LeadPayload = {
  name: string;
  phone: string;
  product: string;
  comment: string;
  honeypot: string;
};

export type ValidatedLead = Omit<LeadPayload, "honeypot">;

export type ValidationResult =
  | { ok: true; data: ValidatedLead }
  | { ok: false; error: string; silent?: boolean };

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function parseLeadPayload(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Пустой запрос" };
  }

  const body = input as Record<string, unknown>;
  const honeypot = asString(body.honeypot ?? body.website).trim();

  if (honeypot) {
    return { ok: false, error: "Пустой запрос", silent: true };
  }

  const name = asString(body.name).trim();
  const phone = asString(body.phone).trim();
  const product = asString(body.product).trim();
  const comment = asString(body.comment).trim();

  if (!name) return { ok: false, error: "Укажите имя" };
  if (name.length < 2) return { ok: false, error: "Имя слишком короткое" };
  if (name.length > NAME_MAX_LENGTH) {
    return { ok: false, error: "Имя слишком длинное" };
  }
  if (!phone) return { ok: false, error: "Укажите телефон" };
  if (!isValidPhone(phone)) {
    return { ok: false, error: "Укажите корректный телефон" };
  }
  if (product.length > PRODUCT_MAX_LENGTH) {
    return { ok: false, error: "Название оборудования слишком длинное" };
  }
  if (comment.length > COMMENT_MAX_LENGTH) {
    return { ok: false, error: "Комментарий слишком длинный" };
  }

  return { ok: true, data: { name, phone, product, comment } };
}
