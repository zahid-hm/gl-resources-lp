import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, basename, extname } from "path";

const FMT_DIR = "public/images/fmt";
const HERO_DIR = "public/images/hero";

// Display size for ICP cards: 662×369 (1x), 1324×738 (2x)
const CARD_SIZES = [
  { suffix: "", width: 662, height: 369 },
  { suffix: "@2x", width: 1324, height: 738 },
];

async function convertFmtImages() {
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
      console.log(
        `${file} → ${name}${suffix}.webp  ${kb(before)} → ${kb(after)}`
      );
    }
  }
}

async function recompressHeroImages() {
  const files = await readdir(HERO_DIR);
  const webps = files.filter((f) => extname(f) === ".webp");

  for (const file of webps) {
    const src = join(HERO_DIR, file);
    const tmp = src + ".tmp";

    const { size: before } = await stat(src);
    await sharp(src).webp({ quality: 75 }).toFile(tmp);
    const { size: after } = await stat(tmp);

    // Only keep the recompressed version if it's actually smaller
    const { copyFile, unlink } = await import("fs/promises");
    if (after < before) {
      await copyFile(tmp, src);
      await unlink(tmp);
      console.log(`${file}  ${kb(before)} → ${kb(after)}  (saved)`);
    } else {
      await unlink(tmp);
      console.log(`${file}  already optimal at ${kb(before)}, skipped`);
    }
  }
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

await convertFmtImages();
await recompressHeroImages();
console.log("Done.");
