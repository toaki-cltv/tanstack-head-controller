import { Logger } from "tslog";

export const cLogger = () =>
  new Logger({
    type: "pretty",
    name: "THC",
    prettyLogTemplate:
      "{{yyyy}}-{{mm}}-{{dd}} [{{filePathWithLine}}] {{hh}}:{{MM}}:{{ss}}.{{ms}} {{logLevelName}} {{name}} ",
    overwrite: {
      transportFormatted: (logMetaMarkup, logArgs, logErrors) => {
        const output = `${logMetaMarkup}${logArgs.map(formatLogArg).join(" ")}${logErrors.length > 0 ? `\n${logErrors.join("\n")}` : ""}`;

        console.log(output);
      },
    },
  });

const useAnsiColors = typeof process !== "undefined" && process?.versions?.node != null;

const ansi = {
  reset: "\u001b[0m",
  dim: "\u001b[2m",
  cyan: "\u001b[36m",
  green: "\u001b[32m",
  magenta: "\u001b[35m",
  yellow: "\u001b[33m",
  red: "\u001b[31m",
};

const colorize = (value: string, color: keyof typeof ansi) => {
  if (!useAnsiColors) {
    return value;
  }

  return `${ansi[color]}${value}${ansi.reset}`;
};

const formatLogArg = (value: unknown) => {
  if (typeof value === "string") {
    return colorize(value, "green");
  }

  if (value instanceof Error) {
    return value.stack ?? value.message;
  }

  if (value == null) {
    return colorize(String(value), "yellow");
  }

  return formatPrettyValue(value);
};

const formatPrettyValue = (value: unknown) => {
  const seen = new WeakSet<object>();

  return formatValue(value, 0, seen);
};

const formatValue = (value: unknown, indentLevel: number, seen: WeakSet<object>): string => {
  if (value instanceof Error) {
    return value.stack ?? value.message;
  }

  if (value instanceof Date) {
    return colorize(`"${value.toISOString()}"`, "green");
  }

  if (typeof value === "string") {
    return colorize(`"${escapeString(value)}"`, "green");
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return colorize(String(value), typeof value === "number" ? "cyan" : "magenta");
  }

  if (typeof value === "bigint") {
    return colorize(`${value}n`, "cyan");
  }

  if (typeof value === "symbol") {
    return colorize(value.toString(), "magenta");
  }

  if (typeof value === "function") {
    return colorize(`[Function${value.name ? `: ${value.name}` : ""}]`, "red");
  }

  if (value == null) {
    return colorize(String(value), "yellow");
  }

  if (typeof value !== "object") {
    return String(value);
  }

  if (seen.has(value)) {
    return colorize("[Circular]", "red");
  }

  seen.add(value);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return colorize("[]", "dim");
    }

    const nextIndent = indentLevel + 2;
    const items = value.map(
      (item) => `${indent(nextIndent)}${formatValue(item, nextIndent, seen)}`
    );
    return `${colorize("[", "dim")}\n${items.join(colorize(",", "dim") + "\n")}
${indent(indentLevel)}${colorize("]", "dim")}`;
  }

  const entries = Object.entries(value);

  if (entries.length === 0) {
    return colorize("{}", "dim");
  }

  const nextIndent = indentLevel + 2;
  const lines = entries.map(
    ([key, entryValue]) =>
      `${indent(nextIndent)}${colorize(key, "yellow")}: ${formatValue(entryValue, nextIndent, seen)}`
  );

  return `${colorize("{", "dim")}\n${lines.join(colorize(",", "dim") + "\n")}
${indent(indentLevel)}${colorize("}", "dim")}`;
};

const indent = (size: number) => " ".repeat(size);

const escapeString = (value: string) => value.split("\\").join("\\\\").split('"').join('\\"');
