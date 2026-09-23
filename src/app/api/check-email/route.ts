import { NextResponse } from "next/server";
import disposableDomainsList from "disposable-email-domains";
import { SUSPICIOUS_KEYWORDS, SUSPICIOUS_TLDS } from "@/lib/constants";

// Checks whether an email's domain can actually receive mail (has an MX
// record) and whether it's a known disposable/throwaway provider. Doesn't
// confirm the specific mailbox exists — that would need SMTP verification or
// a paid API — just rules out typo'd/made-up domains ("gmial.com") and
// deliberate throwaways (mailinator.com) for free. Ported 1:1 from
// form-field-validator/api/check-email.js.

const disposableDomains = new Set(disposableDomainsList);

function looksSuspicious(domain: string): boolean {
  const lower = domain.toLowerCase();
  if (SUSPICIOUS_TLDS.some((tld) => lower.endsWith(tld))) return true;
  return SUSPICIOUS_KEYWORDS.some((kw) => lower.includes(kw));
}

const DOH_ENDPOINT = process.env.DOH_ENDPOINT ?? "https://cloudflare-dns.com/dns-query";

async function hasMxRecord(domain: string): Promise<boolean | null> {
  const url = new URL(DOH_ENDPOINT);
  url.searchParams.set("name", domain);
  url.searchParams.set("type", "MX");

  const res = await fetch(url.toString(), { headers: { Accept: "application/dns-json" } });
  if (!res.ok) return null; // lookup itself failed — don't penalize the visitor for that
  const data = await res.json();
  // Status 0 = NOERROR. A domain with no MX but a valid A record can still
  // receive mail via an implicit MX (RFC 5321 fallback), but that's rare in
  // practice and not worth the extra round trip here.
  return Array.isArray(data.Answer) && data.Answer.length > 0;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = (searchParams.get("email") || "").trim().toLowerCase();
  const domain = email.split("@")[1];
  if (!domain) {
    return NextResponse.json({ error: "missing or invalid email" }, { status: 400 });
  }

  const disposable = disposableDomains.has(domain);
  const suspicious = looksSuspicious(domain);

  try {
    const hasMx = await hasMxRecord(domain);
    // A domain's mail setup doesn't change minute to minute; safe to cache
    // across visitors, unlike the per-IP geolocation endpoint.
    return NextResponse.json(
      { domain, hasMx, disposable, suspicious },
      { headers: { "Cache-Control": "public, max-age=3600" } }
    );
  } catch {
    return NextResponse.json({ error: "domain lookup failed" }, { status: 502 });
  }
}
