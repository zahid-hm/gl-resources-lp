import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════════
   MobileAppNav — a fixed bottom tab bar that reads like a native mobile app.
   Mobile/tablet only (hidden lg+). Flat bar, no raised FAB.

   Bright/white, not dark — this site's own content (the hero, the "get
   started" section) is itself near-black, so a dark bar had almost no
   visible seam against it. White + a crisp shadow reads as a distinct UI
   layer regardless of what's scrolled underneath, light or dark, the same
   way most native app tab bars stay light-chrome even over dark content.

   Each tab is either:
   - a scroll target (`id` set) — the bar scroll-spies it and highlights it
     automatically as the page scrolls past, tapping it scrolls there; or
   - a pure action (`onClick`, no `id`) — e.g. "opens the lead-form sheet" or
     "opens the process sheet" — highlighted via the caller-controlled
     `active` flag instead of scroll position.

   `emphasized` gives a tab the filled icon-badge treatment for the primary
   conversion action, without raising it off the bar.
   ════════════════════════════════════════════════════════════════════════════ */

export interface MobileNavTab {
  label: string;
  icon: LucideIcon;
  id?: string;
  onClick?: () => void;
  emphasized?: boolean;
  active?: boolean;
}

interface MobileAppNavProps {
  tabs: MobileNavTab[];
}

export function MobileAppNav({ tabs }: MobileAppNavProps) {
  const scrollTabIds = tabs.filter((t) => t.id).map((t) => t.id as string);
  // Starts unset rather than defaulting to the first scroll tab — otherwise
  // it reads as "active" before the observer ever confirms that section is
  // actually in view (e.g. sitting at the very top of the hero).
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const targets = scrollTabIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTabIds.join(",")]);

  const onTap = (tab: MobileNavTab) => {
    if (tab.id) {
      document.getElementById(tab.id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      setActiveId(tab.id);
    }
    tab.onClick?.();
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)] bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-6px_24px_rgba(0,0,0,0.12)]">
      <div className="flex items-stretch h-16 max-w-md mx-auto px-1">
        {tabs.map((tab, i) => (
          <NavTabButton
            key={tab.id ?? `${tab.label}-${i}`}
            tab={tab}
            isActive={tab.id ? activeId === tab.id : !!tab.active}
            reduceMotion={!!reduceMotion}
            onTap={() => onTap(tab)}
          />
        ))}
      </div>
    </div>
  );
}

function NavTabButton({
  tab,
  isActive,
  reduceMotion,
  onTap,
}: {
  tab: MobileNavTab;
  isActive: boolean;
  reduceMotion: boolean;
  onTap: () => void;
}) {
  const Icon = tab.icon;

  if (tab.emphasized) {
    return (
      <motion.button
        type="button"
        onClick={onTap}
        whileTap={reduceMotion ? undefined : { scale: 0.9 }}
        style={{ touchAction: "manipulation" }}
        aria-label={tab.label}
        aria-current={isActive ? "true" : undefined}
        className="relative flex-1 flex flex-col items-center justify-center gap-1 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-600 focus-visible:ring-inset rounded-lg"
      >
        <span className="relative flex items-center justify-center w-9 h-5">
          {/* Attention ping — a soft ring radiating out from the badge and
              fading, on a pause-then-repeat cycle. Stops once the sheet this
              tab opens is actually showing; no point nagging someone who's
              already looking at it. */}
          {!isActive && !reduceMotion && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-spark-500"
              animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
              transition={{ duration: 0.45, repeat: Infinity, repeatDelay: 0.15, ease: "easeOut" }}
            />
          )}
          <span
            className={`relative flex items-center justify-center w-9 h-5 rounded-full transition-colors ${
              isActive ? "bg-white text-spark-700 ring-2 ring-spark-600" : "bg-spark-600 text-white"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
        </span>
        <span className={`text-[10px] font-semibold leading-none truncate ${isActive ? "text-spark-700" : "text-gray-700"}`}>
          {tab.label}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onTap}
      whileTap={reduceMotion ? undefined : { scale: 0.88 }}
      style={{ touchAction: "manipulation" }}
      className="relative flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-600 focus-visible:ring-inset rounded-lg"
      aria-label={tab.label}
      aria-current={isActive ? "true" : undefined}
    >
      <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-spark-700" : "text-gray-400"}`} />
      <span className={`text-[10px] font-medium leading-none transition-colors truncate ${isActive ? "text-spark-700" : "text-gray-400"}`}>
        {tab.label}
      </span>
      {isActive && (
        <motion.span
          layoutId="mobile-app-nav-indicator"
          className="absolute top-0 w-8 h-0.5 rounded-full bg-spark-600"
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
    </motion.button>
  );
}
