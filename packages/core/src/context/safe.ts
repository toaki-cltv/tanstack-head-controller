/**
 * このファイルは、`context` を安全に使用するための機能を提供します。
 *
 * 1. 型が保証された状態でコンテキストを使用できるようにする。
 * 2. コンテキストの構造が変更された場合に、型エラーを通じて問題を早期に発見できるようにする。
 * 3. コンテキストの使用箇所で、必要なプロパティが存在することを保証する。
 */

import { rLogger } from "./log.js";
import type { ThcContext } from "./type.js";

const logger = rLogger.getSubLogger({ name: "Safe" });

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isThcContext(value: unknown): value is ThcContext {
  if (!isRecord(value)) {
    return false;
  }

  return Array.isArray(value.plugins);
}

/**
 * `thcContext` を安全に使用するための関数。
 * @param ctx - 使用するルーターコンテキスト
 * @returns `ThcContext` 型のコンテキスト
 * @throws コンテキストが正しい構造を持っていない場合にエラーをスロー
 * @example
 * const safeCtx = useSafeHeadCtrlrContext(ctx)
 * // safeCtx は ThcContext 型であることが保証される
 * console.log(safeCtx.plugins) // plugins プロパティが存在することが保証される
 */
export interface UseSafeHeadCtrlrContextOptions {
  isThrow?: boolean; // エラーをスローするかどうかのオプション（デフォルトは true）
}

export function useSafeHeadCtrlrContext(
  ctx: unknown,
  options: UseSafeHeadCtrlrContextOptions = {}
): ThcContext | null {
  const { isThrow = true } = options;

  if (!isRecord(ctx)) {
    if (isThrow) {
      throw logger.error("Invalid context: Context must be an object.", {
        receivedType: typeof ctx,
      });
    }
    return null;
  }

  if (!("thc" in ctx)) {
    if (isThrow) {
      throw logger.error("Invalid context: Missing 'thc' property.");
    }
    return null;
  }

  const thcContext = ctx?.thc;

  if (!isThcContext(thcContext)) {
    if (isThrow) {
      throw logger.error("Invalid context: 'plugins' must be an array.");
    }
    return null;
  }

  return thcContext;
}
