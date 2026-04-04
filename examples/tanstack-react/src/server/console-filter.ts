const ignorePatterns = ["Client"];

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

function shouldIgnore(args: unknown[]) {
  const text = args.join(" ");
  return ignorePatterns.some((p) => text.includes(p));
}

console.log = (...args) => {
  if (!shouldIgnore(args)) {
    originalLog(...args);
  }
};

console.warn = (...args) => {
  if (!shouldIgnore(args)) {
    originalWarn(...args);
  }
};

console.error = (...args) => {
  if (!shouldIgnore(args)) {
    originalError(...args);
  }
};
