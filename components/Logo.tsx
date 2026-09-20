import Image from "next/image";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "color",
  className,
}: {
  variant?: "white" | "color";
  className?: string;
}) {
  return (
    <span data-testid="logo" className={cn("inline-flex items-center", className)}>
      <Image
        src={variant === "white" ? "/images/logo-white.png" : "/images/logo.png"}
        alt={company.name}
        width={1024}
        height={409}
        priority
        className="h-9 w-auto md:h-11"
      />
    </span>
  );
}
