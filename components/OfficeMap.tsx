"use client";

import { useEffect, useRef } from "react";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

export function OfficeMap({
  className,
  openLabel = "Открыть в 2GIS",
}: {
  className?: string;
  openLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    let cancelled = false;

    void (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !containerRef.current) return;

      const { lat, lng } = company.office;
      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([lat, lng], 16);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noreferrer">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const pin = L.divIcon({
        className: "office-map-pin",
        html: '<span aria-hidden="true"></span>',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      L.marker([lat, lng], { icon: pin }).addTo(map);
      mapRef.current = map;

      requestAnimationFrame(() => map.invalidateSize());
      window.setTimeout(() => map.invalidateSize(), 200);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#dbe4ec] ring-1 ring-white/15",
        className,
      )}
      data-testid="office-map"
    >
      <div ref={containerRef} className="office-map absolute inset-0 z-0 h-full w-full" />
      <a
        href={company.office.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-x-3 bottom-3 z-[500] rounded-lg bg-navy/90 px-3 py-2 text-center text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-navy"
      >
        {openLabel}
      </a>
    </div>
  );
}
