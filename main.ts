import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

try {
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(join(botDir, "POST.json"), join(outputDir, "POST.json"));
  console.log(`Copied POST.json from ${botDir} to ${outputDir}`);
  process.exit(0);
} catch (err) {
  console.error(`Failed to copy POST.json from ${botDir} to ${outputDir}: ${(err as Error).message}`);
  process.exit(1);
}
