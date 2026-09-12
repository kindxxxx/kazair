import { getAllowedOrigins } from "./site";

export function isAllowedRequestOrigin(request: Request) {
  const allowed = getAllowedOrigins();
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin) {
    return allowed.includes(origin);
  }

  if (referer) {
    return allowed.some((item) => referer === item || referer.startsWith(`${item}/`));
  }

  return process.env.NODE_ENV !== "production";
}
