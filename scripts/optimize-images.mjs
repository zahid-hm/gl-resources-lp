import sharp from "sharp";
import { readdir, stat, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { join, basename, extname } from "path";

const FMT_DIR = "public/images/fmt";
const HERO_DIR = "public/images/hero";
const WORK_DIR = "public/images/work-samples";
const CLIENT_DIR = "public/images/client";

// Display size for ICP cards: 662×369 (1x), 1324×738 (2x)
const CARD_SIZES = [
  { suffix: "", width: 662, height: 369 },
  { suffix: "@2x", width: 1324, height: 738 },
];

/**
 * Heroes are full-bleed background photos sitting under a near-opaque dark
 * gradient, so they tolerate aggressive compression. They are also the LCP
 * resource on every landing page, which makes their weight the single biggest
 * lever on mobile Lighthouse scores.
 *
 * Each source produces a capped-width primary file plus a narrower `-sm`
 * variant that phones pick up through `srcset`.
 */
const HERO_WIDTH = 1600;
const HERO_SM_WIDTH = 800;
const HERO_QUALITY = 62;

const WORK_WIDTH = 1200;
const WORK_SM_WIDTH = 640;
const WORK_QUALITY = 68;

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

async function convertFmtImages() {
  if (!existsSync(FMT_DIR)) return;
  const files = await readdir(FMT_DIR);
  const pngs = files.filter((f) => extname(f) === ".png");

  for (const file of pngs) {
    const src = join(FMT_DIR, file);
    const name = basename(file, ".png");

    for (const { suffix, width, height } of CARD_SIZES) {
      const dest = join(FMT_DIR, `${name}${suffix}.webp`);
      await sharp(src)
        .resize(width, height, { fit: "cover", position: "top" })
        .webp({ quality: 82 })
        .toFile(dest);

      const { size: before } = await stat(src);
      const { size: after } = await stat(dest);
      console.log(`${file} → ${name}${suffix}.webp  ${kb(before)} → ${kb(after)}`);
    }
  }
}

/**
 * Recompresses every .webp in `dir` in place (capped at `width`) and writes a
 * `-sm` companion at `smWidth`. Skips files that are already at or below the
 * target so the script stays idempotent.
 */
async function recompress(dir, { width, smWidth, quality, label }) {
  if (!existsSync(dir)) return;
  const files = (await readdir(dir)).filter(
    (f) => extname(f) === ".webp" && !f.endsWith("-sm.webp")
  );

  let saved = 0;
  for (const file of files) {
    const src = join(dir, file);
    const { size: before } = await stat(src);

    // Windows keeps a handle on files sharp reads from disk, so round-trip
    // through buffers rather than writing a temp file beside the original.
    const input = await readFile(src);
    const meta = await sharp(input).metadata();
    const primary = await sharp(input)
      .resize({ width: Math.min(width, meta.width ?? width), withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    if (primary.length < before) {
      await writeFile(src, primary);
      saved += before - primary.length;
      console.log(`${label}/${file}  ${kb(before)} → ${kb(primary.length)}`);
    } else {
      console.log(`${label}/${file}  already optimal at ${kb(before)}, skipped`);
    }

    const small = await sharp(input)
      .resize({ width: Math.min(smWidth, meta.width ?? smWidth), withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();
    await writeFile(join(dir, `${basename(file, ".webp")}-sm.webp`), small);
  }
  console.log(`${label}: saved ${kb(saved)} total across ${files.length} files\n`);
}

/** Avatars render at 36–48px; anything larger is wasted bytes. */
async function shrinkClientAvatars() {
  if (!existsSync(CLIENT_DIR)) return;
  const files = (await readdir(CLIENT_DIR)).filter((f) => extname(f) === ".webp");
  for (const file of files) {
    const src = join(CLIENT_DIR, file);
    const { size: before } = await stat(src);
    const input = await readFile(src);
    const meta = await sharp(input).metadata();
    if ((meta.width ?? 0) <= 192) {
      console.log(`client/${file}  already ${meta.width}px, skipped`);
      continue;
    }
    const out = await sharp(input)
      .resize({ width: 192, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    if (out.length < before) {
      await writeFile(src, out);
      console.log(`client/${file}  ${kb(before)} → ${kb(out.length)}`);
    }
  }
}

await convertFmtImages();
await recompress(HERO_DIR, {
  width: HERO_WIDTH,
  smWidth: HERO_SM_WIDTH,
  quality: HERO_QUALITY,
  label: "hero",
});
await recompress(WORK_DIR, {
  width: WORK_WIDTH,
  smWidth: WORK_SM_WIDTH,
  quality: WORK_QUALITY,
  label: "work-samples",
});
await shrinkClientAvatars();
console.log("Done.");
