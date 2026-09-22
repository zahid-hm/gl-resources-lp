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
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_SITE_URL ?? "https://getlevrg.com");

  // 3. Fallback image if a specific page doesn't have a hero image
  const defaultOgImage = "/images/hero/video-hero.webp";

  // 4. Combine the base domain with the image path to create an absolute URL
  const absoluteOgImageUrl = `${siteUrl}${meta?.ogImage ?? defaultOgImage}`;

  const canonicalUrl = `${siteUrl}${pathname}`;

  return (
    <div className="min-h-screen flex flex-col">
      {meta && (
        <>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          {meta.keywords && <meta name="keywords" content={meta.keywords} />}
          <link rel="canonical" href={canonicalUrl} />
          <meta name="robots" content={meta.noindex ? "noindex, nofollow" : "index, follow"} />
          <meta property="og:title" content={meta.ogTitle ?? meta.title} />
          <meta property="og:description" content={meta.ogDescription ?? meta.description} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Get Levrg" />
          <meta property="og:url" content={canonicalUrl} />
          {/* 5. Inject the dynamic absolute URL here */}
          <meta property="og:image" content={absoluteOgImageUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.ogTitle ?? meta.title} />
          <meta name="twitter:description" content={meta.ogDescription ?? meta.description} />
          <meta name="twitter:image" content={absoluteOgImageUrl} />
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
