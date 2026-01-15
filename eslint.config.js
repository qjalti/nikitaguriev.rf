import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { fixupConfigRules } from "@eslint/compat";

export default [
  // 1. Игнорируем лишнее
  { ignores: ["**/node_modules/**", "dist/**"] },

  // 2. JS правила ТОЛЬКО для JS файлов (это решает проблему с no-irregular-whitespace)
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ...js.configs.recommended,
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // 3. React с настройкой версии и фиксом
  ...fixupConfigRules(pluginReact.configs.flat.recommended).map((config) => ({
    ...config,
    files: ["**/*.{js,mjs,cjs,jsx}"],
    settings: {
      react: { version: "detect" }, // Убирает Warning
    },
  })),

  // 4. JSON
  {
    files: ["**/*.json", "**/*.jsonc", "**/*.json5"],
    language: "json/json",
    ...json.configs.recommended,
  },

  // 5. Markdown
  ...markdown.configs.recommended,
  {
    files: ["**/*.md"],
    language: "markdown/gfm",
  },

  // 6. CSS
  {
    files: ["**/*.css"],
    language: "css/css",
    ...css.configs.recommended,
  },
];
