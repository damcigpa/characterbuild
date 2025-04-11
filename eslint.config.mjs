import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      js,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // TypeScript ESLint recommended config
  ...tseslint.configs.recommended,

  // React flat config (only for JSX/TSX files)
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat.recommended,
  },

  // Ignore folders like node_modules, dist, etc.
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.next/**'],
  },
])
