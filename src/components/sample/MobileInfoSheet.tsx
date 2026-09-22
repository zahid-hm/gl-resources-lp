import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const DESKTOP_QUERY = "(min-width: 1024px)"; // matches Tailwind's lg: breakpoint

/* ════════════════════════════════════════════════════════════════════════════
   MobileInfoSheet — a native-style bottom sheet: dims the page, slides up
   from the bottom, and can be flicked back down (drag the sheet itself, not
   just the handle, past a distance/velocity threshold) the way an iOS/Android
   sheet dismisses. This is the "very interactive" mobile-app touch the flat
   scroll-jump tabs alone don't give you.

   Behaves like a real dialog: labelled, closable with Escape, and returns
   focus to the close button on open so keyboard/screen-reader users land
   somewhere sensible instead of the sheet opening silently underneath them.
   ════════════════════════════════════════════════════════════════════════════ */

// Reference-counted body scroll lock, shared across every sheet instance.
// Without this, the page behind a fixed-position sheet can still scroll on
// touch devices — on iOS Safari in particular, background scroll under a
// fixed overlay can make other fixed elements (like the bottom nav) repaint
// in the wrong stacking order mid-scroll. Counted rather than a plain
// boolean because two sheets can hand off in the same tick (the "Decide"
// sheet's CTA closes itself and opens the form sheet at once) — a naive
// set/unset would have the closing sheet's cleanup clobber the lock the
// opening sheet just took, depending on which mounted first.
let lockCount = 0;
let previousBodyOverflow = "";

function lockBodyScroll() {
  if (lockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lockCount++;
}

function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousBodyOverflow;
  }
}

interface MobileInfoSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function MobileInfoSheet({ open, onClose, title, children }: MobileInfoSheetProps) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  // Distinct from `open`: this sheet is CSS-hidden at lg+ (desktop keeps its
  // own inline content instead), but desktop-visible buttons still call the
  // same onOpenForm/setXOpen — a CTA in the hero, say. If we mounted the
  // lock/focus/Escape effects purely off `open`, clicking one of those on
  // desktop would lock page scroll with no visible sheet or close button to
  // undo it with. `shouldShow` only goes true once we've actually confirmed
  // we're below the breakpoint where the sheet renders.
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!open || window.matchMedia(DESKTOP_QUERY).matches) {
      setShouldShow(false);
      return;
    }
    setShouldShow(true);
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [open]);

  useEffect(() => {
    if (!shouldShow) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shouldShow, onClose]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <div className="lg:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : undefined}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />
          <motion.div
            initial={{ y: reduceMotion ? 0 : "100%" }}
            animate={{ y: 0 }}
            exit={{ y: reduceMotion ? 0 : "100%" }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", damping: 32, stiffness: 320 }}
            drag={reduceMotion ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl max-h-[80vh] overflow-y-auto overscroll-contain"
          >
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1.5 rounded-full bg-gray-200" />
            </div>
            <div className="flex items-center justify-between px-5 pb-4 pt-1">
              <h2 id={titleId} className="text-sub font-bold text-gray-900">{title}</h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{ touchAction: "manipulation" }}
                className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-5 pb-8">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
