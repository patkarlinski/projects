// Import ESLint's official recommended rules
import js from "@eslint/js";

// Import predefined global variables (e.g. window, process, etc.)
import globals from "globals";

// Import Prettier config to disable conflicting ESLint rules
import prettier from "eslint-config-prettier";

// Import React-specific ESLint plugin
import reactPlugin from "eslint-plugin-react";

import pluginQuery from "@tanstack/eslint-plugin-query";
/**
 * @type {import('eslint').Linter.Config[]}
 * This is a type annotation for editors (like VS Code)
 * so they can provide autocomplete and type checking.
 * It starts with a comment (/** ...) because it's JSDoc syntax.
 */
export default [
  // Use the recommended base ESLint config for JavaScript
  js.configs.recommended,

  {
    // Include React plugin's recommended rules
    ...reactPlugin.configs.flat.recommended,

    // Configure React version detection for React-specific rules
    settings: {
      react: {
        version: "detect", // Automatically detect the React version from package.json
      },
    },
  },

  // Enable support for JSX runtime (so you don't have to import React manually)
  reactPlugin.configs.flat["jsx-runtime"],
  ...pluginQuery.configs["flat/recommended"],
  {
    // Apply these settings to all JavaScript and JSX files
    files: ["**/*.js", "**/*.jsx"],

    languageOptions: {
      // Enable both browser and Node.js global variables (e.g. window, process)
      globals: { ...globals.browser, ...globals.node },

      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable support for JSX syntax (used in React)
        },
      },
    },

    rules: {
      // Disable error for unescaped HTML entities like &apos;
      "react/no-unescaped-entities": "off",

      // Disable requirement to define prop-types (used with TypeScript or modern React)
      "react/prop-types": "off",
    },
  },

  // Prettier config should always be last to avoid conflicts with formatting rules
  prettier,
];
