import { messages } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/types";

const WHATSAPP_PHONE = "77017131497";

export function getWhatsAppUrl(
  productName?: string,
  categoryInquiry = false,
  locale: Locale = "ru",
) {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  const name = productName?.trim();
  const copy = messages[locale].whatsapp;

  if (name) {
    return `${base}?text=${encodeURIComponent(copy.product.replace("{name}", name))}`;
  }

  if (categoryInquiry) {
    return `${base}?text=${encodeURIComponent(copy.category)}`;
  }

  return base;
}
