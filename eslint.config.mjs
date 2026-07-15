import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@nsoto/portfolio-ui",
              message:
                "Import UI kit only from components/ui/ wrappers (see docs/features/landing.md).",
            },
            {
              name: "@nsoto/portfolio-tokens",
              message:
                "Import tokens only via app/globals.css or components/ui/ wrappers (see docs/features/landing.md).",
            },
          ],
          patterns: [
            {
              group: ["@nsoto/portfolio-ui/*", "@nsoto/portfolio-tokens/*"],
              message:
                "Import @nsoto packages only from components/ui/ wrappers or app/globals.css.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["components/ui/**"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
]);

export default eslintConfig;
