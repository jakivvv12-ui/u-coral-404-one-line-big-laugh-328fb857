import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "My plants died, so I bought plastic ones. Now I feel guilty for neglecting those too.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Round-trip validation: read back and verify the written file.
const back = readFileSync(outPath, "utf8");
const backLine = back.replace(/\n$/, "");
if (backLine !== LINE) {
  throw new Error("round-trip mismatch: entry.txt content differs from LINE");
}
if (backLine.length < 1 || backLine.length > 200) {
  throw new Error(`round-trip length out of range: ${backLine.length}`);
}
console.log(`wrote ${outPath} (${LINE.length} chars)`);
