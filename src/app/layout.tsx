import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: true,
});

// Every page renders its own <title>/<meta name="description"> through
// PageShell. Declaring them here as well put a second, generic <title> ahead of
// the page-specific one in <head> — and the first one is what the browser and
// crawlers use, so all 60+ landing pages were reporting the same title.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  icons: {
    icon: "/favicon.webp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#51B027",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Scroll-reveal blocks start at opacity:0 and are revealed by an
            IntersectionObserver. Without JS they would never appear, so make
            them unconditionally visible in that case. */}
        <noscript>
          <style>{`.gl-scroll-reveal,.gl-stagger>.gl-stagger-item{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
