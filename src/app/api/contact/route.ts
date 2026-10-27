import { Resend } from "resend";
import { profile } from "@/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort rate limit (per server instance): 5 messages per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Invalid request." }, { status: 400 });

  // Honeypot filled in: pretend it worked so bots don't retry.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const name = str(body.name, 100);
  const email = str(body.email, 200);
  const message = str(body.message, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return Response.json(
      { error: "Add your name, a valid email and a message of at least 10 characters." },
      { status: 400 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many messages. Try again in a few minutes." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("contact: RESEND_API_KEY is not set");
    return Response.json({ error: "The form isn't set up yet." }, { status: 503 });
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: "Portfolio contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL || profile.email,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("contact: resend error", error);
    return Response.json({ error: "Couldn't send your message." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
