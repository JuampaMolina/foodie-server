import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const collectJsFiles = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    return statSync(fullPath).isDirectory()
      ? collectJsFiles(fullPath)
      : fullPath.endsWith(".js")
        ? [fullPath]
        : [];
  });

const files = collectJsFiles("src");

for (const file of files) {
  execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
}

console.log(`Sintaxis correcta en ${files.length} archivos.`);
