import { NextResponse } from "next/server";
import { UNRESOLVED_CODES } from "@/lib/constants";

// Proxies ipgeolocation.io so the API key never reaches the browser. Returns
// only what the widget/PhoneField needs: an ISO alpha-2 country code for the
// visitor. Ported 1:1 from form-field-validator/api/geolocate.js.
//
// Required env var: IPGEO_API_KEY (get one at https://app.ipgeolocation.io/)

const IPGEO_ENDPOINT = process.env.IPGEO_ENDPOINT ?? "https://api.ipgeolocation.io/ipgeo";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "";
}

export async function GET(request: Request) {
  const apiKey = process.env.IPGEO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "IPGEO_API_KEY is not configured" }, { status: 500 });
  }

  const ip = clientIp(request);
  const isPrivateIp = !ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("10.") || ip.startsWith("192.168.");

  const url = new URL(IPGEO_ENDPOINT);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("fields", "country_code2");
  // Only forward a real public IP; on localhost/dev let the API infer from
  // the request itself (usually resolves to the server's own egress IP).
  if (ip && !isPrivateIp) url.searchParams.set("ip", ip);

  try {
    const upstream = await fetch(url.toString());
    if (!upstream.ok) {
      return NextResponse.json({ error: `upstream status ${upstream.status}` }, { status: 502 });
    }
    const data = await upstream.json();
    const code = (data.country_code2 || "").toUpperCase();
    const countryCode = code && !UNRESOLVED_CODES.has(code) ? code : null;

    // Never cache: the visitor's IP (and therefore country) can change
    // between page loads — VPN toggled, switched networks, etc.
    return NextResponse.json({ countryCode }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "geolocation lookup failed" }, { status: 502 });
  }
}
