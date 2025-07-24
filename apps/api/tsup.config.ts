import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["esm"],
  external: [
    "@webcampus/auth",
    "@webcampus/types",
    "@webcampus/common",
    "@webcampus/schemas",
    "@webcampus/db",
    "@webcampus/backend-utils",
  ],
});
