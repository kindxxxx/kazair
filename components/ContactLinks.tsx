"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { company } from "@/data/company";
import { useLocale } from "@/lib/i18n/locale";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  productName?: string;
  categoryInquiry?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
  "aria-label"?: string;
  "data-testid"?: string;
};

export function WhatsAppLink({
  productName,
  categoryInquiry = false,
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
  "data-testid": testId,
}: WhatsAppLinkProps) {
  const { locale } = useLocale();

  return (
    <a
      href={getWhatsAppUrl(productName, categoryInquiry, locale)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      {children}
    </a>
  );
}

type EmailLinkProps = {
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
};

export function EmailLink({
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: EmailLinkProps) {
  const { t } = useLocale();

  return (
    <a href={company.emailHref} className={className} aria-label={ariaLabel} onClick={onClick}>
      {children ?? t.header.email}
    </a>
  );
}
