import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original fortune-cookie line for a software developer (at most 120
// characters): an estimate is never wrong, it is just made for a week in
// which nobody ever walks up and says, "got a minute?"
const TEXT =
  "Your estimate was not wrong; it was made for a week in which no one would ever say, 'got a minute?'";

if (TEXT.length < 1 || TEXT.length > 120 || !/\S/.test(TEXT) || TEXT.includes("\n")) {
  throw new Error("entry text fails the 1-120 character, single-line gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
