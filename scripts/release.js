#!/usr/bin/env node

/**
 * モノレポ内のすべてのパッケージのバージョンを一括更新
 * Next.jsスタイルの統一バージョン管理をサポート
 */

async function main() {
  const newVersion = process.argv[2];

  if (!newVersion) {
    console.error("❌ 使用方法: node release.js <version>");
    console.error("   例: node release.js 1.0.0");
    console.error("   例: node release.js 1.0.0-beta.1");
    process.exit(1);
  }

  // バージョン形式の簡易検証
  const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/;
  if (!versionRegex.test(newVersion)) {
    console.error(`❌ 無効なバージョン形式: ${newVersion}`);
    console.error("   形式: X.Y.Z または X.Y.Z-prerelease");
    process.exit(1);
  }

  console.log(
    `   1. 変更をコミット: git add . && git commit -m "chore: bump version to ${newVersion}"`
  );
  console.log(`   2. タグを作成: git tag v${newVersion}`);
  console.log("   3. プッシュ: git push && git push --tags");

  process.exit(0);
}

main().catch((error) => {
  console.error("❌ エラーが発生しました:", error);
  process.exit(1);
});
