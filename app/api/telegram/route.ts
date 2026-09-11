import { NextResponse } from "next/server";
import { isRateLimited, sendTelegramMessage, buildTelegramMessage } from "@/lib/telegram";
import { parseLeadPayload } from "@/lib/validation";

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок. Попробуйте позже." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Пустой запрос" }, { status: 400 });
  }

  const parsed = parseLeadPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  try {
    await sendTelegramMessage(buildTelegramMessage(parsed.data));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Не удалось отправить заявку. Позвоните +7 (727) 338-49-89 или напишите в WhatsApp.",
      },
      { status: 502 },
    );
  }
}
