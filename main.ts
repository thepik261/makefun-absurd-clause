// The Absurd Clause Contest — make.fun bounty entry.
// Writes one original English sentence, an absurd clause hidden deep
// inside a terms-of-service agreement, to /output/entry.txt. The sealed
// gate requires 1-200 UTF-8 characters, not only whitespace; pure Node
// stdlib, deterministic, no network.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const LINE =
  "By using this service you agree that your left sock becomes company property on Tuesdays and may be repossessed without notice.";

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`entry line must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
try {
  chmodSync(outPath, 0o644);
} catch {
  // best effort; file is already written
}
