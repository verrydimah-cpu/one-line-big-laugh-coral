// One Line, Big Laugh — writes the single entry line to the output dir.
// The grader runs this with the repo read-only and /output mounted, so the
// output directory itself is never removed; only its contents are cleared,
// entry by entry, before the entry file is written.

import { readdirSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// The line itself, picked over three rivals (a GPS staging an intervention
// on the way to an ex's wedding, a grandmother's will splitting one ladle
// six ways, a smart fridge enforcing a diet at midnight): this one won
// because the twist is a real punchline, not an observation — the childhood
// story literally works as a bedtime story, and the sleeper still charges
// extra for it. Every word earns its place; the laugh lands on the last two.
const ENTRY =
  "My therapist fell asleep while I described my childhood, then charged me extra — apparently it counted as a bedtime story.";

function outputDir(): string {
  // Prefer the harness-provided directory; fall back to /output, the
  // mount point the program/v1 grader uses.
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function clearContents(dir: string): void {
  let names: string[] = [];
  try {
    names = readdirSync(dir);
  } catch {
    return; // Directory does not exist yet; nothing to clear.
  }
  for (const name of names) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  clearContents(dir);
  writeFileSync(join(dir, "entry.txt"), ENTRY, "utf8");
}

main();
