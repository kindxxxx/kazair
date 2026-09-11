"use client";

import { MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { LeadButton, useLead } from "@/components/LeadForm";

export function MobileCTA() {
  const { isLeadOpen } = useLead();
  if (isLeadOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-graphite/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={company.phoneHref}
          className="btn btn-secondary h-auto min-h-12 flex-col gap-1 py-2 text-[11px]"
        >
          <Phone className="h-4 w-4" />
          Позвонить
        </a>
        <a
          href={company.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary h-auto min-h-12 flex-col gap-1 py-2 text-[11px]"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <LeadButton className="btn btn-primary h-auto min-h-12 flex-col gap-1 py-2 text-[11px] leading-tight">
          Получить расчёт
        </LeadButton>
      </div>
    </div>
  );
}
