/**
 * Patch zotero-plugin-scaffold to replace '.grey' with '.gray' in style calls.
 * Node.js 25+ removed 'grey' as a valid color name for styleText;
 * 'gray' works in all versions.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dir = join(
  "node_modules",
  "zotero-plugin-scaffold",
  "dist",
  "shared",
);

try {
  const files = await readdir(dir);
  for (const file of files) {
    if (!file.endsWith(".mjs")) continue;
    const path = join(dir, file);
    const content = await readFile(path, "utf8");
    if (content.includes(".grey")) {
      await writeFile(path, content.replaceAll(".grey", ".gray"));
      console.log(`Patched ${path}: replaced .grey with .gray`);
    }
  }
} catch (e) {
  // Silently skip if scaffold is not installed yet (e.g., during initial npm install)
  if (e.code !== "ENOENT") throw e;
}
