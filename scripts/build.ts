import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");
const packagesDir = resolve(rootDir, "packages");

const run = (command: string, args: string[], cwd: string) =>
  new Promise<void>((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise();
        return;
      }

      rejectPromise(new Error(`Command failed (${code}): ${command} ${args.join(" ")}`));
    });

    child.on("error", (error) => {
      rejectPromise(error);
    });
  });

const listPackages = async () => {
  const entries = await readdir(packagesDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(resolve(packagesDir, name, "package.json")));
};

const buildPackage = async (packageName: string) => {
  const packageDir = resolve(packagesDir, packageName);
  const tsconfigPath = resolve(packageDir, "tsconfig.json");
  const swcrcPath = resolve(packageDir, ".swcrc");
  const distDir = resolve(packageDir, "dist");

  if (!existsSync(packageDir)) {
    throw new Error(`Package not found: ${packageName}`);
  }

  if (!existsSync(tsconfigPath)) {
    throw new Error(`tsconfig.json not found: ${packageName}`);
  }

  if (!existsSync(swcrcPath)) {
    throw new Error(`.swcrc not found: ${packageName}`);
  }

  await rm(distDir, { recursive: true, force: true });

  console.log(`\n[build] ${packageName} - swc`);
  await run(
    "pnpm",
    ["exec", "swc", "src", "-d", "dist", "--strip-leading-paths", "--config-file", ".swcrc"],
    packageDir
  );

  console.log(`[build] ${packageName} - types`);
  await run(
    "pnpm",
    [
      "exec",
      "tsc",
      "--project",
      "tsconfig.json",
      "--emitDeclarationOnly",
      "--declaration",
      "--outDir",
      "dist",
    ],
    packageDir
  );
};

const main = async () => {
  const targets = process.argv.slice(2);
  const packages = targets.length > 0 ? targets : await listPackages();

  if (packages.length === 0) {
    console.log("No packages found.");
    return;
  }

  for (const packageName of packages) {
    await buildPackage(packageName);
  }

  console.log("\nBuild completed.");
};

main().catch((error) => {
  console.error("\nBuild failed.");
  console.error(error);
  process.exit(1);
});
