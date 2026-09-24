/**
 * `scripts/optimize-images.mjs` writes a narrow `-sm` companion next to every
 * hero and work-sample image. These helpers build the matching `srcset` so the
 * browser can pick the small file on phones instead of downloading a
 * desktop-sized photo to render it in a 180px grid cell.
 */

/** Work-sample images: 640w companion, 1200w primary. */
export function workSampleSrcSet(src: string): string {
  if (!src.endsWith(".webp")) return "";
  return `${src.replace(/\.webp$/, "-sm.webp")} 640w, ${src} 1200w`;
}

/** Bento/grid cells are roughly half the viewport on phones, a third on desktop. */
export const WORK_SAMPLE_SIZES = "(max-width: 768px) 50vw, 33vw";
