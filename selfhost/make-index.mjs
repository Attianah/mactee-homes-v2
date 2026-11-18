// The static build writes the app shell to dist/client/_shell.html.
// Static hosts expect an index.html at the root, so copy it across.
import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";

const out = path.join(process.cwd(), "dist", "client");
const shell = path.join(out, "_shell.html");

if (!existsSync(shell)) {
  console.error("dist/client/_shell.html is missing. Run the build first.");
  process.exit(1);
}

copyFileSync(shell, path.join(out, "index.html"));
console.log("Wrote dist/client/index.html");