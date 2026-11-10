import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/contact-validation";

export const runtime = "nodejs";

type DeliveryRecord = { hash: string; createdAt: number; promise: Promise<boolean> };
const recentSubmissions = new Map<string, DeliveryRecord>();
const recentEmailAttempts = new Map<string, number[]>();
const duplicateWindowMs = 30 * 60 * 1000;
const emailLimitWindowMs = 10 * 60 * 1000;
const maxAttemptsPerEmail = 5;
const maxTrackedEntries = 5_000;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) return NextResponse.json({ ok: false, message: "The inquiry is too large. Shorten the project description and try again." }, { status: 413 });
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing request body");
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > 12_000) {
        await reader.cancel();
        return NextResponse.json({ ok: false, message: "The inquiry is too large. Shorten the project description and try again." }, { status: 413 });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    body = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return NextResponse.json({ ok: false, message: "The request could not be read. Please check the form and try again." }, { status: 400 });
  }

  const record = body && typeof body === "object" && !Array.isArray(body) ? body as Record<string, unknown> : {};
  const validation = validateInquiry(body);
  if (!validation.data) return NextResponse.json({ ok: false, message: "Please review the inquiry details.", errors: validation.errors }, { status: 400 });
  if (validation.data.websiteConfirm) return NextResponse.json({ ok: false, message: "The inquiry could not be accepted." }, { status: 400 });

  const submissionId = typeof record.submissionId === "string" ? record.submissionId : "";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) {
    return NextResponse.json({ ok: false, message: "Your form session expired. Please submit the form again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    return NextResponse.json({ ok: false, message: "The inquiry form is not available yet. Please try again later." }, { status: 503 });
  }

  const data = validation.data;
  const hash = createHash("sha256").update(JSON.stringify(data)).digest("hex");
  const now = Date.now();
  for (const [key, existing] of recentSubmissions) if (now - existing.createdAt > duplicateWindowMs) recentSubmissions.delete(key);
  const existing = recentSubmissions.get(submissionId);
  if (existing) {
    if (existing.hash !== hash) return NextResponse.json({ ok: false, message: "This inquiry has already been submitted. Refresh the page to start a new one." }, { status: 409 });
    const delivered = await existing.promise;
    return delivered
      ? NextResponse.json({ ok: true, duplicate: true })
      : NextResponse.json({ ok: false, message: "We couldn't deliver your inquiry. Please try again shortly." }, { status: 502 });
  }

  while (recentSubmissions.size >= maxTrackedEntries) {
    const oldestId = recentSubmissions.keys().next().value;
    if (!oldestId) break;
    recentSubmissions.delete(oldestId);
  }
  const normalizedEmail = data.email.toLowerCase();
  const cutoff = Date.now() - emailLimitWindowMs;
  for (const [email, timestamps] of recentEmailAttempts) {
    const recent = timestamps.filter((timestamp) => timestamp > cutoff);
    if (recent.length) recentEmailAttempts.set(email, recent);
    else recentEmailAttempts.delete(email);
  }
  while (recentEmailAttempts.size >= maxTrackedEntries) {
    const oldestEmail = recentEmailAttempts.keys().next().value;
    if (!oldestEmail) break;
    recentEmailAttempts.delete(oldestEmail);
  }
  const emailAttempts = recentEmailAttempts.get(normalizedEmail) || [];
  if (emailAttempts.length >= maxAttemptsPerEmail) {
    return NextResponse.json({ ok: false, message: "Too many inquiries were sent from this email recently. Please try again in a few minutes." }, { status: 429 });
  }
  emailAttempts.push(Date.now());
  recentEmailAttempts.set(normalizedEmail, emailAttempts);

  const promise = deliverInquiry({ apiKey, from, to, data });
  recentSubmissions.set(submissionId, { hash, createdAt: now, promise });
  const delivered = await promise;
  if (!delivered) {
    recentSubmissions.delete(submissionId);
    return NextResponse.json({ ok: false, message: "We couldn't deliver your inquiry. Please try again shortly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}

async function deliverInquiry({ apiKey, from, to, data }: { apiKey: string; from: string; to: string; data: NonNullable<ReturnType<typeof validateInquiry>["data"]> }) {
  const text = [
    `New Trio Digitals project inquiry from ${data.fullName}`,
    `Business email: ${data.email}`,
    `Company or brand: ${data.company}`,
    `Website or social link: ${data.website || "Not supplied"}`,
    `Services needed: ${data.services.join(", ")}`,
    `Budget: ${data.budget || "Not supplied"}`,
    `Timeline: ${data.timeline || "Not supplied"}`,
    "",
    "Project description:",
    data.description,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `Project inquiry: ${data.company}`, text }),
      signal: AbortSignal.timeout(12_000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
