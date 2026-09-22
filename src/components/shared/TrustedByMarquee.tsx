import React from "react";
import { AnimatedSection } from "./AnimatedSection";

export const trustedLogos = [
  { src: "/logos/b2b/Airtera.webp", alt: "Airtera" },
  { src: "/logos/b2b/Apiphany.webp", alt: "Apiphany" },
  { src: "/logos/b2b/Atlus.webp", alt: "Atlus" },
  { src: "/logos/b2b/BLDG.webp", alt: "BLDG" },
  { src: "/logos/b2b/Bossey.webp", alt: "Bossey" },
  { src: "/logos/b2b/CaptainJV.webp", alt: "Captain JV" },
  { src: "/logos/b2b/Finboa.webp", alt: "Finboa" },
  { src: "/logos/b2b/Flint.webp", alt: "Flint" },
  { src: "/logos/b2b/Force-Brands.webp", alt: "Force Brands" },
  { src: "/logos/b2b/Genesis.webp", alt: "Genesis" },
  { src: "/logos/b2b/Growth.webp", alt: "Growth" },
  { src: "/logos/b2b/Guideline.webp", alt: "Guideline" },
  { src: "/logos/b2b/Hostar.webp", alt: "Hostar" },
  { src: "/logos/b2b/HPBS.webp", alt: "HPBS" },
  { src: "/logos/b2b/HubSync.webp", alt: "HubSync" },
  { src: "/logos/b2b/Ixopay.webp", alt: "Ixopay" },
  { src: "/logos/b2b/Jama-Software.webp", alt: "Jama Software" },
  { src: "/logos/b2b/Kairoi.webp", alt: "Kairoi" },
  { src: "/logos/b2b/Legacy-Biome.webp", alt: "Legacy Biome" },
  { src: "/logos/b2b/Message-Gears.webp", alt: "Message Gears" },
  { src: "/logos/b2b/Meta-Integration.webp", alt: "Meta Integration" },
  { src: "/logos/b2b/Minga.webp", alt: "Minga" },
  { src: "/logos/b2b/Novel-Biome.webp", alt: "Novel Biome" },
  { src: "/logos/b2b/Oleria.webp", alt: "Oleria" },
  { src: "/logos/b2b/OTM.webp", alt: "OTM" },
  { src: "/logos/b2b/Paragon.webp", alt: "Paragon" },
  { src: "/logos/b2b/Sales.webp", alt: "Sales" },
  { src: "/logos/b2b/Stealth.webp", alt: "Stealth" },
  { src: "/logos/b2b/Three-Rings.webp", alt: "Three Rings" },
  { src: "/logos/b2b/Tiliter.webp", alt: "Tiliter" },
  { src: "/logos/b2b/TSIMAGINE.webp", alt: "TSIMAGINE" },
  { src: "/logos/b2b/Usherwood.webp", alt: "Usherwood" },
  { src: "/logos/b2b/Vortex.webp", alt: "Vortex" },
  { src: "/logos/b2b/Weinberg-Gonser-LLP.webp", alt: "Weinberg Gonser LLP" },
  { src: "/logos/b2b/ZAM.webp", alt: "ZAM" },
  { src: "/logos/b2b/Zoomer.webp", alt: "Zoomer" },
];

// Single dark-background marquee row, for hero sections with a dark gradient
// backdrop (as opposed to TrustedByMarquee's two-row light-background version).
export function TrustLogosRow() {
  return (
    <div className="relative w-full mt-6 overflow-x-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#061512] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#061512] to-transparent z-10 pointer-events-none" />
      <div className="flex items-center w-max animate-marquee-left will-change-transform">
        {[...trustedLogos, ...trustedLogos].map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={`${logo.alt} company logo`}
            width={140}
            height={48}
            loading="lazy"
            decoding="async"
            className="flex-shrink-0 mx-3 h-10 sm:h-12 w-auto object-contain rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}

export function TrustedByMarquee() {
  const halfLength = Math.ceil(trustedLogos.length / 2);
  const firstRow = trustedLogos.slice(0, halfLength);
  const secondRow = trustedLogos.slice(halfLength);

  return (
    <section className="py-10 sm:py-14 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8">
          <p className="text-caption text-gray-400 tracking-wider">
            Trusted by 40+ B2B companies generating $50M+ in revenue
          </p>
        </AnimatedSection>
      </div>

      <div className="relative w-full overflow-x-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee-left will-change-transform">
          {[...firstRow, ...firstRow].map((logo, i) => (
            <div
              key={`row1-${logo.alt}-${i}`}
              className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center h-14 sm:h-16 w-[140px]"
            >
              <img
                src={logo.src}
                alt={`${logo.alt} company logo`}
                width={140}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-10 sm:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-x-hidden mt-6">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee-right will-change-transform">
          {[...secondRow, ...secondRow].map((logo, i) => (
            <div
              key={`row2-${logo.alt}-${i}`}
              className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center h-14 sm:h-16 w-[140px]"
            >
              <img
                src={logo.src}
                alt={`${logo.alt} company logo`}
                width={140}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-10 sm:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
