#!/usr/bin/env node
// Writes <page>.html.br (quality 11) and <page>.html.gz next to every page in
// generated-html/ (or $HTML_DIR). Run once while building the stage image so
// serve.mjs ships the smallest encoding without spending ~2 s per page on
// startup. Local runs don't need it: serve.mjs compresses on demand instead.
//
// Async zlib runs on the libuv threadpool, so pages compress in parallel —
// raise UV_THREADPOOL_SIZE (default 4) to use more cores.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { brotliCompress, gzip, constants as zlib } from "node:zlib";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const HTML_DIR = resolve(process.env.HTML_DIR ?? join(ROOT, "generated-html"));
const brotli = promisify(brotliCompress);
const gz = promisify(gzip);

const files = (await readdir(HTML_DIR)).filter((f) => f.endsWith(".html"));
const sizes = await Promise.all(
  files.map(async (file) => {
    const body = await readFile(join(HTML_DIR, file));
    const [br, gzipped] = await Promise.all([
      brotli(body, { params: { [zlib.BROTLI_PARAM_QUALITY]: 11, [zlib.BROTLI_PARAM_SIZE_HINT]: body.length } }),
      gz(body, { level: 9 }),
    ]);
    await Promise.all([writeFile(join(HTML_DIR, `${file}.br`), br), writeFile(join(HTML_DIR, `${file}.gz`), gzipped)]);
    return [body.length, br.length];
  })
);
const total = (i) => (sizes.reduce((sum, s) => sum + s[i], 0) / 1048576).toFixed(1);
console.log(`precompressed ${files.length} pages: ${total(0)} MB of HTML to ${total(1)} MB brotli`);
