import { mkdir, copyFile } from "node:fs/promises";
import { statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

async function main(): Promise<void> {
  const repoRoot = dirname(fileURLToPath(import.meta.url));
  const configuredOutputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  const outputDir = configuredOutputDir ? configuredOutputDir : "/output";

  const source = resolve(repoRoot, "meme.png");
  if (!statSync(source, { throwIfNoEntry: false })?.isFile()) {
    console.error(
      `Error: meme.png is missing or not a regular file at repository root (${source})`,
    );
    process.exit(1);
  }

  await mkdir(outputDir, { recursive: true });

  const destination = resolve(outputDir, "meme.png");
  await copyFile(source, destination);

  console.log(destination);
}

main().catch((error) => {
  console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
