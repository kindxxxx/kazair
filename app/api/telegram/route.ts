import { NextResponse } from "next/server";
import { isRateLimited, sendTelegramMessage, buildTelegramMessage } from "@/lib/telegram";
import { parseLeadPayload } from "@/lib/validation";
import { isAllowedRequestOrigin } from "@/lib/origin";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8_000;

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function json(status: number, body: { ok: boolean; error?: string }) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function GET() {
  return json(405, { ok: false, error: "Метод не поддерживается" });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (!isAllowedRequestOrigin(request)) {
    console.warn("lead_origin_rejected", { ip });
    return json(403, { ok: false, error: "Запрос отклонён" });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json(415, { ok: false, error: "Некорректный запрос" });
  }

  if (isRateLimited(ip)) {
    console.warn("lead_rate_limited", { ip });
    return json(429, { ok: false, error: "Слишком много заявок. Попробуйте позже." });
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json(400, { ok: false, error: "Пустой запрос" });
  }

  if (!raw || raw.length > MAX_BODY_BYTES) {
    return json(raw ? 413 : 400, { ok: false, error: "Пустой запрос" });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "Пустой запрос" });
  }

  const parsed = parseLeadPayload(body);
  if (!parsed.ok) {
    if (parsed.silent) {
      console.warn("lead_honeypot", { ip });
      return json(200, { ok: true });
    }
    return json(400, { ok: false, error: parsed.error });
  }

  try {
    await sendTelegramMessage(buildTelegramMessage(parsed.data));
    return json(200, { ok: true });
  } catch {
    return json(502, {
      ok: false,
      error: "Не удалось отправить заявку. Позвоните +7 (701) 713-14-97 или напишите в WhatsApp.",
    });
  }
}
