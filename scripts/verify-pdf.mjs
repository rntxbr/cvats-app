import { mkdir } from "node:fs/promises";
import { build } from "esbuild";

await mkdir("tmp/pdfs", { recursive: true });
await build({
  entryPoints: ["scripts/verify-pdf.tsx"],
  outfile: "tmp/verify-pdf.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
});
await import("../tmp/verify-pdf.mjs");
