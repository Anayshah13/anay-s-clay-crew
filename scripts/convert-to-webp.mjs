/**
 * Converts PNG/JPEG under public/ to WebP and removes originals.
 * Run: npm run images:webp
 */
import sharp from "sharp";
import { readdir, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PUBLIC = join(__dirname, "..", "public");
const RASTER = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const names = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const ent of names) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function main() {
  const files = await walk(PUBLIC);
  let n = 0;
  for (const input of files) {
    const ext = extname(input).toLowerCase();
    if (!RASTER.has(ext)) continue;
    const target = input.slice(0, -ext.length) + ".webp";
    await sharp(input).webp({ quality: 82, effort: 4 }).toFile(target);
    await unlink(input);
    console.log("+", target.replace(PUBLIC + "\\", "").replace(PUBLIC + "/", ""));
    n++;
  }
  if (!n) console.log("(no raster images found)");
  else console.log(`Done: ${n} file(s) → WebP`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
