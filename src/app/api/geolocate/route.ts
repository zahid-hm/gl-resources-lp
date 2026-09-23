import { NextResponse } from "next/server";

// Proxies ipwho.is so the lookup happens server-side. Returns only what the
// widget/PhoneField needs: an ISO alpha-2 country code for the visitor.
// Ported 1:1 from form-field-validator/api/geolocate.js (originally against
// ipgeolocation.io; ipwho.is needs no API key).

const IPWHOIS_ENDPOINT = process.env.IPWHOIS_ENDPOINT ?? "https://ipwho.is";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "";
}

export async function GET(request: Request) {
  const ip = clientIp(request);
  const isPrivateIp = !ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("10.") || ip.startsWith("192.168.");

  // Only forward a real public IP; on localhost/dev let the API infer from
  // the request itself (usually resolves to the server's own egress IP).
  const url = new URL(ip && !isPrivateIp ? `/${ip}` : "/", IPWHOIS_ENDPOINT);
  url.searchParams.set("fields", "success,country_code");

  try {
    const upstream = await fetch(url.toString());
    if (!upstream.ok) {
      return NextResponse.json({ error: `upstream status ${upstream.status}` }, { status: 502 });
    }
    const data = await upstream.json();
    // ipwho.is sets success:false (with no country_code) for requests it
    // can't resolve to a real country.
    const countryCode = data.success && data.country_code ? String(data.country_code).toUpperCase() : null;

    // Never cache: the visitor's IP (and therefore country) can change
    // between page loads — VPN toggled, switched networks, etc.
    return NextResponse.json({ countryCode }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "geolocation lookup failed" }, { status: 502 });
  }
}
