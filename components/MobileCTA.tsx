"use client";

import { Mail, Phone } from "lucide-react";
import { company } from "@/data/company";
import { EmailLink, WhatsAppLink } from "@/components/ContactLinks";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLocale } from "@/lib/i18n/locale";

export function MobileCTA() {
  const { t } = useLocale();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-graphite/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={company.phoneHref}
          className="btn btn-secondary h-auto min-h-12 flex-col gap-1 py-2 text-[11px]"
        >
          <Phone className="h-4 w-4" />
          {t.header.call}
        </a>
        <WhatsAppLink className="btn btn-primary h-auto min-h-12 flex-col gap-1 py-2 text-[11px]">
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </WhatsAppLink>
        <EmailLink className="btn btn-secondary h-auto min-h-12 flex-col gap-1 py-2 text-[11px]">
          <Mail className="h-4 w-4" />
          {t.header.email}
        </EmailLink>
      </div>
    </div>
  );
}
