#!/usr/bin/env node

/**
 * モノレポ内のすべてのパッケージのバージョンが一致しているかチェック
 * Next.jsのような統一バージョン管理を実現
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findPackageJsonFiles(baseDir) {
  const packagesDir = path.join(baseDir, "packages");

  if (!fs.existsSync(packagesDir)) {
    return [];
  }

  const results = [];
  const packages = fs.readdirSync(packagesDir, { withFileTypes: true });

  for (const pkg of packages) {
    if (pkg.isDirectory()) {
      const pkgJsonPath = path.join(packagesDir, pkg.name, "package.json");
      if (fs.existsSync(pkgJsonPath)) {
        results.push(pkgJsonPath);
      }
    }
  }

  return results;
}

async function main() {
  const rootDir = path.resolve(__dirname, "..");

  // すべてのパッケージのpackage.jsonを検索
  const packageJsonPaths = findPackageJsonFiles(rootDir);

  if (packageJsonPaths.length === 0) {
    console.warn("⚠️  packages/*/package.jsonが見つかりません");
    process.exit(0);
  }

  console.log(`📦 ${packageJsonPaths.length}個のパッケージを検出しました\n`);

  // 各パッケージのバージョンを取得
  const versions = new Map();

  for (const pkgPath of packageJsonPaths) {
    try {
      const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      const pkgName = pkgJson.name || path.basename(path.dirname(pkgPath));
      const version = pkgJson.version;

      if (!version) {
        console.error(`❌ ${pkgName}: バージョンが定義されていません`);
        process.exit(1);
      }

      versions.set(pkgName, {
        version,
        path: path.relative(rootDir, pkgPath),
      });

      console.log(`   ${pkgName}: ${version}`);
    } catch (error) {
      console.error(`❌ ${pkgPath}の読み込みに失敗: ${error.message}`);
      process.exit(1);
    }
  }

  console.log("");

  // バージョンの統一性をチェック
  const versionList = Array.from(versions.values()).map((v) => v.version);
  const uniqueVersions = new Set(versionList);

  if (uniqueVersions.size > 1) {
    console.error("❌ パッケージ間でバージョンが一致していません！\n");
    console.error("検出されたバージョン:");

    for (const [pkgName, data] of versions.entries()) {
      console.error(`   ${pkgName}: ${data.version} (${data.path})`);
    }

    console.error("\n⚠️  すべてのパッケージのバージョンを統一してください。");
    console.error("   Next.jsのように、関連パッケージは同じバージョンで管理されます。");
    process.exit(1);
  }

  const unifiedVersion = versionList[0];
  console.log(`✅ すべてのパッケージのバージョンが統一されています: ${unifiedVersion}`);

  // GitHub Actions用の出力
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `unified_version=${unifiedVersion}\n`);

    // プレリリース情報の抽出
    const baseVersion = unifiedVersion.split("-")[0];
    const prerelease = unifiedVersion.includes("-") ? unifiedVersion.split("-")[1] : "";
    const publishTag = prerelease ? prerelease.split(".")[0] : "latest";

    fs.appendFileSync(process.env.GITHUB_OUTPUT, `base_version=${baseVersion}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `prerelease=${prerelease}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `publish_tag=${publishTag}\n`);

    console.log(`\nGitHub Actions出力:`);
    console.log(`   unified_version: ${unifiedVersion}`);
    console.log(`   base_version: ${baseVersion}`);
    console.log(`   prerelease: ${prerelease}`);
    console.log(`   publish_tag: ${publishTag}`);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error("❌ エラーが発生しました:", error);
  process.exit(1);
});
