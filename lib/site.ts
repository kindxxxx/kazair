const PRODUCTION_SITE_URL = "https://kazaircomp.kz";

function stripTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return stripTrailingSlash(fromEnv);

  if (process.env.VERCEL_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return stripTrailingSlash(`https://${vercelUrl}`);

  return "http://localhost:3000";
}

export function getAllowedOrigins() {
  const origins = new Set<string>([
    getSiteUrl(),
    PRODUCTION_SITE_URL,
    "https://www.kazaircomp.kz",
  ]);

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) origins.add(`https://${vercelUrl}`);

  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }

  return [...origins];
}

export function toAbsoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
