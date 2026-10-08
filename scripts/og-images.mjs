import sharp from "sharp";
import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { join, basename, extname } from "path";

// npm run og-images
//
// Social crawlers are pickier than browsers: LinkedIn and some Facebook/Slack
// unfurlers don't render WebP og:images, and all of them crop to 1.91:1. So
// every hero gets a 1200×630 JPEG twin in public/images/og/, which PageShell
// points og:image at (see ogImageFor). Also writes the 180×180 PNG iOS uses
// for home-screen bookmarks, since it ignores WebP favicons.

const HERO_DIR = "public/images/hero";
const OG_DIR = "public/images/og";
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

async function writeOgImages() {
  await mkdir(OG_DIR, { recursive: true });
  const files = (await readdir(HERO_DIR)).filter((f) => extname(f) === ".webp" && !f.endsWith("-sm.webp"));
  for (const file of files) {
    // Windows keeps a handle on files sharp reads from disk; go through a buffer.
    const input = await readFile(join(HERO_DIR, file));
    const out = await sharp(input)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "centre" })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toBuffer();
    const dest = `${basename(file, ".webp")}.jpg`;
    await writeFile(join(OG_DIR, dest), out);
    console.log(`og/${dest}  ${kb(out.length)}`);
  }
}

async function writeAppleTouchIcon() {
  const icon = await sharp(await readFile("public/favicon.webp"))
    .resize(132, 132, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();
  const out = await sharp({ create: { width: 180, height: 180, channels: 3, background: "#ffffff" } })
    .composite([{ input: icon, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile("public/apple-touch-icon.png", out);
  console.log(`apple-touch-icon.png  ${kb(out.length)}`);
}

await writeOgImages();
await writeAppleTouchIcon();
console.log("Done.");
