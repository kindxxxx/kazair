import Image from "next/image";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

export function Logo({
  className,
}: {
  variant?: "white" | "color";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border-2 border-brand bg-white px-2.5 py-1 shadow-[0_0_16px_rgba(34,184,240,0.28)]",
        className,
      )}
    >
      <Image
        src="/images/logo.png"
        alt={company.name}
        width={1024}
        height={409}
        priority
        className="h-10 w-auto md:h-12"
      />
    </span>
  );
}
