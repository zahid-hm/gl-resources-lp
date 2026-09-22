import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Info } from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════════
   MobileAppTopBar — compact, translucent-over-content status/app bar, the
   mobile-app counterpart to the bottom tab bar. Starts fully transparent
   (so it reads as part of the hero, like an iOS nav bar over a large-title
   screen) and solidifies once the page scrolls, exactly like a native app
   chrome bar reacting to content underneath it.

   The logo is always centered — `onOpenInfo` is optional; when omitted
   (its trigger has moved into the bottom nav instead) the bar is just the
   centered wordmark, no floating button to balance against.
   ════════════════════════════════════════════════════════════════════════════ */

interface MobileAppTopBarProps {
  onOpenInfo?: () => void;
}

export function MobileAppTopBar({ onOpenInfo }: MobileAppTopBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-xl border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="relative flex items-center justify-center h-12 px-4">
        <img
          src={scrolled ? "/logo.webp" : "/Light Logo.webp"}
          alt="Get Levrg"
          width={96}
          height={22}
          decoding="async"
          className="h-5 w-auto"
        />
        {onOpenInfo && (
          <motion.button
            type="button"
            onClick={onOpenInfo}
            whileTap={reduceMotion ? undefined : { scale: 0.85 }}
            aria-label="Quick facts"
            style={{ touchAction: "manipulation" }}
            className={`absolute right-4 w-11 h-11 rounded-full flex items-center justify-center border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              scrolled
                ? "border-gray-200 text-gray-600 bg-white focus-visible:ring-spark-600"
                : "border-white/25 text-white bg-white/10 backdrop-blur-sm focus-visible:ring-white focus-visible:ring-offset-0"
            }`}
          >
            <Info className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
