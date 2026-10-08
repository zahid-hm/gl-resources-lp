"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface NavItem {
  label: string;
  href: string;
}

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string; // 👈 1. Added optional ogImage prop
  noindex?: boolean;
  /** Path of the page this one duplicates (an A/B variant pointing at its
   *  original), so search engines index one URL instead of splitting rank. */
  canonicalPath?: string;
}

const SITE_NAME = "Get Levrg";

/** Hero images are WebP, which LinkedIn and some unfurlers won't render.
 *  `npm run og-images` writes a 1200×630 JPEG twin for each one. */
function ogImageFor(src: string): string {
  const m = src.match(/^\/images\/hero\/(.+)\.webp$/);
  return m ? `/images/og/${m[1]}.jpg` : src;
}

function structuredData(url: string, siteUrl: string, title: string, description: string, image: string) {
  const org = `${siteUrl}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: SITE_NAME,
        url: siteUrl,
        logo: `${siteUrl}/logo.webp`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_NAME,
        publisher: { "@id": org },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${url}#service` },
        primaryImageOfPage: { "@type": "ImageObject", url: image },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: title.replace(/\s*\|\s*Get Levrg.*$/, ""),
        description,
        url,
        image,
        provider: { "@id": org },
        areaServed: ["US", "CA"],
      },
    ],
  };
}

interface PageShellProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  ctaText?: string;
  ctaTarget?: string;
  centerLogo?: boolean;
  hideCta?: boolean;
  dynamicCta?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  meta?: PageMetaProps;
}

export function PageShell({
  children,
  navItems,
  ctaText,
  ctaTarget,
  centerLogo,
  hideCta,
  dynamicCta,
  showHeader = true,
  showFooter = true,
  meta,
}: PageShellProps) {
  const pathname = usePathname();

  // 2. Resolve the base URL from wherever the page is actually being served
  // (production domain, localhost, ...). window is undefined during Next.js's
  // server render, so fall back to the configured public site URL there.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  // 3. Fallback image if a specific page doesn't have a hero image
  const defaultOgImage = "/images/hero/video-hero.webp";

  // 4. Combine the base domain with the image path to create an absolute URL
  const absoluteOgImageUrl = `${siteUrl}${ogImageFor(meta?.ogImage ?? defaultOgImage)}`;

  const canonicalUrl = `${siteUrl}${meta?.canonicalPath ?? pathname}`;
  const ogTitle = meta?.ogTitle ?? meta?.title;
  const ogDescription = meta?.ogDescription ?? meta?.description;

  return (
    <div className="min-h-screen flex flex-col">
      {meta && (
        <>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          {meta.keywords && <meta name="keywords" content={meta.keywords} />}
          <link rel="canonical" href={canonicalUrl} />
          <meta name="robots" content={meta.noindex ? "noindex, nofollow" : "index, follow"} />
          <meta property="og:title" content={ogTitle} />
          <meta property="og:description" content={ogDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:url" content={canonicalUrl} />
          {/* 5. Inject the dynamic absolute URL here */}
          <meta property="og:image" content={absoluteOgImageUrl} />
          {absoluteOgImageUrl.endsWith(".jpg") && (
            <>
              <meta property="og:image:type" content="image/jpeg" />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />
            </>
          )}
          <meta property="og:image:alt" content={ogTitle} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={ogTitle} />
          <meta name="twitter:description" content={ogDescription} />
          <meta name="twitter:image" content={absoluteOgImageUrl} />
          <meta name="twitter:image:alt" content={ogTitle} />
          {!meta.noindex && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData(canonicalUrl, siteUrl, meta.title, meta.description, absoluteOgImageUrl)),
              }}
            />
          )}
        </>
      )}
      {showHeader && (
        <Header navItems={navItems} ctaText={ctaText} ctaTarget={ctaTarget} centerLogo={centerLogo} hideCta={hideCta} dynamicCta={dynamicCta} />
      )}
      <main className={`flex-1 ${showHeader ? "pt-16 sm:pt-20" : ""}`}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
